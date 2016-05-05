define("ui/viewModels/calling/callScreenDialpadViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "vendor/knockout",
  "utils/common/async",
  "swx-i18n",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionNames",
  "lodash-compat",
  "swx-utils-common",
  "constants/common",
  "utils/common/eventMixin",
  "services/serviceLocator"
], function (e) {
  function h(e) {
    function h(e) {
      var t = u.dialpadText(), n = a.inject(t, e, t.length);
      u.dialpadText(n), r.execute(function () {
        p(n.length);
      });
    }
    function p(e) {
      l.selectionStart = e, l.selectionEnd = e;
    }
    function d() {
      var e = c.resolve(f.serviceLocator.ACTION_TELEMETRY), t = o.audioVideo.toggleDialpad;
      e.recordAction(t);
    }
    var u = this, l;
    u.isDialpadOn = n.observable(!1), u.dialpadText = n.observable(""), t.call(u, e), u.init = function (e) {
      l = e, u.registerEvent(f.events.skypeOut.DIAL_BUTTON_CLICKED, u.sendDtmf);
    }, u.sendDtmf = function (t) {
      return e.audioService.sendDtmf(t.text).then(function (e) {
        h(e);
      });
    }, u.toggleDialpad = function (e, t) {
      u.isDialpadButtonEnabled() && (u.isDialpadOn(!u.isDialpadOn()), d()), s.swallow(t);
    }, u.isDialpadButtonEnabled = n.computed(function () {
      return u.isCallConnected();
    }), u.displayDialpad = n.computed(function () {
      return u.isDialpadButtonEnabled() && u.isDialpadOn();
    }), u.dialpadStateText = n.computed(function () {
      return u.isDialpadOn() ? i.fetch({ key: "callscreen_text_dialpadOff" }) : i.fetch({ key: "callscreen_text_dialpadOn" });
    }), u.dispose = function () {
      u.dialpadStateText.dispose(), u.displayDialpad.dispose(), u.isDialpadButtonEnabled.dispose(), u.isDialpadOn(!1), u.dialpadText("");
    };
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("vendor/knockout"), r = e("utils/common/async"), i = e("swx-i18n").localization, s = e("utils/common/eventHelper"), o = e("ui/telemetry/actions/actionNames"), u = e("lodash-compat"), a = e("swx-utils-common").stringUtils, f = e("constants/common"), l = e("utils/common/eventMixin"), c = e("services/serviceLocator");
  return h.prototype = Object.create(t.prototype), h.prototype.constructor = h, u.assign(h.prototype, l), {
    build: function (e) {
      return new h(e);
    }
  };
})
