import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      ...process.env,
      REACT_APP_MOCK_ENABLE:
        process.env.NODE_ENV === "development" ? "true" : "false",
    },
  },
});
