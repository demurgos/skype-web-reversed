define("ui/viewModels/people/directoryList", [
  "require",
  "ui/viewModels/people/baseList",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "constants/common",
  "swx-enums",
  "lodash-compat",
  "ui/telemetry/actions/actionSources",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all"
], function (e) {
  function c() {
    function c() {
      return r.resolve(i.serviceLocator.PUBSUB);
    }
    function h(e) {
      return {
        source: e,
        parent: u.searchItem.skypeDirectory
      };
    }
    var e = this, o = t.prototype;
    t.call(e, s.searchScope.SkypeDirectory), e.lastQuery = "", e.isActive = !1, e.init = function () {
      c().subscribe(l.DIRECTORY_SEARCH_ACTIVATED, e.activate), c().subscribe(l.DIRECTORY_SEARCH_DEACTIVATED, e.deactivate), o.init.call(e);
    }, e.dispose = function () {
      c().unsubscribe(l.DIRECTORY_SEARCH_ACTIVATED, e.activate), c().unsubscribe(l.DIRECTORY_SEARCH_DEACTIVATED, e.deactivate), o.dispose.call(e);
    }, e.search = function (n) {
      e.lastQuery = n, o.reset.call(e);
      if (e.isActive)
        return o.search.call(e, n);
    }, e.openConversation = function (r) {
      var i = n.get().conversationsManager.getConversation(r.getPerson());
      o.sendOpenConversationEvent.call(e, i);
    }, e.showContextMenu = function (t, n) {
      var r, i = { source: u.searchItem.skypeDirectory }, s = h(u.contextMenuItem.unblock);
      r = [new f.UnblockContactMenuItem(t, s)], a.show(r, n, i);
    }, e.activate = function () {
      e.isActive = !0, e.search(e.lastQuery);
    }, e.deactivate = function () {
      e.isActive = !1;
    };
  }
  var t = e("ui/viewModels/people/baseList"), n = e("cafe/applicationInstance"), r = e("services/serviceLocator"), i = e("constants/common"), s = e("swx-enums"), o = e("lodash-compat"), u = e("ui/telemetry/actions/actionSources"), a = e("ui/contextMenu/contextMenu"), f = e("ui/contextMenu/items/all"), l = i.events.search;
  return c.prototype = o.create(t.prototype, { constructor: c }), c;
})
