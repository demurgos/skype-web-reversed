module.exports = function () {
  function e() {
  }
  return e.IsDataViewSupport = function () {
    return typeof ArrayBuffer != "undefined" && typeof DataView != "undefined";
  }, e;
}()
