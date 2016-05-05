define("jSkype/modelHelpers/personsRegistry/registry", [
  "require",
  "lodash-compat",
  "jSkype/utils/batch",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/contacts/dataProcessors/agents"
], function (e) {
  function f() {
    function l(e) {
      s.getStratusService().getProfiles(e).then(f.onSuccess, f.onError);
    }
    function c(e) {
      return p(e.id()) && e._type() === o.contactTypes[o.contactTypeNames.skype] && (e._authorization() === a.UNAUTHORIZED || e._authorization() === a.PENDING_INCOMING);
    }
    function h(e) {
      return e._type() === o.contactTypes[o.contactTypeNames.agent] && e._authorization() === a.UNAUTHORIZED;
    }
    function p(e) {
      var n = /.+\@.+\..+/;
      if (t.isString(e))
        return !e.match(n);
    }
    var e = {}, r = n.create(l), f = i.getBatchProfileHandlers();
    this.defaultPersonAuthorization = a.UNKNOWN, this.get = function (t) {
      return e[t];
    }, this.add = function (t, n) {
      var i = t.id();
      e[i] = t, n || (h(t) ? u.build().process([t]) : c(t) && r.add(i));
    }, this.filter = function (e) {
      return this.toArray().filter(e);
    }, this.toArray = function () {
      var t = [];
      return Object.keys(e).forEach(function (n) {
        var r = e[n];
        t.push(r);
      }), t;
    }, this.dispose = function () {
      r.clear();
    };
  }
  var t = e("lodash-compat"), n = e("jSkype/utils/batch"), r = e("jSkype/constants/people"), i = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), s = e("jSkype/services/serviceFactory"), o = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), u = e("jSkype/modelHelpers/contacts/dataProcessors/agents"), a = r.authorizationStates;
  return f;
})
