(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/smsMessageBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "jcafe-property-model",
      "swx-enums"
    ], e);
}(function (e, t) {
  function o(e) {
    switch (e) {
    case 3:
    case 4:
    case 5:
      return s.smsStatus.Sending;
    case 1:
    case 2:
    case 6:
      return s.smsStatus.Delivered;
    case 8:
    case 7:
    case 9:
    case 16:
      return s.smsStatus.Error;
    default:
      return s.smsStatus.Error;
    }
  }
  function u(e) {
    switch (e) {
    case 8:
    case 7:
    case 9:
    case 16:
      return !1;
    default:
      return !0;
    }
  }
  function a(e, t) {
    var n = e;
    return t.forEach(function (e) {
      e.users.sort(function (e, t) {
        return e.time - t.time;
      });
      n = JSON.parse(e.users[e.users.length - 1].value).status;
    }), n;
  }
  function f(e, t) {
    return e ? t ? e.getAttribute(t) : e.textContent : "";
  }
  function l(e, t, n) {
    var r = e.querySelector(t);
    return f(r, n);
  }
  function c(e, t, n) {
    var r = e.querySelectorAll(t);
    return [].slice.call(r).map(function (e) {
      return f(e, n);
    });
  }
  function h(e, t) {
    var n = u(t) ? s.activityStatus.Succeeded : s.activityStatus.Failed;
    e.status._set(n);
  }
  function p(e, t) {
    function S() {
      return u(w());
    }
    function x() {
      E && E.dispose();
    }
    var n = new DOMParser(), r = n.parseFromString(e, "application/xml"), s = Number(l(r, "status")), f = l(r, "sms", "alt"), p = c(r, "target"), d = l(r, "price"), v = l(r, "requestId"), m = i.boolProperty(!0), g = i.command(o.bind(this), m), y = i.property({ set: g }), b = i.command(a.bind(this, s), m), w = i.property({ set: b });
    w(t.smsdeliveryreports());
    y(w());
    h(t, w());
    var E = t.smsdeliveryreports.observe(function (e) {
        var n = e;
        if (!Array.isArray(e)) {
          var r = e[v];
          if (!r)
            return;
          n = [{
              key: r.key,
              users: r.users
            }];
        }
        w(n);
        y(w());
        h(t, w());
      }), T = {
        content: f,
        targets: p,
        price: d,
        requestId: v,
        status: y,
        isSuccessful: S,
        dispose: x
      };
    return T;
  }
  function g(e, t) {
    var n = [];
    for (var r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    var i = function (e) {
        return e + "=\"" + v(String(t[e])) + "\"";
      }, s = t ? [""].concat(Object.keys(t).map(i)).join(" ") : "", o = function (e) {
        return e instanceof d ? e.toString() : m(e);
      };
    return new d("<" + e + s + ">" + n.map(o).join("") + "</" + e + ">");
  }
  function y(e) {
    function c() {
      var e = _.sum(i);
      if (e <= 160) {
        u = 1;
        return;
      }
      u = 1;
      var t = 153, n = 0, r = 0;
      while (n < i.length)
        r + i[n] <= t ? (r += i[n], n += 1) : (u += 1, r = 0);
    }
    function h() {
      var e = r.length;
      if (e <= 70)
        u = 1;
      else {
        var t = 67;
        u = Math.floor(e / t) + (e % t ? 1 : 0);
      }
    }
    var t = e, n = !0, r = new Array(), i = new Array(), s = 0, o = t.length, u, a = -1, f = [
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        " ",
        10,
        a,
        -10,
        13,
        a,
        a,
        16,
        a,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        a,
        a,
        a,
        a,
        a,
        " ",
        "!",
        "\"",
        "#",
        2,
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        0,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        -60,
        -47,
        -62,
        -20,
        17,
        a,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        -40,
        -64,
        -41,
        -61,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        " ",
        64,
        a,
        1,
        36,
        3,
        a,
        95,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        96,
        a,
        a,
        a,
        a,
        91,
        14,
        28,
        9,
        a,
        31,
        a,
        a,
        a,
        a,
        a,
        a,
        a,
        93,
        a,
        a,
        a,
        a,
        92,
        a,
        11,
        a,
        a,
        a,
        94,
        a,
        a,
        30,
        127,
        a,
        a,
        a,
        123,
        15,
        29,
        a,
        4,
        5,
        a,
        a,
        7,
        a,
        a,
        a,
        a,
        125,
        8,
        a,
        a,
        a,
        124,
        a,
        12,
        6,
        a,
        a,
        126,
        a,
        a,
        a
      ], l = function () {
        for (var e = s; e < o; e++) {
          var u = t.charCodeAt(e);
          if (!u)
            return;
          r.push(u);
          if (u > 256) {
            n = !1;
            continue;
          }
          f[u] === a ? n = !1 : f[u] < -1 ? i.push(2) : i.push(1);
        }
      };
    return l(), n ? c() : h(), u;
  }
  function b(e, t) {
    var n = t || [], i = [e], s = [e], o = String(g("sms", { alt: e }, g("type", null, String(2)), g("status", null, String(4)), g("failurereason", null, String(0)), g.apply(void 0, [
        "targets",
        null
      ].concat(n.map(function (e) {
        return g("target", { status: 3 }, e);
      }))), g.apply(void 0, [
        "body",
        null
      ].concat(i.map(function (e, t) {
        return g("chunk", { id: t }, e);
      }), [g("untilnext", null, "155")])), g("encoded_body", null, e), g("sendtimestamp", null, new Date().getTime() + ""), g("restApiVersion", null, "2"), g("defaults", null, g("skype", null, g("deliveryReportVersion", null, "chatservice")), g("control", null, g("flowId", null, "skype.client.sms.1way"), g("deliveryMethod", null, "reliable")), g("content", null, g("body", null, e))), g.apply(void 0, [
        "bulkItems",
        null
      ].concat(s.map(function (e, t) {
        return g("bulkItem", null, g("requestId", null, r.guid.create()), g("recipient", null, g("address", null, n[0])));
      })))));
    return o;
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("jcafe-property-model"), s = e("swx-enums");
  t.getInfo = p;
  var d = function () {
      function e(e) {
        this.content = e;
      }
      return e.prototype.toString = function () {
        return this.content;
      }, e;
    }(), v = n.escape, m = n.escape;
  t.calculateSmsFragments = y;
  t.createOutgoingXMLPayload = b;
}));
