define("jSkype/services/mediaAgent/constants", [], function () {
  return {
    MEDIA_STATE: {
      send: "sendonly",
      receive: "recvonly",
      sendReceive: "sendrecv",
      inactive: "inactive"
    },
    MEDIA_DEVICE: {
      camera: "camera",
      microphone: "microphone",
      speaker: "speaker"
    },
    MEDIA_ERROR: {
      iceConnectionError: "iceConnectionError",
      srtpError: "srtpError",
      permissionDeniedError: "permissionDeniedError",
      internalError: "internalError"
    },
    RENEGOTIATION_ERROR: {
      local: "local",
      glare: "glare",
      signaling: "signaling",
      media: "media"
    },
    MSI: {
      unsubscribe: -1,
      subscribeAny: -2
    },
    MEDIA_LABEL: {
      audio: "main-audio",
      video: "main-video",
      screensharing: "applicationsharing-video"
    },
    MEDIA_TYPE: {
      audio: "audio",
      video: "video"
    }
  };
});
