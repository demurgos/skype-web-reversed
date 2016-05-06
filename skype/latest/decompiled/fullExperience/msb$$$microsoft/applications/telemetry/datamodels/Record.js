module.exports = function () {
  function t() {
    this.Id = n.GetGuid(), this.Timestamp = n.GetTimeStamp(), this.Type = "", this.EventType = "", this.Extension = new Microsoft.Bond.Collections.Map(), this.RecordType = 0, this.PIIExtensions = new Microsoft.Bond.Collections.Map();
  }
  return t.prototype.AddOrReplacePII = function (t, n, r) {
    var i = new e.datamodels.PII();
    i.RawContent = n, i.Kind = r, i.ScrubType = 1, this.PIIExtensions.AddOrReplace(t, i);
  }, t.prototype.Write = function (e) {
    this.WriteImpl(e, !1);
  }, t.prototype.WriteImpl = function (e, t) {
    e.WriteStructBegin(null, t), this.Id != "" ? (e.WriteFieldBegin(9, 1, null), e.WriteString(this.Id), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 1, null), this.Timestamp.Equals("0") ? e.WriteFieldOmitted(17, 3, null) : (e.WriteFieldBegin(17, 3, null), e.WriteInt64(this.Timestamp), e.WriteFieldEnd()), this.Type != "" ? (e.WriteFieldBegin(9, 5, null), e.WriteString(this.Type), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 5, null), this.EventType != "" ? (e.WriteFieldBegin(9, 6, null), e.WriteString(this.EventType), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 6, null);
    if (this.Extension.Count()) {
      e.WriteFieldBegin(13, 13, null), e.WriteMapContainerBegin(this.Extension.Count(), 9, 9);
      for (var n = 0; n < this.Extension.GetBuffer().length; ++n)
        e.WriteString(this.Extension.GetBuffer()[n].Key), e.WriteString(this.Extension.GetBuffer()[n].Value);
      e.WriteContainerEnd(), e.WriteFieldEnd();
    } else
      e.WriteFieldOmitted(13, 13, null);
    this.RecordType != 0 ? (e.WriteFieldBegin(16, 24, null), e.WriteInt32(this.RecordType), e.WriteFieldEnd()) : e.WriteFieldOmitted(16, 24, null);
    if (this.PIIExtensions.Count()) {
      e.WriteFieldBegin(13, 30, null), e.WriteMapContainerBegin(this.PIIExtensions.Count(), 9, 10);
      for (var r = 0; r < this.PIIExtensions.GetBuffer().length; ++r)
        e.WriteString(this.PIIExtensions.GetBuffer()[r].Key), this.PIIExtensions.GetBuffer()[r].Value.WriteImpl(e, !1);
      e.WriteContainerEnd(), e.WriteFieldEnd();
    } else
      e.WriteFieldOmitted(13, 30, null);
    e.WriteStructEnd(t);
  }, t.prototype.Read = function (e) {
    this.ReadImpl(e, !1);
  }, t.prototype.ReadImpl = function (e, t) {
  }, t;
}()
