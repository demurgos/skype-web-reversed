(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/modelHelper", [
      "require",
      "exports",
      "../utilities/typeDefs",
      "media-agent",
      "signaling-agent"
    ], e);
}(function (e, t) {
  function s(e) {
    if (!e || e.code === undefined)
      return n.TerminatedReason.Undefined;
    switch (e.code) {
    case i.CA_CONSTANTS.CALL_END_CODE.REJECT:
      return n.TerminatedReason.Declined;
    case i.CA_CONSTANTS.CALL_END_CODE.SUCCESS:
      return n.TerminatedReason.Success;
    case i.CA_CONSTANTS.CALL_END_CODE.CANCEL:
      return n.TerminatedReason.Cancelled;
    case i.CA_CONSTANTS.CALL_END_CODE.TIMEOUT:
      return n.TerminatedReason.CallEstablismentTimeout;
    case i.CA_CONSTANTS.CALL_END_CODE.SERVICE_UNAVAILABLE:
      return n.TerminatedReason.CallSetupError;
    case i.CA_CONSTANTS.CALL_END_CODE.BAD_REQUEST:
      return n.TerminatedReason.BadRequest;
    case i.CA_CONSTANTS.CALL_END_CODE.NO_NGC_ENDPOINT:
      return n.TerminatedReason.NoNgcEndpoint;
    case i.CA_CONSTANTS.CALL_END_CODE.P2P_FALLBACK_FOR_SCREENSHARING:
    case i.CA_CONSTANTS.CALL_END_CODE.CONFLICT:
      return n.TerminatedReason.Undefined;
    case i.CA_CONSTANTS.CALL_END_CODE.MEDIA_ERROR:
      return n.TerminatedReason.MediaError;
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_DOES_NOT_EXIST:
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_ACCEPTED:
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_FORWARDED:
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_FORWARDED_TO_VOICEMAIL:
      return n.TerminatedReason.Undefined;
    case i.CA_CONSTANTS.CALL_END_CODE.P2P_REJECT_CALL:
      return n.TerminatedReason.Declined;
    case i.CA_CONSTANTS.CALL_END_CODE.P2P_FALLBACK_DUE_TO_GROUPCALL:
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_LEG_ENDED_ON_SERVICE:
    case i.CA_CONSTANTS.CALL_END_CODE.NOT_ACCEPTABLE_HERE:
      return n.TerminatedReason.Undefined;
    case i.CA_CONSTANTS.CALL_END_CODE.NETWORK_ERROR:
      return n.TerminatedReason.NetworkError;
    case i.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR:
      return n.TerminatedReason.Undefined;
    case i.CA_CONSTANTS.CALL_END_CODE.LOCAL_ERROR:
      return n.TerminatedReason.CallSetupError;
    case i.CA_CONSTANTS.CALL_END_CODE.CALL_MODALITY_FAILURE:
    case i.CA_CONSTANTS.CALL_END_CODE.GLARE_ERROR:
    case i.CA_CONSTANTS.CALL_END_CODE.NOT_FOUND:
      return n.TerminatedReason.Undefined;
    default:
      return n.TerminatedReason.Undefined;
    }
  }
  function o(e) {
    var t = [];
    return e.audio && t.push(i.CA_CONSTANTS.MEDIA_TYPES.AUDIO), e.video && t.push(i.CA_CONSTANTS.MEDIA_TYPES.VIDEO), r.Helper.hasSendDirectionality(e.sharing) && t.push(i.CA_CONSTANTS.MEDIA_TYPES.SCREEN_SHARER), t;
  }
  function u(e) {
    var t = [];
    return r.Helper.hasReceiveDirectionality(e.audio) && t.push(i.CA_CONSTANTS.MEDIA_TYPES.AUDIO), r.Helper.hasReceiveDirectionality(e.video) && t.push(i.CA_CONSTANTS.MEDIA_TYPES.VIDEO), r.Helper.hasReceiveDirectionality(e.sharing) && t.push(i.CA_CONSTANTS.MEDIA_TYPES.SCREEN_SHARER), t;
  }
  function f(e, t) {
    var i = [], s = t === a.receive ? r.Helper.hasReceiveDirectionality : r.Helper.hasSendDirectionality;
    return s(e.audio) && i.push(n.StreamType.Audio), s(e.video) && i.push(n.StreamType.Video), s(e.sharing) && i.push(n.StreamType.ScreenSharing), i;
  }
  function l(e) {
    return {
      blob: e.blob,
      mediaLegId: e.mediaLegId,
      contentType: i.CA_CONSTANTS.CONTENT_TYPE.SDP
    };
  }
  function c(e) {
    switch (e) {
    case r.Constants.MEDIA_STATE.sendReceive:
      return n.StreamDirections.sendReceive;
    case r.Constants.MEDIA_STATE.send:
      return n.StreamDirections.receive;
    case r.Constants.MEDIA_STATE.receive:
      return n.StreamDirections.send;
    default:
      return null;
    }
  }
  function h(e, t) {
    return t["catch"](function (t) {
      throw {
        errorWrappedWithTag: !0,
        tag: e,
        value: t instanceof Error ? t.toString() : t
      };
    });
  }
  function p(e) {
    return e && e.hasOwnProperty("errorWrappedWithTag");
  }
  function d(e, t, n, r) {
    e.telemetryService.sendMediaSessionStats({
      media: n,
      signaling: {
        TerminationRemote: t.remote,
        TerminationReasonCode: t.reasonCode,
        TerminationReasonSubCode: t.reasonSubCode,
        TerminationReasonPhrase: t.reasonPhrase,
        isNGCVoicemail: r
      }
    });
  }
  function v(e) {
    var t = e.selectedDevicesProvider();
    return e.mediaAgent.getDeviceManager().selectDevices(t), t;
  }
  var n = e("../utilities/typeDefs"), r = e("media-agent"), i = e("signaling-agent");
  t.ADD_PARTICIPANT_FAILURE_CODES = {
    NO_RESPONSE: 487,
    DECLINED: 603,
    NOT_REACHABLE: 480
  };
  t.ValidStateTransitions = (m = {}, m[n.CallState.None] = [
    n.CallState.Notified,
    n.CallState.Connecting,
    n.CallState.Observing
  ], m[n.CallState.Notified] = [
    n.CallState.Ringing,
    n.CallState.Connecting,
    n.CallState.Disconnecting,
    n.CallState.Disconnected
  ], m[n.CallState.Ringing] = [
    n.CallState.Connecting,
    n.CallState.Connected,
    n.CallState.Disconnecting,
    n.CallState.Disconnected
  ], m[n.CallState.Connecting] = [
    n.CallState.Ringing,
    n.CallState.Connected,
    n.CallState.Disconnecting,
    n.CallState.Disconnected
  ], m[n.CallState.Connected] = [
    n.CallState.Disconnecting,
    n.CallState.Disconnected
  ], m[n.CallState.Disconnecting] = [n.CallState.Disconnected], m[n.CallState.Disconnected] = [], m[n.CallState.Observing] = [
    n.CallState.Disconnecting,
    n.CallState.Disconnected
  ], m);
  t.CALL_SUCCESS_CODES = [
    n.TerminatedReason.Success,
    n.TerminatedReason.Declined,
    n.TerminatedReason.Busy,
    n.TerminatedReason.Cancelled
  ];
  t.ngcReasonToTerminatedReason = s;
  t.toSignalingMediaTypes = o;
  t.toIncomingMediaTypes = u;
  var a;
  (function (e) {
    e[e.receive = 0] = "receive";
    e[e.send = 1] = "send";
  }(a = t.ModalityDirection || (t.ModalityDirection = {})));
  t.modalitiesToStreamTypes = f;
  t.toSignalingMediaContent = l;
  t.invertDirectionality = c;
  t.tagAnError = h;
  t.isTaggedError = p;
  t.sendMediaSessionStats = d;
  t.updateDeviceSelection = v;
  var m;
}));
