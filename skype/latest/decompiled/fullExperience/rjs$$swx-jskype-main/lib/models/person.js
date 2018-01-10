(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/person", [
      "require",
      "exports",
      "jcafe-property-model",
      "./note",
      "./location",
      "./capabilities",
      "./phoneNumber",
      "swx-enums",
      "swx-jskype-internal-application-instance",
      "../modelHelpers/contacts/authorizationChange",
      "../modelHelpers/personHelper",
      "../services/contactsV2/instance",
      "./agentDetails",
      "swx-mri",
      "swx-mri/lib/mriMaps"
    ], e);
}(function (e, t) {
  function m(e) {
    var t = e.id();
    if (p.isPstnId(t)) {
      var n = new o["default"]();
      n.type._set(u.phoneType.Other);
      n.telUri._set(t);
      n.displayString._set(t);
      n.fromProfile._set(!0);
      e.phoneNumbers.add(n, t);
    }
  }
  function g(e, t) {
    e.capabilities.chat._set(t);
    e.capabilities.audio._set(t);
    e.capabilities.video._set(t);
    e.capabilities.groupAdd._set(t);
    e.capabilities.screenSharing._set(t);
  }
  function y(e, t, n) {
    function o() {
      var e = !!n && n.value;
      return e ? c.get().blockContact(r, s, e, n.reason) : c.get().blockContact(r, s, e);
    }
    function u() {
      return c.get().unblockContact(r, s);
    }
    function l() {
      return t ? f.setBlocked(e).then(function () {
        return !0;
      }) : (f.setUnblocked(e), Promise.resolve(!1));
    }
    var r = a.get().personsAndGroupsManager.mePerson.id(), i = e.id(), s = p.getKey(i, e._type());
    return t ? o().then(l) : u().then(l);
  }
  var n = e("jcafe-property-model"), r = e("./note"), i = e("./location"), s = e("./capabilities"), o = e("./phoneNumber"), u = e("swx-enums"), a = e("swx-jskype-internal-application-instance"), f = e("../modelHelpers/contacts/authorizationChange"), l = e("../modelHelpers/personHelper"), c = e("../services/contactsV2/instance"), h = e("./agentDetails"), p = e("swx-mri"), d = e("swx-mri/lib/mriMaps"), v = function () {
      function e(e) {
        this._type = n.property({
          readOnly: !0,
          value: d.contactMriTypes.skype
        });
        this._authorization = n.property({ readOnly: !0 });
        this.isAgent = n.property({
          readOnly: !0,
          value: !1
        });
        this.firstName = n.property({ readOnly: !0 });
        this.lastName = n.property({ readOnly: !0 });
        this.title = n.property({ readOnly: !0 });
        this.office = n.property({ readOnly: !0 });
        this.department = n.property({ readOnly: !0 });
        this.company = n.property({ readOnly: !0 });
        this.emails = n.collection();
        this.status = n.property({ readOnly: !0 });
        this.activity = n.property({ readOnly: !0 });
        this.endpointType = n.property({
          readOnly: !0,
          value: u.endpointType.Desktop
        });
        this.note = new r["default"]();
        this.lastSeenAt = n.property({
          set: function (e) {
            return e !== undefined ? new Date(e) : undefined;
          }
        });
        this.location = new i["default"]();
        this._birthday = n.property({ readOnly: !0 });
        this.capabilities = new s["default"]();
        this.phoneNumbers = n.collection();
        this.agentDetails = new h["default"]();
        this.subscribe = n.enabledCommand(function () {
        });
        this.addPhoneNumber = function (e, t) {
          var n = this, r = a.get().personsAndGroupsManager.mePerson.id(), i = p.getKey(this.id(), this._type());
          return t = t || "mobile", c.get().addContactPhoneNumber(r, i, t, e).then(function () {
            var t = new o["default"]();
            t.type._set(u.phoneType.Cell);
            t.telUri._set(e);
            t.fromProfile._set(!1);
            t.displayString._set(e);
            n.phoneNumbers.add(t, e);
          });
        };
        this.removePhoneNumber = function (e) {
          var t = this, n = a.get().personsAndGroupsManager.mePerson.id(), r = p.getKey(this.id(), this._type());
          return c.get().deleteContactPhoneNumber(n, r, e).then(function (n) {
            var r = -1;
            return t.phoneNumbers().forEach(function (t, n) {
              t.telUri() === e && !t.fromProfile() && (r = n);
            }), r >= 0 && t.phoneNumbers.remove(r), n;
          });
        };
        var t = y.bind(null, this), f = n.enabledCommand(t);
        this.id = n.property({
          readOnly: !0,
          value: e
        });
        this.isBlocked = n.property({
          set: f,
          value: !1
        });
        this.displayName = n.property({
          readOnly: !0,
          value: e
        });
        this.avatarUrl = n.property({
          readOnly: !0,
          value: p.isGuestId(e) ? undefined : l.getAvatarUri(e)
        });
        this.location.type._set(u.locationType.Unknown);
        g(this, !0);
        m(this);
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = v;
}));
