require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    env: {
      USERNAME: process.env.CYPRESS_USER,
      PASSWORD: process.env.CYPRESS_PASS,
    },

  },
});
