define("ui/viewModels/calling/callScreenViewModel/renderer", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "jcafe-property-model",
  "ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper",
  "ui/viewModels/calling/callScreenViewModel/participantLayoutItem"
], function (e) {
  function o() {
    var e = this;
    e.getGrid = function (e) {
      return i.getGridConfiguration(e);
    };
    e.update = function (e) {
      if (!t.isEqual(e.participantsInStage(), e.grid.itemsForStage) || !t.isEqual(e.participantsInRoster(), e.grid.itemsForRoster)) {
        e.participantsInStage.removeAll();
        e.participantsInRoster.removeAll();
        var n = e.grid.itemsForStage.length + e.grid.itemsForRoster.length > 1;
        e.grid.itemsForRoster.forEach(function (t) {
          t.isInRoster(!0);
          t.videoIsAllowed(t.isScreenSharing || t.participant === e.screenSharingParticipant);
          t.isPinable(n);
          t.isZoomedIn(!1);
          t.positionInGrid("");
          t.isParticipantAtTheBottom(!1);
        });
        e.grid.itemsForStage.forEach(function (e) {
          e.isInRoster(!1);
          e.videoIsAllowed(!0);
          e.isPinable(n);
        });
        a(e.participantsInStage, e.grid.itemsForStage);
        a(e.participantsInRoster, e.grid.itemsForRoster);
      }
    };
    e.setUpdateLayoutCallback = t.noop;
  }
  function u(e, o) {
    function p(e) {
      return e.participant === h.participant() ? (e.removeParticipantComponent(), !1) : !0;
    }
    function d() {
      return s.build({
        conversation: e,
        participant: v(),
        isSelfParticipant: !1,
        isScreenSharing: !1,
        isGroupConversation: e.isGroupConversation,
        isVisible: n.observable(!0),
        importance: 0,
        contextElement: o
      });
    }
    function v() {
      return {
        audio: {
          isSpeaking: r.property(),
          isMuted: r.property(),
          state: r.property()
        },
        video: { channels: r.collection() },
        person: {
          type: r.property({ value: "proxy" }),
          phoneNumbers: r.collection(),
          avatarUrl: r.property(),
          displayName: r.property({ value: "Participant Proxy" }),
          id: r.property({ value: "personProxy" })
        }
      };
    }
    function m(e) {
      var t;
      g();
      if (!e)
        return;
      c.participant.person.displayName(e.person.displayName());
      c.participant.person.id(e.person.id());
      t = y(Object.getPrototypeOf(e.person))[0];
      t && (c.participant.person[t] = e.person[t]);
      f.push(e.audio.isSpeaking.changed(c.participant.audio.isSpeaking));
      f.push(e.audio.isMuted.changed(c.participant.audio.isMuted));
      f.push(e.audio.state.changed(c.participant.audio.state));
      l();
    }
    function g() {
      f.forEach(function (e) {
        if (!e.dispose)
          return;
        e.dispose();
      });
      f = [];
    }
    function y(e) {
      function n(e) {
        return e.match("href_");
      }
      var t = [];
      for (; e != null; e = Object.getPrototypeOf(e))
        Array.prototype.push.apply(t, Object.getOwnPropertyNames(e));
      return t.filter(n);
    }
    var u = this, f = [], l = t.noop, c = d(), h = e.videoService.activeSpeaker;
    c.participant.video.channels.add(h.channel);
    h.participant.changed(m);
    u.getGrid = function (t) {
      var n;
      return t.pinnedItem = null, h.participant() && h.participant() !== e.selfParticipant && (t.pinnedItem = c), n = i.getGridConfiguration(t), n.itemsForRoster = n.itemsForRoster.filter(p), n;
    };
    u.update = function (e) {
      t.isEqual(e.participantsInStage(), e.grid.itemsForStage) || (e.participantsInStage.removeAll(), e.grid.itemsForStage.forEach(function (e) {
        e.isInRoster(!1);
        e.videoIsAllowed(!0);
        e.isPinable(!1);
      }), a(e.participantsInStage, e.grid.itemsForStage));
      t.isEqual(e.participantsInRoster(), e.grid.itemsForRoster) || (e.participantsInRoster.removeAll(), e.grid.itemsForRoster.forEach(function (e) {
        e.isInRoster(!0);
        e.videoIsAllowed(!1);
        e.isPinable(!1);
        e.isZoomedIn(!1);
        e.positionInGrid("");
        e.isParticipantAtTheBottom(!1);
      }), a(e.participantsInRoster, e.grid.itemsForRoster));
    };
    u.setUpdateLayoutCallback = function (e) {
      l = e;
    };
  }
  function a(e, t) {
    var n = e();
    e.valueWillMutate();
    n.push.apply(n, t);
    e.valueHasMutated();
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("jcafe-property-model"), i = e("ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper"), s = e("ui/viewModels/calling/callScreenViewModel/participantLayoutItem");
  return {
    getRenderer: function (e, t) {
      return i.isInActiveSpeakerMode(e) ? new u(e, t) : new o();
    }
  };
});
