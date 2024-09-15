import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ConvexHttpClient } from "convex/browser";
import { createRequestHandler } from "rakkasjs/server";

export default createRequestHandler({
  createPageHooks() {
    return {
      wrapApp(app) {
        const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
        return <ClerkProvider publishableKey="pk_test_ZGVjZW50LWFkZGVyLTg0LmNsZXJrLmFjY291bnRzLmRldiQ">
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {app}
          </ConvexProviderWithClerk>
        </ClerkProvider>;
      },
    };
  },
});