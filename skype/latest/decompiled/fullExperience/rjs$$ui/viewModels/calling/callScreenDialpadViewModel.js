define("ui/viewModels/calling/callScreenDialpadViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "vendor/knockout",
  "swx-utils-common",
  "swx-i18n",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionNames",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "utils/common/eventMixin",
  "swx-service-locator-instance",
  "utils/common/outsideClickHandler"
], function (e) {
  function d(e) {
    function d(e) {
      var t = u.dialpadText(), n = a.inject(t, e, t.length);
      u.dialpadText(n);
      r.execute(function () {
        v(n.length);
      });
    }
    function v(e) {
      l.selectionStart = e;
      l.selectionEnd = e;
    }
    function m() {
      var e = c.resolve(f.serviceLocator.ACTION_TELEMETRY), t = o.audioVideo.toggleDialpad;
      e.recordAction(t);
    }
    function g() {
      u.isDialpadOn() ? r.execute(function () {
        u.dispatchEvent(f.events.callScreen.DIALPAD_VISIBLE, null, u.DIRECTION.PARENT);
      }) : u.dispatchEvent(f.events.callScreen.DIALPAD_HIDDEN, null, u.DIRECTION.PARENT);
    }
    var u = this, l;
    u.isDialpadOn = n.observable(!1);
    u.dialpadText = n.observable("");
    t.call(u, e);
    u.init = function (e) {
      l = e;
      u.registerEvent(f.events.skypeOut.DIAL_BUTTON_CLICKED, u.sendDtmf);
    };
    u.sendDtmf = function (t) {
      return e.audioService.sendDtmf(t.text).then(function (e) {
        d(e);
      });
    };
    u.toggleDialpad = function (e, t) {
      if (u.isDialpadButtonEnabled()) {
        var n = u.isDialpadOn();
        n ? h.remove(p) : h.add(p, u.toggleDialpad);
        u.isDialpadOn(!n);
        m();
        g();
      }
      t && s.swallow(t);
    };
    u.isDialpadButtonEnabled = n.computed(function () {
      return u.isCallConnected();
    });
    u.displayDialpad = n.computed(function () {
      return u.isDialpadButtonEnabled() && u.isDialpadOn();
    });
    u.dialpadStateText = n.computed(function () {
      return u.isDialpadOn() ? i.fetch({ key: "callscreen_text_dialpadOff" }) : i.fetch({ key: "callscreen_text_dialpadOn" });
    });
    u.dispose = function () {
      h.remove(p);
      u.dialpadStateText.dispose();
      u.displayDialpad.dispose();
      u.isDialpadButtonEnabled.dispose();
      u.isDialpadOn(!1);
      u.dialpadText("");
    };
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("vendor/knockout"), r = e("swx-utils-common").async, i = e("swx-i18n").localization, s = e("utils/common/eventHelper"), o = e("ui/telemetry/actions/actionNames"), u = e("lodash-compat"), a = e("swx-utils-common").stringUtils, f = e("swx-constants").COMMON, l = e("utils/common/eventMixin"), c = e("swx-service-locator-instance").default, h = e("utils/common/outsideClickHandler"), p = "DialPadController";
  return d.prototype = Object.create(t.prototype), d.prototype.constructor = d, u.assign(d.prototype, l), {
    build: function (e) {
      return new d(e);
    }
  };
});
