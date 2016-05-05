define("ui/viewModels/calling/callScreenViewModel/participantLayoutWrapper", [], function () {
  function e(e) {
    this.participant = e.participant, this.layoutPosition = -1, this.isScreenSharing = e.isScreenSharing || !1, this.videoIsAllowed = e.videoIsAllowed, this.aspectRatio = e.aspectRatio;
  }
  return {
    build: function (t) {
      return new e(t);
    }
  };
})
