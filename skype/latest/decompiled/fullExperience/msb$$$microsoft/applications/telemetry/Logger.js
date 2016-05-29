module.exports = function () {
  function n(t) {
    this._initId = e.datamodels.utils.GetGuid();
    this._sequence = 0;
    this._tenantToken = null;
    this._contextProperties = new i();
    this._semanticContext = new u();
    this._sessionStartTime = 0;
    this._sessionId = null;
    t ? this._tenantToken = t : this._tenantToken = l.getDefaultToken();
  }
  return n.prototype.logEvent = function (e) {
    if (!e.name)
      throw new o(2);
    var t = this._createEventRecord(e.name, e.eventType);
    this._addCustomPropertiesToEvent(t, e);
    this._sendRecord(t);
  }, n.prototype.logFailure = function (e, t, n, r, i) {
    if (!e)
      throw new o(5);
    if (!t)
      throw new o(6);
    var s = this._createEventRecord("failure", "failure");
    s.Extension.Add("Failure.Signature", e);
    s.Extension.Add("Failure.Detail", t);
    n && s.Extension.Add("Failure.Category", n);
    r && s.Extension.Add("Failure.Id", r);
    this._addCustomPropertiesToEvent(s, i);
    this._sendRecord(s);
  }, n.prototype.logPageView = function (e, t, n, r, i, s) {
    if (!e)
      throw new o(7);
    if (!t)
      throw new o(8);
    var u = this._createEventRecord("pageview", "pageview");
    u.Extension.Add("PageView.Id", e);
    u.Extension.Add("PageView.Name", t);
    n && u.Extension.Add("PageView.Category", n);
    r && u.Extension.Add("PageView.Uri", r);
    i && u.Extension.Add("PageView.ReferrerUri", i);
    this._addCustomPropertiesToEvent(u, s);
    this._sendRecord(u);
  }, n.prototype.logSession = function (t, n) {
    if (t !== 0 && t !== 1)
      throw new o(9);
    var r = this._createEventRecord("session", "session");
    if (t === 0) {
      if (this._sessionStartTime > 0)
        return;
      this._sessionStartTime = new Date().getTime();
      this._sessionId = e.datamodels.utils.GetGuid();
      r.Extension.Add("Session.Id", this._sessionId);
      r.Extension.Add("Session.State", "Started");
    } else if (t === 1) {
      if (this._sessionStartTime == 0)
        return;
      var i = Math.floor((new Date().getTime() - this._sessionStartTime) / 1000);
      r.Extension.Add("Session.Duration", i.toString());
      r.Extension.Add("Session.DurationBucket", this._getSessionDurationFromTime(i));
      r.Extension.Add("Session.Id", this._sessionId);
      r.Extension.Add("Session.State", "Ended");
      this._sessionId = null;
      this._sessionStartTime = 0;
    }
    r.Extension.Add("Session.FirstLaunchTime", this._getISOString(new Date(a.firstLaunchTime)));
    this._addCustomPropertiesToEvent(r, n);
    this._sendRecord(r);
  }, n.prototype.getSessionId = function () {
    return this._sessionId;
  }, n.prototype.setContext = function (e, t, n) {
    this._contextProperties.setProperty(e, t, n);
  }, n.prototype.getSemanticContext = function () {
    return this._semanticContext;
  }, n.prototype._getSessionDurationFromTime = function (e) {
    return e < 0 ? "Undefined" : e <= 3 ? "UpTo3Sec" : e <= 10 ? "UpTo10Sec" : e <= 30 ? "UpTo30Sec" : e <= 60 ? "UpTo60Sec" : e <= 180 ? "UpTo3Min" : e <= 600 ? "UpTo10Min" : e <= 1800 ? "UpTo30Min" : "Above30Min";
  }, n.prototype._createEventRecord = function (t, n) {
    var r = new e.datamodels.Record();
    n || (n = "custom");
    r.EventType = t.toLowerCase();
    r.Type = n.toLowerCase();
    r.Extension.Add("EventInfo.Source", "JS_default_source");
    r.Extension.Add("EventInfo.InitId", this._initId);
    this._sequence++;
    r.Extension.Add("EventInfo.Sequence", this._sequence.toString());
    r.Extension.Add("EventInfo.Name", t.toLowerCase());
    var i = new Date();
    return r.Timestamp = e.datamodels.utils.GetTimeStampWithValue(i.getTime()), r.Extension.Add("EventInfo.Time", this._getISOString(i)), r.Extension.Add("EventInfo.SdkVersion", "ACT-Web-JS-" + clienttelemetry_build.version), r;
  }, n.prototype._getISOString = function (e) {
    function t(e) {
      return e < 10 ? "0" + e : e.toString();
    }
    function n(e) {
      return e < 10 ? "00" + e : e < 100 ? "0" + e : e.toString();
    }
    return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + ":" + n(e.getUTCMilliseconds()) + "Z";
  }, n.prototype._addCustomPropertiesToEvent = function (e, t) {
    this._addSemanticContext(e, a.semanticContext);
    this._addSemanticContext(e, l._semanticContext);
    this._addSemanticContext(e, this._semanticContext);
    this._sessionId && e.Extension.Add("Session.Id", this._sessionId);
    this._addEventPropertiesToEvent(e, l._contextProperties);
    this._addEventPropertiesToEvent(e, this._contextProperties);
    this._addEventPropertiesToEvent(e, t);
  }, n.prototype._addSemanticContext = function (e, t) {
    if (t && t.contextMap.Count() > 0) {
      var n = t.contextMap.GetBuffer();
      for (var r = 0; r < n.length; r++)
        n[r].Key == "UserInfo.Id" && t.piiKind != 0 ? e.AddOrReplacePII(n[r].Key, n[r].Value, t.piiKind) : e.Extension.AddOrReplace(n[r].Key, n[r].Value);
    }
  }, n.prototype._addEventPropertiesToEvent = function (t, n) {
    if (n) {
      n.timestamp && n.timestamp >= new Date("1/1/2000").getTime() && (t.Timestamp = e.datamodels.utils.GetTimeStampWithValue(n.timestamp), t.Extension.AddOrReplace("EventInfo.Time", new Date(n.timestamp).toISOString()));
      n.name && (t.EventType = n.name.toLowerCase(), t.Extension.AddOrReplace("EventInfo.Name", n.name.toLowerCase()));
      var r = n.properties;
      if (r && r.length > 0)
        for (var i = 0; i < r.length; i++)
          r[i].key && typeof r[i].key == "string" && (r[i].value || r[i].value == 0 || r[i].value == 0 || r[i].value == "") && (this._isPii(r[i].pii) ? (t.AddOrReplacePII(r[i].key, r[i].value.toString(), r[i].pii), t.Extension.Remove(r[i].key)) : (t.Extension.AddOrReplace(r[i].key, r[i].value.toString()), t.PIIExtensions.Remove(r[i].key)));
    }
  }, n.prototype._isPii = function (t) {
    if (t == (null || undefined || 0))
      return !1;
    var n = !1;
    for (var r in e.datamodels.PIIKind)
      isNaN(r) || r == t && (n = !0);
    return n;
  }, n.prototype._sendRecord = function (e) {
    l.isInitialized() && t.SendAsync(this._tenantToken, [e]);
  }, n;
}()
