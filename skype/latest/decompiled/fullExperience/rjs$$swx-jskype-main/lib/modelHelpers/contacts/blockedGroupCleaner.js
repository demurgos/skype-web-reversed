(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/blockedGroupCleaner", [
      "require",
      "exports",
      "../../../lib/modelHelpers/contacts/groupHelper",
      "../../../lib/modelHelpers/contacts/authorizationChange",
      "lodash-compat",
      "swx-mri"
    ], e);
}(function (e, t) {
  function o(e) {
    var t = n.getBlockedGroup(), s = u(t.persons(), e);
    i.forEach(s, function (e) {
      r.setUnblocked(e);
    });
  }
  function u(e, t) {
    var n = [];
    return i.forEach(e, function (e) {
      var r = i.find(t, function (t) {
        var n = s.getKey(e.id(), e._type());
        return n === t.mri;
      });
      r || n.push(e);
    }), n;
  }
  var n = e("../../../lib/modelHelpers/contacts/groupHelper"), r = e("../../../lib/modelHelpers/contacts/authorizationChange"), i = e("lodash-compat"), s = e("swx-mri");
  t.clean = o;
}));
