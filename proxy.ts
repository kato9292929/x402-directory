/**
 * proxy.ts — Required for Next.js 16 x402 integration.
 *
 * Provides server-side proxy utilities for communicating with the CDP facilitator.
 * Imported by API route handlers and middleware for payment verification/settlement.
 *
 * syncFacilitatorOnStart defaults to true (Coinbase CDP standard behaviour).
 */

export const FACILITATOR_URL =
  process.env.FACILITATOR_URL ||
  "https://api.developer.coinbase.com/rpc/v1/base/facilitator";

export const FACILITATOR_CONFIG = {
  url: FACILITATOR_URL,
  syncFacilitatorOnStart: true,
} as const;

export type FacilitatorVerifyResponse = {
  isValid: boolean;
  invalidReason?: string;
  payer?: string;
};

export type FacilitatorSettleResponse = {
  success: boolean;
  transaction?: string;
  networkId?: string;
  error?: string;
};

/**
 * Verify a payment proof against the CDP facilitator (does not settle).
 */
export async function verifyPayment(
  payment: string,
  paymentRequirements: unknown
): Promise<FacilitatorVerifyResponse> {
  const response = await fetch(FACILITATOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "x402_verify",
      params: [payment, paymentRequirements],
    }),
  });

  if (!response.ok) {
    return { isValid: false, invalidReason: `Facilitator HTTP ${response.status}` };
  }

  const json = await response.json();
  if (json.error) {
    return { isValid: false, invalidReason: json.error.message || "Facilitator error" };
  }

  return json.result as FacilitatorVerifyResponse;
}

/**
 * Settle a payment via the CDP facilitator (on-chain transfer).
 */
export async function settlePayment(
  payment: string,
  paymentRequirements: unknown
): Promise<FacilitatorSettleResponse> {
  const response = await fetch(FACILITATOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "x402_settle",
      params: [payment, paymentRequirements],
    }),
  });

  if (!response.ok) {
    return { success: false, error: `Facilitator HTTP ${response.status}` };
  }

  const json = await response.json();
  if (json.error) {
    return { success: false, error: json.error.message || "Settlement failed" };
  }

  return json.result as FacilitatorSettleResponse;
}
