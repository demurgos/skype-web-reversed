define("ui/components/chat/pes/expressionPicker", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/common",
  "ui/viewModels/chat/pes/expressionPicker",
  "services/pes/configProcessor",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "browser/window",
  "constants/components",
  "text!views/chat/pes/expressionPicker.html"
], function (e, t) {
  function h() {
    return f;
  }
  function p(e) {
    f = e;
  }
  function d(e) {
    var t = s.prefetch(e);
    s.prefetchImages(t);
  }
  function v(e) {
    l ? a.setTimeout(d.bind(null, e), 5000) : o.subscribe(r.apiUIEvents.SWX_TIMELINE_LOADED, function t() {
      l = !0;
      o.unsubscribe(r.apiUIEvents.SWX_TIMELINE_LOADED, t);
      a.setTimeout(d.bind(null, e), 5000);
    });
  }
  function m() {
    var e = t._getCachedModel(), n = u.resolve(r.serviceLocator.PES_CONFIG_SERVICE);
    return e || (e = n.getConfiguration(), s.process(e), t._setCachedModel(e), v(e), o.publish(c.personalExpression.CONFIG_PROCESSED, e)), e;
  }
  function g(e, r) {
    var s = r.element, o = n.dataFor(s), u = t._cachedViewModel().tabs, a = i.build(e.isDisabled, u, o.conversationModel);
    return a.setContext(o), a.init(), a;
  }
  function y() {
    var e = u.resolve(r.serviceLocator.PES_CONFIG_SERVICE), n = e.getConfiguration();
    s.process(n);
    t._setCachedModel(n);
    v(n);
    o.publish(c.personalExpression.CONFIG_PROCESSED, n);
  }
  var n = e("vendor/knockout"), r = e("constants/common"), i = e("ui/viewModels/chat/pes/expressionPicker"), s = e("services/pes/configProcessor"), o = e("services/pubSub/pubSub"), u = e("services/serviceLocator"), a = e("browser/window"), f, l = !1, c = r.events;
  o.subscribe(c.personalExpression.CONFIG_INITIALIZED, y);
  t.name = e("constants/components").chat.EXPRESSION_PICKER;
  t.template = e("text!views/chat/pes/expressionPicker.html");
  t.viewModel = { createViewModel: g };
  t._cachedViewModel = m;
  t._getCachedModel = h;
  t._setCachedModel = p;
});
