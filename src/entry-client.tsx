import { ConvexProvider, ConvexReactClient } from "convex/react";
import { startClient } from "rakkasjs/client";

console.log(
  "import.meta.env.VITE_CONVEX_URL",
  import.meta.env.VITE_CONVEX_URL,
);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

startClient({
  hooks: {
    wrapApp(app) {
      return <ConvexProvider client={convex}>{app}</ConvexProvider>;
    },
  },
});