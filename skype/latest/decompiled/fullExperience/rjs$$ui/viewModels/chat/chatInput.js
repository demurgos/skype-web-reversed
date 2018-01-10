define("ui/viewModels/chat/chatInput", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-pubsub-instance",
  "utils/common/cafeObservable",
  "swx-constants",
  "swx-constants",
  "utils/common/eventMixin",
  "swx-constants",
  "swx-service-locator-instance",
  "telemetry/chat/pes",
  "ui/modelObservers/agentAuthorizationObserver",
  "utils/common/styleModeHelper",
  "ui/modelHelpers/conversationHelper",
  "ui/modelHelpers/personHelper"
], function (e) {
  function m() {
    function b() {
      return !!e.conversationModel;
    }
    function w(e) {
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
    function E(e) {
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
      }, i);
      l.imageSent({
        id: e.item.id,
        pickerIndex: r,
        querySource: e.item.querySource
      }, i);
    }
    function S(t) {
      u.isFeatureOn(a.featureFlags.GIPHY) && (/^\/giphy\b/.test(t) ? O("giphy") : O(null));
      e.isSendDisabled(!t || t.length === 0);
    }
    function x(t) {
      if (!b() || t.conversation !== e.conversationModel)
        return;
      switch (t.item.type) {
      case "flik":
        e.conversationModel.chatService.sendMessage("/moji " + t.item.mojiId), w(t);
        var n = f.resolve(a.serviceLocator.PES_MRU_SERVICE);
        n.addItemsToMru(t.item);
        break;
      case "image":
        t.query ? e.conversationModel.chatService.sendMessage(t.item.url, null, { activityData: JSON.stringify({ giphyExpression: t.query }) }) : e.conversationModel.chatService.sendMessage(t.item.url), E(t);
      }
    }
    function T() {
      if (u.isFeatureOn(a.featureFlags.SKIP_CHAT_CAPABILITY_CHECK)) {
        e.hasChatCapability(!0);
        return;
      }
      var t = !1, n, r = e.conversationModel.participants().length;
      for (var i = 0; i < r && !t; i++)
        t = e.conversationModel.participants()[i].person.capabilities.chat();
      n = r === 0 || t;
      e.hasChatCapability(n);
    }
    function N() {
      m && (C(), T());
      m = [];
      e.conversationModel.participants().forEach(function (e) {
        var t = e.person, n = t.capabilities.chat.subscribe(), r = {
            person: t,
            subscription: n
          };
        t.capabilities.chat.get();
        t.capabilities.chat.changed(T);
        m.push(r);
      });
    }
    function C() {
      m && (m.forEach(function (e) {
        e.person.capabilities.chat.changed.off(T);
        e.subscription.dispose();
      }), m = undefined);
    }
    function k() {
      return e.isServiceEnabled() && e.hasChatCapability() && !g.isConversationWithUnauthorizedAgent();
    }
    function L() {
      return e.isServiceEnabled() && !g.isConversationWithUnauthorizedAgent() && (e.hasChatCapability() || A());
    }
    function A() {
      if (e.conversationModel && !e.conversationModel.isGroupConversation() && e.conversationModel.participants(0))
        return d.isPstn(e.conversationModel.participants(0).person);
    }
    function O(t) {
      e.attribution(t);
      e.showTermsOfUse(!!t);
    }
    function M() {
      var t = [];
      return e.attribution() && t.push(e.attribution()), e.isMediaBarV2Enabled() && t.push("mediabarV2enabled"), e.shouldOptimizeAvailableSpace && t.push("ChatInput--optimizeSpace"), t.join(" ");
    }
    function D() {
      return L() && A() ? (e.isPstnSmsOnly = !0, a.messageDestination.SMS_NETWORK) : a.messageDestination.SKYPE_NETWORK;
    }
    function P() {
      return u.isFeatureOn(a.featureFlags.SMS_SUPPORT_ENABLED) && e.isServiceEnabled() && !e.conversationModel.isGroupConversation() && !p.isOneToOneConversationWithAgent(e.conversationModel) && L();
    }
    function H() {
      return u.isFeatureOn(a.featureFlags.OPTIMIZE_SPACE_FOR_CC);
    }
    var e = this, u = f.resolve(a.serviceLocator.FEATURE_FLAGS), m, g, y;
    this.init = function (t, u) {
      this.sendMessage = t.sendMessage;
      this.chatInputEl = u;
      this.attribution = n.observable(null);
      this.conversationModel = t.conversationModel;
      this.alwaysHideExpressionPicker = !!t.alwaysHideExpressionPicker;
      this.isServiceEnabled = b() ? i.newObservableProperty(this.conversationModel.chatService.sendMessage.enabled) : n.observable(!0);
      this.hasChatCapability = n.observable(!0);
      this.shouldOptimizeAvailableSpace = H();
      b() && this.conversationModel.participants.changed(N);
      g = c.build(t.conversationModel);
      this.isEnabled = n.computed(k);
      this.isChatAndSmsInputEnabled = n.computed(L);
      this.isPstnSmsOnly = !1;
      this.showTermsOfUse = n.observable(!1);
      this.isSendDisabled = n.observable(!0);
      this.isStyleModeWide = n.observable(h.get().currentMode() === v.WIDE);
      this.formHolderCssClasses = n.computed(M);
      this.forwardEvent(s.message.QUOTE, this.DIRECTION.CHILD);
      this.forwardEvent(s.message.EDIT, this.DIRECTION.CHILD);
      this.forwardEvent(s.message.COPY, this.DIRECTION.CHILD);
      this.forwardEvent(s.suggestionList.SHOWN, this.DIRECTION.CHILD);
      this.forwardEvent(s.suggestionList.HIDDEN, this.DIRECTION.CHILD);
      this.forwardEvent(s.suggestionList.ITEM_SELECTED, this.DIRECTION.CHILD);
      this.forwardEvent(o.EVENTS.CALL_SCREEN_CLOSE, this.DIRECTION.CHILD);
      this.forwardEvent(o.EVENTS.UNANSWERED_CALL_CLOSE, this.DIRECTION.CHILD);
      this.forwardEvent(s.navigation.FRAGMENT_SHOW, this.DIRECTION.CHILD);
      this.forwardEvent(s.emoticonPicker.EMOTICON_SELECTED, this.DIRECTION.CHILD);
      this.forwardEvent(s.emoticonPicker.CLOSE, this.DIRECTION.CHILD);
      this.registerEvent(s.textarea.CHANGED, S);
      this.registerEvent(s.textarea.SET_ATTRIBUTION, O);
      this.forwardEvent(s.textarea.MESSAGE_SENT, this.DIRECTION.PARENT);
      this.forwardEvent(s.textarea.UPDATE_SMS_FRAGMENTS, this.DIRECTION.CHILD);
      this.forwardEvent(s.textarea.UPDATE_SMS_DESTINATION, this.DIRECTION.CHILD);
      r.subscribe(s.expressionPicker.ITEM_SEND_REQUEST, x);
      this._parentContext && (this.forwardEvent(s.textarea.INITIALIZATION_COMPLETE, this.DIRECTION.PARENT), this.dispatchEvent(s.chatInput.INITIALIZATION_COMPLETE, e, e.DIRECTION.PARENT));
      y = h.get().currentMode.subscribe(function (t) {
        e.isStyleModeWide(t === v.WIDE);
      });
      this.destination = n.observable(D());
      this.canSendSms = n.pureComputed(P);
    };
    this.sendButtonClicked = function () {
      e.dispatchEvent(s.textarea.SUBMIT_AND_FOCUS, null, e.DIRECTION.CHILD);
    };
    this.dispose = function () {
      b() && (e.isEnabled.dispose(), e.isServiceEnabled.dispose(), C(), e.conversationModel.participants.changed.off(N));
      y.dispose();
      g.dispose();
      r.unsubscribe(s.expressionPicker.ITEM_SEND_REQUEST, x);
    };
    this.isExpressionPickerButtonVisible = function () {
      return !e.alwaysHideExpressionPicker && !u.isFeatureOn(a.featureFlags.HIDE_EMOTICON_PICKER_BUTTON);
    };
    this.isPESEnabled = function () {
      return b();
    };
    this.isMediaBarEnabled = function () {
      return u.isFeatureOn(a.featureFlags.MEDIA_BAR_ENABLED);
    };
    this.isMediaBarV2Enabled = function () {
      return u.isFeatureOn(a.featureFlags.MEDIA_BAR_ENABLED) && u.isFeatureOn(a.featureFlags.MEDIA_BAR_V2_ENABLED);
    };
    this.isFooterMediaBarVisible = function () {
      return this.isMediaBarV2Enabled() && !this.isStyleModeWide();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-pubsub-instance").default, i = e("utils/common/cafeObservable"), s = e("swx-constants").COMMON.events, o = e("swx-constants").CALLING, u = e("utils/common/eventMixin"), a = e("swx-constants").COMMON, f = e("swx-service-locator-instance").default, l = e("telemetry/chat/pes"), c = e("ui/modelObservers/agentAuthorizationObserver"), h = e("utils/common/styleModeHelper"), p = e("ui/modelHelpers/conversationHelper"), d = e("ui/modelHelpers/personHelper"), v = a.styleMode;
  return t.assign(m.prototype, u), m;
});
