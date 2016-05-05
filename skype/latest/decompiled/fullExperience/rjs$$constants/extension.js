define("constants/extension", [], function () {
  return {
    META_SELECTOR: "meta[name=swx-chrome-extension]",
    SHELL_APP_SIZE_FACTOR: 1.6,
    SHELL_APP_MIN_DIMENSIONS: {
      WIDTH: 345,
      HEIGHT: 460
    },
    ERRORS: {
      MISSING_EXTENSION: "MISSING_EXTENSION",
      MISSING_PLUGIN: "MISSING_PLUGIN"
    },
    CONNECTION_CHANGE_EVENT: "NMHostConnectionChange"
  };
})
