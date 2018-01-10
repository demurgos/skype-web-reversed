(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("trouter-client/lib/index", [
      "require",
      "exports",
      "./trouterclient"
    ], e);
}(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = {
      createServer: function () {
        return {
          open: function () {
          },
          close: function () {
          },
          on: function () {
          },
          getServerState: function () {
          }
        };
      }
    };
    return t;
  }
  return function () {
    return e("./trouterclient"), this.trouter;
  }.call();
}));
