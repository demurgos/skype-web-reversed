define("ui/components/chat/pes.v2/expressionPickerController", [
  "require",
  "lodash-compat",
  "ui/components/chat/pes.v2/bingTab/bingSearchTab",
  "ui/components/chat/pes.v2/giphyTab/giphySearchTab",
  "ui/components/chat/pes.v2/localSearchTab/localSearchTab",
  "utils/common/builderMixin",
  "constants/common",
  "utils/common/eventMixin",
  "services/pes/constants",
  "services/pes.v2/interactors/picker",
  "services/pes.v2/interactors/store",
  "services/pubSub/pubSub",
  "experience/settings",
  "services/serviceLocator",
  "vendor/knockout"
], function (e) {
  function m() {
    this.model = {
      itemStartPlayRequest: 0,
      _currentOperation: null,
      _conversationModel: null,
      _startPlaybackAction: t.debounce(t.bind(this.startPlaybackAction, this), 600)
    }, this.subscriptions = [], this.viewModel = null;
  }
  function g(e) {
    var r = t.find(e.model.tabs, { id: f.bingSearch.TAB_ID });
    r._currentQuery || (r._currentQuery = p.pesSearchServices.bingDefaultSearchTerm || ""), r._currentQuery && e.model.query !== r._currentQuery && (e.model.query = r._currentQuery, n.doBingSearch(r._currentQuery, e.model, e.viewModel.applyState.bind(e.viewModel))), e.model.hasFocus = !0, e.viewModel.applyState(e.model);
  }
  function y(e) {
    var n = t.find(e.model.tabs, { id: f.giphyImageSearch.TAB_ID });
    e.model.query || (e.model.query = ""), e.model.query !== n._currentQuery && (e.model.query = n._currentQuery, r.doGiphySearch(n._currentQuery, e.model, e.viewModel.applyState.bind(e.viewModel))), e.model.hasFocus = !0, e.viewModel.applyState(e.model);
  }
  function b(e) {
    var n = t.find(e.model.tabs, { id: f.localSearch.TAB_ID });
    e.model.query = n._currentQuery, i.doLocalSearch(e.model.query, e.model, e.viewModel.applyState.bind(e.viewModel)), e.model.hasFocus = !0, e.viewModel.applyState(e.model, [
      "hasFocus",
      "query"
    ]);
  }
  var t = e("lodash-compat"), n = e("ui/components/chat/pes.v2/bingTab/bingSearchTab"), r = e("ui/components/chat/pes.v2/giphyTab/giphySearchTab"), i = e("ui/components/chat/pes.v2/localSearchTab/localSearchTab"), s = e("utils/common/builderMixin"), o = e("constants/common"), u = o.events, a = e("utils/common/eventMixin"), f = e("services/pes/constants"), l = e("services/pes.v2/interactors/picker"), c = e("services/pes.v2/interactors/store"), h = e("services/pubSub/pubSub"), p = e("experience/settings"), d = e("services/serviceLocator"), v = e("vendor/knockout");
  return m.prototype.init = function (e, s) {
    var a = d.resolve(o.serviceLocator.PES_2_CONFIG_SERVICE), f = d.resolve(o.serviceLocator.PES_2_MRU_SERVICE), l = d.resolve(o.serviceLocator.FEATURE_FLAGS), h;
    this.setContext(s), this.viewModel = e, this.model._conversationModel = s.conversationModel, this.subscriptions.push(a.on(u.personalExpression.CONFIG_INITIALIZED, this.emit.bind(this, "handlePesConfig"))), this.subscriptions.push(f.on(u.personalExpression.CONFIG_INITIALIZED, this.emit.bind(this, "handleMruConfig"))), l.isFeatureOn(o.featureFlags.PES_BING_IMAGE_SEARCH_ENABLED) && (this.subscriptions.push(s.registerEvent(u.textarea.CHANGED, this.emit.bind(this, "handleChatInput"))), this.highlightTabOnBingKeywords = t.debounce(n.highlightTabOnBingKeywords, 400), this.doBingSearch = t.debounce(n.doBingSearch, 400)), l.isFeatureOn(o.featureFlags.PES_GIPHY_IMAGE_SEARCH_ENABLED) && (this.doGiphySearch = t.debounce(r.doGiphySearch, 400)), l.isFeatureOn(o.featureFlags.PES_LOCAL_SEARCH_ENABLED) && (this.doLocalSearch = t.debounce(i.doLocalSearch, 400)), this.handlePesConfigEvent(), l.isFeatureOn(o.featureFlags.PES_STORE_ENABLED) && (h = c.setStoreTabProperties.run({
      pickerState: this.model,
      pickerVM: this.viewModel
    }), this.subscriptions.push({
      dispose: function () {
        c.disposeStore.run(h);
      }
    }), this.viewModel.applyState(this.model), c.downloadPreviouslyPurchasedTabs.run(this.model, this.emit.bind(this, "handleDownloadPurchasedTabs")));
  }, m.prototype.dispose = function () {
  }, m.prototype.done = function () {
    t.forEach(this.subscriptions, function (e) {
      e.cancel ? e.cancel() : e.dispose && e.dispose();
    }), this.dispose(), this.model = null, this.viewModel = null;
  }, m.prototype.handlePesConfigEvent = function () {
    var n = v.utils.unwrapObservable(this.viewModel.state.selectedTab) && v.utils.unwrapObservable(this.viewModel.state.selectedTab).id, r = l.pickerStateConstructor(), i = r.run({ currentTabId: n });
    t.assign(this.model, i), this.viewModel.applyState(this.model);
  }, m.prototype.handleMruConfigEvent = function () {
    this.model = l.mruStateUpdater.run(this.model), this.viewModel.applyState(this.model);
  }, m.prototype.handleChatInputEvent = function (t) {
    this.model._chatInputText = t, t ? this.highlightTabOnBingKeywords(t, this.model, this.viewModel.applyState.bind(this.viewModel)) : (this.highlightTabOnBingKeywords.cancel(), n.cancelBingSearch(this.model));
  }, m.prototype.handleQueryChangedEvent = function (t, n) {
    this.model.query !== t && (this.model.query = t, this.viewModel.applyState(this.model));
    switch (this.model.selectedTab.id) {
    case f.bingSearch.TAB_ID:
      this.doBingSearch(t, this.model, this.viewModel.applyState.bind(this.viewModel));
      break;
    case f.giphyImageSearch.TAB_ID:
      this.doGiphySearch(t, this.model, this.viewModel.applyState.bind(this.viewModel));
      break;
    case f.localSearch.TAB_ID:
      n ? i.doLocalSearch(t, this.model, this.viewModel.applyState.bind(this.viewModel)) : this.doLocalSearch(t, this.model, this.viewModel.applyState.bind(this.viewModel));
    }
  }, m.prototype.handleResetQueryEvent = function () {
    this.handleQueryChangedEvent("", !0);
  }, m.prototype.startPlaybackAction = function () {
    this.model.isOpened && (this.model.itemStartPlayRequest = this.model.itemStartPlayRequest >= 0 ? this.model.itemStartPlayRequest + 1 : 1, this.viewModel.applyState(this.model));
  }, m.prototype.stopPlaybackAction = function () {
    this.model.itemStartPlayRequest = this.model.itemStartPlayRequest > 0 ? 0 : this.model.itemStartPlayRequest - 1, this.viewModel.applyState(this.model), this.model._startPlaybackAction.cancel();
  }, m.prototype.handleMouseoverEvent = function (t, n) {
    switch (t) {
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
    case f.itemTypes.image.id:
      this.model.selectedItemId = n, this.model = l.selectItemAction.run(this.model), this.stopPlaybackAction(), this.model._startPlaybackAction(), this.viewModel.applyState(this.model);
      break;
    default:
    }
  }, m.prototype.handleTouchendEvent = function (t, n, r) {
    switch (t) {
    case f.itemTypes.tab.id:
      break;
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
    case f.itemTypes.image.id:
      this.model.selectedItemId !== n && (this.model.selectedItemId = n, this.model = l.selectItemAction.run(this.model), this.viewModel.applyState(this.model), this.startPlaybackAction(), r.preventDefault());
    }
  }, m.prototype.handleHighlightEvent = function (t, n) {
    switch (t) {
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
    case f.itemTypes.image.id:
      this.model.selectedItemId = n, this.model = l.selectItemAction.run(this.model), this.stopPlaybackAction(), this.model._startPlaybackAction(), this.viewModel.applyState(this.model);
      break;
    default:
    }
  }, m.prototype.handleMouseoutEvent = function (t) {
    switch (t) {
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
      this.stopPlaybackAction();
      break;
    default:
    }
  }, m.prototype.activateTab = function (t) {
    t !== this.model.selectedTab.id && (this.model.currentTabId = t, l.setSelectionState.run(this.model), this.viewModel.applyState(this.model)), this.model.selectedTab.id === f.bingSearch.TAB_ID && (n.highlightTabOnBingKeywords(this.model._chatInputText, this.model, this.viewModel.applyState.bind(this.viewModel)), g(this)), this.model.selectedTab.id === f.localSearch.TAB_ID && b(this), this.model.selectedTab.id === f.giphyImageSearch.TAB_ID ? (y(this), this.dispatchEvent(u.textarea.SET_ATTRIBUTION, "giphy")) : this.dispatchEvent(u.textarea.SET_ATTRIBUTION, null);
  }, m.prototype.handleClickEvent = function (t, n) {
    switch (t) {
    case f.itemTypes.tab.id:
      this.activateTab(n);
      break;
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
    case f.itemTypes.image.id:
      this.model.selectedItemId = n, this.model = l.selectItemAction.run(this.model), h.publish(o.events.expressionPicker.ITEM_SEND_REQUEST, {
        item: this.model.selectedItem,
        conversation: this.model._conversationModel,
        sourceTab: this.model.selectedTab
      }), this.handleCloseBubbleEvent();
      break;
    case f.itemTypes.message.id:
      this.model.selectedTab.id === f.localSearch.TAB_ID && this.handleQueryChangedEvent(n, !0);
      break;
    default:
    }
  }, m.prototype.handleKeydownEvent = function (t, n) {
    this.handleMouseoverEvent(t, n), this.handleClickEvent(t, n);
  }, m.prototype.handleActivationEvent = function (t, n) {
    switch (t) {
    case f.itemTypes.moji.id:
    case f.itemTypes.emoticon.id:
    case f.itemTypes.image.id:
      h.publish(o.events.expressionPicker.ITEM_SEND_REQUEST, {
        item: this.model.selectedItem,
        conversation: this.model._conversationModel,
        sourceTab: this.model.selectedTab
      }), this.handleCloseBubbleEvent();
      break;
    case f.itemTypes.message.id:
      this.model.selectedTab.id === f.localSearch.TAB_ID && this.handleQueryChangedEvent(n, !0);
      break;
    default:
    }
  }, m.prototype.handlePlaybackPausedEvent = function () {
    this.stopPlaybackAction();
  }, m.prototype.handleResetQueryEvent = function () {
    this.model.query = "", this.viewModel.applyState(this.model);
  }, m.prototype.handleOpenBubbleEvent = function () {
    this.model.isOpened ? (this.stopPlaybackAction(), this.model.isOpened = !1) : (this.model.isOpened = !0, this.model.wasOpenedBefore = !0, this.activateTab(this.model.selectedTab.id)), this.viewModel.applyState(this.model);
  }, m.prototype.handleCloseBubbleEvent = function () {
    this.stopPlaybackAction(), this.model.isOpened = !1;
    if (this.model.selectedTab.id === f.bingSearch.TAB_ID) {
      var n = t.find(this.model.tabs, { id: f.bingSearch.TAB_ID });
      n._currentQuery = "";
    }
    this.viewModel.applyState(this.model), this.dispatchEvent(u.textarea.SET_ATTRIBUTION, null);
  }, m.prototype.handleShowStoreEvent = function () {
    c.showStore.run(this.model);
  }, m.prototype.handleDownloadPurchasedTabsEvent = function () {
    c.putPurchasedTabs.run(this.model), this.model = l.mruStateUpdater.run(this.model), this.viewModel.applyState(this.model);
  }, m.prototype.emit = function () {
    var t = Array.prototype.slice.call(arguments), n = this[t[0] + "Event"];
    n && n.apply(this, t.slice(1));
  }, t.assign(m, s), t.assign(m.prototype, a), m;
})
