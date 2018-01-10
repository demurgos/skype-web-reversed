define("ui/viewModels/people/baseContactList", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "swx-cafe-application-instance",
  "swx-constants",
  "swx-enums",
  "browser/dom",
  "browser/window",
  "utils/common/ko",
  "utils/common/eventMixin",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/viewModels/people/contactListHelper",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/telemetry/actions/actionSources",
  "utils/common/scroll",
  "ui/viewModels/people/contactGroup",
  "ui/modelHelpers/groupHelper",
  "ui/contextMenu/menuItemHelper"
], function (e) {
  function S() {
    function t() {
      return e.isSelectable() ? x("selectable") : x("default");
    }
    var e = this;
    e.contactGroups = n.observableArray();
    e.contactsCount = n.observable(0);
    e.batchTimers = [];
    e.exclusionList = [];
    e.subscriptions = {};
    e.isSelectable = n.observable(!1);
    e.templateName = n.computed(t);
  }
  function x(e) {
    return "contactList-" + e;
  }
  function T(e) {
    return u.getElement("div.scrollinWrapper", e);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("swx-cafe-application-instance"), s = e("swx-constants").COMMON, o = e("swx-enums"), u = e("browser/dom"), a = e("browser/window"), f = e("utils/common/ko"), l = e("utils/common/eventMixin"), c = e("swx-constants").COMMON.serviceLocator, h = e("swx-service-locator-instance").default, p = e("ui/viewModels/people/contactListHelper"), d = e("ui/contextMenu/contextMenu"), v = e("ui/contextMenu/items/all"), m = e("ui/telemetry/actions/actionSources"), g = e("utils/common/scroll"), y = e("ui/viewModels/people/contactGroup"), b = e("ui/modelHelpers/groupHelper"), w = e("ui/contextMenu/menuItemHelper"), E = s.telemetry.historyLoadOrigin.CONTACTS_PAGE;
  return t.assign(S.prototype, l, {
    init: function (e, t) {
      return this.isSelectable(Boolean(e.isSelectable)), this.scrollbar = g.build(T(t)), this.scrollbar.init(), this.contactGroupConstructor = e.contactGroupConstructor || y, this.populate(e, t);
    },
    populate: function () {
      function i() {
        e.populateGroups(n());
      }
      var e = this, t = h.resolve(c.SUBSCRIPTION_PROVIDER), n = t.getPersonsObservable(), r = t.getFavoritesObservable();
      return e.subscriptions.persons = n.subscribe(i, null, "arrayChange"), e.subscriptions.favorites = r.subscribe(i, null, "arrayChange"), i(), Promise.resolve();
    },
    populateGroups: function (e) {
      function a(e) {
        return n.contactGroupConstructor.build({
          name: r.fetch({ key: "favorites_recents_category_name" }),
          contacts: e
        });
      }
      function f(e) {
        return e ? p.organizeByAlphabet(e).map(n.contactGroupConstructor.build) : [];
      }
      function l(e) {
        return n.shouldPersonBeIncluded(e, n.exclusionList);
      }
      function c(e) {
        function i(e, n) {
          return t.some(e, function (e) {
            return e.id() === n.id();
          });
        }
        var n = b.getPersonsFromGroup(o.groupType.Favorites), r = i.bind(null, n);
        return t.groupBy(e, function (e) {
          return r(e) ? o.groupType.Favorites : o.groupType.None;
        });
      }
      var n = this, i = e.filter(l), s = c(i), u = [].concat(a(s[o.groupType.Favorites]), f(s[o.groupType.None]));
      n.contactsCount(i.length);
      n.setContactGroups(u);
    },
    dispose: function () {
      this.contactsCount(0);
      this.exclusionList = [];
      f.disposeAndClearArray(this.contactGroups);
      this.scrollbar.dispose();
      this.templateName.dispose && this.templateName.dispose();
      this.subscriptions && (this.subscriptions.persons && this.subscriptions.persons.dispose(), this.subscriptions.favorites && this.subscriptions.favorites.dispose());
      this.batchTimers = this.batchTimers.reduce(function (e, t) {
        return a.clearTimeout(t), e;
      }, []);
    },
    afterRender: function (e) {
      return e || t.noop;
    },
    openConversation: function (e, n, r) {
      var o = h.resolve(s.serviceLocator.PUBSUB), u = {
          model: i.get().conversationsManager.getConversation(e.getPerson()),
          origin: E
        };
      t.assign(u, r);
      o.publish(s.events.navigation.OPEN_CONVERSATION, u);
    },
    setContactGroups: function (e) {
      e.length === 0 ? this.contactGroups(e) : this.addNextGroup(e, []);
    },
    addNextGroup: function (e, t) {
      var n, r;
      e.length > 0 && (r = e.shift(), r.init(), this.applyPropertyChangeToContacts(r.contacts()), t = t.concat(r), n = this.addNextGroup.bind(this, e, t), this.contactGroups(t), this.batchTimers.push(a.setTimeout(n, 10)));
    },
    showContextMenu: function (e, t, n) {
      var r = [];
      r.push(w.getConversationContextMenuItemGroup(e, E, n));
      r.push(new v.BlockContactMenuItem(e, w.getMenuItemTelemetryContext(m.contextMenuItem.block, n)));
      r.push(new v.UnblockContactMenuItem(e, w.getMenuItemTelemetryContext(m.contextMenuItem.unblock, n)));
      r.push(new v.DeleteContactMenuItem(e, w.getMenuItemTelemetryContext(m.contextMenuItem.deleteItem, n)));
      r.push(new v.AddContactToFavoritesMenuItem(e, w.getMenuItemTelemetryContext(m.contextMenuItem.addContactToFavorites, n)));
      r.push(new v.RemoveContactFromFavoritesMenuItem(e, w.getMenuItemTelemetryContext(m.contextMenuItem.removeContactFromFavorites, n)));
      w.sortMenuItems(r);
      d.show(r, t, n);
    },
    shouldPersonBeIncluded: p.shouldPersonBeIncluded,
    applyPropertyChangeToContacts: t.noop
  }), S;
});
