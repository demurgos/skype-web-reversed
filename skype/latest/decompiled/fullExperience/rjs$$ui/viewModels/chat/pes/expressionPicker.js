define("ui/viewModels/chat/pes/expressionPicker", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "browser/dom",
  "utils/common/async",
  "constants/common",
  "utils/common/eventMixin",
  "utils/common/eventHelper",
  "constants/keys",
  "services/pubSub/pubSub",
  "browser/document",
  "services/serviceLocator",
  "swx-i18n"
], function (e) {
  function d(e, u, d) {
    function w() {
      i.execute(function () {
        v.isOpened(!1);
      });
      c.body.removeEventListener("click", C, !0);
      v.dispatchEvent(o.expressionPicker.CLOSE_REQUEST, {}, v.DIRECTION.CHILD);
    }
    function E(e) {
      return {
        tabs: [],
        isSelected: n.observable(e)
      };
    }
    function S(e) {
      if (e.length < 7) {
        var t = E(!0);
        return t.tabs = e, [t];
      }
      var n = e.reduce(function (e, t, n) {
          var r = e[e.length - 1];
          return r.tabs.length >= 4 && n !== 4 && (r = E(!1), e.push(r)), r.tabs.push(t), e;
        }, [E(!0)]), r = n[n.length - 1];
      return r.tabs.length === 1 && (n[n.length - 2].tabs.push(r.tabs[0]), n.pop()), n;
    }
    function x() {
      var e = v.pagedTabs().length, t = v.selectedPageIndex();
      if (e === 1)
        return "singlePage";
      var n = "page" + t;
      return t === e - 1 ? n + " last" : n;
    }
    function T() {
      var e = v.selectedPageIndex() + 1;
      e < v.pagedTabs().length && k(e);
    }
    function N() {
      var e = v.selectedPageIndex() - 1;
      e >= 0 && k(e);
    }
    function C(e) {
      var t = !r.getParentWithClass(e.target, "expressionPicker");
      t && w();
    }
    function k(e) {
      v.selectedPageIndex(e);
      var t = v.pagedTabs();
      t.forEach(function (t, n) {
        t.isSelected(n === e);
      });
    }
    function L(e) {
      u.forEach(function (e) {
        e.active && e.active(!1);
      });
      e.active && e.active(!0);
      v.selectedTab(e);
    }
    function A() {
      v.switchTab(u.length > 1 ? u[1] : u[0]);
    }
    function O() {
      v.forwardEvent(o.expressionPicker.ITEM_PREVIEW_REQUEST, v.DIRECTION.CHILD);
      v.forwardEvent(o.expressionPicker.ITEM_SELECT_REQUEST, v.DIRECTION.CHILD);
      v.forwardEvent(o.expressionPicker.ITEM_CANCEL_REQUEST, v.DIRECTION.CHILD);
      v.forwardEvent(o.expressionPicker.CLOSE_REQUEST, v.DIRECTION.CHILD, w);
      v.registerEvent(o.expressionPicker.ITEM_SEND_REQUEST, function (t) {
        l.publish(o.expressionPicker.ITEM_SEND_REQUEST, {
          item: t,
          conversation: g,
          sourceTab: v.selectedTab()
        });
      });
      l.subscribe(o.expressionPicker.MRUITEM_ADD_REQUEST, P);
      l.subscribe(o.expressionPicker.MRUITEM_ADD_EMOTICON_REQUEST, D);
      l.subscribe(o.personalExpression.CONFIG_PROCESSED, M);
    }
    function M(e) {
      var t = u ? u.indexOf(v.selectedTab()) : 0;
      if (t < 0 || t >= e.tabs.length)
        t = 0;
      u = e.tabs;
      v.pagedTabs(S(u));
      v.switchTab(e.tabs[t]);
    }
    function D(e) {
      e.forEach(function (e) {
        m.addItemToMru(e);
      });
    }
    function P(e) {
      m.addItemToMru(e.id);
    }
    function H() {
      return c.querySelector(b);
    }
    function B() {
      var e = H();
      e && e.focus();
    }
    function j() {
      return c.querySelector(y);
    }
    function F() {
      var e = j();
      e && e.focus();
    }
    var v = this, m = h.resolve(s.serviceLocator.PES_CONFIG_SERVICE), g = d, y = ".swx .chat .inputField", b = ".emoticon-picker-button";
    v.isDisabled = n.isObservable(e) ? e : n.observable(e);
    v.isOpened = n.observable(!1);
    v.isSelected = n.observable(!1);
    v.pagedTabs = n.observableArray(S(u));
    v.selectedPageIndex = n.observable(0);
    v.selectedTab = n.observable(u[0]);
    v.tabsCss = n.computed(x);
    v.prevPageTitle = p.fetch({ key: "expressionPicker_prevPage" });
    v.nextPageTitle = p.fetch({ key: "expressionPicker_nextPage" });
    v.init = function () {
      O();
      A();
    };
    v.nextPage = function () {
      T(!1);
    };
    v.openBubble = function () {
      v.isOpened() || (A(), v.isOpened(!0), c.body.addEventListener("click", C, !0), v.dispatchEvent(o.expressionPicker.OPEN_REQUEST, {}, v.DIRECTION.CHILD));
    };
    v.onTabKeyDown = function (e, t) {
      var n, r, i = a.getKeyCode(t);
      if (i === f.ESCAPE)
        return !0;
      if (!a.isActivation(t))
        return !0;
      if (v.selectedTab().title === e.title)
        return v.dispatchEvent(o.expressionPicker.TAB_SELECT_REQUEST, {}, v.DIRECTION.CHILD), a.swallow(t), !1;
      for (n = 0; n < u.length; n++) {
        r = u[n];
        if (r.title === e.title)
          return v.switchTab(r), !1;
      }
      return !0;
    };
    v.onNextKeyDown = function (t, n) {
      var r = a.getKeyCode(n);
      return r === f.ESCAPE ? !0 : a.isActivation(n) ? (T(!0), a.swallow(n), !1) : !0;
    };
    v.onPrevKeyDown = function (t, n) {
      var r = a.getKeyCode(n);
      return r === f.ESCAPE ? !0 : a.isActivation(n) ? (N(!0), a.swallow(n), !1) : !0;
    };
    v.prevPage = function () {
      N(!1);
    };
    v.switchTab = function (n) {
      if (n) {
        v.dispatchEvent(o.expressionPicker.ITEM_CANCEL_REQUEST, {}, v.DIRECTION.CHILD);
        L(n);
        var r = t.findIndex(v.pagedTabs(), function (e) {
          return e.tabs.indexOf(n) !== -1;
        });
        k(r);
      }
    };
    v.handleKeyDown = function (e, t) {
      var n = a.getKeyCode(t), r;
      if (n === f.ESCAPE && v.isOpened()) {
        t.stopPropagation();
        w();
        B();
        return;
      }
      r = H();
      if (n === f.ESCAPE && c.activeElement === r) {
        t.stopPropagation();
        F();
        return;
      }
      return !0;
    };
    v.dispose = function () {
      l.unsubscribe(o.expressionPicker.MRUITEM_ADD_REQUEST, P);
      l.unsubscribe(o.expressionPicker.MRUITEM_ADD_EMOTICON_REQUEST, D);
      l.unsubscribe(o.personalExpression.CONFIG_PROCESSED, M);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("browser/dom"), i = e("utils/common/async"), s = e("constants/common"), o = s.events, u = e("utils/common/eventMixin"), a = e("utils/common/eventHelper"), f = e("constants/keys"), l = e("services/pubSub/pubSub"), c = e("browser/document"), h = e("services/serviceLocator"), p = e("swx-i18n").localization;
  return t.assign(d.prototype, u), d.build = function (e, t, n) {
    return new d(e, t, n);
  }, d;
});
