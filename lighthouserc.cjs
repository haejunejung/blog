// https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn run preview", // The command to run to start the server
      startServerReadyPattern: "Local", // String pattern to listen for the server
      numberOfRuns: 1, // The number of times to run Lighthouse
      url: ["http://localhost:4173"], // A URL to run Lighthouse on.
      // isSinglePageApplication: true,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "temporary-public-storage", // The type of target to upload the data to. If set to anything other than "lhci", some of the options will not apply.
    },
    server: {},
    wizard: {},
  },
};
