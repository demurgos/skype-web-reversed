module.exports = function () {
  function e(e) {
    this.errorCode = null;
    this.errorCode = e;
  }
  return e.prototype.ErrorCode = function () {
    return this.errorCode;
  }, e.prototype.toString = function () {
    switch (this.errorCode) {
    case 1:
      return "Invalid tenant token";
    case 2:
      return "Eventproperties.name can not be null or empty";
    case 3:
      return "Invalid Key. Key does not conform to regular expression ^[a-zA-Z0-9](([a-zA-Z0-9|_|.]){0,98}[a-zA-Z0-9])?$";
    case 4:
      return "Collector url can't be null or empty.";
    case 5:
      return "Failure signature can't be null or empty.";
    case 6:
      return "Failure detail can't be null or empty.";
    case 7:
      return "Pageview id can't be null or empty.";
    case 8:
      return "Pageview name can't be null or empty.";
    case 9:
      return "Session state has to be a value from the SessionState enum.";
    default:
      return "Unknown error";
    }
  }, e;
}()
