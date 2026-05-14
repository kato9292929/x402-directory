const AI_AGENT_PATTERNS = [
  "anthropic",
  "claude",
  "openai",
  "gpt",
  "chatgpt",
  "agent",
  "bot",
  "spider",
  "crawler",
  "python-httpx",
  "python-requests",
  "aiohttp",
  "axios",
  "fetch/",
  "go-http",
  "java/",
  "curl/",
  "wget/",
] as const;

/**
 * Returns true when the User-Agent string indicates an AI agent or headless client
 * rather than an interactive browser session.
 */
export function isAiAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();

  // Known browser identifiers — definitely human
  if (
    (ua.includes("mozilla/") || ua.includes("applewebkit")) &&
    (ua.includes("chrome") || ua.includes("firefox") || ua.includes("safari")) &&
    !ua.includes("headless")
  ) {
    return false;
  }

  return AI_AGENT_PATTERNS.some((pattern) => ua.includes(pattern));
}
