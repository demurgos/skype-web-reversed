define("ui/viewModels/people/baseContactList", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "cafe/applicationInstance",
  "constants/common",
  "browser/dom",
  "browser/window",
  "utils/common/ko",
  "utils/common/eventMixin",
  "constants/common",
  "services/serviceLocator",
  "ui/viewModels/people/contactListHelper",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/telemetry/actions/actionSources",
  "utils/common/scroll",
  "ui/shortCircuit/shortCircuit",
  "ui/viewModels/people/contactGroup",
  "ui/contextMenu/menuItemHelper"
], function (e) {
  function w() {
    function t() {
      return e.isSelectable() ? E("selectable") : E("default");
    }
    var e = this;
    e.contactGroups = n.observableArray(), e.contactsCount = n.observable(0), e.batchTimers = [], e.exclusionList = [], e.subscriptions = {}, e.isSelectable = n.observable(!1), e.templateName = n.computed(t), e.isShortCircuitEnabled = n.observable(!1);
  }
  function E(e) {
    return "contactList-" + e;
  }
  function S(e) {
    return s.getElement("div.scrollinWrapper", e);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("cafe/applicationInstance"), i = e("constants/common"), s = e("browser/dom"), o = e("browser/window"), u = e("utils/common/ko"), a = e("utils/common/eventMixin"), f = e("constants/common").serviceLocator, l = e("services/serviceLocator"), c = e("ui/viewModels/people/contactListHelper"), h = e("ui/contextMenu/contextMenu"), p = e("ui/contextMenu/items/all"), d = e("ui/telemetry/actions/actionSources"), v = e("utils/common/scroll"), m = e("ui/shortCircuit/shortCircuit"), g = e("ui/viewModels/people/contactGroup"), y = e("ui/contextMenu/menuItemHelper"), b = i.telemetry.historyLoadOrigin.CONTACTS_PAGE;
  return t.assign(w.prototype, a, {
    init: function (e, t) {
      return this.isSelectable(Boolean(e.isSelectable)), this.scrollbar = v.build(S(t)), this.scrollbar.init(), this.populate(e, t);
    },
    populate: function (e) {
      function o() {
        i().forEach(function (e) {
          e.displayName() === undefined && u(e);
        }), n.populateGroups(i(), e);
      }
      function u(r) {
        function o() {
          t.contains(s, r) && (t.remove(s, r), n.populateGroups(i(), e));
        }
        t.contains(s, r) || (s.push(r), r.displayName.get().then(o));
      }
      var n = this, r = l.resolve(f.SUBSCRIPTION_PROVIDER), i = r.getPersonsObservable(), s = [];
      return e.isShortCircuitEnabledOnce = t.once(m.build().isEnabled), n.subscriptions.persons = i.subscribe(o, null, "arrayChange"), o(), Promise.resolve();
    },
    populateGroups: function (e, t) {
      var n = this, r = e.filter(function (e) {
          return e.displayName() !== undefined && n.shouldPersonBeIncluded(e, n.exclusionList);
        }), i = t.contactGroupConstructor || g, s = c.organizeByAlphabet(r).map(function (e) {
          return i.build(e);
        });
      n.contactsCount(r.length), n.setContactGroups(s), n.contactsCount() === 0 && !!t.isShortCircuitEnabledOnce && t.isShortCircuitEnabledOnce().then(function (e) {
        n.isShortCircuitEnabled(e);
      });
    },
    dispose: function () {
      this.contactsCount(0), this.exclusionList = [], u.disposeAndClearArray(this.contactGroups), this.scrollbar.dispose(), this.templateName.dispose(), this.subscriptions && this.subscriptions.persons && this.subscriptions.persons.dispose(), this.batchTimers = this.batchTimers.reduce(function (e, t) {
        return o.clearTimeout(t), e;
      }, []);
    },
    afterRender: function (e) {
      return e || t.noop;
    },
    openConversation: function (e, n, s) {
      var o = l.resolve(i.serviceLocator.PUBSUB), u = {
          model: r.get().conversationsManager.getConversation(e.getPerson()),
          origin: b
        };
      t.assign(u, s), o.publish(i.events.navigation.OPEN_CONVERSATION, u);
    },
    setContactGroups: function (e) {
      e.length === 0 ? this.contactGroups(e) : this.addNextGroup(e, []);
    },
    addNextGroup: function (e, t) {
      var n, r;
      e.length > 0 && (r = e.shift(), this.applyPropertyChangeToContacts(r.contacts()), t = t.concat(r), n = this.addNextGroup.bind(this, e, t), this.contactGroups(t), this.batchTimers.push(o.setTimeout(n, 10)));
    },
    showContextMenu: function (e, t, n) {
      var r = [];
      r.push(y.getConversationContextMenuItemGroup(e, b, n)), r.push(new p.BlockContactMenuItem(e, y.getMenuItemTelemetryContext(d.contextMenuItem.block, n))), r.push(new p.UnblockContactMenuItem(e, y.getMenuItemTelemetryContext(d.contextMenuItem.unblock, n))), r.push(new p.DeleteContactMenuItem(e, b, y.getMenuItemTelemetryContext(d.contextMenuItem.deleteItem, n))), y.sortMenuItems(r), h.show(r, t, n);
    },
    shouldPersonBeIncluded: c.shouldPersonBeIncluded,
    applyPropertyChangeToContacts: t.noop
  }), w;
})
