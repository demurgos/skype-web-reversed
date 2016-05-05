define("ui/viewModels/chat/chatInput", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "services/pubSub/pubSub",
  "utils/common/cafeObservable",
  "constants/common",
  "constants/calling",
  "utils/common/eventMixin",
  "constants/common",
  "services/serviceLocator",
  "telemetry/chat/pes",
  "ui/modelObservers/agentAuthorizationObserver"
], function (e) {
  function h() {
    function d() {
      return !!e.conversationModel;
    }
    function v(e) {
      var n = t.find(e.sourceTab.packs, function (t) {
          return t.items.some(function (t) {
            return t === e.item;
          });
        }), r = {
          type: e.sourceTab.id === "mru" ? a.telemetry.pes.source.RECENTS : a.telemetry.pes.source.ROSTER,
          tabIndex: e.sourceTab._index || e.sourceTab.index,
          tabName: e.sourceTab.title,
          section: n && n.isFeatured ? a.telemetry.pes.section.FEATURED : a.telemetry.pes.section.REGULAR
        };
      l.mojiSent(e.item, r);
    }
    function m(e) {
      var n = t.find(e.sourceTab.packs, function (t) {
          return t.items.some(function (t) {
            return t.id === e.item.id;
          });
        }), r = t.findIndex(n.items, { id: e.item.id }), i = {
          type: a.telemetry.pes.source.ROSTER,
          section: n && n.id,
          query: e.sourceTab._currentQuery,
          tabName: e.sourceTab.id,
          tabIndex: e.sourceTab._index
        };
      l.mojiSent({
        id: e.item.id,
        type: e.item.type
      }, i), l.imageSent({
        id: e.item.id,
        pickerIndex: r
      }, i);
    }
    function g(t) {
      u.isFeatureOn(a.featureFlags.GIPHY) && (/^\/giphy\b/.test(t) ? x("giphy") : x(null)), e.isSendDisabled(!t || t.length === 0);
    }
    function y(t) {
      if (!d() || t.conversation !== e.conversationModel)
        return;
      switch (t.item.type) {
      case "flik":
        e.conversationModel.chatService.sendMessage("/moji " + t.item.id), v(t);
        var n = f.resolve(a.serviceLocator.PES_MRU_SERVICE);
        n.addItemsToMru(t.item);
        break;
      case "image":
        e.conversationModel.chatService.sendMessage(t.item.url), m(t);
      }
    }
    function b() {
      if (u.isFeatureOn(a.featureFlags.SKIP_CHAT_CAPABILITY_CHECK)) {
        e.hasChatCapability(!0);
        return;
      }
      var t = !1, n, r = e.conversationModel.participants().length;
      for (var i = 0; i < r && !t; i++)
        t = e.conversationModel.participants()[i].person.capabilities.chat();
      n = r === 0 || t, e.hasChatCapability(n);
    }
    function w() {
      h && (E(), b()), h = [], e.conversationModel.participants().forEach(function (e) {
        var t = e.person, n = t.capabilities.chat.subscribe(), r = {
            person: t,
            subscription: n
          };
        t.capabilities.chat.get(), t.capabilities.chat.changed(b), h.push(r);
      });
    }
    function E() {
      h && (h.forEach(function (e) {
        e.person.capabilities.chat.changed.off(b), e.subscription.dispose();
      }), h = undefined);
    }
    function S() {
      return e.isServiceEnabled() && e.hasChatCapability() && !p.isConversationWithUnauthorizedAgent();
    }
    function x(t) {
      e.attribution(t);
    }
    var e = this, u = f.resolve(a.serviceLocator.FEATURE_FLAGS), h, p;
    this.init = function (t, u) {
      this.sendMessage = t.sendMessage, this.chatInputEl = u, this.attribution = n.observable(null), this.conversationModel = t.conversationModel, this.alwaysHideExpressionPicker = !!t.alwaysHideExpressionPicker, this.isServiceEnabled = d() ? i.newObservableProperty(this.conversationModel.chatService.sendMessage.enabled) : n.observable(!0), this.hasChatCapability = n.observable(!0), d() && this.conversationModel.participants.changed(w), p = c.build(t.conversationModel), this.isEnabled = n.computed(S), this.isSendDisabled = n.observable(!0), this.forwardEvent(s.message.QUOTE, this.DIRECTION.CHILD), this.forwardEvent(s.message.EDIT, this.DIRECTION.CHILD), this.forwardEvent(o.EVENTS.CALL_SCREEN_CLOSE, this.DIRECTION.CHILD), this.forwardEvent(s.navigation.FRAGMENT_SHOW, this.DIRECTION.CHILD), this.forwardEvent(s.emoticonPicker.EMOTICON_SELECTED, this.DIRECTION.CHILD), this.forwardEvent(s.emoticonPicker.CLOSE, this.DIRECTION.CHILD), this.registerEvent(s.textarea.CHANGED, g), this.registerEvent(s.textarea.SET_ATTRIBUTION, x), r.subscribe(s.expressionPicker.ITEM_SEND_REQUEST, y), this._parentContext && (this.forwardEvent(s.textarea.INITIALIZATION_COMPLETE, this.DIRECTION.PARENT), this.dispatchEvent(s.chatInput.INITIALIZATION_COMPLETE, e, e.DIRECTION.PARENT));
    }, this.sendButtonClicked = function () {
      e.dispatchEvent(s.textarea.SUBMIT_AND_FOCUS, null, e.DIRECTION.CHILD);
    }, this.dispose = function () {
      d() && (e.isEnabled.dispose(), e.isServiceEnabled.dispose(), E(), e.conversationModel.participants.changed.off(w)), p.dispose(), r.unsubscribe(s.expressionPicker.ITEM_SEND_REQUEST, y);
    }, this.isExpressionPickerButtonVisible = function () {
      return !e.alwaysHideExpressionPicker && !u.isFeatureOn(a.featureFlags.HIDE_EMOTICON_PICKER_BUTTON);
    }, this.isPESEnabled = function () {
      return d();
    }, this.isMediaBarEnabled = function () {
      return u.isFeatureOn(a.featureFlags.MEDIA_BAR_ENABLED);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("services/pubSub/pubSub"), i = e("utils/common/cafeObservable"), s = e("constants/common").events, o = e("constants/calling"), u = e("utils/common/eventMixin"), a = e("constants/common"), f = e("services/serviceLocator"), l = e("telemetry/chat/pes"), c = e("ui/modelObservers/agentAuthorizationObserver");
  return t.assign(h.prototype, u), h;
})
