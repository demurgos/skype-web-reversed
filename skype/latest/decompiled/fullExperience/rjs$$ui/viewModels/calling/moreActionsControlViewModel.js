define("ui/viewModels/calling/moreActionsControlViewModel", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout",
  "ui/viewModels/calling/baseCallControlViewModel",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator",
  "ui/contextMenu/items/all",
  "ui/contextMenu/contextMenu",
  "ui/telemetry/actions/actionSources",
  "utils/common/cafeObservable",
  "swx-enums",
  "swx-i18n"
], function (e) {
  function d(e) {
    function N() {
      t.dispatchEvent(o.events.callScreen.ADD_PARTICIPANT, null, t.DIRECTION.PARENT);
      k(s.audioVideo.addParticipants);
    }
    function C() {
      var t = e.screenSharingService;
      m() ? (t.start(), k(s.audioVideo.shareScreen)) : g() && (t.stop(), k(s.audioVideo.stopSharingScreen));
    }
    function k(e) {
      var t = u.resolve(o.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(e);
    }
    function L() {
      f.hide();
    }
    var t = this, n = r.observable(!0), d = c.newObservableProperty(e.selfParticipant.audio.state), v = c.newObservableProperty(e.participants.add.enabled), m = c.newObservableProperty(e.screenSharingService.start.enabled), g = c.newObservableProperty(e.screenSharingService.stop.enabled), y, b, w, E = r.observable(!1), S = p.fetch({ key: "callscreen_text_shareScreen" }), x = p.fetch({ key: "callscreen_text_stopSharingScreen" });
    i.call(t, e, n);
    t.addParticipantText = p.fetch({ key: "callscreen_text_addParticipants" });
    t.moreActionsText = p.fetch({ key: "callscreen_text_plusButton" });
    t.screenShareText = r.pureComputed(function () {
      return m() || !g() ? S : x;
    });
    t.isAddingParticipantsAllowed = r.pureComputed(function () {
      return !E() && v() && d() === h.callConnectionState.Connected;
    });
    t.isScreenSharingAllowed = r.pureComputed(function () {
      return m() || g();
    });
    t.hasAllowedActions = r.pureComputed(function () {
      return t.isAddingParticipantsAllowed() || t.isScreenSharingAllowed();
    });
    t.showMoreActionsMenu = function (t, n) {
      var r = [
          a.AddParticipantsMenuItem.build(function () {
            return !v();
          }, N),
          a.ShareScreen.build(function () {
            return !m() && !g();
          }, m(), C)
        ], i = {
          source: l.recentItem,
          isGroupConversation: e.isGroupConversation()
        };
      f.show(r, n, i);
      k(s.audioVideo.moreActions);
    };
    t.registerEvent(o.events.callScreen.ADD_PARTICIPANT_VISIBLE, E);
    t.registerEvent(o.events.callScreen.CALL_ESCALATED_TO_GROUP, n.bind(null, !1));
    t.addParticipant = N;
    t.shareScreen = C;
    y = v.subscribe(L);
    b = m.subscribe(L);
    w = g.subscribe(L);
    var T = t.dispose;
    t.dispose = function () {
      y && y.dispose();
      b && b.dispose();
      w && w.dispose();
      d.dispose();
      v.dispose();
      m.dispose();
      g.dispose();
      T.call(t);
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("vendor/knockout"), i = e("ui/viewModels/calling/baseCallControlViewModel"), s = e("ui/telemetry/actions/actionNames"), o = e("constants/common"), u = e("services/serviceLocator"), a = e("ui/contextMenu/items/all"), f = e("ui/contextMenu/contextMenu"), l = e("ui/telemetry/actions/actionSources"), c = e("utils/common/cafeObservable"), h = e("swx-enums"), p = e("swx-i18n").localization;
  return d.prototype = Object.create(i.prototype), d.prototype.constructor = d, t.assign(d.prototype, n), {
    build: function (e) {
      return new d(e);
    }
  };
});
