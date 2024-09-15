import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { startClient } from "rakkasjs/client";

console.log(
  "import.meta.env.VITE_CONVEX_URL",
  import.meta.env.VITE_CONVEX_URL,
);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

startClient({
  hooks: {
    wrapApp(app) {
      // return <ConvexProviderWithClerk client={convex}>{app}</ConvexProviderWithClerk>;
      return <ClerkProvider publishableKey="pk_test_ZGVjZW50LWFkZGVyLTg0LmNsZXJrLmFjY291bnRzLmRldiQ">
                <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                  {app}
                </ConvexProviderWithClerk>
              </ClerkProvider>;
    },
  },
});