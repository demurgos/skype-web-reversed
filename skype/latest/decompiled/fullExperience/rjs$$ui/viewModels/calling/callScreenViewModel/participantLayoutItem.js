define("ui/viewModels/calling/callScreenViewModel/participantLayoutItem", [
  "require",
  "vendor/knockout",
  "ui/viewModels/calling/callScreenViewModel/participantViewModel",
  "text!views/calling/participant.html"
], function (e) {
  function s(e) {
    function p() {
      if (!s.participantComponent)
        return;
      s.participantComponent.element.parentNode && s.participantComponent.element.parentNode.removeChild(s.participantComponent.element);
      s.participantComponent.viewModel.dispose();
      t.cleanNode(s.participantComponent.element);
      s.participantComponent = null;
    }
    function d() {
      var e = f(), t = l();
      if (!e && !o) {
        o = f.subscribe(d);
        return;
      }
      if (!t && !u) {
        u = l.subscribe(d);
        return;
      }
      v();
      a = window.setTimeout(function () {
        a = null;
        var n = c._callHandler && c._callHandler.isPluginless(), r = !s.participantComponent || s.participantComponent.element.parentNode !== t;
        !n && r && p();
        s.participantComponent || g(e);
        r && t.appendChild(s.participantComponent.element);
      }, 0);
    }
    function v() {
      o && (o.dispose(), o = null);
      u && (u.dispose(), u = null);
    }
    function m() {
      a && (clearTimeout(a), a = null);
    }
    function g(e) {
      if (s.participantComponent)
        return;
      var i = document.createElement("div"), o = n.build({ layoutItemModel: s }), u = t.contextFor(e).$component;
      o.setContext(u);
      o.init();
      s.isSelfParticipant && (i.className = "localPip");
      i.innerHTML = r;
      t.applyBindings(o, i);
      s.participantComponent = {
        element: i,
        viewModel: o
      };
    }
    var s = this, o, u, a, f, l, c = e.conversation, h;
    s.participant = e.participant;
    s.isSelfParticipant = e.isSelfParticipant;
    s.isScreenSharing = e.isScreenSharing;
    s.isGroupConversation = e.isGroupConversation;
    s.isVisible = e.isVisible;
    s.isInRoster = t.observable();
    s.videoIsAllowed = t.observable(e.isSelfParticipant);
    s.isVideoActive = t.observable(!1);
    s.aspectRatioClasses = t.observable();
    s.isPinable = t.observable(!1);
    s.isZoomable = t.computed(function () {
      return s.isVideoActive() && !s.isInRoster() && !s.isScreenSharing;
    });
    s.isChatable = t.computed(function () {
      return e.isGroupConversation() && !s.isSelfParticipant;
    });
    s.isPinned = t.observable(!1);
    s.isZoomedIn = t.observable(!1);
    s.isParticipantPillVisible = t.computed(function () {
      return s.isPinable() || s.isChatable();
    });
    s.isParticipantAtTheBottom = t.observable(!1);
    s.positionInGrid = t.observable("");
    s.importance = e.importance;
    s.order = ++i;
    s.appendParticipantComponentToNewContainer = function (t) {
      if (h)
        return;
      m();
      v();
      f = e.contextElement;
      l = t;
      d();
    };
    s.removeParticipantComponent = function () {
      m();
      v();
      p();
    };
    s.dispose = function () {
      h = !0;
      s.removeParticipantComponent();
    };
  }
  var t = e("vendor/knockout"), n = e("ui/viewModels/calling/callScreenViewModel/participantViewModel"), r = e("text!views/calling/participant.html"), i = 0;
  return {
    build: function (e) {
      return new s(e);
    }
  };
});
