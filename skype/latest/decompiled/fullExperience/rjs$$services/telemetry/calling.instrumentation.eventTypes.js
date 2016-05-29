define("services/telemetry/calling.instrumentation.eventTypes", [
  "require",
  "constants/calling"
], function (e) {
  function n(e) {
    return e.isGroupConversation() ? "multiparty" : "single";
  }
  function r(e) {
    return e ? "video" : "audio";
  }
  var t = e("constants/calling");
  return {
    Calling: [
      {
        eventName: t.EVENTS.START_CALL,
        telemetryName: "AttemptCall",
        extensions: function (e) {
          return {
            source: e.source,
            conversationType: n(e.conversation),
            modality: r(e.isVideo)
          };
        }
      },
      {
        eventName: t.EVENTS.ANSWER,
        telemetryName: "AcceptCall",
        extensions: function (e) {
          return {
            conversationType: n(e.conversation),
            modality: r(e.isVideo)
          };
        }
      },
      {
        eventName: t.EVENTS.REJECT,
        telemetryName: "RejectCall",
        extensions: function (e) {
          return {
            conversationType: n(e.conversation),
            modality: r(e.isVideo)
          };
        }
      }
    ],
    TrouterInit: [
      {
        eventName: t.EVENTS.INCOMING_INIT_ERROR,
        telemetryName: "IncomingInitialisationError"
      },
      {
        eventName: t.EVENTS.INCOMING_INIT_SUCCESS,
        telemetryName: "IncomingInitialisationSuccess",
        extensions: ["durationInMs"]
      }
    ]
  };
});
