define("services/telemetry/people/performance/performanceTelemetry", [
  "require",
  "usertiming",
  "constants/common",
  "services/telemetry/eventBus",
  "services/telemetry/people/performance/performanceAnalyser"
], function (e) {
  function s() {
    var e = i.build();
    r.get().subscribe(n.events.contacts.CONTACTS_LOADED, e.contactsLoaded);
  }
  function o() {
    var e = n.telemetry.performanceMarks;
    t.mark(e.CONTACTS.LIST_LOAD.START);
  }
  var t = e("usertiming"), n = e("constants/common"), r = e("services/telemetry/eventBus"), i = e("services/telemetry/people/performance/performanceAnalyser");
  return {
    init: function () {
      s(), o();
    }
  };
})
