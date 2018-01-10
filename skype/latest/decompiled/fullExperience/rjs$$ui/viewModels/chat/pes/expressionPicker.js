define("ui/viewModels/chat/pes/expressionPicker", [
  "require",
  "lodash-compat",
  "swx-constants",
  "swx-utils-common",
  "browser/document",
  "browser/dom",
  "utils/common/eventHelper",
  "utils/common/interactor",
  "vendor/knockout",
  "experience/settings",
  "utils/common/stateMixin",
  "utils/common/outsideClickHandler",
  "swx-focus-handler",
  "services/pes/constants",
  "swx-constants",
  "utils/common/accessibility",
  "swx-i18n"
], function (e) {
  function N(e, r) {
    function S(e) {
      var t = null;
      u.applyState({ selectedPageIndex: e }, t);
    }
    function x() {
      u.params.eventEmitter.emit("handleCloseBubble");
    }
    function N(e, t, n) {
      e === v.itemTypes.tab.id && (t === g.events.browser.KEYDOWN || t === g.events.browser.CLICK) && y.announce({
        key: "expressionPicker_selected_item_title",
        params: { itemTitle: n || "" }
      });
    }
    function C() {
      return s.getElement(w, r);
    }
    function k() {
      var e = C();
      e && h.get().addFocusRequestToQueue(e);
    }
    function L() {
      return s.getElement(p, s.getParentMatching(r, d));
    }
    function A() {
      var e = L();
      e && h.get().addFocusRequestToQueue(e);
    }
    function O() {
      c.remove(m);
    }
    var u = this, f, E;
    u.state = l.overrideDefaults({}, u.getInitialState());
    u.params = l.overrideDefaults({}, u.getDefaultParams(), e);
    f = u.state.query.subscribe(function (e) {
      u.params.eventEmitter.emit("handleQueryChanged", e);
    });
    E = u.state.isOpened.subscribe(function (e) {
      e ? c.add(m, x) : O();
    });
    u.afterStateApplied = function () {
      T.run(this.state);
    };
    u.onSearchBoxKeyDown = function (e, t) {
      var r = o.getKeyCode(t);
      if (r === n.ESCAPE) {
        if (u.state.query()) {
          u.resetQuery();
          t.stopPropagation();
          return;
        }
        return;
      }
      if (r === n.BACKSPACE && !u.state.query()) {
        o.swallow(t);
        return;
      }
      return r !== n.ENTER;
    };
    u.resetQuery = function () {
      u.params.eventEmitter.emit("handleResetQuery");
    };
    u.nextPage = function () {
      var t = u.state.selectedPageIndex() + 1;
      t < u.state.pagedTabs().length && S(t);
    };
    u.prevPage = function () {
      var t = u.state.selectedPageIndex() - 1;
      t >= 0 && S(t);
    };
    u.init = function () {
      T.run(this.state);
    };
    u.openBubble = function () {
      u.params.eventEmitter.emit("handleOpenBubble");
    };
    u.handleEnter = function (e, t) {
      function n() {
        return t.target.tagName !== "BUTTON";
      }
      n() && t.target.tagName !== "INPUT" && t.preventDefault();
      u.handleMouseEvent(e, t);
    };
    u.handleMouseEvent = function (e, n) {
      var r = a.dataFor(n.target);
      if (r && r.type && r.id) {
        var i = "handle" + t.capitalize(n.type);
        u.params.eventEmitter.emit(i, r.type(), r.id(), n);
        r.title && N(r.type(), n.type, r.title());
      }
      return !1;
    };
    u.selectedTabAriaLabel = function (e) {
      var t = e.ariaLabel && e.ariaLabel() || "";
      return e.type && e.type() === v.itemTypes.tab.id && u.state.selectedTab().id() === e.id() ? b.fetch({
        key: "expressionPicker_selected_item_title",
        params: { itemTitle: t }
      }) : t;
    };
    u.handleKeyDown = function (e, t) {
      var r = o.getKeyCode(t);
      if (r === n.ESCAPE && u.state.isOpened()) {
        t.stopPropagation();
        x();
        k();
        return;
      }
      if (r === n.ESCAPE && i.activeElement === C()) {
        t.stopPropagation();
        A();
        return;
      }
      return !0;
    };
    u.dispose = function () {
      O();
      f.dispose();
      E.dispose();
      u.params.eventEmitter.done();
    };
    u.showStore = function () {
      u.params.eventEmitter.emit("handleShowStore");
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").KEYS, r = e("swx-utils-common").builderMixin, i = e("browser/document"), s = e("browser/dom"), o = e("utils/common/eventHelper"), u = e("utils/common/interactor"), a = e("vendor/knockout"), f = e("experience/settings"), l = e("utils/common/stateMixin"), c = e("utils/common/outsideClickHandler"), h = e("swx-focus-handler"), p = ".swx .chat .inputField", d = ".swx .chat", v = e("services/pes/constants"), m = "expressionPicker", g = e("swx-constants").COMMON, y = e("utils/common/accessibility").narrator, b = e("swx-i18n").localization, w = ".emoticon-picker-button", E = u.defineSimpleInteractor(function (t) {
      t.pickerButtonClass("swx-expression-picker-btn transparent circle emoticon-picker-button large");
      t.pickerButtonIcon("emoticonStroke");
    }), S = u.defineInteractor(function () {
      this.onlyIf(function () {
        return f.pesPicker.useSelectedTabIconForPicker;
      });
      this.run(function (t) {
        var n = t.selectedTab();
        n && (t.pickerButtonClass("swx-expression-picker-btn transparent tab-icon emoticon-picker-button large"), t.pickerButtonIcon("tab enabled " + n.htmlClass()));
      });
    }), x = u.defineSimpleInteractor(function (e) {
      var t = e.pagedTabs().length, n = e.selectedPageIndex(), r = "page" + n, i;
      t <= 1 ? i = "singlePage" : i = n === t - 1 ? r + " last" : r;
      e.storeEnabled() && (i = "storeEnabled " + i);
      e.tabsCss(i);
    }), T = u.defineComposer([
      E,
      S,
      x
    ]);
  return N.prototype.getInitialState = function () {
    return {
      isOpened: !1,
      wasOpenedBefore: !1,
      pickerButtonIcon: "",
      pickerButtonClass: "",
      pagedTabs: [],
      tabsCss: "",
      selectedPageIndex: 0,
      selectedTab: null,
      selectedItem: null,
      itemStartPlayRequest: 0,
      pickerMaximized: !1,
      searchCapabilityEnabled: !1,
      query: "",
      storeEnabled: !1
    };
  }, N.prototype.getDefaultParams = function () {
    return {
      isDisabled: !0,
      eventEmitter: o.emptyEmitter
    };
  }, t.assign(N.prototype, l), t.assign(N, r), N;
});
