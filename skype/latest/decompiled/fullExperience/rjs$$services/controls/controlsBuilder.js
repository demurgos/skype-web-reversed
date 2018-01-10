define("services/controls/controlsBuilder", [
  "require",
  "vendor/knockout",
  "experience/settings",
  "browser/dom",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/accessibility",
  "utils/common/applicationFocusManager",
  "swx-g11n"
], function (e) {
  function c() {
    function p() {
      t.virtualElements.allowedBindings.control = !0;
      t.bindingHandlers.control = {
        init: function (e, n) {
          var r = n(), i;
          r = t.unwrap(r);
          i = c[r.name];
          i.render(r.model, function (n) {
            var r = e.parentNode, s = e.nextSibling;
            r.insertBefore(n, e);
            r.removeChild(e);
            r.removeChild(s);
            i.onDispose && t.utils.domNodeDisposal.addDisposeCallback(n, i.onDispose.bind(i));
          });
        }
      };
    }
    function d(e) {
      if (!b(e))
        throw "Invalid control. Make sure \"name\" and \"render\" attributes are present.";
      if (c[e.name])
        throw "The control you are trying to register (name: " + e.name + ") has already been registered";
      c[e.name] = e;
    }
    function v(e, t, n) {
      c[e].render(n, function (e) {
        g(t);
        m(e, t);
        var n = e.querySelectorAll("[" + f + "]");
        for (var r = n.length - 1; r >= 0; r--) {
          var i = n[r], s = i.getAttribute(f), o = w(i) || {};
          v(s, i, o);
        }
      });
    }
    function m(e, t) {
      t.appendChild(e);
    }
    function g(e) {
      var n;
      if (!e || !e.childNodes)
        return;
      n = e.childNodes;
      for (var r = n.length - 1; r >= 0; r--)
        y(n[r]) || t.removeNode(n[r]);
    }
    function y(e) {
      for (var t = 0; t < h.length; t++)
        if (h[t](e))
          return !0;
      return !1;
    }
    function b(e) {
      return e.name && e.render && typeof e.render == "function";
    }
    function w(e) {
      var t;
      if (e.dataset)
        t = e.dataset[l];
      else if (e.attributes) {
        var n = e.attributes["data-" + l];
        n && (t = n.value);
      }
      if (!t)
        return {};
      try {
        return JSON.parse(t);
      } catch (r) {
        return {};
      }
    }
    var e = this, c = {}, h = [];
    p();
    this.registeredElements = [];
    this.build = function (t, f, l) {
      var c = r.getElement(f), h = i.resolve(s.serviceLocator.FEATURE_FLAGS), p = h.isFeatureOn(s.featureFlags.SHOW_SPLASH_SCREEN), d;
      e.registeredElements.push({
        name: t,
        element: f
      });
      t === n.controls.content.toLowerCase() && p && (d = i.resolve(s.serviceLocator.SPLASH_SCREEN), d.init(c.parentNode));
      l = l || {};
      c.addClass(s.experience.RENDERER_CLASS);
      a.initLocaleDirection(c);
      o.initFocusRing(c);
      u.registerContainer(c);
      n.mode && (l.mode = n.mode, c.addClass(n.mode));
      v(t, c, l);
    };
    this.register = function (e) {
      e instanceof Array ? e.forEach(function (e) {
        d(e);
      }) : d(e);
    };
    this.get = function (e) {
      if (!c[e])
        throw "Control not found";
      return c[e];
    };
    this.available = function () {
      return Object.keys(c);
    };
    this.registerNodePersistenceInspector = function (e) {
      h.push(e);
    };
  }
  var t = e("vendor/knockout"), n = e("experience/settings"), r = e("browser/dom"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("utils/common/accessibility"), u = e("utils/common/applicationFocusManager"), a = e("swx-g11n").globalization, f = "data-control", l = "model";
  return c;
});
