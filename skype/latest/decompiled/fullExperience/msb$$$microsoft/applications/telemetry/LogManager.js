module.exports = function () {
  function n() {
  }
  return n.initialize = function (e) {
    if (!n._initialized) {
      if (!e)
        throw new o(1);
      n._defaultToken = e;
      n._config.collectorUrl || (n._config.collectorUrl = "https://browser.pipe.aria.microsoft.com/Collector/3.0/");
      t.Initialize(n._config);
      t.Start();
      a.initialize();
      n._initialized = !0;
    }
  }, n.initializeWithConfiguration = function (e, t) {
    if (!t.collectorUrl)
      throw new o(4);
    n._config.collectorUrl = t.collectorUrl;
    n.initialize(e);
  }, n.flush = function (e) {
    t.Flush(e);
  }, n.addCallbackListener = function (e) {
    n._initialized && t.AddListener(e);
  }, n.setContext = function (e, t, r) {
    n._contextProperties.setProperty(e, t, r);
  }, n.isInitialized = function () {
    return n._initialized;
  }, n.getDefaultToken = function () {
    return n._defaultToken;
  }, n.getSemanticContext = function () {
    return n._semanticContext;
  }, n.__backToUninitialized = function () {
    n._config = new e._sender.TelemetryConfig();
    n._semanticContext = new u();
    n._contextProperties = new i();
    t = e._sender.TelemetryManagerFactory.CreateTelemetryManager();
    n._initialized = !1;
  }, n._initialized = !1, n._defaultToken = null, n._config = new e._sender.TelemetryConfig(), n._contextProperties = new i(), n._semanticContext = new u(), n;
}()
