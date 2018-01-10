(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-mri/lib/mriMaps", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r;
  (function (e) {
    e.agent = "28";
    e.lync = "2";
    e.msn = "1";
    e.skype = "8";
    e.pstn = "4";
  }(r = t.contactMriTypes || (t.contactMriTypes = {})));
  var i;
  (function (e) {
    e.agent = "agent";
    e.lync = "lync";
    e.msn = "msn";
    e.skype = "skype";
    e.pstn = "pstn";
  }(i = t.contactTypeNames || (t.contactTypeNames = {})));
  t.contactTypes = {};
  t.contactTypes[i.agent] = r.agent;
  t.contactTypes[i.lync] = r.lync;
  t.contactTypes[i.msn] = r.msn;
  t.contactTypes[i.skype] = r.skype;
  t.contactTypes[i.pstn] = r.pstn;
  t.contactTypesByCode = n.invert(t.contactTypes);
}));
