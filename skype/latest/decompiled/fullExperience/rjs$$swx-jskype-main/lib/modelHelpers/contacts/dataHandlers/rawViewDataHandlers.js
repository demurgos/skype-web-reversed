(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/rawViewDataHandlers", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../../lib/telemetry/people/contactList",
      "../../../../lib/modelHelpers/contacts/dataProcessors/contactListDataProcessor",
      "../../../../lib/modelHelpers/contacts/dataProcessors/blocklistDataProcessor",
      "../../../../lib/modelHelpers/contacts/dataHandlers/rawViewCacheDataHandler",
      "../../../../lib/services/cache/instance",
      "swx-browser-globals",
      "../../../../lib/services/contactsV2/instance",
      "swx-constants/lib/people",
      "jskype-constants/lib/data",
      "jskype-constants/lib/people",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function g() {
    return new m();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../../lib/telemetry/people/contactList"), i = e("../../../../lib/modelHelpers/contacts/dataProcessors/contactListDataProcessor"), s = e("../../../../lib/modelHelpers/contacts/dataProcessors/blocklistDataProcessor"), o = e("../../../../lib/modelHelpers/contacts/dataHandlers/rawViewCacheDataHandler"), u = e("../../../../lib/services/cache/instance"), a = e("swx-browser-globals"), f = e("../../../../lib/services/contactsV2/instance"), l = e("swx-constants/lib/people"), c = e("jskype-constants/lib/data"), h = e("jskype-constants/lib/people"), p = e("lodash-compat"), d = c["default"].storageKeys, v = h["default"].contactList.retry.TIMEOUT, m = function () {
      function e() {
        var e = this;
        this.contactListDataProcessor = i.build();
        this.firstLoad = !0;
        this.onSuccess = function (t) {
          var n = e, i = n.contactListDataProcessor.process(t.response), u = s.process(t.response);
          return r.onQueryContactListEnd({
            firstLoad: n.firstLoad,
            isFullFetch: n.isFullFetch(t.response),
            success: !0,
            serviceElapsed: t.duration
          }), n.firstLoad = !1, Promise.all([
            i,
            u
          ]).then(o.update).then(function (t) {
            if (t) {
              var r = t.getResponseHeader("ETag");
              r && n.resetEtag(r);
            }
          }.bind(null, t.request));
        };
        this.onError = function (t) {
          return t.status === 404 && !e.contactListTimeOut && (n.get().personsAndGroupsManager._initialized(!0), e.contactListTimeOut = a.getWindow().setTimeout(e.retryGetRawView.bind(e), v)), r.onQueryContactListEnd({
            firstLoad: e.firstLoad,
            success: !1
          }), e.firstLoad = !1, Promise.reject(t);
        };
      }
      return e.prototype.resetEtag = function (e) {
        u.get().setItem(d.CONTACTS_RAW_VIEW_ETAG, e);
      }, e.prototype.retryGetRawView = function () {
        var e = this, t = n.get().personsAndGroupsManager.mePerson.id();
        u.get().getItem(d.CONTACTS_RAW_VIEW_ETAG).then(function (n) {
          f.get().getRawViewDelta(t, n).then(e.onSuccess, e.onError);
          e.contactListTimeOut = undefined;
        });
      }, e.prototype.isFullFetch = function (e) {
        function t(e) {
          return p.isString(e) ? e.toLowerCase() : "";
        }
        return !e || !e.scope ? !1 : t(e.scope) === l["default"].scopes.FULL;
      }, e;
    }();
  t.RawViewDataHandlers = m;
  t.build = g;
}));
