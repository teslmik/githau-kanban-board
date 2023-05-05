import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'kx76r1',
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3001',
    supportFile: "cypress/support/index.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
