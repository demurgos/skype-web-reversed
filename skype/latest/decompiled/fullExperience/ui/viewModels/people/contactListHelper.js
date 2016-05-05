define("ui/viewModels/people/contactListHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/people/organizePersons",
  "ui/viewModels/people/contactBuilder",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function o(e) {
    return e.isBlocked();
  }
  function u(e, t, n) {
    var i = r.getBucketName(t);
    n.contactGroups().some(function (n) {
      if (n.name === i)
        return n.contacts().some(function (n) {
          if (n.id() === t.id())
            return n.isActive(e), !0;
        }), !0;
    });
  }
  var n = e("lodash-compat"), r = e("utils/people/organizePersons"), i = e("ui/viewModels/people/contactBuilder"), s = e("ui/modelHelpers/personHelper");
  t.deselectContactFromDefaultList = function (e, t) {
    u(!1, e, t);
  }, t.selectContactFromDefaultList = function (e, t) {
    u(!0, e, t);
  }, t.filterSearchResults = function (e, n) {
    return e.reduce(function (e, r) {
      var s = r.result;
      return t.shouldPersonBeIncluded(s, n) ? e.concat([i.build(s)]) : e;
    }, []);
  }, t.organizeByAlphabet = function (e) {
    return r.byAlphabet(e);
  }, t.setObservablePropertyOnContacts = function (e, r, i) {
    function s(n) {
      t.setObservablePropertyOnContact(e, r, n);
    }
    if (!(n.isArray(i) && i.length > 0))
      return;
    n.isFunction(i[0].contacts) ? i.forEach(function (e) {
      e.contacts().forEach(s);
    }) : i.forEach(s);
  }, t.setObservablePropertyOnContact = function (e, t, r) {
    if (!r.hasOwnProperty(e))
      return;
    n.isFunction(t) && t.bind(r), r[e](t);
  }, t.personExistsInCollection = function (e, t) {
    function n(t) {
      return e.id() === t.id();
    }
    return t ? Boolean(t.filter(n).length) : !1;
  }, t.shouldPersonBeIncluded = function (e, n) {
    var r = t.personExistsInCollection(e, n), i = s.isEchoContact(e);
    return !r && !o(e) && !i;
  };
})
