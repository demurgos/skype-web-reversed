define("experience/api/error", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  var n = e("lodash-compat");
  t.asApiError = function (e, t) {
    var r;
    return e instanceof Error ? r = Object.create(e) : n.isString(e) ? r = new Error(e) : (r = new Error("Unknown: please check *data* property for more info"), r.data = e), r.name = [
      "SWXApi",
      t || "",
      r.name
    ].join(":"), r;
  };
});
