define("services/telemetry/people/performance/performanceAnalyser", [
  "require",
  "constants/common",
  "usertiming",
  "ui/telemetry/telemetryClient",
  "experience/settings"
], function (e) {
  function a() {
    function a(e) {
      Object.keys(e).forEach(function (t) {
        n.clearMarks(e[t]);
      });
    }
    function c(e) {
      Object.keys(e).forEach(function (t) {
        n.clearMeasures(e[t]);
      });
    }
    var e = this;
    e.contactsLoaded = function (e) {
      if (e && f(s.CONTACTS.LIST_LOAD.START)) {
        n.mark(s.CONTACTS.LIST_LOAD.END), n.measure(o.CONTACTS.LIST_LOAD.TTC, s.CONTACTS.LIST_LOAD.START, s.CONTACTS.LIST_LOAD.END);
        var h = {
          name: u.LOAD_CONTACTS,
          contactsCount: e.contactsCount ? e.contactsCount : 0,
          renderDuration: l(o.CONTACTS.LIST_LOAD.TTC)
        };
        r.get().sendEvent(i.telemetry.uiTenantToken, t.telemetry.contacts.type.CONTACTS, h);
      }
      a(s.CONTACTS.LIST_LOAD), c(o.CONTACTS.LIST_LOAD);
    };
  }
  function f(e) {
    return n.getEntriesByName(e).length > 0;
  }
  function l(e) {
    var t, r = n.getEntriesByName(e);
    return r && r.length && (t = r[0].duration), t === undefined || t === null ? "undefined" : t;
  }
  var t = e("constants/common"), n = e("usertiming"), r = e("ui/telemetry/telemetryClient"), i = e("experience/settings"), s = t.telemetry.performanceMarks, o = t.telemetry.measurements, u = t.telemetry.subCategories;
  return {
    build: function () {
      return new a();
    }
  };
})
