module.exports = function () {
  function e(e) {
    this._errorCode = 0;
    this._errorCode = e;
  }
  return e.prototype.ErrorCode = function () {
    return this._errorCode;
  }, e.prototype.toString = function () {
    switch (this._errorCode) {
    case 0:
      return "DATARV_ERROR_OK";
    case 1:
      return "Event is invalid. Either event.Id is empty, or event.Timestamp is empty, or event.EventType is empty.";
    case 2:
      return "Invalid configuration. CollectorUrl is missing.";
    case 3:
      return "DATARV_ERROR_INVALID_DEPENDENCIES";
    case 4:
      return "Telemetry Manager is not initialized.";
    case 5:
      return "TenantToken is null or empty, or events is null.";
    default:
      return "Unknown error";
    }
  }, e;
}()
