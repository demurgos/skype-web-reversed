define("ui/viewModels/chat/pes/itemsPicker", [
  "require",
  "lodash-compat",
  "utils/common/async",
  "utils/common/eventMixin",
  "constants/common",
  "vendor/knockout",
  "services/pes/constants",
  "services/pes/utils"
], function (e) {
  function a(e, r) {
    function h() {
      var e = a.tab(), n = { packs: [] };
      return e.packs.forEach(function (e) {
        var r = t.find(e.items, function (e) {
          return a.isItemVisible(e);
        });
        if (!e.isHidden && r) {
          var i = {
            title: e.title,
            id: e.id,
            ariaLabel: e.ariaLabel,
            items: []
          };
          n.packs.push(i), e.items.forEach(function (e) {
            a.isItemVisible(e) && i.items.push(e);
          });
        }
      }), n;
    }
    function p() {
      return a.tab().id === o.mru.TAB_ID && a.tabVM().packs.length === 0;
    }
    function d(e, t) {
      var n;
      if (!t || !t.type)
        n = e.target.getAttribute("data-id"), t = u.getConfigItem(n, { tabs: [a.tab()] });
      switch (t.type) {
      case "emoticon":
      case "flik":
        t.isLocked() ? (a.dispatchEvent(i.expressionPicker.ITEM_SEND_REQUEST, t, a.DIRECTION.PARENT), a.dispatchEvent(i.expressionPicker.CLOSE_REQUEST, t, a.DIRECTION.PARENT)) : a.dispatchEvent(i.expressionPicker.ITEM_SELECT_REQUEST, t, a.DIRECTION.PARENT);
        break;
      case "sticker":
        throw new Error("Not implemented support for stickers, yet");
      default:
        throw new Error("Not supported item type:" + t.type);
      }
    }
    function v(e, t) {
      return e = s.dataFor(t.target), t.relatedTarget && e === s.dataFor(t.relatedTarget) ? null : !e || !e.isLocked ? null : e;
    }
    function m(e) {
      return e.stopPropagation(), !1;
    }
    var a = this, f = {
        onOver: function (t, n) {
          if (t.isLocked())
            return;
          return n.target.focus(), m(n);
        },
        onOut: function (t, n) {
          if (!t.isLocked())
            return;
          return a.dispatchEvent(i.expressionPicker.ITEM_CANCEL_REQUEST, t, a.DIRECTION.PARENT), m(n);
        },
        onClick: function (t, n) {
          return d(n, t), m(n);
        }
      }, l = {
        onOver: function () {
        },
        onOut: function () {
        },
        onClick: function (t, n) {
          return t.isLocked() ? d(n, t) : n.target.focus(), c = f, m(n);
        }
      }, c = f;
    a.isItemVisible = function (e) {
      return e.visible || a.tab().showHiddenItems;
    }, a.tab = e.context, a.tabVM = s.computed(h), a.showEmptyMruTabMessage = s.computed(p), a.navigateContext = {}, a.tab.subscribe(function () {
      n.execute(function () {
        a.navigateContext.startup = !0;
      });
    }), a.init = function () {
      r.init(), a.registerEvent(i.expressionPicker.OPEN_REQUEST, function () {
        r.adjustToRTLLayout();
      });
    }, a.onMouseOver = function (e, t) {
      var n = v(e, t);
      if (!n)
        return;
      return c.onOver(n, t);
    }, a.onMouseOut = function (e, t) {
      var n = v(e, t);
      if (!n)
        return;
      return c.onOut(n, t);
    }, a.onMouseClick = function (e, t) {
      var n = v(e, t);
      if (!n)
        return;
      return c.onClick(n, t);
    }, a.onEnterKey = function (e, t) {
      var n = v(e, t);
      if (!n)
        return;
      return t.stopPropagation(), t.preventDefault(), c.onClick(n, t);
    }, a.onTouchEnd = function (t, n) {
      var r = v(t, n);
      if (!r)
        return;
      return l.onClick(r, n);
    }, a.onPointerOver = function (t, n) {
      n.pointerType === "touch" && (c = l);
    }, a.dispose = function () {
      r.dispose(), a.showEmptyMruTabMessage.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/async"), r = e("utils/common/eventMixin"), i = e("constants/common").events, s = e("vendor/knockout"), o = e("services/pes/constants"), u = e("services/pes/utils");
  return t.assign(a.prototype, r), a;
})
