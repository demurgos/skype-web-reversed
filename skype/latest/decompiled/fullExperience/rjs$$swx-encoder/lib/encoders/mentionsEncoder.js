(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/mentionsEncoder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-cafe-application-instance",
      "../domTransformers"
    ], e);
}(function (e, t) {
  function u(e) {
    return new o(e);
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("../domTransformers"), s = /(\(|\))/g, o = function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return n.conversation = t, n;
      }
      return __extends(t, e), t.prototype.createXmlElement = function (e, t) {
        var n = e.createElement("at");
        return n.setAttribute("id", t.type + ":" + t.skypeId), n.innerText = t.defaultDisplayName, n;
      }, t.prototype.getMentionUserData = function (e) {
        var t, i = "", o = {
            defaultDisplayName: "",
            displayName: "",
            skypeId: "",
            type: "",
            isMePerson: !1
          };
        if (!e)
          return undefined;
        e = e.toLowerCase();
        var u = e.indexOf("(") === 0, a = u ? e.substring(1, e.length - 1) : "", f = r.get().personsAndGroupsManager.mePerson, l = r.get().personsAndGroupsManager.all.persons();
        if (this.conversation) {
          var c = this.conversation.participants().map(function (e) {
            return e.person;
          });
          l = l.concat(c);
        }
        return o.isMePerson = e === f.id().toLowerCase() || u && f.displayName().replace(s, "").toLowerCase() === a, o.isMePerson ? t = f : t = n.find(l, function (t) {
          return t.id().toLowerCase() === e || u && t.displayName().replace(s, "").toLowerCase() === a;
        }), t ? (o.skypeId = t.id(), o.type = t._type(), o.displayName = t.displayName(), t.firstName() && (o.defaultDisplayName = t.firstName(), i = " "), t.lastName() && (o.defaultDisplayName += i + t.lastName()), o.defaultDisplayName || (o.defaultDisplayName = o.displayName), o) : undefined;
      }, t.prototype.isElementAllowed = function (e) {
        return e.nodeName.toLowerCase() !== "i" || e.className.toLowerCase().indexOf("mention") === -1;
      }, t.prototype.wordRawToXml = function (e, t) {
        var n = [], r = t.substring(1), i = /[\.,_:\-;?]$/, s, o = this.getMentionUserData(r);
        while (!o && r.match(i))
          s = r.charAt(r.length - 1), r = r.substring(0, r.length - 1), o = this.getMentionUserData(r);
        return o && (n.push(this.createXmlElement(e, o)), s && n.push(e.createTextNode(s))), n;
      }, t.prototype.wordMatcher = function () {
        return /@([a-z0-9\.,\-_:]+|\(.+?\))/gi;
      }, t;
    }(i.WordDomTransformer);
  t.build = u;
}));
