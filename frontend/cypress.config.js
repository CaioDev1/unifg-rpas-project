const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "test",
  viewportWidth: 1366,
  viewportHeight: 768,
  env: {
    REACT_APP_API_BASE_URL: "http://localhost:3001",
  },
  video: true,
  videosFolder: "cypress/videos",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require("./cypress/plugins/index.js")(on, config);
    // },
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: ["*/*/**/NO-*.cy.{js,jsx,ts,tsx}"],
    testIsolation: false,
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
});
