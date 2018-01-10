(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/constants", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    MEDIA_STATE: {
      send: "sendonly",
      receive: "recvonly",
      sendReceive: "sendrecv",
      inactive: "inactive"
    },
    MEDIA_DEVICE: {
      camera: "camera",
      microphone: "microphone",
      speaker: "speaker",
      defaultId: "default"
    },
    MEDIA_ERROR: {
      constraintNotSatisfiedError: "ConstraintNotSatisfiedError",
      iceConnectionError: "iceConnectionError",
      srtpError: "srtpError",
      permissionDeniedError: "permissionDeniedError",
      internalError: "internalError",
      sourceUnavailableError: "SourceUnavailableError"
    },
    RENEGOTIATION_ERROR: {
      local: "local",
      glare: "glare",
      signaling: "signaling",
      media: "media",
      escalation: "escalation"
    },
    MSI: {
      unsubscribe: -1,
      subscribeAny: -2
    },
    MEDIA_LABEL: {
      audio: "main-audio",
      video: "main-video",
      sharing: "applicationsharing-video"
    },
    MEDIA_TYPE: {
      audio: "audio",
      video: "video"
    },
    MODALITY: {
      audio: "audio",
      video: "video",
      sharing: "sharing"
    },
    ICE_TRANSPORT_POLICY: {
      all: "all",
      relay: "relay"
    },
    EXTENSION_TYPE: {
      dominantSpeakerHistory: "dominantSpeakerHistory",
      videoStreamControl: "videoStreamControl"
    },
    RENDERER_TYPE: {
      video: "video",
      sharing: "sharing"
    }
  };
}));
