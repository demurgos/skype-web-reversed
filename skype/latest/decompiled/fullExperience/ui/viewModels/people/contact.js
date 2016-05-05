define("ui/viewModels/people/contact", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "services/serviceLocator",
  "swx-utils-common",
  "swx-enums",
  "constants/cssClasses",
  "utils/common/statusMapper",
  "ui/modelHelpers/activityMapper",
  "utils/common/cafeObservable",
  "utils/people/lastSeenConverter",
  "utils/people/progressiveTimeout",
  "ui/viewModels/people/properties/locationText",
  "ui/viewModels/people/properties/displayNameText",
  "ui/viewModels/people/properties/agentDetails",
  "ui/modelHelpers/personHelper",
  "utils/chat/messageSanitizer"
], function (e) {
  function b(e, b) {
    function O() {
      E.phoneNumbers(e.phoneNumbers());
    }
    function M() {
      return E.isBlocked() ? a.presence.BLOCKED : f.getStatusIconClass(E.status(), E.endpointType(), k);
    }
    function D() {
      var e, n, r;
      if (A() === undefined)
        return;
      return e = t.isString(A()) ? new Date(A()).getTime() : A().getTime(), n = Math.floor((Date.now() - e) / 1000), r = Math.round(n / 60), p.get().reset(E.id(), r), h.getMessage(r);
    }
    function P() {
      return E.displayName() + ", " + E.id() + ", " + f.getAvailabilityText(E.status());
    }
    function H() {
      A.notifySubscribers();
    }
    function B() {
      return E.endpointType() === u.endpointType.Mobile && L;
    }
    function j() {
      var e, t = E.phoneNumbers();
      if (E.isBlocked())
        return r.fetch({ key: "message_text_contactBlocked" });
      if (E.isAgent() && E.agentDetails()) {
        var n = E.agentDetails().description();
        if (n)
          return n;
      }
      return E.isPstn() && t.length === 1 ? t[0].displayString() === E.displayName() ? "" : o.forceLTREmbedding(t[0].displayString()) : (b.moodMessageFirst ? e = F() || I() : e = I() || F(), e || E.locationText() || f.getAvailabilityText(E.status()));
    }
    function F() {
      return l.map(E.activity());
    }
    function I() {
      var e, t = E.status() === u.onlineStatus.Online;
      return t ? (e = E.isMobile() ? "message_text_presenceActiveMobile" : "message_text_presenceAvailable", r.fetch({ key: e })) : E.lastSeen();
    }
    var w, E = this, S = v.build(e), x = d.build(e), T = m.build(e), N = s.resolve(i.serviceLocator.FEATURE_FLAGS), C = N.isFeatureOn(i.featureFlags.LAST_SEEN), k = N.isFeatureOn(i.featureFlags.MOBILE_INDICATOR), L = N.isFeatureOn(i.featureFlags.MOBILE_ACTIVE), A = c.newObservableProperty(e.lastSeenAt, { keepAlive: b.keepLastSeenAtSubscription });
    E.id = c.newObservableProperty(e.id), E.avatar = c.newObservableProperty(e.avatarUrl, { keepAlive: !0 }), E.status = c.newObservableProperty(e.status, { keepAlive: b.keepPresenceSubscription }), E.activity = c.newObservableProperty(e.activity, { keepAlive: b.keepActivitySubscription }), E.endpointType = c.newObservableProperty(e.endpointType, { keepAlive: b.keepEndpointTypeSubscription }), E.isAgent = T.isAgent, E.agentDetails = n.computed(T.compute), E.isEcho = n.observable(g.isEchoContact(e)), E.isBlocked = c.newObservableProperty(e.isBlocked), E.isActive = n.observable(!1), E.location = x.location, E.locationText = n.computed(x.compute), E.isPstn = n.observable(g.isPstn(e)), E.phoneNumbers = n.observable([]), E.isMobile = n.computed(B), E.displayName = n.computed(S.compute), E.lastSeen = C ? n.computed(D) : n.observable(null), E.statusClassName = n.computed(M), E.textDetails = n.computed(P), e.phoneNumbers.changed(O), E.displayMessage = n.computed(j), E.ariaLabel = n.computed(function () {
      var e = f.getAvailabilityText(E.status()), t = y.stripHTML(E.displayMessage());
      return e === t ? E.displayName() + " " + e : E.displayName() + " " + e + " " + t;
    }), E.getPerson = function () {
      return e;
    }, E.dispose = function () {
      p.get().stop(E.id(), w), E.id.dispose(), E.avatar.dispose(), E.status.dispose(), E.activity.dispose(), E.endpointType.dispose(), E.isBlocked.dispose(), E.locationText.dispose(), E.displayName.dispose(), E.agentDetails.dispose(), A.dispose(), S.dispose(), x.dispose(), T.dispose(), C && E.lastSeen.dispose(), E.statusClassName.dispose(), E.displayMessage.dispose(), E.textDetails.dispose(), E.isMobile.dispose(), e.phoneNumbers.changed.off(O);
    }, w = p.get().start(E.id(), H);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/common"), s = e("services/serviceLocator"), o = e("swx-utils-common").stringUtils, u = e("swx-enums"), a = e("constants/cssClasses"), f = e("utils/common/statusMapper"), l = e("ui/modelHelpers/activityMapper"), c = e("utils/common/cafeObservable"), h = e("utils/people/lastSeenConverter"), p = e("utils/people/progressiveTimeout"), d = e("ui/viewModels/people/properties/locationText"), v = e("ui/viewModels/people/properties/displayNameText"), m = e("ui/viewModels/people/properties/agentDetails"), g = e("ui/modelHelpers/personHelper"), y = e("utils/chat/messageSanitizer");
  return b.build = function (e, t) {
    return new b(e, t);
  }, b;
})
