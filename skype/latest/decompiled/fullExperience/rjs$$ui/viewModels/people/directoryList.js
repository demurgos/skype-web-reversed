define("ui/viewModels/people/directoryList", [
  "require",
  "ui/viewModels/people/baseList",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "vendor/knockout",
  "swx-constants",
  "swx-i18n",
  "swx-constants",
  "swx-enums",
  "lodash-compat",
  "ui/telemetry/actions/actionSources",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/menuItemHelper",
  "ui/contextMenu/items/all",
  "ui/telemetry/people/contactSearch"
], function (e) {
  function m() {
    function m() {
      return r.resolve(u.serviceLocator.PUBSUB);
    }
    function g(e) {
      return {
        source: e,
        parent: l.searchItem.skypeDirectory
      };
    }
    var e = this, f = t.prototype;
    this.listClass = i.observable(s.contactList.className.DIRECTORY);
    this.listTitle = i.observable(o.fetch({ key: "message_text_contactTitleDirectory" }));
    this.showListTitle = i.observable(!1);
    this.events = {
      results: v.DIRECTORY_SEARCH_RESULTS,
      rendered: v.DIRECTORY_SEARCH_RESULTS_RENDERED
    };
    this.historyLoadOrigin = u.telemetry.historyLoadOrigin.DIRECTORY_SEARCH;
    this.searchItemI18nKey = "accessibility_searchItem_directoryList";
    t.call(e, a.searchScope.SkypeDirectory);
    e.lastQuery = "";
    e.isActive = !1;
    e.init = function () {
      m().subscribe(v.DIRECTORY_SEARCH_ACTIVATED, e.activate);
      m().subscribe(v.DIRECTORY_SEARCH_DEACTIVATED, e.deactivate);
      f.init.call(e);
    };
    e.dispose = function () {
      m().unsubscribe(v.DIRECTORY_SEARCH_ACTIVATED, e.activate);
      m().unsubscribe(v.DIRECTORY_SEARCH_DEACTIVATED, e.deactivate);
      f.dispose.call(e);
    };
    e.search = function (n) {
      e.lastQuery = n;
      f.reset.call(e);
      if (e.isActive)
        return f.search.call(e, n, e.events);
    };
    e.openConversation = function (r) {
      var i = n.get().conversationsManager.getConversation(r.getPerson());
      f.sendOpenConversationEvent.call(e, i);
      d.onContactSearchEnd({
        searchScope: a.searchScope.SkypeDirectory,
        success: !0,
        resultCount: e.totalSearchResults,
        clickPosition: f.indexOfSelectedContactInSearchResults.call(e, r),
        source: l.search.reset.openConversation
      });
    };
    e.showContextMenu = function (t, n) {
      var r, i = { source: l.searchItem.skypeDirectory }, s = g(l.contextMenuItem.unblock), o = g(l.contextMenuItem.block);
      r = [
        new p.BlockContactMenuItem(t, o),
        new p.UnblockContactMenuItem(t, s)
      ];
      h.sortMenuItems(r);
      c.show(r, n, i);
    };
    e.activate = function () {
      e.isActive = !0;
      e.search(e.lastQuery);
    };
    e.deactivate = function () {
      e.isActive = !1;
    };
  }
  var t = e("ui/viewModels/people/baseList"), n = e("swx-cafe-application-instance"), r = e("swx-service-locator-instance").default, i = e("vendor/knockout"), s = e("swx-constants").PEOPLE, o = e("swx-i18n").localization, u = e("swx-constants").COMMON, a = e("swx-enums"), f = e("lodash-compat"), l = e("ui/telemetry/actions/actionSources"), c = e("ui/contextMenu/contextMenu"), h = e("ui/contextMenu/menuItemHelper"), p = e("ui/contextMenu/items/all"), d = e("ui/telemetry/people/contactSearch"), v = u.events.search;
  return m.prototype = f.create(t.prototype, { constructor: m }), m;
});
