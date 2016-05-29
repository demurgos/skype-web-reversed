module.exports = function () {
  function e() {
    this.DataPackages = [];
    this.RequestRetryCount = 0;
  }
  return e.prototype.Write = function (e) {
    this.WriteImpl(e, !1);
  }, e.prototype.WriteImpl = function (e, t) {
    e.WriteStructBegin(null, t);
    if (this.DataPackages.length) {
      e.WriteFieldBegin(11, 1, null);
      e.WriteContainerBegin(this.DataPackages.length, 10);
      for (var n = 0; n < this.DataPackages.length; ++n)
        this.DataPackages[n].WriteImpl(e, !1);
      e.WriteContainerEnd();
      e.WriteFieldEnd();
    } else
      e.WriteFieldOmitted(11, 1, null);
    this.RequestRetryCount != 0 ? (e.WriteFieldBegin(16, 2, null), e.WriteInt32(this.RequestRetryCount), e.WriteFieldEnd()) : e.WriteFieldOmitted(16, 2, null);
    e.WriteStructEnd(t);
  }, e.prototype.Read = function (e) {
    this.ReadImpl(e, !1);
  }, e.prototype.ReadImpl = function (e, t) {
  }, e;
}()
