module.exports = function () {
  function e() {
    this.name = null;
    this.timestamp = null;
    this.properties = [];
    this.eventType = null;
  }
  return e.prototype.setProperty = function (t, n, r) {
    if (!t || !e._propertyNameRegex.test(t))
      throw new o(3);
    r ? this.properties.push({
      key: t,
      value: n,
      pii: r != 0 ? r : null
    }) : this.properties.push({
      key: t,
      value: n,
      pii: null
    });
  }, e._propertyNameRegex = /^[a-zA-Z0-9](([a-zA-Z0-9|_]){0,98}[a-zA-Z0-9])?$/, e;
}()
