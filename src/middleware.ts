import { NextRequest, NextResponse } from "next/server";
import { isAiAgent } from "@/lib/agentDetection";
import { buildPaymentRequirements, paymentRequired, processPayment } from "@/lib/x402";

const PROTECTED_ROUTES: Record<string, { price: string; description: string }> = {
  "/api/directory": {
    price: "$0.01",
    description: "x402 Ecosystem Directory — structured JSON data",
  },
  "/api/search": {
    price: "$0.005",
    description: "x402 Ecosystem Search — keyword search API",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const routeConfig = PROTECTED_ROUTES[pathname];
  if (!routeConfig) return NextResponse.next();

  const userAgent = request.headers.get("user-agent") ?? "";
  if (!isAiAgent(userAgent)) {
    // Human browser — serve freely
    return NextResponse.next();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  const requirements = buildPaymentRequirements({
    price: routeConfig.price,
    resource: `${baseUrl}${pathname}`,
    description: routeConfig.description,
  });

  const paymentHeader = request.headers.get("x-payment");

  if (!paymentHeader) {
    return paymentRequired(requirements);
  }

  const result = await processPayment(paymentHeader, requirements);
  if (!result.ok) {
    return new Response(
      JSON.stringify({ error: "Payment verification failed", reason: result.error }),
      {
        status: 402,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Payment accepted — attach settlement tx to response via header
  const response = NextResponse.next();
  if (result.tx) {
    response.headers.set("X-Payment-Response", result.tx);
  }
  return response;
}

export const config = {
  matcher: ["/api/directory", "/api/search"],
};
