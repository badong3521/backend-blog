import buildDevLogger from "./dev-logger";

export default buildDevLogger();
export function createRequestLogger() {
  return function logRequest(
    req: { url: string | string[] },
    res: any,
    next: () => void
  ) {
    if (req.url) {
      if (!req.url.includes("api/result")) {
        buildDevLogger().info(req.url);
      }
    }
    next();
  };
}
