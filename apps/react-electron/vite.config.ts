import { defineConfig, type IndexHtmlTransformContext } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function cspPlugin() {
  return {
    name: "inject-csp",
    transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      const isDev = !!ctx.server;
      const csp = isDev
        ? [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline' http://localhost:5173",
            "img-src 'self' data: http://localhost:5173",
            "connect-src 'self' http://localhost:5173 http://localhost:3000 ws://localhost:5173",
          ].join("; ")
        : [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "connect-src 'self' https://api.your-domain.com",
          ].join("; ");

      const tag = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
      return html.replace("</head>", `  ${tag}\n</head>`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), cspPlugin()],
  base: "./",
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: "dist/react",
    emptyOutDir: true,
  },
});
