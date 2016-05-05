define("ui/viewModels/people/contactList", [
  "require",
  "lodash-compat",
  "constants/common",
  "cafe/applicationInstance",
  "swx-enums",
  "services/serviceLocator",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/contextMenu/menuItemHelper",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/baseList"
], function (e) {
  function c() {
    function c(e) {
      return {
        source: e,
        parent: f.searchItem.addressBook
      };
    }
    var e = this, t = l.prototype;
    l.call(e, i.searchScope.AddressBook), e.search = function (r) {
      return e.contacts([]), t.search.call(e, r);
    }, e.openConversation = function (o) {
      var u = s.resolve(n.serviceLocator.PUBSUB), a = r.get().conversationsManager.getConversation(o.getPerson()), l = { source: f.search.reset.openConversation };
      r.get().conversationsManager.conversations.add(a), u.publish(n.events.search.RESET, l), t.sendOpenConversationEvent.call(e, a);
    }, e.showContextMenu = function (t, r) {
      var i = { source: f.searchItem.addressBook }, s = c(f.contextMenuItem.block), l = c(f.contextMenuItem.unblock), h = c(f.contextMenuItem.deleteItem), p = [];
      p.push(a.getConversationContextMenuItemGroup(t, n.telemetry.historyLoadOrigin.CONTACT_SEARCH, i)), p.push(new u.BlockContactMenuItem(t, s)), p.push(new u.UnblockContactMenuItem(t, l)), p.push(new u.DeleteContactMenuItem(t, n.telemetry.historyLoadOrigin.CONTACT_SEARCH, h)), a.sortMenuItems(p), o.show(p, r, i);
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("cafe/applicationInstance"), i = e("swx-enums"), s = e("services/serviceLocator"), o = e("ui/contextMenu/contextMenu"), u = e("ui/contextMenu/items/all"), a = e("ui/contextMenu/menuItemHelper"), f = e("ui/telemetry/actions/actionSources"), l = e("ui/viewModels/people/baseList");
  return c.prototype = t.create(l.prototype, { constructor: c }), c;
})
