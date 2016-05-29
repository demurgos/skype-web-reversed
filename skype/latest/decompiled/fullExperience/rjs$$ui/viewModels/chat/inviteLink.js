define("ui/viewModels/chat/inviteLink", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "browser/dom",
  "browser/window",
  "utils/chat/spaceMail",
  "constants/common",
  "utils/common/eventMixin",
  "utils/common/cafeObservable",
  "utils/common/location",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "services/serviceLocator",
  "swx-i18n"
], function (e, t) {
  function g(e, t) {
    function E() {
      return n._parentContext.constructor.name;
    }
    function S(t) {
      var n = e.telemetryContext ? e.telemetryContext : { source: p.invitesShareButtons.groupInformationPanel };
      w.recordAction(t, n);
    }
    function x(e) {
      var t = document.createRange();
      t.selectNodeContents(e);
      var n = s.getSelection();
      n.removeAllRanges();
      n.addRange(t);
    }
    var n = this, a = e.topic, g = e.uri, y = i.getElement(".copyArea", t.element), b = i.getElement("p.link", t.element), w = d.resolve(c.serviceLocator.ACTION_TELEMETRY);
    n.init = function () {
      var t, i = function () {
          n.showCopiedIndicator(!1);
        };
      n.copyActive = r.observable(!1);
      n.topic = f.newObservableProperty(a);
      n.uri = f.newObservableProperty(g);
      n.showCopiedIndicator = r.observable(!1);
      n.copiedIndicatorText = "";
      n.tabIndex = e.isMessageContent ? -1 : 0;
      n.copy = function () {
        n.copyActive(!0);
        y.select();
        S(h.invites.copyButton);
        try {
          var e = document.execCommand("copy");
          n.copyActive(!1);
          n.copiedIndicatorText = e ? v.fetch({ key: "header_text_copied" }) : v.fetch({ key: "header_text_cant_copy" });
          n.showCopiedIndicator(!0);
          t && s.clearTimeout(t);
          t = s.setTimeout(i, m);
          e || x(b);
        } catch (r) {
        }
        n.dispatchEvent(u.conversation.COPY_LINK, { parent: E() }, n.DIRECTION.PARENT);
      };
      n.send = function () {
        n.dispatchEvent(u.conversation.EMAIL_LINK, { parent: E() }, n.DIRECTION.PARENT);
        S(h.invites.mailButton);
        l.setHref(n.mailtoLink());
      };
      n.cancel = function () {
        n.copyActive(!1);
      };
      n.mailtoLink = r.computed(function () {
        return o.createMailtoLink(n.topic(), n.uri());
      });
    };
    n.dispose = function () {
      n.mailtoLink.dispose();
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("browser/dom"), s = e("browser/window"), o = e("utils/chat/spaceMail"), u = e("constants/common").events, a = e("utils/common/eventMixin"), f = e("utils/common/cafeObservable"), l = e("utils/common/location"), c = e("constants/common"), h = e("ui/telemetry/actions/actionNames"), p = e("ui/telemetry/actions/actionSources"), d = e("services/serviceLocator"), v = e("swx-i18n").localization, m = 3000;
  n.assign(g.prototype, a);
  t.classFunction = g;
  t.build = function (e, t) {
    return new g(e, t);
  };
});
