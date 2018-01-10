(function (e) {
  if (typeof exports == "object" && typeof module != "undefined")
    module.exports = e();
  else if (typeof define == "function" && define.amd)
    define("microsoft-sdp-transform/lib/sdp-transform", [], e);
  else {
    var t;
    typeof window != "undefined" ? t = window : typeof global != "undefined" ? t = global : typeof self != "undefined" ? t = self : t = this;
    t.sdpTransform = e();
  }
}(function () {
  var e, t, n;
  return function r(e, t, n) {
    function i(o, u) {
      if (!t[o]) {
        if (!e[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (s)
            return s(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = t[o] = { exports: {} };
        e[o][0].call(l.exports, function (t) {
          var n = e[o][1][t];
          return i(n ? n : t);
        }, l, l.exports, r, e, t, n);
      }
      return t[o].exports;
    }
    var s = typeof require == "function" && require;
    for (var o = 0; o < n.length; o++)
      i(n[o]);
    return i;
  }({
    1: [
      function (e, t, n) {
        var r = t.exports = {
          v: [{
              name: "version",
              reg: /^(\d*)$/
            }],
          o: [{
              name: "origin",
              reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
              names: [
                "username",
                "sessionId",
                "sessionVersion",
                "netType",
                "ipVer",
                "address"
              ],
              format: "%s %s %d %s IP%d %s"
            }],
          s: [{ name: "name" }],
          i: [{ name: "description" }],
          u: [{ name: "uri" }],
          e: [{ name: "email" }],
          p: [{ name: "phone" }],
          z: [{ name: "timezones" }],
          r: [{ name: "repeats" }],
          t: [{
              name: "timing",
              reg: /^(\d*) (\d*)/,
              names: [
                "start",
                "stop"
              ],
              format: "%d %d"
            }],
          c: [{
              name: "connection",
              reg: /^IN IP(\d) (\S*)/,
              names: [
                "version",
                "ip"
              ],
              format: "IN IP%d %s"
            }],
          b: [{
              push: "bandwidth",
              reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
              names: [
                "type",
                "limit"
              ],
              format: "%s:%s"
            }],
          m: [{
              reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
              names: [
                "type",
                "port",
                "protocol",
                "payloads"
              ],
              format: "%s %d %s %s"
            }],
          a: [
            {
              push: "rtp",
              reg: /^rtpmap:(\d*) ([\w\-]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
              names: [
                "payload",
                "codec",
                "rate",
                "encoding"
              ],
              format: function (e) {
                return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
              }
            },
            {
              push: "fmtp",
              reg: /^fmtp:(\d*) ([\S| ]*)/,
              names: [
                "payload",
                "config"
              ],
              format: "fmtp:%d %s"
            },
            {
              name: "control",
              reg: /^control:(.*)/,
              format: "control:%s"
            },
            {
              name: "rtcp",
              reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
              names: [
                "port",
                "netType",
                "ipVer",
                "address"
              ],
              format: function (e) {
                return e.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
              }
            },
            {
              push: "rtcpFbXMessage",
              reg: /^rtcp-fb:(\*|\d*) x-message ([\S| ]*)/,
              names: [
                "payload",
                "param"
              ],
              format: function (e) {
                var t = e.payload === "*" ? "%s" : "%d";
                return "rtcp-fb:" + t + " x-message %s";
              }
            },
            {
              push: "rtcpFbTrrInt",
              reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
              names: [
                "payload",
                "value"
              ],
              format: "rtcp-fb:%d trr-int %d"
            },
            {
              push: "rtcpFb",
              reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
              names: [
                "payload",
                "type",
                "subtype"
              ],
              format: function (e) {
                return e.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
              }
            },
            {
              push: "ext",
              reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
              names: [
                "value",
                "uri",
                "config"
              ],
              format: function (e) {
                return e.config != null ? "extmap:%s %s %s" : "extmap:%s %s";
              }
            },
            {
              push: "cryptoscale",
              reg: /^cryptoscale:(\d*) (client|server) ([\w_]*) (\S*)(?: (\S*))?/,
              names: [
                "id",
                "flavor",
                "suite",
                "config",
                "sessionConfig"
              ],
              format: function (e) {
                return e.sessionConfig != null ? "cryptoscale:%d %s %s %s %s" : "cryptoscale:%d %s %s %s";
              }
            },
            {
              push: "crypto",
              reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
              names: [
                "id",
                "suite",
                "config",
                "sessionConfig"
              ],
              format: function (e) {
                return e.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
              }
            },
            {
              name: "setup",
              reg: /^setup:(\w*)/,
              format: "setup:%s"
            },
            {
              name: "mid",
              reg: /^mid:([^\s]*)/,
              format: "mid:%s"
            },
            {
              name: "msid",
              reg: /^msid:(.*)/,
              format: "msid:%s"
            },
            {
              name: "ptime",
              reg: /^ptime:(\d*)/,
              format: "ptime:%d"
            },
            {
              name: "maxptime",
              reg: /^maxptime:(\d*)/,
              format: "maxptime:%d"
            },
            {
              name: "direction",
              reg: /^(sendrecv|recvonly|sendonly|inactive)/
            },
            {
              name: "icelite",
              reg: /^(ice-lite)/
            },
            {
              name: "iceUfrag",
              reg: /^ice-ufrag:(\S*)/,
              format: "ice-ufrag:%s"
            },
            {
              name: "icePwd",
              reg: /^ice-pwd:(\S*)/,
              format: "ice-pwd:%s"
            },
            {
              name: "fingerprint",
              reg: /^fingerprint:(\S*) (\S*)/,
              names: [
                "type",
                "hash"
              ],
              format: "fingerprint:%s %s"
            },
            {
              push: "candidates",
              reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
              names: [
                "foundation",
                "component",
                "transport",
                "priority",
                "ip",
                "port",
                "type",
                "raddr",
                "rport",
                "tcptype",
                "generation"
              ],
              format: function (e) {
                var t = "candidate:%s %d %s %d %s %d typ %s";
                return t += e.raddr != null ? " raddr %s rport %d" : "%v%v", t += e.tcptype != null ? " tcptype %s" : "%v", e.generation != null && (t += " generation %d"), t;
              }
            },
            {
              push: "xCandidatesIpv6",
              reg: /^x-candidate-ipv6:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
              names: [
                "foundation",
                "component",
                "transport",
                "priority",
                "ip",
                "port",
                "type",
                "raddr",
                "rport",
                "tcptype",
                "generation"
              ],
              format: function (e) {
                var t = "x-candidate-ipv6:%s %d %s %d %s %d typ %s";
                return t += e.raddr != null ? " raddr %s rport %d" : "%v%v", t += e.tcptype != null ? " tcptype %s" : "%v", e.generation != null && (t += " generation %d"), t;
              }
            },
            {
              name: "endOfCandidates",
              reg: /^(end-of-candidates)/
            },
            {
              name: "remoteCandidates",
              reg: /^remote-candidates:(.*)/,
              format: "remote-candidates:%s"
            },
            {
              name: "iceOptions",
              reg: /^ice-options:(\S*)/,
              format: "ice-options:%s"
            },
            {
              push: "ssrcs",
              reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
              names: [
                "id",
                "attribute",
                "value"
              ],
              format: "ssrc:%d %s:%s"
            },
            {
              push: "ssrcGroups",
              reg: /^ssrc-group:(\w*) (.*)/,
              names: [
                "semantics",
                "ssrcs"
              ],
              format: "ssrc-group:%s %s"
            },
            {
              name: "msidSemantic",
              reg: /^msid-semantic:\s?(\w*) (\S*)/,
              names: [
                "semantic",
                "token"
              ],
              format: "msid-semantic: %s %s"
            },
            {
              push: "groups",
              reg: /^group:(\w*) (.*)/,
              names: [
                "type",
                "mids"
              ],
              format: "group:%s %s"
            },
            {
              name: "rtcpMux",
              reg: /^(rtcp-mux)/,
              format: "rtcp-mux"
            },
            {
              name: "rtcpRsize",
              reg: /^(rtcp-rsize)/,
              format: "rtcp-rsize"
            },
            {
              name: "xMediaBw",
              reg: /^x-mediabw:(\S*) send=(\d*);recv=(\d*)/,
              names: [
                "label",
                "sendBw",
                "receiveBw"
              ],
              format: "x-mediabw:%s send=%d;recv=%d"
            },
            {
              name: "xSsrcRange",
              reg: /^x-ssrc-range:(\d*)-(\d*)/,
              names: [
                "ssrcMin",
                "ssrcMax"
              ],
              format: "x-ssrc-range:%d-%d"
            },
            {
              name: "label",
              reg: /^label:(\S*)/,
              format: "label:%s"
            },
            {
              name: "xSource",
              reg: /^x-source:(\S*)/,
              format: "x-source:%s"
            },
            {
              name: "xSourceStreamId",
              reg: /^x-source-streamid:(\S*)/,
              format: "x-source-streamid:%s"
            },
            {
              name: "xCaps",
              reg: /^x-caps:(\d*) (\S*)/,
              names: [
                "payloadType",
                "value"
              ],
              format: "x-caps:%d %s"
            },
            {
              name: "signalingFbXMessage",
              reg: /^x-signaling-fb:(\*|\d*) x-message ([\S| ]*)/,
              names: [
                "payload",
                "param"
              ],
              format: function (e) {
                var t = e.payload === "*" ? "%s" : "%d";
                return "x-signaling-fb:" + t + " x-message %s";
              }
            },
            {
              push: "xMediaSettings",
              reg: /^x-mediasettings:([\S| ]*)/,
              names: ["settings"],
              format: "x-mediasettings:%s"
            },
            {
              push: "invalid",
              names: ["value"]
            }
          ]
        };
        Object.keys(r).forEach(function (e) {
          var t = r[e];
          t.forEach(function (e) {
            e.reg || (e.reg = /(.*)/);
            e.format || (e.format = "%s");
          });
        });
      },
      {}
    ],
    2: [
      function (e, t, n) {
        var r = function (e) {
            return String(Number(e)) === e ? Number(e) : e;
          }, i = function (e, t, n, i) {
            if (i && !n)
              t[i] = r(e[1]);
            else
              for (var s = 0; s < n.length; s += 1)
                e[s + 1] != null && (t[n[s]] = r(e[s + 1]));
          }, s = function (e, t, n) {
            var r = e.name && e.names;
            e.push && !t[e.push] ? t[e.push] = [] : r && !t[e.name] && (t[e.name] = {});
            var s = e.push ? {} : r ? t[e.name] : t;
            i(n.match(e.reg), s, e.names, e.name);
            e.push && t[e.push].push(s);
          }, o = e("./grammar"), u = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
        n.parse = function (e) {
          var t = {}, n = [], r = t;
          return e.split(/(\r\n|\r|\n)/).filter(u).forEach(function (e) {
            var t = e[0], i = e.slice(2);
            t === "m" && (n.push({
              rtp: [],
              fmtp: []
            }), r = n[n.length - 1]);
            for (var u = 0; u < (o[t] || []).length; u += 1) {
              var a = o[t][u];
              if (a.reg.test(i))
                return s(a, r, i);
            }
          }), t.media = n, t;
        };
        var a = function (e, t) {
          var n = t.split("=");
          return n.length === 2 && (e[n[0]] = r(n[1])), e;
        };
        n.parseFmtpConfig = function (e) {
          return e.split(/\;\s?/).reduce(a, {});
        };
        n.parsePayloads = function (e) {
          return e.split(" ").map(Number);
        };
        n.parseRemoteCandidates = function (e) {
          var t = [], n = e.split(" ").map(r);
          for (var i = 0; i < n.length; i += 3)
            t.push({
              component: n[i],
              ip: n[i + 1],
              port: n[i + 2]
            });
          return t;
        };
      },
      { "./grammar": 1 }
    ],
    3: [
      function (e, t, n) {
        var r = e("./grammar"), i = /%[sdv%]/g, s = function (e) {
            var t = 1, n = arguments, r = n.length;
            return e.replace(i, function (e) {
              if (t >= r)
                return e;
              var i = n[t];
              t += 1;
              switch (e) {
              case "%%":
                return "%";
              case "%s":
                return String(i);
              case "%d":
                return Number(i);
              case "%v":
                return "";
              }
            });
          }, o = function (e, t, n) {
            var r = t.format instanceof Function ? t.format(t.push ? n : n[t.name]) : t.format, i = [e + "=" + r];
            if (t.names)
              for (var o = 0; o < t.names.length; o += 1) {
                var u = t.names[o];
                t.name ? i.push(n[t.name][u]) : i.push(n[t.names[o]]);
              }
            else
              i.push(n[t.name]);
            return s.apply(null, i);
          }, u = [
            "v",
            "o",
            "s",
            "i",
            "u",
            "e",
            "p",
            "c",
            "b",
            "t",
            "r",
            "z",
            "a"
          ], a = [
            "i",
            "c",
            "b",
            "a"
          ];
        t.exports = function (e, t) {
          t = t || {};
          e.version == null && (e.version = 0);
          e.name == null && (e.name = " ");
          e.media.forEach(function (e) {
            e.payloads == null && (e.payloads = "");
          });
          var n = t.outerOrder || u, i = t.innerOrder || a, s = [];
          return n.forEach(function (t) {
            r[t].forEach(function (n) {
              n.name in e && e[n.name] != null ? s.push(o(t, n, e)) : n.push in e && e[n.push] != null && e[n.push].forEach(function (e) {
                s.push(o(t, n, e));
              });
            });
          }), e.media.forEach(function (e) {
            s.push(o("m", r.m[0], e));
            i.forEach(function (t) {
              r[t].forEach(function (n) {
                n.name in e && e[n.name] != null ? s.push(o(t, n, e)) : n.push in e && e[n.push] != null && e[n.push].forEach(function (e) {
                  s.push(o(t, n, e));
                });
              });
            });
          }), s.join("\r\n") + "\r\n";
        };
      },
      { "./grammar": 1 }
    ],
    "sdp-transform": [
      function (e, t, n) {
        var r = e("./parser"), i = e("./writer");
        n.write = i;
        n.parse = r.parse;
        n.parseFmtpConfig = r.parseFmtpConfig;
        n.parsePayloads = r.parsePayloads;
        n.parseRemoteCandidates = r.parseRemoteCandidates;
      },
      {
        "./parser": 2,
        "./writer": 3
      }
    ]
  }, {}, [])("sdp-transform");
}));
