define("ui/viewModels/calling/messageControlViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "lodash-compat",
  "vendor/knockout",
  "swx-enums",
  "swx-i18n",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e) {
  function f(e, f) {
    function h(e) {
      if (!e || !e.direction || !e.type)
        return;
      e.direction() === o.chat.messageType.INCOMING && e.type() === i.activityType.TextMessage && l.hasMessage(!0);
    }
    var l = this, c = r.observable(!1);
    f = f || n.noop;
    t.call(l, e, c);
    l.buttonText = s.fetch({ key: "callscreen_text_showChat" });
    l.showChat = function () {
      var e = a.resolve(o.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(u.audioVideo.showChat);
      l.hasMessage(!1);
      f();
    };
    l.hasMessage = r.observable(!1);
    l.dispose = function () {
      e.historyService.activityItems.added.off(h);
    };
    e.historyService.activityItems.added(h);
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("lodash-compat"), r = e("vendor/knockout"), i = e("swx-enums"), s = e("swx-i18n").localization, o = e("swx-constants").COMMON, u = e("ui/telemetry/actions/actionNames"), a = e("swx-service-locator-instance").default;
  return f.prototype = Object.create(t.prototype), f.prototype.constructor = f, {
    build: function (e, t) {
      return new f(e, t);
    }
  };
});
