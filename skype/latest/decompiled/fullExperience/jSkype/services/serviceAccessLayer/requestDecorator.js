define("jSkype/services/serviceAccessLayer/requestDecorator", [
  "require",
  "jSkype/services/serviceAccessLayer/decorations/retry",
  "jSkype/services/serviceAccessLayer/decorations/availability",
  "jSkype/services/serviceAccessLayer/decorations/reporting"
], function (e) {
  function s(e, t) {
    function r(e) {
      var r = t[e.policyName];
      r && (n = e.decoration.build(n, r));
    }
    var n = e;
    return t ? (i.forEach(r), n) : e;
  }
  var t = e("jSkype/services/serviceAccessLayer/decorations/retry"), n = e("jSkype/services/serviceAccessLayer/decorations/availability"), r = e("jSkype/services/serviceAccessLayer/decorations/reporting"), i = [
      {
        decoration: n,
        policyName: "availability"
      },
      {
        decoration: t,
        policyName: "retry"
      },
      {
        decoration: r,
        policyName: "reporting"
      }
    ];
  return { build: s };
})
