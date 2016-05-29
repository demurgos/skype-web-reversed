module.exports = function () {
  function t(e) {
    this._stream = e;
  }
  return t.prototype.WriteBlob = function (e) {
    this._stream.Write(e, 0, e.length);
  }, t.prototype.WriteBool = function (e) {
    this._stream.WriteByte(e ? 1 : 0);
  }, t.prototype.WriteContainerBegin = function (e, t) {
    this.WriteUInt8(t);
    this.WriteUInt32(e);
  }, t.prototype.WriteMapContainerBegin = function (e, t, n) {
    this.WriteUInt8(t);
    this.WriteUInt8(n);
    this.WriteUInt32(e);
  }, t.prototype.WriteContainerEnd = function () {
  }, t.prototype.WriteDouble = function (t) {
    var n = e.Encoding.Double.GetBytes(t);
    this._stream.Write(n, 0, n.length);
  }, t.prototype.WriteFloat = function (t) {
    var n = e.Encoding.Float.GetBytes(t);
    this._stream.Write(n, 0, n.length);
  }, t.prototype.WriteFieldBegin = function (e, t, n) {
    t <= 5 ? this._stream.WriteByte(e | t << 5) : t <= 255 ? (this._stream.WriteByte(e | 192), this._stream.WriteByte(t)) : (this._stream.WriteByte(e | 224), this._stream.WriteByte(t), this._stream.WriteByte(t >> 8));
  }, t.prototype.WriteFieldEnd = function () {
  }, t.prototype.WriteFieldOmitted = function (e, t, n) {
  }, t.prototype.WriteInt16 = function (t) {
    t = e.Encoding.Zigzag.EncodeZigzag16(t);
    this.WriteUInt16(t);
  }, t.prototype.WriteInt32 = function (t) {
    t = e.Encoding.Zigzag.EncodeZigzag32(t);
    this.WriteUInt32(t);
  }, t.prototype.WriteInt64 = function (t) {
    this.WriteUInt64(e.Encoding.Zigzag.EncodeZigzag64(t));
  }, t.prototype.WriteInt8 = function (t) {
    this._stream.WriteByte(e.Number.ToInt8(t));
  }, t.prototype.WriteString = function (t) {
    if (t == "")
      this.WriteUInt32(0);
    else {
      var n = e.Encoding.Utf8.GetBytes(t);
      this.WriteUInt32(n.length);
      this._stream.Write(n, 0, n.length);
    }
  }, t.prototype.WriteStructBegin = function (e, t) {
  }, t.prototype.WriteStructEnd = function (e) {
    this.WriteUInt8(e ? 1 : 0);
  }, t.prototype.WriteUInt16 = function (t) {
    var n = e.Encoding.Varint.GetBytes(e.Number.ToUInt16(t));
    this._stream.Write(n, 0, n.length);
  }, t.prototype.WriteUInt32 = function (t) {
    var n = e.Encoding.Varint.GetBytes(e.Number.ToUInt32(t));
    this._stream.Write(n, 0, n.length);
  }, t.prototype.WriteUInt64 = function (t) {
    var n = e.Encoding.Varint64.GetBytes(t);
    this._stream.Write(n, 0, n.length);
  }, t.prototype.WriteUInt8 = function (t) {
    this._stream.WriteByte(e.Number.ToUInt8(t));
  }, t.prototype.WriteWString = function (e) {
    this.WriteUInt32(e.length);
    for (var t = 0; t < e.length; ++t) {
      var n = e.charCodeAt(t);
      this._stream.WriteByte(n);
      this._stream.WriteByte(n >>> 8);
    }
  }, t;
}()
