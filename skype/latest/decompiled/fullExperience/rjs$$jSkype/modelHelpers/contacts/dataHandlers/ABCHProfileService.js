define("jSkype/modelHelpers/contacts/dataHandlers/ABCHProfileService", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common"
], function (e, t) {
  function o() {
    function e(e) {
      var t = [];
      return !e.response || !e.response.Views ? t : (n.map(e.response.Views, "Attributes")[0].filter(u).reduce(f, t), n.sortBy(t, a));
    }
    function t(e) {
      return !!(e.response && e.response.Errors && e.response.Errors.length > 0);
    }
    function o(e) {
      return e.response.Errors[0].Message;
    }
    function u(e) {
      return e.Name === i.EMAIL || e.Name === i.PHONES;
    }
    function a(e) {
      return e.type;
    }
    function f(e, t) {
      return t.Name === i.PHONES && n.forEach(t.Value, function (t) {
        if (t.State !== s.VERIFIED)
          return;
        e.push({
          type: r.proofTypes.PHONE,
          cc: t.Country,
          number: t.Name,
          value: t.Country.replace(/\w+-(\d+)/, "+$1") + t.Name,
          isSearchable: t.Searchable
        });
      }), t.Name === i.EMAIL && n.forEach(t.Value, function (t) {
        if (t.State !== s.VERIFIED)
          return;
        e.push({
          type: r.proofTypes.EMAIL,
          value: t.Name,
          isSearchable: t.Searchable
        });
      }), e;
    }
    this.onSuccess = function (n) {
      return t(n) ? Promise.reject(o(n)) : Promise.resolve(e(n));
    }, this.onError = function (e) {
      return Promise.reject(e);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = {
      EMAIL: "PersonalContactProfile.Emails",
      PHONES: "PersonalContactProfile.Phones"
    }, s = { VERIFIED: "Verified" };
  t.build = function () {
    return new o();
  };
})
