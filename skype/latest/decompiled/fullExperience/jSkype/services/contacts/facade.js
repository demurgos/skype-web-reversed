define("jSkype/services/contacts/facade", [
  "require",
  "jSkype/client",
  "swx-enums",
  "jSkype/constants/data",
  "utils/common/cache/instance",
  "constants/common",
  "jSkype/settings",
  "jSkype/services/clientInfo",
  "jSkype/services/contacts/serviceSettings"
], function (e) {
  function f(e, l, c) {
    function h(e, t) {
      var n = a.getMyContactsEndpoint(e, a.version, t), r = c.build().then(function (e) {
          return l.get(n, e);
        });
      return r.then(function (e) {
        var t = e.request.getResponseHeader("ETag");
        t && c.setHeader(f.IF_NONE_MATCH, t);
      }), r;
    }
    function p(e, t) {
      return i.get().getItem(r.ETAG).then(function (n) {
        return n ? c.setHeader(f.IF_NONE_MATCH, n) : d(), c.build().then(function (n) {
          var r = a.getMyDeltaContactsEndpoint(e, a.version, t);
          return l.get(r, n);
        });
      });
    }
    function d() {
      c.setHeader(f.IF_NONE_MATCH, "/");
    }
    this.init = function () {
      d(), t.get().signInManager.state.when(n.loginState.SignedOut, function () {
        c.removeHeader(f.IF_NONE_MATCH);
      });
    }, this.getMyContacts = function (e, t) {
      return c.setServiceName(a.actions.getMyContacts), o.isFeatureOn(s.featureFlags.CONTACT_PROFILE_CACHE) ? p(e, t) : h(e, t);
    }, this.blockContact = function (t, n, r) {
      var i = a.getBlockContactEndpoint(e, t, n, a.version);
      return c.setOption("payload", JSON.stringify({
        "report-abuse": String(!!r),
        "ui-version": u.getBIVersion()
      })), c.setServiceName(a.actions.blockContact), c.build().then(function (e) {
        return l.put(i, e);
      });
    }, this.unblockContact = function (t, n) {
      var r = a.getUnblockContactEndpoint(e, t, n, a.version);
      return c.setServiceName(a.actions.unblockContact), c.build().then(function (e) {
        return l.put(r, e);
      });
    }, this.deleteContact = function (t, n) {
      var r = a.getDeleteContactEndpoint(e, t, n, a.version);
      return c.setServiceName(a.actions.deleteContact), c.build().then(function (e) {
        return l.remove(r, e);
      });
    };
  }
  var t = e("jSkype/client"), n = e("swx-enums"), r = e("jSkype/constants/data").storageKeys, i = e("utils/common/cache/instance"), s = e("constants/common"), o = e("jSkype/settings"), u = e("jSkype/services/clientInfo"), a = e("jSkype/services/contacts/serviceSettings");
  return f.IF_NONE_MATCH = "If-None-Match", f;
})
