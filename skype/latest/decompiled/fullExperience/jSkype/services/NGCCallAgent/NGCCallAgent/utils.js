define("jSkype/services/NGCCallAgent/NGCCallAgent/utils", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  function r(e) {
    var t = e.toString(16), n = 4 - t.length, r;
    for (r = 0; r < n; r += 1)
      t = "0" + t;
    return t;
  }
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), n = {};
  return n.newGuid = function () {
    var e = new Array(8), t, n;
    for (n = 0; n < e.length; n += 2)
      t = Math.floor(Math.random() * 4294967296), e[n] = r(t & 65535), e[n + 1] = r(t >>> 16), n + 1 === 3 && (e[n + 1] = "4" + e[n + 1].substring(1));
    return e[0] + e[1] + "-" + e[2] + "-" + e[3] + "-" + e[4] + "-" + e[5] + e[6] + e[7];
  }, n.assert = function (e, t) {
    if (!e)
      throw new Error("Assert failed" + (typeof t != "undefined" ? ":" + t : ""));
  }, n.assertNotNullOrEmpty = function (e, t) {
    if (!e || e === " ")
      throw new Error("AssertNotNullOrEmpty failed. " + (typeof t != "undefined" ? ": " + t : ""));
  }, n.assertNotNull = function (e, t) {
    if (!e)
      throw new Error("AssertNotNull failed. " + (typeof t != "undefined" ? ": " + t : ""));
  }, n.assertCallEndReason = function (e) {
    n.assertNotNullOrEmpty(e, "callEndReason cannot be null or empty");
    if (typeof e.code == "undefined" || typeof e.subCode == "undefined" || typeof e.phrase == "undefined" || e.code < 0 || e.subCode < 0 || e.phrase === " ")
      throw new Error("callEndReason must specify code, subcode and phrase. Invalid reason : " + n.getPrintableObject(e));
  }, n.getMediaTypes = function (e) {
    n.assertNotNull(e, "MediaTypes passed cannot be null"), n.assert(e.length > 0, "Atleast one mediaType must be specified");
    var r = [];
    for (var i in t.MEDIA_TYPES)
      n.arrayContains(e, t.MEDIA_TYPES[i]) && r.push(t.MEDIA_TYPES[i]);
    return r;
  }, n.stringContains = function (e, t) {
    return e.indexOf(t) > -1;
  }, n.stringEndsWith = function (e, t) {
    return e.length >= t.length && e.indexOf(t, e.length - t.length) > -1;
  }, n.arrayContains = function (e, t) {
    var n = t.toLowerCase();
    return -1 < e.map(function (e) {
      return e.toLowerCase();
    }).indexOf(n);
  }, n.getPrintableObject = function (e) {
    return JSON.stringify(e, null, 4);
  }, n.tryAddNewKeyToHashTable = function (e, t, n) {
    return e.hasOwnProperty(t) ? !1 : (e[t] = n, !0);
  }, n.tryRemoveKeyFromHashTable = function (e, t) {
    return e.hasOwnProperty(t) ? (delete e[t], !0) : !1;
  }, n.getHashTableCount = function (e) {
    var t = 0;
    for (var n in e)
      e.hasOwnProperty(n) && t++;
    return t;
  }, n.escapeRegExp = function (e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }, n.safelyResolvePromise = function (e, t) {
    e && e.promise.state() === "pending" && e.resolve(t);
  }, n.safelyRejectPromise = function (e, t) {
    e && e.promise.state() === "pending" && e.reject(t);
  }, n;
})
