define("helpers/polyfills", [
  "require",
  "utils/common/stringPolyfills",
  "es6-promise",
  "blueimp-canvas-to-blob"
], function (e) {
  var t = e("utils/common/stringPolyfills");
  e("es6-promise").polyfill(), e("blueimp-canvas-to-blob"), Function.prototype.name === undefined && Object.defineProperty(Function.prototype, "name", {
    get: function () {
      try {
        return this.toString().match(/\s*function\s+([_\$\w\d]*)\.*/)[1];
      } catch (e) {
        return "";
      }
    }
  }), String.prototype.localeCompare === undefined && (String.prototype.localeCompare = t.localeCompare);
})
