import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import rakkas from "rakkasjs/vite-plugin";

const env = loadEnv("", process.cwd(), "");
Object.assign(process.env, env);

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    rakkas({
      // This is required because of a Rakkas bug. Expect a fix this week
      serverOnlyFiles: {
        exclude: ["**/node_modules/**"],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});