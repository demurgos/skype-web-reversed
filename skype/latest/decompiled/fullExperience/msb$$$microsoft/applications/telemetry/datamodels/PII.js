module.exports = function () {
  function e() {
    this.ScrubType = 0;
    this.Kind = 0;
    this.RawContent = "";
  }
  return e.prototype.Write = function (e) {
    this.WriteImpl(e, !1);
  }, e.prototype.WriteImpl = function (e, t) {
    e.WriteStructBegin(null, t);
    this.ScrubType != 0 ? (e.WriteFieldBegin(16, 1, null), e.WriteInt32(this.ScrubType), e.WriteFieldEnd()) : e.WriteFieldOmitted(16, 1, null);
    this.Kind != 0 ? (e.WriteFieldBegin(16, 2, null), e.WriteInt32(this.Kind), e.WriteFieldEnd()) : e.WriteFieldOmitted(16, 2, null);
    this.RawContent != "" ? (e.WriteFieldBegin(9, 3, null), e.WriteString(this.RawContent), e.WriteFieldEnd()) : e.WriteFieldOmitted(9, 3, null);
    e.WriteStructEnd(t);
  }, e.prototype.Read = function (e) {
    this.ReadImpl(e, !1);
  }, e.prototype.ReadImpl = function (e, t) {
  }, e;
}()
