define("jSkype/services/callHandlerFactory", [
  "require",
  "exports",
  "module",
  "swx-jskype-main/lib/services/calling/handlers/plugin/pluginCallingHandler",
  "swx-jskype-main/lib/services/calling/handlers/pluginless/pluginlessCallingHandler",
  "swx-jskype-main/lib/services/calling/handlers/shell/shellCallingHandler",
  "swx-jskype-main/lib/services/calling/callingFacade",
  "swx-util-calling-stack",
  "swx-jskype-main/lib/services/plugin/pluginCallHandler",
  "jSkype/services/swxWebCalling",
  "swx-jskype-main/lib/services/outOfBrowser/outOfBrowserCallHandler",
  "swx-enums"
], function (e, t) {
  var n = e("swx-jskype-main/lib/services/calling/handlers/plugin/pluginCallingHandler"), r = e("swx-jskype-main/lib/services/calling/handlers/pluginless/pluginlessCallingHandler"), i = e("swx-jskype-main/lib/services/calling/handlers/shell/shellCallingHandler"), s = e("swx-jskype-main/lib/services/calling/callingFacade"), o = e("swx-util-calling-stack"), u = e("swx-jskype-main/lib/services/plugin/pluginCallHandler"), a = e("jSkype/services/swxWebCalling").callHandler, f = e("swx-jskype-main/lib/services/outOfBrowser/outOfBrowserCallHandler"), l = e("swx-enums"), c;
  t.createCallHandler = function (t) {
    var c, h;
    return t.audioService._canHandlePluginlessCall() ? (t._callData.callTechnology(l.callTechnology.NGC), c = a.build(t), h = r) : o.get().isInBrowserPluginSupported() ? (c = u.build(t), h = n) : (c = f.build(t), h = i), s.setCallingHandler(h), c;
  };
  t.initialize = function (t) {
    var l;
    return o.get().isPluginlessCallingSupported() ? (c = a, l = r, r.initialize(t)) : o.get().isInBrowserPluginSupported() ? (c = u, l = n) : (c = f, l = i), s.setCallingHandler(l), c.initialize();
  };
  t.dispose = function () {
    c && c.dispose && c.dispose();
  };
});
