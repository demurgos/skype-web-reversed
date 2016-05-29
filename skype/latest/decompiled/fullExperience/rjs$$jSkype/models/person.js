define("jSkype/models/person", [
  "require",
  "jcafe-property-model",
  "jSkype/models/note",
  "jSkype/models/location",
  "jSkype/models/capabilities",
  "jSkype/models/phoneNumber",
  "swx-enums",
  "jSkype/client",
  "constants/common",
  "jSkype/settings",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personHelper",
  "jSkype/services/serviceFactory",
  "jSkype/models/agentDetails"
], function (e) {
  function m(e) {
    function y(e, n) {
      function p() {
        var t = {}, n = a.telemetry.contacts;
        e ? (c.setBlocked(h.getPerson(r)), t.name = n.name.CONTACT_BLOCKED) : (c.setUnblocked(h.getPerson(r)), t.name = n.name.CONTACT_UNBLOCKED);
        u.get()._telemetryManager.sendEvent(f.settings.telemetry.jSkypeTenantToken, n.type.CONTACTS, t);
        i.resolve(e);
      }
      function v(e) {
        i.reject(e);
      }
      var r = m.id(), i = t.task(), s = l.contactTypesByCode[m._type()], o = d.getContactsService();
      return e ? o.blockContact(r, s, n).then(p, v) : o.unblockContact(r, s).then(p, v), i.promise;
    }
    function b(e) {
      return e !== undefined ? new Date(e) : undefined;
    }
    function w(e) {
      if (p.isPstnId(e)) {
        var t = new s();
        t.type._set(o.phoneType.Other);
        t.telUri._set(e);
        t.displayString._set(e);
        m.phoneNumbers.add(t, e);
      }
    }
    function E(e) {
      m.capabilities.chat._set(e);
      m.capabilities.audio._set(e);
      m.capabilities.video._set(e);
      m.capabilities.groupAdd._set(e);
    }
    var m = this, g = t.enabledCommand(y);
    this._type = t.property({
      readOnly: !0,
      value: l.contactTypes.skype
    });
    this._authorization = t.property({ readOnly: !0 });
    this.id = t.property({
      readOnly: !0,
      value: e
    });
    this.isBlocked = t.property({
      set: g,
      value: !1
    });
    this.isAgent = t.property({
      readOnly: !0,
      value: !1
    });
    this.displayName = t.property({
      readOnly: !0,
      value: e
    });
    this.firstName = t.property({ readOnly: !0 });
    this.lastName = t.property({ readOnly: !0 });
    this.title = t.property({ readOnly: !0 });
    this.office = t.property({ readOnly: !0 });
    this.department = t.property({ readOnly: !0 });
    this.company = t.property({ readOnly: !0 });
    this.avatarUrl = t.property({
      readOnly: !0,
      value: p.isGuestId(e) ? undefined : p.getAvatarUri(e)
    });
    this.emails = t.collection();
    this.status = t.property({ readOnly: !0 });
    this.activity = t.property({ readOnly: !0 });
    this.endpointType = t.property({
      readOnly: !0,
      value: o.endpointType.Desktop
    });
    this.lastSeenAt = t.property({ set: b });
    this.note = new n();
    this.location = new r();
    this.location.type._set(o.locationType.Unknown);
    this.capabilities = new i();
    E(!0);
    this.phoneNumbers = t.collection();
    w(e);
    this.agentDetails = new v();
    this.subscribe = t.enabledCommand(function () {
    });
  }
  var t = e("jcafe-property-model"), n = e("jSkype/models/note"), r = e("jSkype/models/location"), i = e("jSkype/models/capabilities"), s = e("jSkype/models/phoneNumber"), o = e("swx-enums"), u = e("jSkype/client"), a = e("constants/common"), f = e("jSkype/settings"), l = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), c = e("jSkype/modelHelpers/contacts/authorizationChange"), h = e("jSkype/modelHelpers/personsAndGroupsHelper"), p = e("jSkype/modelHelpers/personHelper"), d = e("jSkype/services/serviceFactory"), v = e("jSkype/models/agentDetails");
  return m;
});
