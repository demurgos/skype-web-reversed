define("ui/viewModels/chat/pes.v2/expressionPicker", [
  "require",
  "lodash-compat",
  "constants/keys",
  "utils/common/builderMixin",
  "browser/document",
  "browser/dom",
  "utils/common/eventHelper",
  "utils/common/interactor",
  "vendor/knockout",
  "experience/settings",
  "utils/common/stateMixin",
  "utils/common/outsideClickHandler"
], function (e) {
  function w(e, r) {
    function g(e) {
      var t = null;
      u.applyState({ selectedPageIndex: e }, t);
    }
    function y() {
      u.params.eventEmitter.emit("handleCloseBubble");
    }
    function w() {
      return s.getElement(v, r);
    }
    function E() {
      var e = w();
      e && e.focus();
    }
    function S() {
      return s.getElement(h, s.getParentMatching(r, p));
    }
    function x() {
      var e = S();
      e && e.focus();
    }
    function T() {
      c.remove(d);
    }
    var u = this, f, m;
    u.state = l.overrideDefaults({}, u.getInitialState());
    u.params = l.overrideDefaults({}, u.getDefaultParams(), e);
    f = u.state.query.subscribe(function (e) {
      u.params.eventEmitter.emit("handleQueryChanged", e);
    });
    m = u.state.isOpened.subscribe(function (e) {
      e ? c.add(d, y) : T();
    });
    u.afterStateApplied = function () {
      b.run(this.state);
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
      t < u.state.pagedTabs().length && g(t);
    };
    u.prevPage = function () {
      var t = u.state.selectedPageIndex() - 1;
      t >= 0 && g(t);
    };
    u.init = function () {
      b.run(this.state);
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
      }
      return !0;
    };
    u.handleKeyDown = function (e, t) {
      var r = o.getKeyCode(t);
      if (r === n.ESCAPE && u.state.isOpened()) {
        t.stopPropagation();
        y();
        E();
        return;
      }
      if (r === n.ESCAPE && i.activeElement === w()) {
        t.stopPropagation();
        x();
        return;
      }
      return !0;
    };
    u.dispose = function () {
      T();
      f.dispose();
      m.dispose();
      u.params.eventEmitter.done();
    };
    u.showStore = function () {
      u.params.eventEmitter.emit("handleShowStore");
    };
  }
  var t = e("lodash-compat"), n = e("constants/keys"), r = e("utils/common/builderMixin"), i = e("browser/document"), s = e("browser/dom"), o = e("utils/common/eventHelper"), u = e("utils/common/interactor"), a = e("vendor/knockout"), f = e("experience/settings"), l = e("utils/common/stateMixin"), c = e("utils/common/outsideClickHandler"), h = ".swx .chat .inputField", p = ".swx .chat", d = "expressionPicker", v = ".emoticon-picker-button", m = u.defineSimpleInteractor(function (t) {
      t.pickerButtonClass("transparent circle emoticon-picker-button large");
      t.pickerButtonIcon("emoticonStroke");
    }), g = u.defineInteractor(function () {
      this.onlyIf(function () {
        return f.pesPicker.useSelectedTabIconForPicker;
      });
      this.run(function (t) {
        var n = t.selectedTab();
        n && (t.pickerButtonClass("transparent tab-icon emoticon-picker-button large"), t.pickerButtonIcon("tab enabled " + n.htmlClass()));
      });
    }), y = u.defineSimpleInteractor(function (e) {
      var t = e.pagedTabs().length, n = e.selectedPageIndex(), r = "page" + n, i;
      t <= 1 ? i = "singlePage" : i = n === t - 1 ? r + " last" : r;
      e.storeEnabled() && (i = "storeEnabled " + i);
      e.tabsCss(i);
    }), b = u.defineComposer([
      m,
      g,
      y
    ]);
  return w.prototype.getInitialState = function () {
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
      hasFocus: !1,
      query: "",
      storeEnabled: !1
    };
  }, w.prototype.getDefaultParams = function () {
    return {
      isDisabled: !0,
      eventEmitter: o.emptyEmitter
    };
  }, t.assign(w.prototype, l), t.assign(w, r), w;
});
