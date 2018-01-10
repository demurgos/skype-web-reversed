(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/utils", [
      "require",
      "exports",
      "./constants"
    ], e);
}(function (e, t) {
  function i(e) {
    var t = e.toString(16), n = 4 - t.length;
    for (var r = 0; r < n; r += 1)
      t = "0" + t;
    return t;
  }
  function s() {
    var e = new Array(8);
    for (var t = 0; t < e.length; t += 2) {
      var n = Math.floor(Math.random() * 4294967296);
      e[t] = i(n & 65535);
      e[t + 1] = i(n >>> 16);
      t + 1 === 3 && (e[t + 1] = "4" + e[t + 1].substring(1));
    }
    return e[0] + e[1] + "-" + e[2] + "-" + e[3] + "-" + e[4] + "-" + e[5] + e[6] + e[7];
  }
  function o(e, t) {
    if (!e)
      throw new Error("Assert failed" + (typeof t != "undefined" ? ":" + t : ""));
  }
  function u(e, t) {
    if (!e || e === " ")
      throw new Error("AssertNotNullOrEmpty failed. " + (typeof t != "undefined" ? ": " + t : ""));
  }
  function a(e, t) {
    if (!e)
      throw new Error("AssertNotNull failed. " + (typeof t != "undefined" ? ": " + t : ""));
  }
  function f(e) {
    u(e, "callEndReason cannot be null or empty");
    if (typeof e.code == "undefined" || typeof e.subCode == "undefined" || typeof e.phrase == "undefined" || e.code < 0 || e.subCode < 0 || e.phrase === " ")
      throw new Error("callEndReason must specify code, subCode and phrase. Invalid reason : " + d(e));
  }
  function l(e) {
    a(e, "MediaTypes passed cannot be null");
    o(e.length > 0, "Atleast one mediaType must be specified");
    var t = [], r = n["default"].MEDIA_TYPES;
    for (var i in r)
      p(e, r[i]) && t.push(r[i]);
    return t;
  }
  function c(e, t) {
    return e.indexOf(t) > -1;
  }
  function h(e, t) {
    return e.length >= t.length && e.indexOf(t, e.length - t.length) > -1;
  }
  function p(e, t) {
    var n = t.toLowerCase();
    return -1 < e.map(function (e) {
      return e.toLowerCase();
    }).indexOf(n);
  }
  function d(e) {
    return JSON.stringify(e, r, 4);
  }
  function v(e, t, n) {
    return e.hasOwnProperty(t) ? !1 : (e[t] = n, !0);
  }
  function m(e, t) {
    return e.hasOwnProperty(t) ? (delete e[t], !0) : !1;
  }
  function g(e) {
    var t = 0;
    for (var n in e)
      e.hasOwnProperty(n) && t++;
    return t;
  }
  function y(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function b(e) {
    return e.status && e.status === n["default"].CALL_END_CODE.NOT_FOUND ? {
      telemetryEndSubCode: n["default"].CALL_END_CODE.NOT_FOUND,
      error: n["default"].RESOURCE_NOT_FOUND_ERROR
    } : e.skypeTokenError ? {
      telemetryEndSubCode: n["default"].CALL_END_CODE.SKYPE_TOKEN_ERROR,
      error: n["default"].CALL_END_SKYPE_TOKEN_ERROR
    } : e.response && e.response.operationFailure ? {
      telemetryEndSubCode: e.response.operationFailure.code,
      error: e.response.operationFailure
    } : e.response && e.response.code ? {
      telemetryEndSubCode: e.response.code,
      error: e.response
    } : e.status && e.status === 0 ? {
      telemetryEndSubCode: n["default"].CALL_END_CODE.LOCAL_HTTP_STACK_ERROR,
      error: n["default"].CALL_END_LOCAL_HTTP_STACK_ERROR
    } : {
      telemetryEndSubCode: n["default"].CALL_END_CODE.NETWORK_ERROR,
      error: n["default"].CALL_END_NETWORK_ERROR
    };
  }
  function w(e, t) {
    if (e && t) {
      var r = null, i = null;
      return e.hasOwnProperty(n["default"].HEADERS.ORIGINAL_MESSAGE_ID) && (r = e[n["default"].HEADERS.ORIGINAL_MESSAGE_ID]), e.hasOwnProperty(n["default"].HEADERS.MESSAGE_ID) && (i = e[n["default"].HEADERS.MESSAGE_ID]), r && t.hasOwnProperty(r) ? !0 : r ? (t[r] = !0, !1) : (t[i] = !0, !1);
    }
    return !1;
  }
  function E() {
    var e, t, n = !0, r = new Promise(function (n, r) {
        e = n;
        t = r;
      });
    return {
      isPending: function () {
        return n;
      },
      promise: r,
      resolve: function (t) {
        n && (e(t), n = !1);
      },
      reject: function (e) {
        n && (t(e), n = !1);
      }
    };
  }
  var n = e("./constants"), r = [
      "response",
      "responseText",
      "responseURL",
      "status",
      "statusText",
      "timeout",
      "withCredentials",
      "stack",
      "message",
      "name"
    ];
  t.newGuid = s;
  t.assert = o;
  t.assertNotNullOrEmpty = u;
  t.assertNotNull = a;
  t.assertCallEndReason = f;
  t.getMediaTypes = l;
  t.stringContains = c;
  t.stringEndsWith = h;
  t.arrayContains = p;
  t.getPrintableObject = d;
  t.tryAddNewKeyToHashTable = v;
  t.tryRemoveKeyFromHashTable = m;
  t.getHashTableCount = g;
  t.escapeRegExp = y;
  t.getErrorForXHRFailure = b;
  t.isDuplicateMessage = w;
  t.defer = E;
}));
