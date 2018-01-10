(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/ABCHProfileService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f() {
    return new a();
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = {
      EMAIL: "PersonalContactProfile.Emails",
      PHONES: "PersonalContactProfile.Phones"
    }, s = { VERIFIED: "Verified" }, o = {
      SKYPE: "Skype",
      MSA: "Msa"
    }, u = { Name: "Skype" }, a = function () {
      function e() {
        var e = this;
        this.onSuccess = function (t) {
          return e.hasErrors(t) ? Promise.reject(e.getErrorMessage(t)) : Promise.resolve(e.getValues(t));
        };
        this.onError = function (e) {
          return Promise.reject(e);
        };
      }
      return e.prototype.getValues = function (e) {
        var t, r = [];
        if (!e.response || !e.response.Views)
          return r;
        var i = n.bind(this.extractProofs, this);
        return t = n.map(e.response.Views, "Attributes")[0], t.filter(this.filterByEmailPhone).reduce(i, r), n.sortBy(r, this.sortEmailFirst);
      }, e.prototype.hasErrors = function (e) {
        return !!(e.response && e.response.Errors && e.response.Errors.length > 0);
      }, e.prototype.getErrorMessage = function (e) {
        return e.response.Errors[0].Message;
      }, e.prototype.filterByEmailPhone = function (e) {
        return e.Name === i.EMAIL || e.Name === i.PHONES;
      }, e.prototype.sortEmailFirst = function (e) {
        return e.type;
      }, e.prototype.isSkypeSearchable = function (e) {
        switch (e.Source) {
        case o.SKYPE:
          return !0;
        case o.MSA:
          return !!e.HasSearchableApplications && n.some(e.SearchableApplications, u);
        default:
          return !1;
        }
      }, e.prototype.extractProofs = function (e, t) {
        var o = this;
        return t.Name === i.PHONES && n.forEach(t.Value, function (t) {
          if (t.State !== s.VERIFIED || !n.bind(o.isSkypeSearchable, o)(t))
            return;
          e.push({
            type: r.COMMON.proofTypes.PHONE,
            cc: t.Country,
            number: t.Name,
            value: t.Country.replace(/\w+-(\d+)/, "+$1") + t.Name,
            isSearchable: t.Searchable
          });
        }), t.Name === i.EMAIL && n.forEach(t.Value, function (t) {
          if (t.State !== s.VERIFIED || !n.bind(o.isSkypeSearchable, o)(t))
            return;
          e.push({
            type: r.COMMON.proofTypes.EMAIL,
            value: t.Name,
            isSearchable: t.Searchable
          });
        }), e;
      }, e;
    }();
  t.build = f;
}));
