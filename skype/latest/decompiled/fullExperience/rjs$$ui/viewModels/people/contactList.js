define("ui/viewModels/people/contactList", [
  "require",
  "lodash-compat",
  "swx-constants",
  "vendor/knockout",
  "swx-constants",
  "swx-i18n",
  "swx-cafe-application-instance",
  "swx-enums",
  "swx-service-locator-instance",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/contextMenu/menuItemHelper",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/baseList",
  "ui/telemetry/people/contactSearch"
], function (e) {
  function m() {
    function m(e) {
      return {
        source: e,
        parent: h.searchItem.addressBook
      };
    }
    var e = this, t = p.prototype;
    this.listClass = r.observable(i.contactList.className.LOCAL);
    this.listTitle = r.observable(s.fetch({ key: "message_text_contactTitleLocal" }));
    this.events = {
      results: v.LOCAL_SEARCH_RESULTS,
      rendered: v.LOCAL_SEARCH_RESULTS_RENDERED
    };
    this.historyLoadOrigin = n.telemetry.historyLoadOrigin.CONTACT_SEARCH;
    this.searchItemI18nKey = "accessibility_searchItem_oneToOne";
    p.call(e, u.searchScope.AddressBook);
    this.showListTitle(!0);
    e.search = function (r) {
      e.contacts([]);
      t.search.call(e, r, e.events);
    };
    e.openConversation = function (i) {
      var s = a.resolve(n.serviceLocator.PUBSUB), f = o.get().conversationsManager.getConversation(i.getPerson()), l = { source: h.search.reset.openConversation };
      o.get().conversationsManager.conversations.add(f);
      s.publish(n.events.search.RESET, l);
      t.sendOpenConversationEvent.call(e, f);
      d.onContactSearchEnd({
        searchScope: u.searchScope.AddressBook,
        success: !0,
        resultCount: e.totalSearchResults,
        clickPosition: t.indexOfSelectedContactInSearchResults.call(e, i),
        source: h.search.reset.openConversation
      });
    };
    e.showContextMenu = function (t, r) {
      var i = { source: h.searchItem.addressBook }, s = m(h.contextMenuItem.block), o = m(h.contextMenuItem.unblock), u = m(h.contextMenuItem.deleteItem), a = m(h.contextMenuItem.addContactToFavorites), p = m(h.contextMenuItem.removeContactFromFavorites), d = [];
      d.push(c.getConversationContextMenuItemGroup(t, n.telemetry.historyLoadOrigin.CONTACT_SEARCH, i));
      d.push(new l.BlockContactMenuItem(t, s));
      d.push(new l.UnblockContactMenuItem(t, o));
      d.push(new l.DeleteContactMenuItem(t, u));
      d.push(new l.AddContactToFavoritesMenuItem(t, a));
      d.push(new l.RemoveContactFromFavoritesMenuItem(t, p));
      c.sortMenuItems(d);
      f.show(d, r, i);
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("vendor/knockout"), i = e("swx-constants").PEOPLE, s = e("swx-i18n").localization, o = e("swx-cafe-application-instance"), u = e("swx-enums"), a = e("swx-service-locator-instance").default, f = e("ui/contextMenu/contextMenu"), l = e("ui/contextMenu/items/all"), c = e("ui/contextMenu/menuItemHelper"), h = e("ui/telemetry/actions/actionSources"), p = e("ui/viewModels/people/baseList"), d = e("ui/telemetry/people/contactSearch"), v = n.events.search;
  return m.prototype = t.create(p.prototype, { constructor: m }), m;
});
