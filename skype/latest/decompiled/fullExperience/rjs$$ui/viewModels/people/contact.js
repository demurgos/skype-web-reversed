define("ui/viewModels/people/contact", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-enums",
  "constants/cssClasses",
  "utils/common/statusMapper",
  "ui/modelHelpers/activityMapper",
  "utils/common/cafeObservable",
  "utils/people/lastSeenConverter",
  "ui/viewModels/people/properties/locationText",
  "ui/viewModels/people/properties/displayNameText",
  "ui/viewModels/people/properties/agentDetails",
  "ui/viewModels/people/properties/pstnDetails",
  "swx-utils-chat"
], function (e) {
  function y(e, y) {
    function O() {
      return w.isBlocked() ? a.presence.BLOCKED : f.getStatusIconClass(w.status(), w.endpointType(), k);
    }
    function M() {
      var e, n, r;
      if (L() === undefined)
        return;
      return e = t.isString(L()) ? new Date(L()).getTime() : L().getTime(), n = Math.floor((Date.now() - e) / 1000), r = Math.round(n / 60), A.reset(w.id(), r), h.getMessage(r);
    }
    function D() {
      return w.displayName() + ", " + w.id() + ", " + f.getAvailabilityText(w.status());
    }
    function P() {
      L.notifySubscribers();
    }
    function H() {
      return w.endpointType() === u.endpointType.Mobile && k;
    }
    function B() {
      var e;
      if (w.isBlocked())
        return r.fetch({ key: "message_text_contactBlocked" });
      if (w.isAgent() && w.agentDetails()) {
        var t = w.agentDetails().description();
        if (t)
          return t;
      }
      if (w.isPstn()) {
        var n = w.phoneNumbers();
        if (n.length === 1)
          return n[0].displayString() === w.displayName() ? "" : o.forceLTREmbedding(n[0].displayString());
      }
      return y.moodMessageFirst ? e = j() || F() : e = F() || j(), e || w.locationText() || f.getAvailabilityText(w.status(), w.endpointType(), k);
    }
    function j() {
      return l.map(w.activity());
    }
    function F() {
      var e = w.status() === u.onlineStatus.Online;
      return e ? f.getAvailabilityText(w.status()) : w.lastSeen();
    }
    var b, w = this, E = d.build(e), S = p.build(e), x = v.build(e), T = m.build(e), N = s.resolve(i.serviceLocator.FEATURE_FLAGS), C = N.isFeatureOn(i.featureFlags.LAST_SEEN), k = N.isFeatureOn(i.featureFlags.MOBILE_INDICATOR), L = c.newObservableProperty(e.lastSeenAt, { keepAlive: y.keepLastSeenAtSubscription }), A = s.resolve(i.serviceLocator.PROGRESSIVE_TIMEOUT);
    w.id = n.observable(e.id());
    w.avatar = c.newObservableProperty(e.avatarUrl, { keepAlive: !0 });
    w.status = c.newObservableProperty(e.status, { keepAlive: y.keepPresenceSubscription });
    w.activity = c.newObservableProperty(e.activity, { keepAlive: y.keepActivitySubscription });
    w.endpointType = c.newObservableProperty(e.endpointType, { keepAlive: y.keepEndpointTypeSubscription });
    w.isAgent = x.isAgent;
    w.agentDetails = n.computed(x.compute);
    w.isBlocked = c.newObservableProperty(e.isBlocked);
    w.isActive = n.observable(!1);
    w.location = S.location;
    w.locationText = n.computed(S.compute);
    w.isPstn = T.isPstn;
    w.phoneNumbers = T.phoneNumbers;
    w.isMobile = n.computed(H);
    w.displayName = n.computed(E.compute);
    w.displayNameUnescaped = n.computed(function () {
      return t.unescape(w.displayName());
    });
    w.lastSeen = C ? n.computed(M) : n.observable(null);
    w.statusClassName = n.computed(O);
    w.textDetails = n.computed(D);
    w.displayMessage = n.computed(B);
    w.ariaLabel = n.computed(function () {
      var e = f.getAvailabilityText(w.status()), t = g.stripHTML(w.displayMessage());
      return e === t ? w.displayName() + " " + e : w.displayName() + " " + e + " " + t;
    });
    w.getPerson = function () {
      return e;
    };
    w.dispose = function () {
      A.stop(w.id(), b);
      w.avatar.dispose();
      w.status.dispose();
      w.activity.dispose();
      w.endpointType.dispose();
      w.isBlocked.dispose();
      w.locationText.dispose();
      w.displayName.dispose();
      w.displayNameUnescaped.dispose();
      w.agentDetails.dispose();
      L.dispose();
      E.dispose();
      S.dispose();
      x.dispose();
      T.dispose();
      C && w.lastSeen.dispose();
      w.statusClassName.dispose();
      w.displayMessage.dispose();
      w.textDetails.dispose();
      w.isMobile.dispose();
    };
    b = A.start(w.id(), P);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = e("swx-utils-common").stringUtils, u = e("swx-enums"), a = e("constants/cssClasses"), f = e("utils/common/statusMapper"), l = e("ui/modelHelpers/activityMapper"), c = e("utils/common/cafeObservable"), h = e("utils/people/lastSeenConverter"), p = e("ui/viewModels/people/properties/locationText"), d = e("ui/viewModels/people/properties/displayNameText"), v = e("ui/viewModels/people/properties/agentDetails"), m = e("ui/viewModels/people/properties/pstnDetails"), g = e("swx-utils-chat").messageSanitizer;
  return y.build = function (e, t) {
    return new y(e, t);
  }, y;
});
