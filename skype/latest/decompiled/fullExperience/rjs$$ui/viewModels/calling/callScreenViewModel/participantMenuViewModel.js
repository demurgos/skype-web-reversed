define("ui/viewModels/calling/callScreenViewModel/participantMenuViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "browser/dom",
  "swx-enums",
  "swx-constants",
  "swx-constants",
  "utils/common/eventMixin",
  "swx-service-locator-instance",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/properties/displayNameText"
], function (e) {
  function d(e, t) {
    function b(e) {
      e || u.isContextMenuVisible(e);
      u.dispatchEvent(s.events.callScreen.PARTICIPANT_MENU_VISIBILITY_CHANGED, {
        layoutItemModel: v,
        isVisible: e
      }, u.DIRECTION.PARENT);
    }
    function w(e, n) {
      var r = { source: h.callScreen.participantMenu }, s = [];
      v.isChatable() && s.push(new l.CallParticipantChatMenuItem(m.person));
      v.isPinable() && s.push(new l.CallParticipantPinMenuItem(m, v.isScreenSharing, v.isPinned()));
      v.isZoomable() && s.push(new l.CallParticipantZoomMenuItem(v.isZoomedIn, v.isZoomable));
      s.length && (n && (e.customClientOptions = {
        offsetElement: v.isInRoster() ? t : e.target,
        offset: v.isInRoster() ? d : E(),
        position: i.contextMenuPosition.Top
      }), f.show(s, e, r), S(), u.isContextMenuVisible(!0));
    }
    function E() {
      var e = r.getElement(o.PARTICIPANT_MENU.ANIMATION_ELEMENT_SELECTOR, t);
      if (e) {
        var n = window.getComputedStyle(e).getPropertyValue("animation-name");
        return n === o.PARTICIPANT_MENU.ANIMATION_NAME ? o.PARTICIPANT_MENU.DEFAULT_OFFSET + o.PARTICIPANT_MENU.ANIMATION_OFFSET : o.PARTICIPANT_MENU.DEFAULT_OFFSET;
      }
      return d;
    }
    function S() {
      var e = a.resolve(s.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(c.audioVideo.participantMenu.show);
    }
    function x() {
      u.isContextMenuVisible() && f.hide();
    }
    var u = this, d = 4, v = e.layoutItemModel, m = v.participant, g = p.build(m.person), y = [];
    u.displayName = n.computed(g.compute);
    u.isPillVisible = v.isParticipantPillVisible;
    u.isContextMenuVisible = n.observable(!1);
    u.init = function () {
      y.push(g);
      y.push(u.displayName);
      y.push(f.isVisible.subscribe(b));
      y.push(v.isInRoster.subscribe(x));
      u.registerEvent(s.events.callScreen.PARTICIPANT_ITEM_CONTEXT_MENU, function (e) {
        e && e.layoutItemModel === v && w(e.event, !1);
      });
    };
    u.dispose = function () {
      x();
      y.forEach(function (e) {
        e.dispose();
      });
      y = [];
    };
    u.onParticipantPillClick = function (e, t) {
      u.isContextMenuVisible() ? x() : w(t, !0);
    };
    u.onFocus = function () {
      u.dispatchEvent(s.events.callScreen.PARTICIPANT_MENU_FOCUSED, !0, u.DIRECTION.PARENT);
    };
    u.onBlur = function () {
      u.dispatchEvent(s.events.callScreen.PARTICIPANT_MENU_FOCUSED, !1, u.DIRECTION.PARENT);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("browser/dom"), i = e("swx-enums"), s = e("swx-constants").COMMON, o = e("swx-constants").CALLING, u = e("utils/common/eventMixin"), a = e("swx-service-locator-instance").default, f = e("ui/contextMenu/contextMenu"), l = e("ui/contextMenu/items/all"), c = e("ui/telemetry/actions/actionNames"), h = e("ui/telemetry/actions/actionSources"), p = e("ui/viewModels/people/properties/displayNameText");
  return t.assign(d.prototype, u), {
    build: function (e, t) {
      return new d(e, t);
    }
  };
});
