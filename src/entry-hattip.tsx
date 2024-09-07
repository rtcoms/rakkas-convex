import { ConvexProvider } from "convex/react";
import { ConvexHttpClient } from "convex/browser";
import { createRequestHandler } from "rakkasjs/server";

export default createRequestHandler({
  createPageHooks() {
    return {
      wrapApp(app) {
        const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
        return <ConvexProvider client={convex as any}>{app}</ConvexProvider>;
      },
    };
  },
});