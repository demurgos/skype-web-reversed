function () {
  (function (n) {
    var x = this || (0, eval)("this"), u = x.document, M = x.navigator, v = x.jQuery, F = x.JSON;
    (function (e) {
      "function" == typeof define && define.amd ? define("vendor/knockout", [
        "exports",
        "require"
      ], e) : "object" == typeof exports && "object" == typeof module ? e(module.exports || exports) : e(x.ko = {});
    }(function (e, t) {
      function r(e, t) {
        return null === e || typeof e in h ? e === t : !1;
      }
      function i(e, t) {
        var r;
        return function () {
          r || (r = c.a.setTimeout(function () {
            r = n, e();
          }, t));
        };
      }
      function s(e, t) {
        var n;
        return function () {
          clearTimeout(n), n = c.a.setTimeout(e, t);
        };
      }
      function o(e, t) {
        t && t !== p ? "beforeChange" === t ? this.Kb(e) : this.Ha(e, t) : this.Lb(e);
      }
      function a(e, t) {
        null !== t && t.k && t.k();
      }
      function f(e, t) {
        var n = this.Hc, r = n[b];
        r.R || (this.lb && this.Ma[t] ? (n.Pb(t, e, this.Ma[t]), this.Ma[t] = null, --this.lb) : r.r[t] || n.Pb(t, e, r.s ? { ia: e } : n.uc(e)));
      }
      function l(e, t, n, r) {
        c.d[e] = {
          init: function (e, i, s, o, u) {
            var a, f;
            return c.m(function () {
              var s = c.a.c(i()), o = !n != !s, l = !f;
              if (l || t || o !== a)
                l && c.va.Aa() && (f = c.a.ua(c.f.childNodes(e), !0)), o ? (l || c.f.da(e, c.a.ua(f)), c.eb(r ? r(u, s) : u, e)) : c.f.xa(e), a = o;
            }, null, { i: e }), { controlsDescendantBindings: !0 };
          }
        }, c.h.ta[e] = !1, c.f.Z[e] = !0;
      }
      var c = "undefined" != typeof e ? e : {};
      c.b = function (e, t) {
        for (var n = e.split("."), r = c, i = 0; i < n.length - 1; i++)
          r = r[n[i]];
        r[n[n.length - 1]] = t;
      }, c.G = function (e, t, n) {
        e[t] = n;
      }, c.version = "3.4.0", c.b("version", c.version), c.options = {
        deferUpdates: !1,
        useOnlyNativeEvents: !1
      }, c.a = function () {
        function e(e, t) {
          for (var n in e)
            e.hasOwnProperty(n) && t(n, e[n]);
        }
        function t(e, t) {
          if (t)
            for (var n in t)
              t.hasOwnProperty(n) && (e[n] = t[n]);
          return e;
        }
        function r(e, t) {
          return e.__proto__ = t, e;
        }
        function i(e, t, n, r) {
          var i = e[t].match(p) || [];
          c.a.q(n.match(p), function (e) {
            c.a.pa(i, e, r);
          }), e[t] = i.join(" ");
        }
        var s = { __proto__: [] } instanceof Array, o = "function" == typeof Symbol, a = {}, f = {};
        a[M && /Firefox\/2/i.test(M.userAgent) ? "KeyboardEvent" : "UIEvents"] = [
          "keyup",
          "keydown",
          "keypress"
        ], a.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "), e(a, function (e, t) {
          if (t.length)
            for (var n = 0, r = t.length; n < r; n++)
              f[t[n]] = e;
        });
        var l = { propertychange: !0 }, h = u && function () {
            for (var e = 3, t = u.createElement("div"), r = t.getElementsByTagName("i"); t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", r[0];);
            return 4 < e ? e : n;
          }(), p = /\S+/g;
        return {
          cc: [
            "authenticity_token",
            /^__RequestVerificationToken(_.*)?$/
          ],
          q: function (e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              t(e[n], n);
          },
          o: function (e, t) {
            if ("function" == typeof Array.prototype.indexOf)
              return Array.prototype.indexOf.call(e, t);
            for (var n = 0, r = e.length; n < r; n++)
              if (e[n] === t)
                return n;
            return -1;
          },
          Sb: function (e, t, n) {
            for (var r = 0, i = e.length; r < i; r++)
              if (t.call(n, e[r], r))
                return e[r];
            return null;
          },
          La: function (e, t) {
            var n = c.a.o(e, t);
            0 < n ? e.splice(n, 1) : 0 === n && e.shift();
          },
          Tb: function (e) {
            e = e || [];
            for (var t = [], n = 0, r = e.length; n < r; n++)
              0 > c.a.o(t, e[n]) && t.push(e[n]);
            return t;
          },
          fb: function (e, t) {
            e = e || [];
            for (var n = [], r = 0, i = e.length; r < i; r++)
              n.push(t(e[r], r));
            return n;
          },
          Ka: function (e, t) {
            e = e || [];
            for (var n = [], r = 0, i = e.length; r < i; r++)
              t(e[r], r) && n.push(e[r]);
            return n;
          },
          ra: function (e, t) {
            if (t instanceof Array)
              e.push.apply(e, t);
            else
              for (var n = 0, r = t.length; n < r; n++)
                e.push(t[n]);
            return e;
          },
          pa: function (e, t, n) {
            var r = c.a.o(c.a.zb(e), t);
            0 > r ? n && e.push(t) : n || e.splice(r, 1);
          },
          ka: s,
          extend: t,
          Xa: r,
          Ya: s ? r : t,
          D: e,
          Ca: function (e, t) {
            if (!e)
              return e;
            var n = {}, r;
            for (r in e)
              e.hasOwnProperty(r) && (n[r] = t(e[r], r, e));
            return n;
          },
          ob: function (e) {
            for (; e.firstChild;)
              c.removeNode(e.firstChild);
          },
          jc: function (e) {
            e = c.a.V(e);
            for (var t = (e[0] && e[0].ownerDocument || u).createElement("div"), n = 0, r = e.length; n < r; n++)
              t.appendChild(c.$(e[n]));
            return t;
          },
          ua: function (e, t) {
            for (var n = 0, r = e.length, i = []; n < r; n++) {
              var s = e[n].cloneNode(!0);
              i.push(t ? c.$(s) : s);
            }
            return i;
          },
          da: function (e, t) {
            c.a.ob(e);
            if (t)
              for (var n = 0, r = t.length; n < r; n++)
                e.appendChild(t[n]);
          },
          qc: function (e, t) {
            var n = e.nodeType ? [e] : e;
            if (0 < n.length) {
              for (var r = n[0], i = r.parentNode, s = 0, o = t.length; s < o; s++)
                i.insertBefore(t[s], r);
              s = 0;
              for (o = n.length; s < o; s++)
                c.removeNode(n[s]);
            }
          },
          za: function (e, t) {
            if (e.length) {
              for (t = 8 === t.nodeType && t.parentNode || t; e.length && e[0].parentNode !== t;)
                e.splice(0, 1);
              for (; 1 < e.length && e[e.length - 1].parentNode !== t;)
                e.length--;
              if (1 < e.length) {
                var n = e[0], r = e[e.length - 1];
                for (e.length = 0; n !== r;)
                  e.push(n), n = n.nextSibling;
                e.push(r);
              }
            }
            return e;
          },
          sc: function (e, t) {
            7 > h ? e.setAttribute("selected", t) : e.selected = t;
          },
          $a: function (e) {
            return null === e || e === n ? "" : e.trim ? e.trim() : e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
          },
          nd: function (e, t) {
            return e = e || "", t.length > e.length ? !1 : e.substring(0, t.length) === t;
          },
          Mc: function (e, t) {
            if (e === t)
              return !0;
            if (11 === e.nodeType)
              return !1;
            if (t.contains)
              return t.contains(3 === e.nodeType ? e.parentNode : e);
            if (t.compareDocumentPosition)
              return 16 == (t.compareDocumentPosition(e) & 16);
            for (; e && e != t;)
              e = e.parentNode;
            return !!e;
          },
          nb: function (e) {
            return c.a.Mc(e, e.ownerDocument.documentElement);
          },
          Qb: function (e) {
            return !!c.a.Sb(e, c.a.nb);
          },
          A: function (e) {
            return e && e.tagName && e.tagName.toLowerCase();
          },
          Wb: function (e) {
            return c.onError ? function () {
              try {
                return e.apply(this, arguments);
              } catch (t) {
                throw c.onError && c.onError(t), t;
              }
            } : e;
          },
          setTimeout: function (e, t) {
            return setTimeout(c.a.Wb(e), t);
          },
          $b: function (e) {
            setTimeout(function () {
              throw c.onError && c.onError(e), e;
            }, 0);
          },
          p: function (e, t, n) {
            var r = c.a.Wb(n);
            n = h && l[t];
            if (c.options.useOnlyNativeEvents || n || !v)
              if (n || "function" != typeof e.addEventListener) {
                if ("undefined" == typeof e.attachEvent)
                  throw Error("Browser doesn't support addEventListener or attachEvent");
                var i = function (t) {
                    r.call(e, t);
                  }, s = "on" + t;
                e.attachEvent(s, i), c.a.F.oa(e, function () {
                  e.detachEvent(s, i);
                });
              } else
                e.addEventListener(t, r, !1);
            else
              v(e).bind(t, r);
          },
          Da: function (e, t) {
            if (!e || !e.nodeType)
              throw Error("element must be a DOM node when calling triggerEvent");
            var n;
            "input" === c.a.A(e) && e.type && "click" == t.toLowerCase() ? (n = e.type, n = "checkbox" == n || "radio" == n) : n = !1;
            if (c.options.useOnlyNativeEvents || !v || n)
              if ("function" == typeof u.createEvent) {
                if ("function" != typeof e.dispatchEvent)
                  throw Error("The supplied element doesn't support dispatchEvent");
                n = u.createEvent(f[t] || "HTMLEvents"), n.initEvent(t, !0, !0, x, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, e), e.dispatchEvent(n);
              } else if (n && e.click)
                e.click();
              else {
                if ("undefined" == typeof e.fireEvent)
                  throw Error("Browser doesn't support triggering events");
                e.fireEvent("on" + t);
              }
            else
              v(e).trigger(t);
          },
          c: function (e) {
            return c.H(e) ? e() : e;
          },
          zb: function (e) {
            return c.H(e) ? e.t() : e;
          },
          bb: function (e, t, n) {
            var r;
            t && ("object" == typeof e.classList ? (r = e.classList[n ? "add" : "remove"], c.a.q(t.match(p), function (t) {
              r.call(e.classList, t);
            })) : "string" == typeof e.className.baseVal ? i(e.className, "baseVal", t, n) : i(e, "className", t, n));
          },
          Za: function (e, t) {
            var r = c.a.c(t);
            if (null === r || r === n)
              r = "";
            var i = c.f.firstChild(e);
            !i || 3 != i.nodeType || c.f.nextSibling(i) ? c.f.da(e, [e.ownerDocument.createTextNode(r)]) : i.data = r, c.a.Rc(e);
          },
          rc: function (e, t) {
            e.name = t;
            if (7 >= h)
              try {
                e.mergeAttributes(u.createElement("<input name='" + e.name + "'/>"), !1);
              } catch (n) {
              }
          },
          Rc: function (e) {
            9 <= h && (e = 1 == e.nodeType ? e : e.parentNode, e.style && (e.style.zoom = e.style.zoom));
          },
          Nc: function (e) {
            if (h) {
              var t = e.style.width;
              e.style.width = 0, e.style.width = t;
            }
          },
          hd: function (e, t) {
            e = c.a.c(e), t = c.a.c(t);
            for (var n = [], r = e; r <= t; r++)
              n.push(r);
            return n;
          },
          V: function (e) {
            for (var t = [], n = 0, r = e.length; n < r; n++)
              t.push(e[n]);
            return t;
          },
          Yb: function (e) {
            return o ? Symbol(e) : e;
          },
          rd: 6 === h,
          sd: 7 === h,
          C: h,
          ec: function (e, t) {
            for (var n = c.a.V(e.getElementsByTagName("input")).concat(c.a.V(e.getElementsByTagName("textarea"))), r = "string" == typeof t ? function (e) {
                  return e.name === t;
                } : function (e) {
                  return t.test(e.name);
                }, i = [], s = n.length - 1; 0 <= s; s--)
              r(n[s]) && i.push(n[s]);
            return i;
          },
          ed: function (e) {
            return "string" == typeof e && (e = c.a.$a(e)) ? F && F.parse ? F.parse(e) : new Function("return " + e)() : null;
          },
          Eb: function (e, t, n) {
            if (!F || !F.stringify)
              throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
            return F.stringify(c.a.c(e), t, n);
          },
          fd: function (t, n, r) {
            r = r || {};
            var i = r.params || {}, s = r.includeFields || this.cc, o = t;
            if ("object" == typeof t && "form" === c.a.A(t))
              for (var o = t.action, a = s.length - 1; 0 <= a; a--)
                for (var f = c.a.ec(t, s[a]), l = f.length - 1; 0 <= l; l--)
                  i[f[l].name] = f[l].value;
            n = c.a.c(n);
            var h = u.createElement("form");
            h.style.display = "none", h.action = o, h.method = "post";
            for (var p in n)
              t = u.createElement("input"), t.type = "hidden", t.name = p, t.value = c.a.Eb(c.a.c(n[p])), h.appendChild(t);
            e(i, function (e, t) {
              var n = u.createElement("input");
              n.type = "hidden", n.name = e, n.value = t, h.appendChild(n);
            }), u.body.appendChild(h), r.submitter ? r.submitter(h) : h.submit(), setTimeout(function () {
              h.parentNode.removeChild(h);
            }, 0);
          }
        };
      }(), c.b("utils", c.a), c.b("utils.arrayForEach", c.a.q), c.b("utils.arrayFirst", c.a.Sb), c.b("utils.arrayFilter", c.a.Ka), c.b("utils.arrayGetDistinctValues", c.a.Tb), c.b("utils.arrayIndexOf", c.a.o), c.b("utils.arrayMap", c.a.fb), c.b("utils.arrayPushAll", c.a.ra), c.b("utils.arrayRemoveItem", c.a.La), c.b("utils.extend", c.a.extend), c.b("utils.fieldsIncludedWithJsonPost", c.a.cc), c.b("utils.getFormFields", c.a.ec), c.b("utils.peekObservable", c.a.zb), c.b("utils.postJson", c.a.fd), c.b("utils.parseJson", c.a.ed), c.b("utils.registerEventHandler", c.a.p), c.b("utils.stringifyJson", c.a.Eb), c.b("utils.range", c.a.hd), c.b("utils.toggleDomNodeCssClass", c.a.bb), c.b("utils.triggerEvent", c.a.Da), c.b("utils.unwrapObservable", c.a.c), c.b("utils.objectForEach", c.a.D), c.b("utils.addOrRemoveItem", c.a.pa), c.b("utils.setTextContent", c.a.Za), c.b("unwrap", c.a.c), Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if (1 === arguments.length)
          return function () {
            return t.apply(e, arguments);
          };
        var n = Array.prototype.slice.call(arguments, 1);
        return function () {
          var r = n.slice(0);
          return r.push.apply(r, arguments), t.apply(e, r);
        };
      }), c.a.e = new function () {
        function e(e, s) {
          var o = e[r];
          if (!o || "null" === o || !i[o]) {
            if (!s)
              return n;
            o = e[r] = "ko" + t++, i[o] = {};
          }
          return i[o];
        }
        var t = 0, r = "__ko__" + new Date().getTime(), i = {};
        return {
          get: function (t, r) {
            var i = e(t, !1);
            return i === n ? n : i[r];
          },
          set: function (t, r, i) {
            if (i !== n || e(t, !1) !== n)
              e(t, !0)[r] = i;
          },
          clear: function (e) {
            var t = e[r];
            return t ? (delete i[t], e[r] = null, !0) : !1;
          },
          I: function () {
            return t++ + r;
          }
        };
      }(), c.b("utils.domData", c.a.e), c.b("utils.domData.clear", c.a.e.clear), c.a.F = new function () {
        function e(e, t) {
          var i = c.a.e.get(e, r);
          return i === n && t && (i = [], c.a.e.set(e, r, i)), i;
        }
        function t(n) {
          var r = e(n, !1);
          if (r)
            for (var r = r.slice(0), i = 0; i < r.length; i++)
              r[i](n);
          c.a.e.clear(n), c.a.F.cleanExternalData(n);
          if (s[n.nodeType])
            for (r = n.firstChild; n = r;)
              r = n.nextSibling, 8 === n.nodeType && t(n);
        }
        var r = c.a.e.I(), i = {
            1: !0,
            8: !0,
            9: !0
          }, s = {
            1: !0,
            9: !0
          };
        return {
          oa: function (t, n) {
            if ("function" != typeof n)
              throw Error("Callback must be a function");
            e(t, !0).push(n);
          },
          pc: function (t, i) {
            var s = e(t, !1);
            s && (c.a.La(s, i), 0 == s.length && c.a.e.set(t, r, n));
          },
          $: function (e) {
            if (i[e.nodeType] && (t(e), s[e.nodeType])) {
              var n = [];
              c.a.ra(n, e.getElementsByTagName("*"));
              for (var r = 0, o = n.length; r < o; r++)
                t(n[r]);
            }
            return e;
          },
          removeNode: function (e) {
            c.$(e), e.parentNode && e.parentNode.removeChild(e);
          },
          cleanExternalData: function (e) {
            v && "function" == typeof v.cleanData && v.cleanData([e]);
          }
        };
      }(), c.$ = c.a.F.$, c.removeNode = c.a.F.removeNode, c.b("cleanNode", c.$), c.b("removeNode", c.removeNode), c.b("utils.domNodeDisposal", c.a.F), c.b("utils.domNodeDisposal.addDisposeCallback", c.a.F.oa), c.b("utils.domNodeDisposal.removeDisposeCallback", c.a.F.pc), function () {
        var e = [
            0,
            "",
            ""
          ], t = [
            1,
            "<table>",
            "</table>"
          ], r = [
            3,
            "<table><tbody><tr>",
            "</tr></tbody></table>"
          ], i = [
            1,
            "<select multiple='multiple'>",
            "</select>"
          ], s = {
            thead: t,
            tbody: t,
            tfoot: t,
            tr: [
              2,
              "<table><tbody>",
              "</tbody></table>"
            ],
            td: r,
            th: r,
            option: i,
            optgroup: i
          }, o = 8 >= c.a.C;
        c.a.ma = function (t, n) {
          var r;
          if (v) {
            if (v.parseHTML)
              r = v.parseHTML(t, n) || [];
            else if ((r = v.clean([t], n)) && r[0]) {
              for (var i = r[0]; i.parentNode && 11 !== i.parentNode.nodeType;)
                i = i.parentNode;
              i.parentNode && i.parentNode.removeChild(i);
            }
          } else {
            (r = n) || (r = u);
            var i = r.parentWindow || r.defaultView || x, a = c.a.$a(t).toLowerCase(), f = r.createElement("div"), l;
            l = (a = a.match(/^<([a-z]+)[ >]/)) && s[a[1]] || e, a = l[0], l = "ignored<div>" + l[1] + t + l[2] + "</div>", "function" == typeof i.innerShiv ? f.appendChild(i.innerShiv(l)) : (o && r.appendChild(f), f.innerHTML = l, o && f.parentNode.removeChild(f));
            for (; a--;)
              f = f.lastChild;
            r = c.a.V(f.lastChild.childNodes);
          }
          return r;
        }, c.a.Cb = function (e, t) {
          c.a.ob(e), t = c.a.c(t);
          if (null !== t && t !== n)
            if ("string" != typeof t && (t = t.toString()), v)
              v(e).html(t);
            else
              for (var r = c.a.ma(t, e.ownerDocument), i = 0; i < r.length; i++)
                e.appendChild(r[i]);
        };
      }(), c.b("utils.parseHtmlFragment", c.a.ma), c.b("utils.setHtml", c.a.Cb), c.M = function () {
        function e(t, n) {
          if (t)
            if (8 == t.nodeType) {
              var r = c.M.lc(t.nodeValue);
              null != r && n.push({
                Lc: t,
                cd: r
              });
            } else if (1 == t.nodeType)
              for (var r = 0, i = t.childNodes, s = i.length; r < s; r++)
                e(i[r], n);
        }
        var t = {};
        return {
          wb: function (e) {
            if ("function" != typeof e)
              throw Error("You can only pass a function to ko.memoization.memoize()");
            var n = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
            return t[n] = e, "<!--[ko_memo:" + n + "]-->";
          },
          xc: function (e, r) {
            var i = t[e];
            if (i === n)
              throw Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
            try {
              return i.apply(null, r || []), !0;
            } finally {
              delete t[e];
            }
          },
          yc: function (t, n) {
            var r = [];
            e(t, r);
            for (var i = 0, s = r.length; i < s; i++) {
              var o = r[i].Lc, u = [o];
              n && c.a.ra(u, n), c.M.xc(r[i].cd, u), o.nodeValue = "", o.parentNode && o.parentNode.removeChild(o);
            }
          },
          lc: function (e) {
            return (e = e.match(/^\[ko_memo\:(.*?)\]$/)) ? e[1] : null;
          }
        };
      }(), c.b("memoization", c.M), c.b("memoization.memoize", c.M.wb), c.b("memoization.unmemoize", c.M.xc), c.b("memoization.parseMemoText", c.M.lc), c.b("memoization.unmemoizeDomNodeAndDescendants", c.M.yc), c.Y = function () {
        function e() {
          if (r)
            for (var e = r, t = 0, i; s < r;)
              if (i = n[s++]) {
                if (s > e) {
                  if (5000 <= ++t) {
                    s = r, c.a.$b(Error("'Too much recursion' after processing " + t + " task groups."));
                    break;
                  }
                  e = r;
                }
                try {
                  i();
                } catch (o) {
                  c.a.$b(o);
                }
              }
        }
        function t() {
          e(), s = r = n.length = 0;
        }
        var n = [], r = 0, i = 1, s = 0;
        return {
          scheduler: x.MutationObserver ? function (e) {
            var t = u.createElement("div");
            return new MutationObserver(e).observe(t, { attributes: !0 }), function () {
              t.classList.toggle("foo");
            };
          }(t) : u && "onreadystatechange" in u.createElement("script") ? function (e) {
            var t = u.createElement("script");
            t.onreadystatechange = function () {
              t.onreadystatechange = null, u.documentElement.removeChild(t), t = null, e();
            }, u.documentElement.appendChild(t);
          } : function (e) {
            setTimeout(e, 0);
          },
          Wa: function (e) {
            return r || c.Y.scheduler(t), n[r++] = e, i++;
          },
          cancel: function (e) {
            e -= i - r, e >= s && e < r && (n[e] = null);
          },
          resetForTesting: function () {
            var e = r - s;
            return s = r = n.length = 0, e;
          },
          md: e
        };
      }(), c.b("tasks", c.Y), c.b("tasks.schedule", c.Y.Wa), c.b("tasks.runEarly", c.Y.md), c.ya = {
        throttle: function (e, t) {
          e.throttleEvaluation = t;
          var n = null;
          return c.B({
            read: e,
            write: function (r) {
              clearTimeout(n), n = c.a.setTimeout(function () {
                e(r);
              }, t);
            }
          });
        },
        rateLimit: function (e, t) {
          var n, r, o;
          "number" == typeof t ? n = t : (n = t.timeout, r = t.method), e.cb = !1, o = "notifyWhenChangesStop" == r ? s : i, e.Ta(function (e) {
            return o(e, n);
          });
        },
        deferred: function (e, t) {
          if (!0 !== t)
            throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
          e.cb || (e.cb = !0, e.Ta(function (t) {
            var r;
            return function () {
              c.Y.cancel(r), r = c.Y.Wa(t), e.notifySubscribers(n, "dirty");
            };
          }));
        },
        notify: function (e, t) {
          e.equalityComparer = "always" == t ? null : r;
        }
      };
      var h = {
        "undefined": 1,
        "boolean": 1,
        number: 1,
        string: 1
      };
      c.b("extenders", c.ya), c.vc = function (e, t, n) {
        this.ia = e, this.gb = t, this.Kc = n, this.R = !1, c.G(this, "dispose", this.k);
      }, c.vc.prototype.k = function () {
        this.R = !0, this.Kc();
      }, c.J = function () {
        c.a.Ya(this, d), d.rb(this);
      };
      var p = "change", d = {
          rb: function (e) {
            e.K = {}, e.Nb = 1;
          },
          X: function (e, t, n) {
            var r = this;
            n = n || p;
            var i = new c.vc(r, t ? e.bind(t) : e, function () {
              c.a.La(r.K[n], i), r.Ia && r.Ia(n);
            });
            return r.sa && r.sa(n), r.K[n] || (r.K[n] = []), r.K[n].push(i), i;
          },
          notifySubscribers: function (e, t) {
            t = t || p, t === p && this.zc();
            if (this.Pa(t))
              try {
                c.l.Ub();
                for (var n = this.K[t].slice(0), r = 0, i; i = n[r]; ++r)
                  i.R || i.gb(e);
              } finally {
                c.l.end();
              }
          },
          Na: function () {
            return this.Nb;
          },
          Uc: function (e) {
            return this.Na() !== e;
          },
          zc: function () {
            ++this.Nb;
          },
          Ta: function (e) {
            var t = this, n = c.H(t), r, i, s;
            t.Ha || (t.Ha = t.notifySubscribers, t.notifySubscribers = o);
            var u = e(function () {
              t.Mb = !1, n && s === t && (s = t()), r = !1, t.tb(i, s) && t.Ha(i = s);
            });
            t.Lb = function (e) {
              t.Mb = r = !0, s = e, u();
            }, t.Kb = function (e) {
              r || (i = e, t.Ha(e, "beforeChange"));
            };
          },
          Pa: function (e) {
            return this.K[e] && this.K[e].length;
          },
          Sc: function (e) {
            if (e)
              return this.K[e] && this.K[e].length || 0;
            var t = 0;
            return c.a.D(this.K, function (e, n) {
              "dirty" !== e && (t += n.length);
            }), t;
          },
          tb: function (e, t) {
            return !this.equalityComparer || !this.equalityComparer(e, t);
          },
          extend: function (e) {
            var t = this;
            return e && c.a.D(e, function (e, n) {
              var r = c.ya[e];
              "function" == typeof r && (t = r(t, n) || t);
            }), t;
          }
        };
      c.G(d, "subscribe", d.X), c.G(d, "extend", d.extend), c.G(d, "getSubscriptionsCount", d.Sc), c.a.ka && c.a.Xa(d, Function.prototype), c.J.fn = d, c.hc = function (e) {
        return null != e && "function" == typeof e.X && "function" == typeof e.notifySubscribers;
      }, c.b("subscribable", c.J), c.b("isSubscribable", c.hc), c.va = c.l = function () {
        function e(e) {
          n.push(r), r = e;
        }
        function t() {
          r = n.pop();
        }
        var n = [], r, i = 0;
        return {
          Ub: e,
          end: t,
          oc: function (e) {
            if (r) {
              if (!c.hc(e))
                throw Error("Only subscribable things can act as dependencies");
              r.gb.call(r.Gc, e, e.Cc || (e.Cc = ++i));
            }
          },
          w: function (n, r, i) {
            try {
              return e(), n.apply(r, i || []);
            } finally {
              t();
            }
          },
          Aa: function () {
            if (r)
              return r.m.Aa();
          },
          Sa: function () {
            if (r)
              return r.Sa;
          }
        };
      }(), c.b("computedContext", c.va), c.b("computedContext.getDependenciesCount", c.va.Aa), c.b("computedContext.isInitial", c.va.Sa), c.b("ignoreDependencies", c.qd = c.l.w);
      var m = c.a.Yb("_latestValue");
      c.N = function (e) {
        function t() {
          return 0 < arguments.length ? (t.tb(t[m], arguments[0]) && (t.ga(), t[m] = arguments[0], t.fa()), this) : (c.l.oc(t), t[m]);
        }
        return t[m] = e, c.a.ka || c.a.extend(t, c.J.fn), c.J.fn.rb(t), c.a.Ya(t, g), c.options.deferUpdates && c.ya.deferred(t, !0), t;
      };
      var g = {
        equalityComparer: r,
        t: function () {
          return this[m];
        },
        fa: function () {
          this.notifySubscribers(this[m]);
        },
        ga: function () {
          this.notifySubscribers(this[m], "beforeChange");
        }
      };
      c.a.ka && c.a.Xa(g, c.J.fn);
      var y = c.N.gd = "__ko_proto__";
      g[y] = c.N, c.Oa = function (e, t) {
        return null === e || e === n || e[y] === n ? !1 : e[y] === t ? !0 : c.Oa(e[y], t);
      }, c.H = function (e) {
        return c.Oa(e, c.N);
      }, c.Ba = function (e) {
        return "function" == typeof e && e[y] === c.N || "function" == typeof e && e[y] === c.B && e.Vc ? !0 : !1;
      }, c.b("observable", c.N), c.b("isObservable", c.H), c.b("isWriteableObservable", c.Ba), c.b("isWritableObservable", c.Ba), c.b("observable.fn", g), c.G(g, "peek", g.t), c.G(g, "valueHasMutated", g.fa), c.G(g, "valueWillMutate", g.ga), c.la = function (e) {
        e = e || [];
        if ("object" == typeof e && "length" in e)
          return e = c.N(e), c.a.Ya(e, c.la.fn), e.extend({ trackArrayChanges: !0 });
        throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
      }, c.la.fn = {
        remove: function (e) {
          for (var t = this.t(), n = [], r = "function" != typeof e || c.H(e) ? function (t) {
                return t === e;
              } : e, i = 0; i < t.length; i++) {
            var s = t[i];
            r(s) && (0 === n.length && this.ga(), n.push(s), t.splice(i, 1), i--);
          }
          return n.length && this.fa(), n;
        },
        removeAll: function (e) {
          if (e === n) {
            var t = this.t(), r = t.slice(0);
            return this.ga(), t.splice(0, t.length), this.fa(), r;
          }
          return e ? this.remove(function (t) {
            return 0 <= c.a.o(e, t);
          }) : [];
        },
        destroy: function (e) {
          var t = this.t(), n = "function" != typeof e || c.H(e) ? function (t) {
              return t === e;
            } : e;
          this.ga();
          for (var r = t.length - 1; 0 <= r; r--)
            n(t[r]) && (t[r]._destroy = !0);
          this.fa();
        },
        destroyAll: function (e) {
          return e === n ? this.destroy(function () {
            return !0;
          }) : e ? this.destroy(function (t) {
            return 0 <= c.a.o(e, t);
          }) : [];
        },
        indexOf: function (e) {
          var t = this();
          return c.a.o(t, e);
        },
        replace: function (e, t) {
          var n = this.indexOf(e);
          0 <= n && (this.ga(), this.t()[n] = t, this.fa());
        }
      }, c.a.ka && c.a.Xa(c.la.fn, c.N.fn), c.a.q("pop push reverse shift sort splice unshift".split(" "), function (e) {
        c.la.fn[e] = function () {
          var t = this.t();
          this.ga(), this.Vb(t, e, arguments);
          var n = t[e].apply(t, arguments);
          return this.fa(), n === t ? this : n;
        };
      }), c.a.q(["slice"], function (e) {
        c.la.fn[e] = function () {
          var t = this();
          return t[e].apply(t, arguments);
        };
      }), c.b("observableArray", c.la), c.ya.trackArrayChanges = function (e, t) {
        function n() {
          if (!r) {
            r = !0;
            var t = e.notifySubscribers;
            e.notifySubscribers = function (e, n) {
              return n && n !== p || ++o, t.apply(this, arguments);
            };
            var n = [].concat(e.t() || []);
            i = null, s = e.X(function (t) {
              t = [].concat(t || []);
              if (e.Pa("arrayChange")) {
                var r;
                if (!i || 1 < o)
                  i = c.a.ib(n, t, e.hb);
                r = i;
              }
              n = t, i = null, o = 0, r && r.length && e.notifySubscribers(r, "arrayChange");
            });
          }
        }
        e.hb = {}, t && "object" == typeof t && c.a.extend(e.hb, t), e.hb.sparse = !0;
        if (!e.Vb) {
          var r = !1, i = null, s, o = 0, u = e.sa, a = e.Ia;
          e.sa = function (t) {
            u && u.call(e, t), "arrayChange" === t && n();
          }, e.Ia = function (t) {
            a && a.call(e, t), "arrayChange" !== t || e.Pa("arrayChange") || (s.k(), r = !1);
          }, e.Vb = function (e, t, n) {
            function s(e, t, n) {
              return u[u.length] = {
                status: e,
                value: t,
                index: n
              };
            }
            if (r && !o) {
              var u = [], a = e.length, f = n.length, l = 0;
              switch (t) {
              case "push":
                l = a;
              case "unshift":
                for (t = 0; t < f; t++)
                  s("added", n[t], l + t);
                break;
              case "pop":
                l = a - 1;
              case "shift":
                a && s("deleted", e[l], l);
                break;
              case "splice":
                t = Math.min(Math.max(0, 0 > n[0] ? a + n[0] : n[0]), a);
                for (var a = 1 === f ? a : Math.min(t + (n[1] || 0), a), f = t + f - 2, l = Math.max(a, f), h = [], p = [], d = 2; t < l; ++t, ++d)
                  t < a && p.push(s("deleted", e[t], t)), t < f && h.push(s("added", n[d], t));
                c.a.dc(p, h);
                break;
              default:
                return;
              }
              i = u;
            }
          };
        }
      };
      var b = c.a.Yb("_state");
      c.m = c.B = function (e, t, r) {
        function i() {
          if (0 < arguments.length) {
            if ("function" != typeof s)
              throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
            return s.apply(o.pb, arguments), this;
          }
          return c.l.oc(i), (o.S || o.s && i.Qa()) && i.aa(), o.T;
        }
        "object" == typeof e ? r = e : (r = r || {}, e && (r.read = e));
        if ("function" != typeof r.read)
          throw Error("Pass a function that returns the value of the ko.computed");
        var s = r.write, o = {
            T: n,
            S: !0,
            Ra: !1,
            Fb: !1,
            R: !1,
            Va: !1,
            s: !1,
            jd: r.read,
            pb: t || r.owner,
            i: r.disposeWhenNodeIsRemoved || r.i || null,
            wa: r.disposeWhen || r.wa,
            mb: null,
            r: {},
            L: 0,
            bc: null
          };
        return i[b] = o, i.Vc = "function" == typeof s, c.a.ka || c.a.extend(i, c.J.fn), c.J.fn.rb(i), c.a.Ya(i, w), r.pure ? (o.Va = !0, o.s = !0, c.a.extend(i, E)) : r.deferEvaluation && c.a.extend(i, S), c.options.deferUpdates && c.ya.deferred(i, !0), o.i && (o.Fb = !0, o.i.nodeType || (o.i = null)), o.s || r.deferEvaluation || i.aa(), o.i && i.ba() && c.a.F.oa(o.i, o.mb = function () {
          i.k();
        }), i;
      };
      var w = {
          equalityComparer: r,
          Aa: function () {
            return this[b].L;
          },
          Pb: function (e, t, n) {
            if (this[b].Va && t === this)
              throw Error("A 'pure' computed must not be called recursively");
            this[b].r[e] = n, n.Ga = this[b].L++, n.na = t.Na();
          },
          Qa: function () {
            var e, t, n = this[b].r;
            for (e in n)
              if (n.hasOwnProperty(e) && (t = n[e], t.ia.Uc(t.na)))
                return !0;
          },
          bd: function () {
            this.Fa && !this[b].Ra && this.Fa();
          },
          ba: function () {
            return this[b].S || 0 < this[b].L;
          },
          ld: function () {
            this.Mb || this.ac();
          },
          uc: function (e) {
            if (e.cb && !this[b].i) {
              var t = e.X(this.bd, this, "dirty"), n = e.X(this.ld, this);
              return {
                ia: e,
                k: function () {
                  t.k(), n.k();
                }
              };
            }
            return e.X(this.ac, this);
          },
          ac: function () {
            var e = this, t = e.throttleEvaluation;
            t && 0 <= t ? (clearTimeout(this[b].bc), this[b].bc = c.a.setTimeout(function () {
              e.aa(!0);
            }, t)) : e.Fa ? e.Fa() : e.aa(!0);
          },
          aa: function (e) {
            var t = this[b], n = t.wa;
            if (!t.Ra && !t.R) {
              if (t.i && !c.a.nb(t.i) || n && n()) {
                if (!t.Fb) {
                  this.k();
                  return;
                }
              } else
                t.Fb = !1;
              t.Ra = !0;
              try {
                this.Qc(e);
              } finally {
                t.Ra = !1;
              }
              t.L || this.k();
            }
          },
          Qc: function (e) {
            var t = this[b], r = t.Va ? n : !t.L, i = {
                Hc: this,
                Ma: t.r,
                lb: t.L
              };
            c.l.Ub({
              Gc: i,
              gb: f,
              m: this,
              Sa: r
            }), t.r = {}, t.L = 0, i = this.Pc(t, i), this.tb(t.T, i) && (t.s || this.notifySubscribers(t.T, "beforeChange"), t.T = i, t.s ? this.zc() : e && this.notifySubscribers(t.T)), r && this.notifySubscribers(t.T, "awake");
          },
          Pc: function (e, t) {
            try {
              var n = e.jd;
              return e.pb ? n.call(e.pb) : n();
            } finally {
              c.l.end(), t.lb && !e.s && c.a.D(t.Ma, a), e.S = !1;
            }
          },
          t: function () {
            var e = this[b];
            return (e.S && !e.L || e.s && this.Qa()) && this.aa(), e.T;
          },
          Ta: function (e) {
            c.J.fn.Ta.call(this, e), this.Fa = function () {
              this.Kb(this[b].T), this[b].S = !0, this.Lb(this);
            };
          },
          k: function () {
            var e = this[b];
            !e.s && e.r && c.a.D(e.r, function (e, t) {
              t.k && t.k();
            }), e.i && e.mb && c.a.F.pc(e.i, e.mb), e.r = null, e.L = 0, e.R = !0, e.S = !1, e.s = !1, e.i = null;
          }
        }, E = {
          sa: function (e) {
            var t = this, n = t[b];
            if (!n.R && n.s && "change" == e) {
              n.s = !1;
              if (n.S || t.Qa())
                n.r = null, n.L = 0, n.S = !0, t.aa();
              else {
                var r = [];
                c.a.D(n.r, function (e, t) {
                  r[t.Ga] = e;
                }), c.a.q(r, function (e, r) {
                  var i = n.r[e], s = t.uc(i.ia);
                  s.Ga = r, s.na = i.na, n.r[e] = s;
                });
              }
              n.R || t.notifySubscribers(n.T, "awake");
            }
          },
          Ia: function (e) {
            var t = this[b];
            t.R || "change" != e || this.Pa("change") || (c.a.D(t.r, function (e, n) {
              n.k && (t.r[e] = {
                ia: n.ia,
                Ga: n.Ga,
                na: n.na
              }, n.k());
            }), t.s = !0, this.notifySubscribers(n, "asleep"));
          },
          Na: function () {
            var e = this[b];
            return e.s && (e.S || this.Qa()) && this.aa(), c.J.fn.Na.call(this);
          }
        }, S = {
          sa: function (e) {
            "change" != e && "beforeChange" != e || this.t();
          }
        };
      c.a.ka && c.a.Xa(w, c.J.fn);
      var T = c.N.gd;
      c.m[T] = c.N, w[T] = c.m, c.Xc = function (e) {
        return c.Oa(e, c.m);
      }, c.Yc = function (e) {
        return c.Oa(e, c.m) && e[b] && e[b].Va;
      }, c.b("computed", c.m), c.b("dependentObservable", c.m), c.b("isComputed", c.Xc), c.b("isPureComputed", c.Yc), c.b("computed.fn", w), c.G(w, "peek", w.t), c.G(w, "dispose", w.k), c.G(w, "isActive", w.ba), c.G(w, "getDependenciesCount", w.Aa), c.nc = function (e, t) {
        return "function" == typeof e ? c.m(e, t, { pure: !0 }) : (e = c.a.extend({}, e), e.pure = !0, c.m(e, t));
      }, c.b("pureComputed", c.nc), function () {
        function e(i, s, o) {
          o = o || new r(), i = s(i);
          if ("object" != typeof i || null === i || i === n || i instanceof RegExp || i instanceof Date || i instanceof String || i instanceof Number || i instanceof Boolean)
            return i;
          var u = i instanceof Array ? [] : {};
          return o.save(i, u), t(i, function (t) {
            var r = s(i[t]);
            switch (typeof r) {
            case "boolean":
            case "number":
            case "string":
            case "function":
              u[t] = r;
              break;
            case "object":
            case "undefined":
              var a = o.get(r);
              u[t] = a !== n ? a : e(r, s, o);
            }
          }), u;
        }
        function t(e, t) {
          if (e instanceof Array) {
            for (var n = 0; n < e.length; n++)
              t(n);
            "function" == typeof e.toJSON && t("toJSON");
          } else
            for (n in e)
              t(n);
        }
        function r() {
          this.keys = [], this.Ib = [];
        }
        c.wc = function (t) {
          if (0 == arguments.length)
            throw Error("When calling ko.toJS, pass the object you want to convert.");
          return e(t, function (e) {
            for (var t = 0; c.H(e) && 10 > t; t++)
              e = e();
            return e;
          });
        }, c.toJSON = function (e, t, n) {
          return e = c.wc(e), c.a.Eb(e, t, n);
        }, r.prototype = {
          save: function (e, t) {
            var n = c.a.o(this.keys, e);
            0 <= n ? this.Ib[n] = t : (this.keys.push(e), this.Ib.push(t));
          },
          get: function (e) {
            return e = c.a.o(this.keys, e), 0 <= e ? this.Ib[e] : n;
          }
        };
      }(), c.b("toJS", c.wc), c.b("toJSON", c.toJSON), function () {
        c.j = {
          u: function (e) {
            switch (c.a.A(e)) {
            case "option":
              return !0 === e.__ko__hasDomDataOptionValue__ ? c.a.e.get(e, c.d.options.xb) : 7 >= c.a.C ? e.getAttributeNode("value") && e.getAttributeNode("value").specified ? e.value : e.text : e.value;
            case "select":
              return 0 <= e.selectedIndex ? c.j.u(e.options[e.selectedIndex]) : n;
            default:
              return e.value;
            }
          },
          ha: function (e, t, r) {
            switch (c.a.A(e)) {
            case "option":
              switch (typeof t) {
              case "string":
                c.a.e.set(e, c.d.options.xb, n), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, e.value = t;
                break;
              default:
                c.a.e.set(e, c.d.options.xb, t), e.__ko__hasDomDataOptionValue__ = !0, e.value = "number" == typeof t ? t : "";
              }
              break;
            case "select":
              if ("" === t || null === t)
                t = n;
              for (var i = -1, s = 0, o = e.options.length, u; s < o; ++s)
                if (u = c.j.u(e.options[s]), u == t || "" == u && t === n) {
                  i = s;
                  break;
                }
              if (r || 0 <= i || t === n && 1 < e.size)
                e.selectedIndex = i;
              break;
            default:
              if (null === t || t === n)
                t = "";
              e.value = t;
            }
          }
        };
      }(), c.b("selectExtensions", c.j), c.b("selectExtensions.readValue", c.j.u), c.b("selectExtensions.writeValue", c.j.ha), c.h = function () {
        function e(e) {
          e = c.a.$a(e), 123 === e.charCodeAt(0) && (e = e.slice(1, -1));
          var t = [], n = e.match(r), o, u = [], a = 0;
          if (n) {
            n.push(",");
            for (var f = 0, l; l = n[f]; ++f) {
              var h = l.charCodeAt(0);
              if (44 === h) {
                if (0 >= a) {
                  t.push(o && u.length ? {
                    key: o,
                    value: u.join("")
                  } : { unknown: o || u.join("") }), o = a = 0, u = [];
                  continue;
                }
              } else if (58 === h) {
                if (!a && !o && 1 === u.length) {
                  o = u.pop();
                  continue;
                }
              } else
                47 === h && f && 1 < l.length ? (h = n[f - 1].match(i)) && !s[h[0]] && (e = e.substr(e.indexOf(l) + 1), n = e.match(r), n.push(","), f = -1, l = "/") : 40 === h || 123 === h || 91 === h ? ++a : 41 === h || 125 === h || 93 === h ? --a : o || u.length || 34 !== h && 39 !== h || (l = l.slice(1, -1));
              u.push(l);
            }
          }
          return t;
        }
        var t = [
            "true",
            "false",
            "null",
            "undefined"
          ], n = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, r = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"), i = /[\])"'A-Za-z0-9_$]+$/, s = {
            "in": 1,
            "return": 1,
            "typeof": 1
          }, o = {};
        return {
          ta: [],
          ea: o,
          yb: e,
          Ua: function (r, i) {
            function s(e, r) {
              var i;
              if (!l) {
                var h = c.getBindingHandler(e);
                if (h && h.preprocess && !(r = h.preprocess(r, e, s)))
                  return;
                if (h = o[e])
                  i = r, 0 <= c.a.o(t, i) ? i = !1 : (h = i.match(n), i = null === h ? !1 : h[1] ? "Object(" + h[1] + ")" + h[2] : i), h = i;
                h && a.push("'" + e + "':function(_z){" + i + "=_z}");
              }
              f && (r = "function(){return " + r + " }"), u.push("'" + e + "':" + r);
            }
            i = i || {};
            var u = [], a = [], f = i.valueAccessors, l = i.bindingParams, h = "string" == typeof r ? e(r) : r;
            return c.a.q(h, function (e) {
              s(e.key || e.unknown, e.value);
            }), a.length && s("_ko_property_writers", "{" + a.join(",") + " }"), u.join(",");
          },
          ad: function (e, t) {
            for (var n = 0; n < e.length; n++)
              if (e[n].key == t)
                return !0;
            return !1;
          },
          Ea: function (e, t, n, r, i) {
            e && c.H(e) ? !c.Ba(e) || i && e.t() === r || e(r) : (e = t.get("_ko_property_writers")) && e[n] && e[n](r);
          }
        };
      }(), c.b("expressionRewriting", c.h), c.b("expressionRewriting.bindingRewriteValidators", c.h.ta), c.b("expressionRewriting.parseObjectLiteral", c.h.yb), c.b("expressionRewriting.preProcessBindings", c.h.Ua), c.b("expressionRewriting._twoWayBindings", c.h.ea), c.b("jsonExpressionRewriting", c.h), c.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", c.h.Ua), function () {
        function e(e) {
          return 8 == e.nodeType && s.test(i ? e.text : e.nodeValue);
        }
        function t(e) {
          return 8 == e.nodeType && o.test(i ? e.text : e.nodeValue);
        }
        function n(n, r) {
          for (var i = n, s = 1, o = []; i = i.nextSibling;) {
            if (t(i) && (s--, 0 === s))
              return o;
            o.push(i), e(i) && s++;
          }
          if (!r)
            throw Error("Cannot find closing comment tag to match: " + n.nodeValue);
          return null;
        }
        function r(e, t) {
          var r = n(e, t);
          return r ? 0 < r.length ? r[r.length - 1].nextSibling : e.nextSibling : null;
        }
        var i = u && "<!--test-->" === u.createComment("test").text, s = i ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, o = i ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, a = {
            ul: !0,
            ol: !0
          };
        c.f = {
          Z: {},
          childNodes: function (t) {
            return e(t) ? n(t) : t.childNodes;
          },
          xa: function (t) {
            if (e(t)) {
              t = c.f.childNodes(t);
              for (var n = 0, r = t.length; n < r; n++)
                c.removeNode(t[n]);
            } else
              c.a.ob(t);
          },
          da: function (t, n) {
            if (e(t)) {
              c.f.xa(t);
              for (var r = t.nextSibling, i = 0, s = n.length; i < s; i++)
                r.parentNode.insertBefore(n[i], r);
            } else
              c.a.da(t, n);
          },
          mc: function (t, n) {
            e(t) ? t.parentNode.insertBefore(n, t.nextSibling) : t.firstChild ? t.insertBefore(n, t.firstChild) : t.appendChild(n);
          },
          gc: function (t, n, r) {
            r ? e(t) ? t.parentNode.insertBefore(n, r.nextSibling) : r.nextSibling ? t.insertBefore(n, r.nextSibling) : t.appendChild(n) : c.f.mc(t, n);
          },
          firstChild: function (n) {
            return e(n) ? !n.nextSibling || t(n.nextSibling) ? null : n.nextSibling : n.firstChild;
          },
          nextSibling: function (n) {
            return e(n) && (n = r(n)), n.nextSibling && t(n.nextSibling) ? null : n.nextSibling;
          },
          Tc: e,
          pd: function (e) {
            return (e = (i ? e.text : e.nodeValue).match(s)) ? e[1] : null;
          },
          kc: function (n) {
            if (a[c.a.A(n)]) {
              var i = n.firstChild;
              if (i)
                do
                  if (1 === i.nodeType) {
                    var s;
                    s = i.firstChild;
                    var o = null;
                    if (s)
                      do
                        if (o)
                          o.push(s);
                        else if (e(s)) {
                          var u = r(s, !0);
                          u ? s = u : o = [s];
                        } else
                          t(s) && (o = [s]);
                      while (s = s.nextSibling);
                    if (s = o)
                      for (o = i.nextSibling, u = 0; u < s.length; u++)
                        o ? n.insertBefore(s[u], o) : n.appendChild(s[u]);
                  }
                while (i = i.nextSibling);
            }
          }
        };
      }(), c.b("virtualElements", c.f), c.b("virtualElements.allowedBindings", c.f.Z), c.b("virtualElements.emptyNode", c.f.xa), c.b("virtualElements.insertAfter", c.f.gc), c.b("virtualElements.prepend", c.f.mc), c.b("virtualElements.setDomNodeChildren", c.f.da), function () {
        c.Q = function () {
          this.Fc = {};
        }, c.a.extend(c.Q.prototype, {
          nodeHasBindings: function (e) {
            switch (e.nodeType) {
            case 1:
              return null != e.getAttribute("data-bind") || c.g.getComponentNameForNode(e);
            case 8:
              return c.f.Tc(e);
            default:
              return !1;
            }
          },
          getBindings: function (e, t) {
            var n = this.getBindingsString(e, t), n = n ? this.parseBindingsString(n, t, e) : null;
            return c.g.Ob(n, e, t, !1);
          },
          getBindingAccessors: function (e, t) {
            var n = this.getBindingsString(e, t), n = n ? this.parseBindingsString(n, t, e, { valueAccessors: !0 }) : null;
            return c.g.Ob(n, e, t, !0);
          },
          getBindingsString: function (e) {
            switch (e.nodeType) {
            case 1:
              return e.getAttribute("data-bind");
            case 8:
              return c.f.pd(e);
            default:
              return null;
            }
          },
          parseBindingsString: function (e, t, n, r) {
            try {
              var i = this.Fc, s = e + (r && r.valueAccessors || ""), o;
              if (!(o = i[s])) {
                var u, a = "with($context){with($data||{}){return{" + c.h.Ua(e, r) + "}}}";
                u = new Function("$context", "$element", a), o = i[s] = u;
              }
              return o(t, n);
            } catch (f) {
              throw f.message = "Unable to parse bindings.\nBindings value: " + e + "\nMessage: " + f.message, f;
            }
          }
        }), c.Q.instance = new c.Q();
      }(), c.b("bindingProvider", c.Q), function () {
        function e(e) {
          return function () {
            return e;
          };
        }
        function t(e) {
          return e();
        }
        function r(e) {
          return c.a.Ca(c.l.w(e), function (t, n) {
            return function () {
              return e()[n];
            };
          });
        }
        function i(t, n, i) {
          return "function" == typeof t ? r(t.bind(null, n, i)) : c.a.Ca(t, e);
        }
        function s(e, t) {
          return r(this.getBindings.bind(this, e, t));
        }
        function o(e, t, n) {
          var r, i = c.f.firstChild(t), s = c.Q.instance, o = s.preprocessNode;
          if (o) {
            for (; r = i;)
              i = c.f.nextSibling(r), o.call(s, r);
            i = c.f.firstChild(t);
          }
          for (; r = i;)
            i = c.f.nextSibling(r), u(e, r, n);
        }
        function u(e, t, n) {
          var r = !0, i = 1 === t.nodeType;
          i && c.f.kc(t);
          if (i && n || c.Q.instance.nodeHasBindings(t))
            r = f(t, null, e, n).shouldBindDescendants;
          r && !h[c.a.A(t)] && o(e, t, !i);
        }
        function a(e) {
          var t = [], n = {}, r = [];
          return c.a.D(e, function i(s) {
            if (!n[s]) {
              var o = c.getBindingHandler(s);
              o && (o.after && (r.push(s), c.a.q(o.after, function (t) {
                if (e[t]) {
                  if (-1 !== c.a.o(r, t))
                    throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + r.join(", "));
                  i(t);
                }
              }), r.length--), t.push({
                key: s,
                fc: o
              })), n[s] = !0;
            }
          }), t;
        }
        function f(e, r, i, o) {
          var u = c.a.e.get(e, p);
          if (!r) {
            if (u)
              throw Error("You cannot apply bindings multiple times to the same element.");
            c.a.e.set(e, p, !0);
          }
          !u && o && c.tc(e, i);
          var f;
          if (r && "function" != typeof r)
            f = r;
          else {
            var l = c.Q.instance, h = l.getBindingAccessors || s, d = c.B(function () {
                return (f = r ? r(i, e) : h.call(l, e, i)) && i.P && i.P(), f;
              }, null, { i: e });
            f && d.ba() || (d = null);
          }
          var v;
          if (f) {
            var m = d ? function (e) {
                return function () {
                  return t(d()[e]);
                };
              } : function (e) {
                return f[e];
              }, g = function () {
                return c.a.Ca(d ? d() : f, t);
              };
            g.get = function (e) {
              return f[e] && t(m(e));
            }, g.has = function (e) {
              return e in f;
            }, o = a(f), c.a.q(o, function (t) {
              var r = t.fc.init, s = t.fc.update, o = t.key;
              if (8 === e.nodeType && !c.f.Z[o])
                throw Error("The binding '" + o + "' cannot be used with virtual elements");
              try {
                "function" == typeof r && c.l.w(function () {
                  var t = r(e, m(o), g, i.$data, i);
                  if (t && t.controlsDescendantBindings) {
                    if (v !== n)
                      throw Error("Multiple bindings (" + v + " and " + o + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                    v = o;
                  }
                }), "function" == typeof s && c.B(function () {
                  s(e, m(o), g, i.$data, i);
                }, null, { i: e });
              } catch (u) {
                throw u.message = "Unable to process binding \"" + o + ": " + f[o] + "\"\nMessage: " + u.message, u;
              }
            });
          }
          return { shouldBindDescendants: v === n };
        }
        function l(e) {
          return e && e instanceof c.U ? e : new c.U(e);
        }
        c.d = {};
        var h = {
          script: !0,
          textarea: !0,
          template: !0
        };
        c.getBindingHandler = function (e) {
          return c.d[e];
        }, c.U = function (e, t, r, i) {
          var s = this, o = "function" == typeof e && !c.H(e), u, a = c.B(function () {
              var n = o ? e() : e, u = c.a.c(n);
              return t ? (t.P && t.P(), c.a.extend(s, t), a && (s.P = a)) : (s.$parents = [], s.$root = u, s.ko = c), s.$rawData = n, s.$data = u, r && (s[r] = u), i && i(s, t, u), s.$data;
            }, null, {
              wa: function () {
                return u && !c.a.Qb(u);
              },
              i: !0
            });
          a.ba() && (s.P = a, a.equalityComparer = null, u = [], a.Ac = function (e) {
            u.push(e), c.a.F.oa(e, function (e) {
              c.a.La(u, e), u.length || (a.k(), s.P = a = n);
            });
          });
        }, c.U.prototype.createChildContext = function (e, t, n) {
          return new c.U(e, this, t, function (e, t) {
            e.$parentContext = t, e.$parent = t.$data, e.$parents = (t.$parents || []).slice(0), e.$parents.unshift(e.$parent), n && n(e);
          });
        }, c.U.prototype.extend = function (e) {
          return new c.U(this.P || this.$data, this, null, function (t, n) {
            t.$rawData = n.$rawData, c.a.extend(t, "function" == typeof e ? e() : e);
          });
        };
        var p = c.a.e.I(), d = c.a.e.I();
        c.tc = function (e, t) {
          if (2 != arguments.length)
            return c.a.e.get(e, d);
          c.a.e.set(e, d, t), t.P && t.P.Ac(e);
        }, c.Ja = function (e, t, n) {
          return 1 === e.nodeType && c.f.kc(e), f(e, t, l(n), !0);
        }, c.Dc = function (e, t, n) {
          return n = l(n), c.Ja(e, i(t, n, e), n);
        }, c.eb = function (e, t) {
          1 !== t.nodeType && 8 !== t.nodeType || o(l(e), t, !0);
        }, c.Rb = function (e, t) {
          !v && x.jQuery && (v = x.jQuery);
          if (t && 1 !== t.nodeType && 8 !== t.nodeType)
            throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
          t = t || x.document.body, u(l(e), t, !0);
        }, c.kb = function (e) {
          switch (e.nodeType) {
          case 1:
          case 8:
            var t = c.tc(e);
            if (t)
              return t;
            if (e.parentNode)
              return c.kb(e.parentNode);
          }
          return n;
        }, c.Jc = function (e) {
          return (e = c.kb(e)) ? e.$data : n;
        }, c.b("bindingHandlers", c.d), c.b("applyBindings", c.Rb), c.b("applyBindingsToDescendants", c.eb), c.b("applyBindingAccessorsToNode", c.Ja), c.b("applyBindingsToNode", c.Dc), c.b("contextFor", c.kb), c.b("dataFor", c.Jc);
      }(), function (e) {
        function t(t, r) {
          var o = i.hasOwnProperty(t) ? i[t] : e, u;
          o ? o.X(r) : (o = i[t] = new c.J(), o.X(r), n(t, function (e, n) {
            var r = !!n && !!n.synchronous;
            s[t] = {
              definition: e,
              Zc: r
            }, delete i[t], u || r ? o.notifySubscribers(e) : c.Y.Wa(function () {
              o.notifySubscribers(e);
            });
          }), u = !0);
        }
        function n(e, t) {
          r("getConfig", [e], function (n) {
            n ? r("loadComponent", [
              e,
              n
            ], function (e) {
              t(e, n);
            }) : t(null, null);
          });
        }
        function r(t, n, i, s) {
          s || (s = c.g.loaders.slice(0));
          var o = s.shift();
          if (o) {
            var u = o[t];
            if (u) {
              var a = !1;
              if (u.apply(o, n.concat(function (e) {
                  a ? i(null) : null !== e ? i(e) : r(t, n, i, s);
                })) !== e && (a = !0, !o.suppressLoaderExceptions))
                throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
            } else
              r(t, n, i, s);
          } else
            i(null);
        }
        var i = {}, s = {};
        c.g = {
          get: function (n, r) {
            var i = s.hasOwnProperty(n) ? s[n] : e;
            i ? i.Zc ? c.l.w(function () {
              r(i.definition);
            }) : c.Y.Wa(function () {
              r(i.definition);
            }) : t(n, r);
          },
          Xb: function (e) {
            delete s[e];
          },
          Jb: r
        }, c.g.loaders = [], c.b("components", c.g), c.b("components.get", c.g.get), c.b("components.clearCachedDefinition", c.g.Xb);
      }(), function () {
        function e(e, t, n, r) {
          function i() {
            0 === --u && r(o);
          }
          var o = {}, u = 2, a = n.template;
          n = n.viewModel, a ? s(t, a, function (t) {
            c.g.Jb("loadTemplate", [
              e,
              t
            ], function (e) {
              o.template = e, i();
            });
          }) : i(), n ? s(t, n, function (t) {
            c.g.Jb("loadViewModel", [
              e,
              t
            ], function (e) {
              o[f] = e, i();
            });
          }) : i();
        }
        function n(e, t, r) {
          if ("function" == typeof t)
            r(function (e) {
              return new t(e);
            });
          else if ("function" == typeof t[f])
            r(t[f]);
          else if ("instance" in t) {
            var i = t.instance;
            r(function () {
              return i;
            });
          } else
            "viewModel" in t ? n(e, t.viewModel, r) : e("Unknown viewModel value: " + t);
        }
        function r(e) {
          switch (c.a.A(e)) {
          case "script":
            return c.a.ma(e.text);
          case "textarea":
            return c.a.ma(e.value);
          case "template":
            if (i(e.content))
              return c.a.ua(e.content.childNodes);
          }
          return c.a.ua(e.childNodes);
        }
        function i(e) {
          return x.DocumentFragment ? e instanceof DocumentFragment : e && 11 === e.nodeType;
        }
        function s(e, n, r) {
          "string" == typeof n.require ? t || x.require ? (t || x.require)([n.require], r) : e("Uses require, but no AMD loader is present") : r(n);
        }
        function o(e) {
          return function (t) {
            throw Error("Component '" + e + "': " + t);
          };
        }
        var a = {};
        c.g.register = function (e, t) {
          if (!t)
            throw Error("Invalid configuration for " + e);
          if (c.g.ub(e))
            throw Error("Component " + e + " is already registered");
          a[e] = t;
        }, c.g.ub = function (e) {
          return a.hasOwnProperty(e);
        }, c.g.od = function (e) {
          delete a[e], c.g.Xb(e);
        }, c.g.Zb = {
          getConfig: function (e, t) {
            t(a.hasOwnProperty(e) ? a[e] : null);
          },
          loadComponent: function (t, n, r) {
            var i = o(t);
            s(i, n, function (n) {
              e(t, i, n, r);
            });
          },
          loadTemplate: function (e, t, n) {
            e = o(e);
            if ("string" == typeof t)
              n(c.a.ma(t));
            else if (t instanceof Array)
              n(t);
            else if (i(t))
              n(c.a.V(t.childNodes));
            else if (t.element)
              if (t = t.element, x.HTMLElement ? t instanceof HTMLElement : t && t.tagName && 1 === t.nodeType)
                n(r(t));
              else if ("string" == typeof t) {
                var s = u.getElementById(t);
                s ? n(r(s)) : e("Cannot find element with ID " + t);
              } else
                e("Unknown element type: " + t);
            else
              e("Unknown template value: " + t);
          },
          loadViewModel: function (e, t, r) {
            n(o(e), t, r);
          }
        };
        var f = "createViewModel";
        c.b("components.register", c.g.register), c.b("components.isRegistered", c.g.ub), c.b("components.unregister", c.g.od), c.b("components.defaultLoader", c.g.Zb), c.g.loaders.push(c.g.Zb), c.g.Bc = a;
      }(), function () {
        function e(e, n) {
          var r = e.getAttribute("params");
          if (r) {
            var r = t.parseBindingsString(r, n, e, {
                valueAccessors: !0,
                bindingParams: !0
              }), r = c.a.Ca(r, function (t) {
                return c.m(t, null, { i: e });
              }), i = c.a.Ca(r, function (t) {
                var n = t.t();
                return t.ba() ? c.m({
                  read: function () {
                    return c.a.c(t());
                  },
                  write: c.Ba(n) && function (e) {
                    t()(e);
                  },
                  i: e
                }) : n;
              });
            return i.hasOwnProperty("$raw") || (i.$raw = r), i;
          }
          return { $raw: {} };
        }
        c.g.getComponentNameForNode = function (e) {
          var t = c.a.A(e);
          if (c.g.ub(t) && (-1 != t.indexOf("-") || "[object HTMLUnknownElement]" == "" + e || 8 >= c.a.C && e.tagName === t))
            return t;
        }, c.g.Ob = function (t, n, r, i) {
          if (1 === n.nodeType) {
            var s = c.g.getComponentNameForNode(n);
            if (s) {
              t = t || {};
              if (t.component)
                throw Error("Cannot use the \"component\" binding on a custom element matching a component");
              var o = {
                name: s,
                params: e(n, r)
              };
              t.component = i ? function () {
                return o;
              } : o;
            }
          }
          return t;
        };
        var t = new c.Q();
        9 > c.a.C && (c.g.register = function (e) {
          return function (t) {
            return u.createElement(t), e.apply(this, arguments);
          };
        }(c.g.register), u.createDocumentFragment = function (e) {
          return function () {
            var t = e(), n = c.g.Bc, r;
            for (r in n)
              n.hasOwnProperty(r) && t.createElement(r);
            return t;
          };
        }(u.createDocumentFragment));
      }(), function (e) {
        function t(e, t, n) {
          t = t.template;
          if (!t)
            throw Error("Component '" + e + "' has no template");
          e = c.a.ua(t), c.f.da(n, e);
        }
        function n(e, t, n, r) {
          var i = e.createViewModel;
          return i ? i.call(e, r, {
            element: t,
            templateNodes: n
          }) : r;
        }
        var r = 0;
        c.d.component = {
          init: function (i, s, o, u, a) {
            function f() {
              var e = l && l.dispose;
              "function" == typeof e && e.call(l), h = l = null;
            }
            var l, h, p = c.a.V(c.f.childNodes(i));
            return c.a.F.oa(i, f), c.m(function () {
              var o = c.a.c(s()), u, d;
              "string" == typeof o ? u = o : (u = c.a.c(o.name), d = c.a.c(o.params));
              if (!u)
                throw Error("No component name specified");
              var v = h = ++r;
              c.g.get(u, function (r) {
                if (h === v) {
                  f();
                  if (!r)
                    throw Error("Unknown component '" + u + "'");
                  t(u, r, i);
                  var s = n(r, i, p, d);
                  r = a.createChildContext(s, e, function (e) {
                    e.$component = s, e.$componentTemplateNodes = p;
                  }), l = s, c.eb(r, i);
                }
              });
            }, null, { i: i }), { controlsDescendantBindings: !0 };
          }
        }, c.f.Z.component = !0;
      }();
      var N = {
        "class": "className",
        "for": "htmlFor"
      };
      c.d.attr = {
        update: function (e, t) {
          var r = c.a.c(t()) || {};
          c.a.D(r, function (t, r) {
            r = c.a.c(r);
            var i = !1 === r || null === r || r === n;
            i && e.removeAttribute(t), 8 >= c.a.C && t in N ? (t = N[t], i ? e.removeAttribute(t) : e[t] = r) : i || e.setAttribute(t, r.toString()), "name" === t && c.a.rc(e, i ? "" : r.toString());
          });
        }
      }, function () {
        c.d.checked = {
          after: [
            "value",
            "attr"
          ],
          init: function (e, t, r) {
            function i() {
              var n = e.checked, i = d ? o() : n;
              if (!c.va.Sa() && (!a || n)) {
                var s = c.l.w(t);
                if (l) {
                  var u = h ? s.t() : s;
                  p !== i ? (n && (c.a.pa(u, i, !0), c.a.pa(u, p, !1)), p = i) : c.a.pa(u, i, n), h && c.Ba(s) && s(u);
                } else
                  c.h.Ea(s, r, "checked", i, !0);
              }
            }
            function s() {
              var n = c.a.c(t());
              e.checked = l ? 0 <= c.a.o(n, o()) : u ? n : o() === n;
            }
            var o = c.nc(function () {
                return r.has("checkedValue") ? c.a.c(r.get("checkedValue")) : r.has("value") ? c.a.c(r.get("value")) : e.value;
              }), u = "checkbox" == e.type, a = "radio" == e.type;
            if (u || a) {
              var f = t(), l = u && c.a.c(f) instanceof Array, h = !(l && f.push && f.splice), p = l ? o() : n, d = a || l;
              a && !e.name && c.d.uniqueName.init(e, function () {
                return !0;
              }), c.m(i, null, { i: e }), c.a.p(e, "click", i), c.m(s, null, { i: e }), f = n;
            }
          }
        }, c.h.ea.checked = !0, c.d.checkedValue = {
          update: function (e, t) {
            e.value = c.a.c(t());
          }
        };
      }(), c.d.css = {
        update: function (e, t) {
          var n = c.a.c(t());
          null !== n && "object" == typeof n ? c.a.D(n, function (t, n) {
            n = c.a.c(n), c.a.bb(e, t, n);
          }) : (n = c.a.$a(String(n || "")), c.a.bb(e, e.__ko__cssValue, !1), e.__ko__cssValue = n, c.a.bb(e, n, !0));
        }
      }, c.d.enable = {
        update: function (e, t) {
          var n = c.a.c(t());
          n && e.disabled ? e.removeAttribute("disabled") : n || e.disabled || (e.disabled = !0);
        }
      }, c.d.disable = {
        update: function (e, t) {
          c.d.enable.update(e, function () {
            return !c.a.c(t());
          });
        }
      }, c.d.event = {
        init: function (e, t, n, r, i) {
          var s = t() || {};
          c.a.D(s, function (s) {
            "string" == typeof s && c.a.p(e, s, function (e) {
              var o, u = t()[s];
              if (u) {
                try {
                  var a = c.a.V(arguments);
                  r = i.$data, a.unshift(r), o = u.apply(r, a);
                } finally {
                  !0 !== o && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                }
                !1 === n.get(s + "Bubble") && (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
              }
            });
          });
        }
      }, c.d.foreach = {
        ic: function (e) {
          return function () {
            var t = e(), n = c.a.zb(t);
            return !n || "number" == typeof n.length ? {
              foreach: t,
              templateEngine: c.W.sb
            } : (c.a.c(t), {
              foreach: n.data,
              as: n.as,
              includeDestroyed: n.includeDestroyed,
              afterAdd: n.afterAdd,
              beforeRemove: n.beforeRemove,
              afterRender: n.afterRender,
              beforeMove: n.beforeMove,
              afterMove: n.afterMove,
              templateEngine: c.W.sb
            });
          };
        },
        init: function (e, t) {
          return c.d.template.init(e, c.d.foreach.ic(t));
        },
        update: function (e, t, n, r, i) {
          return c.d.template.update(e, c.d.foreach.ic(t), n, r, i);
        }
      }, c.h.ta.foreach = !1, c.f.Z.foreach = !0, c.d.hasfocus = {
        init: function (e, t, n) {
          function r(r) {
            e.__ko_hasfocusUpdating = !0;
            var i = e.ownerDocument;
            if ("activeElement" in i) {
              var s;
              try {
                s = i.activeElement;
              } catch (o) {
                s = i.body;
              }
              r = s === e;
            }
            i = t(), c.h.Ea(i, n, "hasfocus", r, !0), e.__ko_hasfocusLastValue = r, e.__ko_hasfocusUpdating = !1;
          }
          var i = r.bind(null, !0), s = r.bind(null, !1);
          c.a.p(e, "focus", i), c.a.p(e, "focusin", i), c.a.p(e, "blur", s), c.a.p(e, "focusout", s);
        },
        update: function (e, t) {
          var n = !!c.a.c(t());
          e.__ko_hasfocusUpdating || e.__ko_hasfocusLastValue === n || (n ? e.focus() : e.blur(), !n && e.__ko_hasfocusLastValue && e.ownerDocument.body.focus(), c.l.w(c.a.Da, null, [
            e,
            n ? "focusin" : "focusout"
          ]));
        }
      }, c.h.ea.hasfocus = !0, c.d.hasFocus = c.d.hasfocus, c.h.ea.hasFocus = !0, c.d.html = {
        init: function () {
          return { controlsDescendantBindings: !0 };
        },
        update: function (e, t) {
          c.a.Cb(e, t());
        }
      }, l("if"), l("ifnot", !1, !0), l("with", !0, !1, function (e, t) {
        return e.createChildContext(t);
      });
      var C = {};
      c.d.options = {
        init: function (e) {
          if ("select" !== c.a.A(e))
            throw Error("options binding applies only to SELECT elements");
          for (; 0 < e.length;)
            e.remove(0);
          return { controlsDescendantBindings: !0 };
        },
        update: function (e, t, r) {
          function i() {
            return c.a.Ka(e.options, function (e) {
              return e.selected;
            });
          }
          function s(e, t, n) {
            var r = typeof t;
            return "function" == r ? t(e) : "string" == r ? e[t] : n;
          }
          function o(t, n) {
            if (v && l)
              c.j.ha(e, c.a.c(r.get("value")), !0);
            else if (d.length) {
              var i = 0 <= c.a.o(d, c.j.u(n[0]));
              c.a.sc(n[0], i), v && !i && c.l.w(c.a.Da, null, [
                e,
                "change"
              ]);
            }
          }
          var u = e.multiple, a = 0 != e.length && u ? e.scrollTop : null, f = c.a.c(t()), l = r.get("valueAllowUnset") && r.has("value"), h = r.get("optionsIncludeDestroyed");
          t = {};
          var p, d = [];
          l || (u ? d = c.a.fb(i(), c.j.u) : 0 <= e.selectedIndex && d.push(c.j.u(e.options[e.selectedIndex]))), f && ("undefined" == typeof f.length && (f = [f]), p = c.a.Ka(f, function (e) {
            return h || e === n || null === e || !c.a.c(e._destroy);
          }), r.has("optionsCaption") && (f = c.a.c(r.get("optionsCaption")), null !== f && f !== n && p.unshift(C)));
          var v = !1;
          t.beforeRemove = function (t) {
            e.removeChild(t);
          }, f = o, r.has("optionsAfterRender") && "function" == typeof r.get("optionsAfterRender") && (f = function (e, t) {
            o(0, t), c.l.w(r.get("optionsAfterRender"), null, [
              t[0],
              e !== C ? e : n
            ]);
          }), c.a.Bb(e, p, function (t, i, o) {
            return o.length && (d = !l && o[0].selected ? [c.j.u(o[0])] : [], v = !0), i = e.ownerDocument.createElement("option"), t === C ? (c.a.Za(i, r.get("optionsCaption")), c.j.ha(i, n)) : (o = s(t, r.get("optionsValue"), t), c.j.ha(i, c.a.c(o)), t = s(t, r.get("optionsText"), o), c.a.Za(i, t)), [i];
          }, t, f), c.l.w(function () {
            l ? c.j.ha(e, c.a.c(r.get("value")), !0) : (u ? d.length && i().length < d.length : d.length && 0 <= e.selectedIndex ? c.j.u(e.options[e.selectedIndex]) !== d[0] : d.length || 0 <= e.selectedIndex) && c.a.Da(e, "change");
          }), c.a.Nc(e), a && 20 < Math.abs(a - e.scrollTop) && (e.scrollTop = a);
        }
      }, c.d.options.xb = c.a.e.I(), c.d.selectedOptions = {
        after: [
          "options",
          "foreach"
        ],
        init: function (e, t, n) {
          c.a.p(e, "change", function () {
            var r = t(), i = [];
            c.a.q(e.getElementsByTagName("option"), function (e) {
              e.selected && i.push(c.j.u(e));
            }), c.h.Ea(r, n, "selectedOptions", i);
          });
        },
        update: function (e, t) {
          if ("select" != c.a.A(e))
            throw Error("values binding applies only to SELECT elements");
          var n = c.a.c(t()), r = e.scrollTop;
          n && "number" == typeof n.length && c.a.q(e.getElementsByTagName("option"), function (e) {
            var t = 0 <= c.a.o(n, c.j.u(e));
            e.selected != t && c.a.sc(e, t);
          }), e.scrollTop = r;
        }
      }, c.h.ea.selectedOptions = !0, c.d.style = {
        update: function (e, t) {
          var r = c.a.c(t() || {});
          c.a.D(r, function (t, r) {
            r = c.a.c(r);
            if (null === r || r === n || !1 === r)
              r = "";
            e.style[t] = r;
          });
        }
      }, c.d.submit = {
        init: function (e, t, n, r, i) {
          if ("function" != typeof t())
            throw Error("The value for a submit binding must be a function");
          c.a.p(e, "submit", function (n) {
            var r, s = t();
            try {
              r = s.call(i.$data, e);
            } finally {
              !0 !== r && (n.preventDefault ? n.preventDefault() : n.returnValue = !1);
            }
          });
        }
      }, c.d.text = {
        init: function () {
          return { controlsDescendantBindings: !0 };
        },
        update: function (e, t) {
          c.a.Za(e, t());
        }
      }, c.f.Z.text = !0, function () {
        if (x && x.navigator)
          var e = function (e) {
              if (e)
                return parseFloat(e[1]);
            }, t = x.opera && x.opera.version && parseInt(x.opera.version()), r = x.navigator.userAgent, i = e(r.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)), s = e(r.match(/Firefox\/([^ ]*)/));
        if (10 > c.a.C)
          var o = c.a.e.I(), u = c.a.e.I(), a = function (e) {
              var t = this.activeElement;
              (t = t && c.a.e.get(t, u)) && t(e);
            }, f = function (e, t) {
              var n = e.ownerDocument;
              c.a.e.get(n, o) || (c.a.e.set(n, o, !0), c.a.p(n, "selectionchange", a)), c.a.e.set(e, u, t);
            };
        c.d.textInput = {
          init: function (e, r, o) {
            function u(t, n) {
              c.a.p(e, t, n);
            }
            function a() {
              var t = c.a.c(r());
              if (null === t || t === n)
                t = "";
              v !== n && t === v ? c.a.setTimeout(a, 4) : e.value !== t && (p = t, e.value = t);
            }
            function l() {
              d || (v = e.value, d = c.a.setTimeout(h, 4));
            }
            function h() {
              clearTimeout(d), v = d = n;
              var t = e.value;
              p !== t && (p = t, c.h.Ea(r(), o, "textInput", t));
            }
            var p = e.value, d, v, m = 9 == c.a.C ? l : h;
            10 > c.a.C ? (u("propertychange", function (e) {
              "value" === e.propertyName && m(e);
            }), 8 == c.a.C && (u("keyup", h), u("keydown", h)), 8 <= c.a.C && (f(e, m), u("dragend", l))) : (u("input", h), 5 > i && "textarea" === c.a.A(e) ? (u("keydown", l), u("paste", l), u("cut", l)) : 11 > t ? u("keydown", l) : 4 > s && (u("DOMAutoComplete", h), u("dragdrop", h), u("drop", h))), u("change", h), c.m(a, null, { i: e });
          }
        }, c.h.ea.textInput = !0, c.d.textinput = {
          preprocess: function (e, t, n) {
            n("textInput", e);
          }
        };
      }(), c.d.uniqueName = {
        init: function (e, t) {
          if (t()) {
            var n = "ko_unique_" + ++c.d.uniqueName.Ic;
            c.a.rc(e, n);
          }
        }
      }, c.d.uniqueName.Ic = 0, c.d.value = {
        after: [
          "options",
          "foreach"
        ],
        init: function (e, t, n) {
          if ("input" != e.tagName.toLowerCase() || "checkbox" != e.type && "radio" != e.type) {
            var r = ["change"], i = n.get("valueUpdate"), s = !1, o = null;
            i && ("string" == typeof i && (i = [i]), c.a.ra(r, i), r = c.a.Tb(r));
            var u = function () {
              o = null, s = !1;
              var r = t(), i = c.j.u(e);
              c.h.Ea(r, n, "value", i);
            };
            !c.a.C || "input" != e.tagName.toLowerCase() || "text" != e.type || "off" == e.autocomplete || e.form && "off" == e.form.autocomplete || -1 != c.a.o(r, "propertychange") || (c.a.p(e, "propertychange", function () {
              s = !0;
            }), c.a.p(e, "focus", function () {
              s = !1;
            }), c.a.p(e, "blur", function () {
              s && u();
            })), c.a.q(r, function (t) {
              var n = u;
              c.a.nd(t, "after") && (n = function () {
                o = c.j.u(e), c.a.setTimeout(u, 0);
              }, t = t.substring(5)), c.a.p(e, t, n);
            });
            var a = function () {
              var r = c.a.c(t()), i = c.j.u(e);
              if (null !== o && r === o)
                c.a.setTimeout(a, 0);
              else if (r !== i)
                if ("select" === c.a.A(e)) {
                  var s = n.get("valueAllowUnset"), i = function () {
                      c.j.ha(e, r, s);
                    };
                  i(), s || r === c.j.u(e) ? c.a.setTimeout(i, 0) : c.l.w(c.a.Da, null, [
                    e,
                    "change"
                  ]);
                } else
                  c.j.ha(e, r);
            };
            c.m(a, null, { i: e });
          } else
            c.Ja(e, { checkedValue: t });
        },
        update: function () {
        }
      }, c.h.ea.value = !0, c.d.visible = {
        update: function (e, t) {
          var n = c.a.c(t()), r = "none" != e.style.display;
          n && !r ? e.style.display = "" : !n && r && (e.style.display = "none");
        }
      }, function (e) {
        c.d[e] = {
          init: function (t, n, r, i, s) {
            return c.d.event.init.call(this, t, function () {
              var t = {};
              return t[e] = n(), t;
            }, r, i, s);
          }
        };
      }("click"), c.O = function () {
      }, c.O.prototype.renderTemplateSource = function () {
        throw Error("Override renderTemplateSource");
      }, c.O.prototype.createJavaScriptEvaluatorBlock = function () {
        throw Error("Override createJavaScriptEvaluatorBlock");
      }, c.O.prototype.makeTemplateSource = function (e, t) {
        if ("string" == typeof e) {
          t = t || u;
          var n = t.getElementById(e);
          if (!n)
            throw Error("Cannot find template with ID " + e);
          return new c.v.n(n);
        }
        if (1 == e.nodeType || 8 == e.nodeType)
          return new c.v.qa(e);
        throw Error("Unknown template type: " + e);
      }, c.O.prototype.renderTemplate = function (e, t, n, r) {
        return e = this.makeTemplateSource(e, r), this.renderTemplateSource(e, t, n, r);
      }, c.O.prototype.isTemplateRewritten = function (e, t) {
        return !1 === this.allowTemplateRewriting ? !0 : this.makeTemplateSource(e, t).data("isRewritten");
      }, c.O.prototype.rewriteTemplate = function (e, t, n) {
        e = this.makeTemplateSource(e, n), t = t(e.text()), e.text(t), e.data("isRewritten", !0);
      }, c.b("templateEngine", c.O), c.Gb = function () {
        function e(e, t, n, r) {
          e = c.h.yb(e);
          for (var i = c.h.ta, s = 0; s < e.length; s++) {
            var o = e[s].key;
            if (i.hasOwnProperty(o)) {
              var u = i[o];
              if ("function" == typeof u) {
                if (o = u(e[s].value))
                  throw Error(o);
              } else if (!u)
                throw Error("This template engine does not support the '" + o + "' binding within its templates");
            }
          }
          return n = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + c.h.Ua(e, { valueAccessors: !0 }) + " } })()},'" + n.toLowerCase() + "')", r.createJavaScriptEvaluatorBlock(n) + t;
        }
        var t = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, n = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
        return {
          Oc: function (e, t, n) {
            t.isTemplateRewritten(e, n) || t.rewriteTemplate(e, function (e) {
              return c.Gb.dd(e, t);
            }, n);
          },
          dd: function (r, i) {
            return r.replace(t, function (t, n, r, s, o) {
              return e(o, n, r, i);
            }).replace(n, function (t, n) {
              return e(n, "<!-- ko -->", "#comment", i);
            });
          },
          Ec: function (e, t) {
            return c.M.wb(function (n, r) {
              var i = n.nextSibling;
              i && i.nodeName.toLowerCase() === t && c.Ja(i, e, r);
            });
          }
        };
      }(), c.b("__tr_ambtns", c.Gb.Ec), function () {
        c.v = {}, c.v.n = function (e) {
          if (this.n = e) {
            var t = c.a.A(e);
            this.ab = "script" === t ? 1 : "textarea" === t ? 2 : "template" == t && e.content && 11 === e.content.nodeType ? 3 : 4;
          }
        }, c.v.n.prototype.text = function () {
          var e = 1 === this.ab ? "text" : 2 === this.ab ? "value" : "innerHTML";
          if (0 == arguments.length)
            return this.n[e];
          var t = arguments[0];
          "innerHTML" === e ? c.a.Cb(this.n, t) : this.n[e] = t;
        };
        var e = c.a.e.I() + "_";
        c.v.n.prototype.data = function (t) {
          if (1 === arguments.length)
            return c.a.e.get(this.n, e + t);
          c.a.e.set(this.n, e + t, arguments[1]);
        };
        var t = c.a.e.I();
        c.v.n.prototype.nodes = function () {
          var e = this.n;
          if (0 == arguments.length)
            return (c.a.e.get(e, t) || {}).jb || (3 === this.ab ? e.content : 4 === this.ab ? e : n);
          c.a.e.set(e, t, { jb: arguments[0] });
        }, c.v.qa = function (e) {
          this.n = e;
        }, c.v.qa.prototype = new c.v.n(), c.v.qa.prototype.text = function () {
          if (0 == arguments.length) {
            var e = c.a.e.get(this.n, t) || {};
            return e.Hb === n && e.jb && (e.Hb = e.jb.innerHTML), e.Hb;
          }
          c.a.e.set(this.n, t, { Hb: arguments[0] });
        }, c.b("templateSources", c.v), c.b("templateSources.domElement", c.v.n), c.b("templateSources.anonymousTemplate", c.v.qa);
      }(), function () {
        function e(e, t, n) {
          var r;
          for (t = c.f.nextSibling(t); e && (r = e) !== t;)
            e = c.f.nextSibling(r), n(r, e);
        }
        function t(t, n) {
          if (t.length) {
            var r = t[0], i = t[t.length - 1], s = r.parentNode, o = c.Q.instance, u = o.preprocessNode;
            if (u) {
              e(r, i, function (e, t) {
                var n = e.previousSibling, s = u.call(o, e);
                s && (e === r && (r = s[0] || t), e === i && (i = s[s.length - 1] || n));
              }), t.length = 0;
              if (!r)
                return;
              r === i ? t.push(r) : (t.push(r, i), c.a.za(t, s));
            }
            e(r, i, function (e) {
              1 !== e.nodeType && 8 !== e.nodeType || c.Rb(n, e);
            }), e(r, i, function (e) {
              1 !== e.nodeType && 8 !== e.nodeType || c.M.yc(e, [n]);
            }), c.a.za(t, s);
          }
        }
        function r(e) {
          return e.nodeType ? e : 0 < e.length ? e[0] : null;
        }
        function i(e, n, i, s, u) {
          u = u || {};
          var a = (e && r(e) || i || {}).ownerDocument, f = u.templateEngine || o;
          c.Gb.Oc(i, f, a), i = f.renderTemplate(i, s, u, a);
          if ("number" != typeof i.length || 0 < i.length && "number" != typeof i[0].nodeType)
            throw Error("Template engine must return an array of DOM nodes");
          a = !1;
          switch (n) {
          case "replaceChildren":
            c.f.da(e, i), a = !0;
            break;
          case "replaceNode":
            c.a.qc(e, i), a = !0;
            break;
          case "ignoreTargetNode":
            break;
          default:
            throw Error("Unknown renderMode: " + n);
          }
          return a && (t(i, s), u.afterRender && c.l.w(u.afterRender, null, [
            i,
            s.$data
          ])), i;
        }
        function s(e, t, n) {
          return c.H(e) ? e() : "function" == typeof e ? e(t, n) : e;
        }
        var o;
        c.Db = function (e) {
          if (!(e == n || e instanceof c.O))
            throw Error("templateEngine must inherit from ko.templateEngine");
          o = e;
        }, c.Ab = function (e, t, u, a, f) {
          u = u || {};
          if ((u.templateEngine || o) == n)
            throw Error("Set a template engine before calling renderTemplate");
          f = f || "replaceChildren";
          if (a) {
            var l = r(a);
            return c.B(function () {
              var n = t && t instanceof c.U ? t : new c.U(c.a.c(t)), o = s(e, n.$data, n), n = i(a, f, o, n, u);
              "replaceNode" == f && (a = n, l = r(a));
            }, null, {
              wa: function () {
                return !l || !c.a.nb(l);
              },
              i: l && "replaceNode" == f ? l.parentNode : l
            });
          }
          return c.M.wb(function (n) {
            c.Ab(e, t, u, n, "replaceNode");
          });
        }, c.kd = function (e, r, o, u, a) {
          function f(e, n) {
            t(n, h), o.afterRender && o.afterRender(n, e), h = null;
          }
          function l(t, n) {
            h = a.createChildContext(t, o.as, function (e) {
              e.$index = n;
            });
            var r = s(e, t, h);
            return i(null, "ignoreTargetNode", r, h, o);
          }
          var h;
          return c.B(function () {
            var e = c.a.c(r) || [];
            "undefined" == typeof e.length && (e = [e]), e = c.a.Ka(e, function (e) {
              return o.includeDestroyed || e === n || null === e || !c.a.c(e._destroy);
            }), c.l.w(c.a.Bb, null, [
              u,
              e,
              l,
              o,
              f
            ]);
          }, null, { i: u });
        };
        var u = c.a.e.I();
        c.d.template = {
          init: function (e, t) {
            var n = c.a.c(t());
            if ("string" == typeof n || n.name)
              c.f.xa(e);
            else {
              if ("nodes" in n) {
                if (n = n.nodes || [], c.H(n))
                  throw Error("The \"nodes\" option must be a plain, non-observable array.");
              } else
                n = c.f.childNodes(e);
              n = c.a.jc(n), new c.v.qa(e).nodes(n);
            }
            return { controlsDescendantBindings: !0 };
          },
          update: function (e, t, r, i, s) {
            var o = t(), a;
            t = c.a.c(o), r = !0, i = null, "string" == typeof t ? t = {} : (o = t.name, "if" in t && (r = c.a.c(t["if"])), r && "ifnot" in t && (r = !c.a.c(t.ifnot)), a = c.a.c(t.data)), "foreach" in t ? i = c.kd(o || e, r && t.foreach || [], t, e, s) : r ? (s = "data" in t ? s.createChildContext(a, t.as) : s, i = c.Ab(o || e, s, t, e)) : c.f.xa(e), s = i, (a = c.a.e.get(e, u)) && "function" == typeof a.k && a.k(), c.a.e.set(e, u, s && s.ba() ? s : n);
          }
        }, c.h.ta.template = function (e) {
          return e = c.h.yb(e), 1 == e.length && e[0].unknown || c.h.ad(e, "name") ? null : "This template engine does not support anonymous templates nested within its templates";
        }, c.f.Z.template = !0;
      }(), c.b("setTemplateEngine", c.Db), c.b("renderTemplate", c.Ab), c.a.dc = function (e, t, n) {
        if (e.length && t.length) {
          var r, i, s, o, u;
          for (r = i = 0; (!n || r < n) && (o = e[i]); ++i) {
            for (s = 0; u = t[s]; ++s)
              if (o.value === u.value) {
                o.moved = u.index, u.moved = o.index, t.splice(s, 1), r = s = 0;
                break;
              }
            r += s;
          }
        }
      }, c.a.ib = function () {
        function e(e, t, n, r, i) {
          var s = Math.min, o = Math.max, u = [], a, f = e.length, l, h = t.length, p = h - f || 1, d = f + h + 1, v, m, g;
          for (a = 0; a <= f; a++)
            for (m = v, u.push(v = []), g = s(h, a + p), l = o(0, a - 1); l <= g; l++)
              v[l] = l ? a ? e[a - 1] === t[l - 1] ? m[l - 1] : s(m[l] || d, v[l - 1] || d) + 1 : l + 1 : a + 1;
          s = [], o = [], p = [], a = f;
          for (l = h; a || l;)
            h = u[a][l] - 1, l && h === u[a][l - 1] ? o.push(s[s.length] = {
              status: n,
              value: t[--l],
              index: l
            }) : a && h === u[a - 1][l] ? p.push(s[s.length] = {
              status: r,
              value: e[--a],
              index: a
            }) : (--l, --a, i.sparse || s.push({
              status: "retained",
              value: t[l]
            }));
          return c.a.dc(p, o, !i.dontLimitMoves && 10 * f), s.reverse();
        }
        return function (t, n, r) {
          return r = "boolean" == typeof r ? { dontLimitMoves: r } : r || {}, t = t || [], n = n || [], t.length < n.length ? e(t, n, "added", "deleted", r) : e(n, t, "deleted", "added", r);
        };
      }(), c.b("utils.compareArrays", c.a.ib), function () {
        function e(e, t, r, i, s) {
          var o = [], u = c.B(function () {
              var n = t(r, s, c.a.za(o, e)) || [];
              0 < o.length && (c.a.qc(o, n), i && c.l.w(i, null, [
                r,
                n,
                s
              ])), o.length = 0, c.a.ra(o, n);
            }, null, {
              i: e,
              wa: function () {
                return !c.a.Qb(o);
              }
            });
          return {
            ca: o,
            B: u.ba() ? u : n
          };
        }
        var t = c.a.e.I(), r = c.a.e.I();
        c.a.Bb = function (i, s, o, u, a) {
          function f(e, t) {
            S = p[t], y !== t && (E[e] = S), S.qb(y++), c.a.za(S.ca, i), m.push(S), w.push(S);
          }
          function l(e, t) {
            if (e)
              for (var n = 0, r = t.length; n < r; n++)
                t[n] && c.a.q(t[n].ca, function (r) {
                  e(r, n, t[n].ja);
                });
          }
          s = s || [], u = u || {};
          var h = c.a.e.get(i, t) === n, p = c.a.e.get(i, t) || [], d = c.a.fb(p, function (e) {
              return e.ja;
            }), v = c.a.ib(d, s, u.dontLimitMoves), m = [], g = 0, y = 0, b = [], w = [];
          s = [];
          for (var E = [], d = [], S, x = 0, T, N; T = v[x]; x++)
            switch (N = T.moved, T.status) {
            case "deleted":
              N === n && (S = p[g], S.B && (S.B.k(), S.B = n), c.a.za(S.ca, i).length && (u.beforeRemove && (m.push(S), w.push(S), S.ja === r ? S = null : s[x] = S), S && b.push.apply(b, S.ca))), g++;
              break;
            case "retained":
              f(x, g++);
              break;
            case "added":
              N !== n ? f(x, N) : (S = {
                ja: T.value,
                qb: c.N(y++)
              }, m.push(S), w.push(S), h || (d[x] = S));
            }
          c.a.e.set(i, t, m), l(u.beforeMove, E), c.a.q(b, u.beforeRemove ? c.$ : c.removeNode);
          for (var x = 0, h = c.f.firstChild(i), C; S = w[x]; x++) {
            S.ca || c.a.extend(S, e(i, o, S.ja, a, S.qb));
            for (g = 0; v = S.ca[g]; h = v.nextSibling, C = v, g++)
              v !== h && c.f.gc(i, v, C);
            !S.Wc && a && (a(S.ja, S.ca, S.qb), S.Wc = !0);
          }
          l(u.beforeRemove, s);
          for (x = 0; x < s.length; ++x)
            s[x] && (s[x].ja = r);
          l(u.afterMove, E), l(u.afterAdd, d);
        };
      }(), c.b("utils.setDomNodeChildrenFromArrayMapping", c.a.Bb), c.W = function () {
        this.allowTemplateRewriting = !1;
      }, c.W.prototype = new c.O(), c.W.prototype.renderTemplateSource = function (e, t, n, r) {
        return (t = (9 > c.a.C ? 0 : e.nodes) ? e.nodes() : null) ? c.a.V(t.cloneNode(!0).childNodes) : (e = e.text(), c.a.ma(e, r));
      }, c.W.sb = new c.W(), c.Db(c.W.sb), c.b("nativeTemplateEngine", c.W), function () {
        c.vb = function () {
          var e = this.$c = function () {
            if (!v || !v.tmpl)
              return 0;
            try {
              if (0 <= v.tmpl.tag.tmpl.open.toString().indexOf("__"))
                return 2;
            } catch (e) {
            }
            return 1;
          }();
          this.renderTemplateSource = function (t, n, r, i) {
            i = i || u, r = r || {};
            if (2 > e)
              throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
            var s = t.data("precompiled");
            return s || (s = t.text() || "", s = v.template(null, "{{ko_with $item.koBindingContext}}" + s + "{{/ko_with}}"), t.data("precompiled", s)), t = [n.$data], n = v.extend({ koBindingContext: n }, r.templateOptions), n = v.tmpl(s, t, n), n.appendTo(i.createElement("div")), v.fragments = {}, n;
          }, this.createJavaScriptEvaluatorBlock = function (e) {
            return "{{ko_code ((function() { return " + e + " })()) }}";
          }, this.addTemplate = function (e, t) {
            u.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
          }, 0 < e && (v.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, v.tmpl.tag.ko_with = {
            open: "with($1) {",
            close: "} "
          });
        }, c.vb.prototype = new c.O();
        var e = new c.vb();
        0 < e.$c && c.Db(e), c.b("jqueryTmplTemplateEngine", c.vb);
      }();
    }));
  }());
}()
