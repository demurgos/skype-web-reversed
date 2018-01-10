(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/personsRegistry/registry", [
      "require",
      "exports",
      "lodash-compat",
      "../../utils/batch",
      "jskype-constants",
      "../../modelHelpers/contacts/dataHandlers/batchProfiles",
      "../../services/stratus/instance",
      "../../modelHelpers/personHelper",
      "../../models/person",
      "../../modelHelpers/contacts/dataProcessors/agents",
      "swx-mri/lib/mriMaps"
    ], e);
}(function (e, t) {
  function p(e, t) {
    t && n.isString(t) && (e._type._set(t), t === l.contactMriTypes.agent && e.isAgent._set(!0));
  }
  function d(e) {
    u.isPstn(e) ? (e.capabilities.video._set(!1), e.capabilities.chat._set(!1), e.capabilities.screenSharing._set(!1)) : u.isEchoContact(e) && (e.capabilities.video._set(!1), e.capabilities.screenSharing._set(!1));
  }
  function v(e) {
    return g(e.id()) && e._type() === l.contactMriTypes.skype && (e._authorization() === c.UNAUTHORIZED || e._authorization() === c.PENDING_INCOMING);
  }
  function m(e) {
    return e._type() === l.contactMriTypes.agent && e._authorization() === c.UNAUTHORIZED;
  }
  function g(e) {
    var t = /.+\@.+\..+/;
    return n.isString(e) ? !e.match(t) : undefined;
  }
  var n = e("lodash-compat"), r = e("../../utils/batch"), i = e("jskype-constants"), s = e("../../modelHelpers/contacts/dataHandlers/batchProfiles"), o = e("../../services/stratus/instance"), u = e("../../modelHelpers/personHelper"), a = e("../../models/person"), f = e("../../modelHelpers/contacts/dataProcessors/agents"), l = e("swx-mri/lib/mriMaps"), c = i.PEOPLE.authorizationStates, h = function () {
      function e() {
        function l(e) {
          e && e.length && o.get().getProfiles(e).then(i.onSuccess, i.onError);
        }
        var e = this;
        this.defaultPersonAuthorization = c.UNKNOWN;
        this.create = function (t, r, i) {
          var s = new a["default"](t);
          return i && n.isString(i) ? s._authorization._set(i) : s._authorization._set(e.defaultPersonAuthorization), p(s, r), d(s), s;
        };
        this.getOrCreate = function (t, n, r, i) {
          var s = e.get(t);
          return s || (s = e.create(t, n, r), e.add(s, i)), s;
        };
        this.filter = function (t) {
          return e.toArray().filter(t);
        };
        var t = {}, i = s.build(this), u = r.create(l);
        this.get = function (e) {
          return t[e];
        };
        this.add = function (e, n) {
          var r = e.id();
          t[r] = e;
          n || (m(e) ? f.process([e]) : v(e) && u.add(r));
        };
        this.toArray = function () {
          var e = [];
          return Object.keys(t).forEach(function (n) {
            var r = t[n];
            e.push(r);
          }), e;
        };
        this.dispose = function () {
          return u.clear();
        };
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = h;
}));
