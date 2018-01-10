define("ui/viewModels/chat/messageDestinationPicker", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-i18n",
  "swx-constants",
  "utils/common/outsideClickHandler",
  "experience/settings",
  "telemetry/calling/pstn/pstn",
  "swx-constants",
  "swx-cafe-application-instance",
  "swx-log-tracer",
  "swx-service-locator-instance"
], function (e) {
  function d(e) {
    function x(e) {
      e === n.messageDestination.SMS_NETWORK && d.destinations() && d.destinations()[0] && (d.destination(d.destinations()[0].phone), d.skypeEnabled = !1);
    }
    function T() {
      s.remove(b);
      d.hideDestinationSelector(!0);
    }
    function N() {
      d.hideNewDestinationContainer(!0);
      s.remove(y);
    }
    function C() {
      var e = f.get().personsAndGroupsManager.mePerson;
      E = e.account;
      E.entitlements.get().then(function () {
        E._balance() <= 0 && (d.openSkypeCreditContainerWindow(), d.isPstnSmsOnly && (k(), v.publish(n.events.textarea.UPDATE_TEXTAREA_ENABLE, !1)));
      });
    }
    function k() {
      S || (S = !0, E._balance.changed(L));
    }
    function L() {
      v.publish(n.events.textarea.UPDATE_TEXTAREA_ENABLE, E._balance > 0);
    }
    function A() {
      d.hideSkypeCreditContainer() || (d.hideSkypeCreditContainer(!0), s.remove(w), d.isPstnSmsOnly || d.setDestinationToSkype());
    }
    function O(e) {
      var t = /^[\+]{1}[\d]+$/gm;
      return t.test(B(e));
    }
    function M() {
      var e = d.conversation.participants().map(function (e) {
          return e.person.phoneNumbers();
        }), t = [];
      return e.forEach(function (e) {
        if (!Array.isArray(e))
          return;
        e.forEach(function (e) {
          t.push({
            phone: e.telUri(),
            persistent: e.fromProfile()
          });
        });
      }), t;
    }
    function _() {
      d.destinations(M());
    }
    function D(e) {
      if (!e) {
        j();
        return;
      }
      var t = e.value, n = d.skypeOutInput().trim(), r = B(d.newDestination());
      r.indexOf(n) === 0 ? r = r.substring(n.length) : r.indexOf(t) === 0 && (r = r.substring(t.length));
      d.newDestination(P(t, r));
      d.newDestinationInputHasFocus(!0);
    }
    function P(e, t) {
      return m + " (" + H(e) + ") " + H(t);
    }
    function H(e) {
      return e.replace(/[\s|\+|\(|\)]+/gm, "");
    }
    function B(e) {
      var t = H(e);
      return t.substring(0, 1) !== m && (t = m + t), t;
    }
    function j() {
      d.newDestination(m);
      d.skypeOutInput("");
    }
    function F(e, t) {
      l.error("[messageDestinationPicker] action = " + e);
      l.error(t);
    }
    var d = this, v = c.resolve(n.serviceLocator.PUBSUB), m = "+", g, y = "newDestinationContainer", b = "destinationSelectorContainer", w = "buySkypeCreditContainer", E, S = !1;
    d.conversation = e.conversation;
    d.destination = e && e.destination ? e.destination : t.observable(n.messageDestination.SKYPE_NETWORK);
    d.skypeEnabled = !0;
    d.destinations = t.observableArray();
    d.newDestination = t.observable(m);
    d.hideDestinationSelector = t.observable(!0);
    d.hideNewDestinationContainer = t.observable(!0);
    d.hideSkypeCreditContainer = t.observable(!0);
    d.selectedCountry = t.observable();
    d.skypeOutInput = t.observable("");
    d.newDestinationInputHasFocus = t.observable(!1);
    d.purchaseCreditUrl = o.commerce.purchaseCreditUrl;
    g = d.selectedCountry.subscribe(D);
    d.isPstnSmsOnly = e.isPstnSmsOnly || !1;
    d.hideSkypeNetworkSelector = t.pureComputed(function () {
      return d.destination() === n.messageDestination.SKYPE_NETWORK;
    });
    d.destinationDisplay = t.pureComputed(function () {
      var e = d.destination();
      return e !== n.messageDestination.SKYPE_NETWORK && C(), e === n.messageDestination.SKYPE_NETWORK ? r.fetch({ key: "sms_message_destination_skype" }) : r.fetch({
        key: "sms_message_destination_sms",
        params: { phone: e }
      });
    });
    d.isNewDestinationAvailable = t.pureComputed(function () {
      return O(d.newDestination());
    });
    d.init = function () {
      _();
      x(d.destination());
    };
    d.openDestinationsList = function () {
      d.hideDestinationSelector(!1);
      s.add(b, d.cancel);
    };
    d.openNewDestinationWindow = function () {
      T();
      d.hideNewDestinationContainer(!1);
      s.add(y, d.cancel);
      d.newDestinationInputHasFocus(!0);
    };
    d.openSkypeCreditContainerWindow = function () {
      d.hideSkypeCreditContainer(!1);
      s.add(w, d.cancel);
    };
    d.addCreditTelemetryFromSms = function () {
      return u.addingCredit(a.SMS_ADD_CREDIT), !0;
    };
    d.confirm = function () {
      function t() {
        d.destinations.push({
          phone: e,
          persistent: !1
        });
      }
      var e = B(d.newDestination());
      if (!O(e))
        return;
      d.destination(e);
      N();
      j();
      d.conversation.participants()[0].person.addPhoneNumber(e).then(t, F.bind(this, h));
    };
    d.cancel = function () {
      N();
      T();
      j();
      A();
    };
    d.setDestinationToSkype = function () {
      d.destination(n.messageDestination.SKYPE_NETWORK);
      T();
    };
    d.selectDestination = function (e) {
      d.destination(e.phone);
      T();
    };
    d.removeDestination = function (e) {
      function t() {
        d.destinations.remove(e);
        d.destinations().length === 0 && d.setDestinationToSkype();
      }
      d.conversation.participants()[0].person.removePhoneNumber(e.phone).then(t, F.bind(this, p));
    };
    d.dispose = function () {
      g.dispose();
      s.remove(b);
      s.remove(y);
      S && E._balance.changed.off(L);
    };
    d.onKeyUp = function (e, t) {
      switch (t.keyCode) {
      case i.ENTER:
        d.confirm();
      }
    };
    d.init();
  }
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-i18n").localization, i = e("swx-constants").KEYS, s = e("utils/common/outsideClickHandler"), o = e("experience/settings"), u = e("telemetry/calling/pstn/pstn"), a = e("swx-constants").COMMON.telemetry.chat, f = e("swx-cafe-application-instance"), l = e("swx-log-tracer").getLogger(), c = e("swx-service-locator-instance").default, h = "adding_number", p = "removing_number";
  return d;
});
