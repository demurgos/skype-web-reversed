define("ui/contextMenu/menuItemHelper", [
  "require",
  "exports",
  "module",
  "ui/telemetry/actions/actionSources",
  "ui/contextMenu/items/all",
  "lodash-compat",
  "swx-enums"
], function (e, t) {
  function o(e, t) {
    return e.type() === t.type() ? u(e.displayString(), t.displayString()) : a(e, t);
  }
  function u(e, t) {
    var n = e.trim().toLowerCase(), r = t.trim().toLowerCase();
    return n.localeCompare(r);
  }
  function a(e, t) {
    var n = e.type() || s.phoneType.Other, i = t.type() || s.phoneType.Other;
    return r.itemOrderPriorities.StartPSTNCallMenuItem.subPriorities[n].priority - r.itemOrderPriorities.StartPSTNCallMenuItem.subPriorities[i].priority;
  }
  function f(e, t) {
    return c(e, t.type) || h(e, t) ? u(e.label, t.label) : i.isUndefined(r.itemOrderPriorities[t.type]) ? -1 : i.isUndefined(r.itemOrderPriorities[e.type]) ? 1 : l(e, t);
  }
  function l(e, t) {
    var n = r.itemOrderPriorities[e.type], i = r.itemOrderPriorities[t.type];
    return n.priority - i.priority;
  }
  function c(e, t) {
    return e.type === t.type;
  }
  function h(e, t) {
    var n = r.itemOrderPriorities[e.type], i = r.itemOrderPriorities[t.type];
    return p(n, i) || d(n, i) && n.priority === i.priority;
  }
  function p(e, t) {
    return i.isUndefined(e) && i.isUndefined(t);
  }
  function d(e, t) {
    return !i.isUndefined(e) && !i.isUndefined(t);
  }
  var n = e("ui/telemetry/actions/actionSources"), r = e("ui/contextMenu/items/all"), i = e("lodash-compat"), s = e("swx-enums");
  t.getMenuItemTelemetryContext = function (e, t) {
    var n = { source: e };
    return t && t.source && (n.parent = t.source), n;
  }, t.getConversationContextMenuItemGroup = function (e, n, i) {
    var s = [], o = t.getCallPhoneContextMenuItems(e, n, i);
    return s.push(new r.CallSkypeMenuItem(e, n, i)), Array.prototype.push.apply(s, o), s.push(new r.VideoCallMenuItem(e, n, i)), s.push(new r.ViewPersonProfileMenuItem(e.getPerson(), n, i)), new r.MenuItemGroup(r.CallSkypeMenuItem.TYPE, s);
  }, t.getCallPhoneContextMenuItems = function (e, s, u) {
    var a = [], f = e.getPerson();
    if (f.phoneNumbers.size()) {
      var l = f.phoneNumbers();
      l.sort(o), i.forEach(l, function (i) {
        a.push(new r.StartPSTNCallMenuItem(e, i, s, t.getMenuItemTelemetryContext(n.contextMenuItem.startPSTNCall, u)));
      });
    }
    return a;
  }, t.sortMenuItems = function (e) {
    e.sort(f);
  };
})
