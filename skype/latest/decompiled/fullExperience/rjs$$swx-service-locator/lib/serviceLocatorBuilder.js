(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-service-locator/lib/serviceLocatorBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "./serviceLocator"
    ], e);
}(function (e, t) {
  function s(e) {
    var t = new i();
    return e ? t.withOptions(e) : t;
  }
  var n = e("lodash-compat"), r = e("./serviceLocator"), i = function () {
      function e() {
        this.options = {
          factories: [],
          frozen: !1,
          baseLocator: r.ServiceLocator.prototype
        };
      }
      return e.prototype.withOptions = function (e) {
        return n.assign(this.options, e), this;
      }, e.prototype.withService = function (e, t) {
        var r = {
          name: e.name,
          build: e.build
        };
        return t && n.extend(r, t), this.options.factories.push(r), this;
      }, e.prototype.withServiceInstance = function (e, t) {
        return t ? this.options.factories.push({
          name: t.name,
          build: function () {
            return e;
          }
        }) : this.options.factories.push({
          name: e.name,
          build: function () {
            return e.instance;
          }
        }), this;
      }, e.prototype.frozen = function () {
        return this.options.frozen = !0, this;
      }, e.prototype.withBase = function (e) {
        return this.options.baseLocator = e, this;
      }, e.prototype.build = function (e) {
        var t = this;
        return Promise.all(this.options.factories.map(function (e) {
          return Promise.resolve(e.build()).then(function (t) {
            return [
              e.name,
              t
            ];
          });
        })).then(function (n) {
          return n.reduce(function (e, t) {
            var n = t[0], r = t[1];
            return e.register(n, r), e;
          }, e || Object.create(t.options.baseLocator));
        }).then(function (e) {
          return t.options.frozen ? Object.freeze(e) : e;
        });
      }, e.prototype.buildSync = function (e) {
        var t = this.options.factories.map(function (e) {
          return [
            e.name,
            e.build()
          ];
        }).map(function (e) {
          var t = e[0], n = e[1];
          if (n.then === undefined)
            return [
              t,
              n
            ];
          throw new Error("#buildSync can't build " + t + " because it is asynchronous");
        }).reduce(function (e, t) {
          var n = t[0], r = t[1];
          return e.register(n, r), e;
        }, e || Object.create(this.options.baseLocator));
        return this.options.frozen ? Object.freeze(t) : t;
      }, e;
    }();
  t.serviceLocatorBuilder = s;
}));
