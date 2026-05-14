import { verifyPayment, settlePayment } from "../../proxy";

/** USDC contract address on Base mainnet */
export const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

/** Network identifier */
export const NETWORK_ID = process.env.NETWORK_ID || "eip155:8453";

/** Receiving wallet address */
export const WALLET_ADDRESS = process.env.WALLET_ADDRESS || "";

/** Convert a dollar amount string like "$0.01" to USDC micro-units (6 decimals) */
export function dollarToUsdc(price: string): string {
  const amount = parseFloat(price.replace("$", ""));
  return Math.round(amount * 1_000_000).toString();
}

export type PaymentRequirements = {
  scheme: "exact";
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  maxTimeoutSeconds: number;
  asset: string;
  extra: { name: string; version: string };
};

/**
 * Build the payment requirements object for a given route.
 */
export function buildPaymentRequirements(opts: {
  price: string;
  resource: string;
  description: string;
  mimeType?: string;
}): PaymentRequirements {
  return {
    scheme: "exact",
    network: NETWORK_ID,
    maxAmountRequired: dollarToUsdc(opts.price),
    resource: opts.resource,
    description: opts.description,
    mimeType: opts.mimeType ?? "application/json",
    payTo: WALLET_ADDRESS,
    maxTimeoutSeconds: 300,
    asset: USDC_BASE,
    extra: { name: "USDC", version: "2" },
  };
}

/**
 * Create a 402 Payment Required response with the given payment requirements.
 */
export function paymentRequired(requirements: PaymentRequirements): Response {
  const body = JSON.stringify({
    error: "Payment Required",
    accepts: [requirements],
    x402Version: 1,
  });

  return new Response(body, {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "X-Payment-Requirements": Buffer.from(JSON.stringify([requirements])).toString("base64"),
      "Access-Control-Expose-Headers": "X-Payment-Requirements",
    },
  });
}

/**
 * Verify and settle the payment header value sent by the client.
 * Returns null if valid, or an error message string if invalid.
 */
export async function processPayment(
  paymentHeader: string,
  requirements: PaymentRequirements
): Promise<{ ok: true; tx?: string } | { ok: false; error: string }> {
  const verifyResult = await verifyPayment(paymentHeader, requirements);
  if (!verifyResult.isValid) {
    return { ok: false, error: verifyResult.invalidReason ?? "Invalid payment" };
  }

  const settleResult = await settlePayment(paymentHeader, requirements);
  if (!settleResult.success) {
    return { ok: false, error: settleResult.error ?? "Settlement failed" };
  }

  return { ok: true, tx: settleResult.transaction };
}
