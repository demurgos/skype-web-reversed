module.exports = function () {
  function e() {
    this.Source = "";
    this.DataPackageId = "";
    this.Timestamp = new Microsoft.Bond.Int64("0");
    this.Records = [];
  }
  return e.prototype.Write = function (e) {
    this.WriteImpl(e, !1);
  }, e.prototype.WriteImpl = function (e, t) {
    e.WriteStructBegin(null, t);
    this.Source != "" ? (e.WriteFieldBegin(9, 2, null), e.WriteString(this.Source), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 2, null);
    this.DataPackageId != "" ? (e.WriteFieldBegin(9, 5, null), e.WriteString(this.DataPackageId), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 5, null);
    this.Timestamp.Equals("0") ? e.WriteFieldOmitted(17, 6, null) : (e.WriteFieldBegin(17, 6, null), e.WriteInt64(this.Timestamp), e.WriteFieldEnd());
    if (this.Records.length) {
      e.WriteFieldBegin(11, 8, null);
      e.WriteContainerBegin(this.Records.length, 10);
      for (var n = 0; n < this.Records.length; ++n)
        this.Records[n].WriteImpl(e, !1);
      e.WriteContainerEnd();
      e.WriteFieldEnd();
    } else
      e.WriteFieldOmitted(11, 8, null);
    e.WriteStructEnd(t);
  }, e.prototype.Read = function (e) {
    this.ReadImpl(e, !1);
  }, e.prototype.ReadImpl = function (e, t) {
  }, e;
}()
