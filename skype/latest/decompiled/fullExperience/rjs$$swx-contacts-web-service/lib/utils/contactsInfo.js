(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-contacts-web-service/lib/utils/contactsInfo", [
      "require",
      "exports",
      "swx-constants/lib/people"
    ], e);
}(function (e, t) {
  var n = e("swx-constants/lib/people"), r = function () {
      function e(e) {
        this.items = [];
        this.itemsObj = {};
        this.key = e;
      }
      return e.prototype.reset = function () {
        this.items = [];
        this.itemsObj = {};
      }, e.prototype.add = function (e) {
        var t = this;
        if (!e)
          return;
        e.forEach(function (e) {
          !t.itemsObj[e[t.key]] || (t.items = t.items.filter(function (n) {
            return n[t.key] !== e[t.key];
          }));
          t.itemsObj[e[t.key]] = e;
        });
        this.items = this.items.concat(e);
      }, e.prototype.getItems = function () {
        return this.items;
      }, e;
    }(), i = function () {
      function e() {
        this.callCount = 0;
        this.contacts = new r("mri");
        this.blocklist = new r("mri");
        this.groups = new r("id");
        this.duration = 0;
        this.firstScope = "";
      }
      return e.prototype.reset = function () {
        this.firstScope = "";
        this.contacts.reset();
        this.groups.reset();
        this.blocklist.reset();
      }, e.prototype.update = function (e) {
        this.callCount++;
        this.duration += e.duration || 0;
        var t = e.response;
        if (!t)
          return;
        this.callCount > 1 && t.scope === n["default"].scopes.FULL && this.reset();
        t.scope && !this.firstScope && (this.firstScope = t.scope);
        this.contacts.add(t.contacts);
        this.groups.add(t.groups);
        this.blocklist.add(t.blocklist);
      }, e;
    }();
  t.ContactsInfo = i;
}));
