define("jSkype/services/callHandlerFactory", [
  "require",
  "exports",
  "module",
  "utils/calling/callingStack",
  "jSkype/services/plugin/pluginCallHandler",
  "jSkype/services/NGCCallAgent/NGCCallAgent/ngcAgent",
  "jSkype/services/outOfBrowser/outOfBrowserCallHandler",
  "swx-enums"
], function (e, t) {
  var n = e("utils/calling/callingStack"), r = e("jSkype/services/plugin/pluginCallHandler"), i = e("jSkype/services/NGCCallAgent/NGCCallAgent/ngcAgent").callHandler, s = e("jSkype/services/outOfBrowser/outOfBrowserCallHandler"), o = e("swx-enums"), u;
  t.createCallHandler = function (t) {
    return t.audioService._canHandlePluginlessCall() ? (t._callData.callTechnology(o.callTechnology.NGC), i.build(t)) : n.get().isInBrowserPluginSupported() ? r.build(t) : s.build(t);
  }, t.initialize = function () {
    return n.get().isPluginlessCallingSupported() ? u = i : n.get().isInBrowserPluginSupported() ? u = r : u = s, u.initialize();
  }, t.dispose = function () {
    u && u.dispose && u.dispose();
  };
})
