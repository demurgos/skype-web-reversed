define("ui/viewModels/chat/smsPrice", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-i18n",
  "lodash-compat",
  "experience/settings",
  "swx-jskype-main/lib/services/smsPrice/instance",
  "utils/common/eventMixin",
  "swx-jskype-main/lib/utils/chat/smsMessageBuilder"
], function (e) {
  function f(e) {
    function h(e, t) {
      var n = new Promise(function (n) {
        var r = t.replace("+", "");
        o.get().getSmsPrice(e, r).then(function (t) {
          p(t, r);
          n();
        }, function (t) {
          var r = c.FAILURE_REQUEST;
          t && t.status === 400 && (r = c.BAD_NUMBER);
          v(r);
          n();
        });
      });
      return n;
    }
    function p(e, t) {
      if (!e || !e.response) {
        v(c.BAD_RESPONSE);
        return;
      }
      var n = e.response, r = n.code, i = r !== 200 || !n.prices || n.prices.length <= 0 || !n.currency;
      if (i) {
        v(c.BAD_RESPONSE);
        return;
      }
      l.fetchedCurrency = n.currency;
      var s = !1;
      n.prices.forEach(function (e) {
        if (e.number === t) {
          s = !0;
          if (isNaN(e.price)) {
            v(c.ACCOUNT_PROBLEM);
            return;
          }
          l.fetchedPrice = e.price;
          l.formattedFetchedPrice(d(l.fetchedPrice, l.fetchedCurrency));
        }
      }, this);
      !s && l.formattedFetchedPrice().length === 0 && v(c.BAD_RESPONSE);
    }
    function d(e, t) {
      return !e && !t ? "" : new Number(e).toLocaleString(s.locale.i18n, {
        style: "currency",
        currency: t
      });
    }
    function v(e) {
      var t;
      switch (e) {
      case c.BAD_RESPONSE:
      case c.FAILURE_REQUEST:
        t = r.fetch({ key: "sms_price_info_failed" });
        break;
      case c.ACCOUNT_PROBLEM:
        t = r.fetch({ key: "sms_price_info_bad_number_account" });
        break;
      case c.BAD_NUMBER:
        t = r.fetch({ key: "sms_price_info_bad_number" });
      }
      l.formattedFetchedPrice("");
      l.errorMessage(t);
    }
    var l = this, c = {
        FAILURE_REQUEST: 0,
        BAD_RESPONSE: 1,
        ACCOUNT_PROBLEM: 2,
        BAD_NUMBER: 3
      };
    l.fetchedPrice = "";
    l.fetchedCurrency = "";
    l.user = e.conversation.mePerson.id();
    l.formattedFetchedPrice = t.observable("");
    l.numberOfMessages = t.observable("");
    l.errorMessage = t.observable("");
    l.destination = e.destination && e.destination();
    l.init = function () {
      l.destination && l.updateSmsPrice({
        destination: l.destination,
        inputText: ""
      });
      l.registerEvent(n.events.textarea.UPDATE_SMS_DESTINATION, l.updateSmsPrice);
      l.registerEvent(n.events.textarea.UPDATE_SMS_FRAGMENTS, l.updateSmsFragments);
    };
    l.updateSmsPrice = function (e) {
      var t = e.destination, r = e.inputText;
      l.fetchedPrice = undefined;
      l.numberOfMessages("");
      l.formattedFetchedPrice("");
      l.errorMessage("");
      if (t === n.messageDestination.SKYPE_NETWORK)
        return;
      var i = h(l.user, t);
      i.then(function () {
        l.updateSmsFragments(r);
      });
    };
    l.updateSmsFragments = function (e) {
      var t;
      e === "" ? t = 0 : t = a.calculateSmsFragments(e);
      if (t === -1)
        return;
      l.numberOfMessages(t);
      if (!isNaN(l.fetchedPrice) && l.fetchedCurrency) {
        var n = t === 0 ? l.fetchedPrice : t * l.fetchedPrice;
        l.formattedFetchedPrice(d(n, l.fetchedCurrency));
      }
    };
    i.assign(f.prototype, u);
  }
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-i18n").localization, i = e("lodash-compat"), s = e("experience/settings"), o = e("swx-jskype-main/lib/services/smsPrice/instance"), u = e("utils/common/eventMixin"), a = e("swx-jskype-main/lib/utils/chat/smsMessageBuilder");
  return f;
});
