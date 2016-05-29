define("services/cqf/questionnaire", [], function () {
  return [
    { qid: 103 },
    {
      category: "q",
      token: 101,
      uri: "skype:?cqg&target=audio.nolocal&ui_entrypoint=cqf",
      text: "cqf_audio_nolocal"
    },
    {
      category: "q",
      token: 102,
      uri: "skype:?cqg&target=audio.noremote&ui_entrypoint=cqf",
      text: "cqf_audio_noremote"
    },
    {
      category: "q",
      token: 103,
      uri: "skype:?cqg&target=audio.quality.echo&ui_entrypoint=cqf",
      text: "cqf_audio_quality_echo"
    },
    {
      category: "q",
      token: 104,
      uri: "skype:?cqg&target=audio.quality.noise&ui_entrypoint=cqf",
      text: "cqf_audio_quality_noise"
    },
    {
      category: "q",
      token: 105,
      uri: "skype:?cqg&target=audio.quality.volume&ui_entrypoint=cqf",
      text: "cqf_audio_quality_volume"
    },
    {
      category: "q",
      token: 106,
      uri: "skype:?cqg&target=audio.dropped&ui_entrypoint=cqf",
      text: "cqf_audio_dropped"
    },
    {
      category: "q",
      token: 107,
      uri: "skype:?cqg&target=audio.quality.distorted&ui_entrypoint=cqf",
      text: "cqf_audio_quality_distorted"
    },
    {
      category: "q",
      token: 108,
      uri: "skype:?cqg&target=audio.quality.delay&ui_entrypoint=cqf",
      text: "cqf_audio_quality_delay"
    },
    {
      category: "pq",
      token: 301,
      uri: "skype:?cqg&target=audio.quality.dialpad&ui_entrypoint=cqf",
      text: "cqf_audio_quality_dialpad"
    },
    {
      category: "qe",
      token: 109,
      uri: "skype:?cqg&target=audio.other&ui_entrypoint=cqf",
      text: "cqf_audio_other",
      editlength: 100
    },
    {
      category: "vq",
      token: 201,
      uri: "skype:?cqg&target=video.nolocal&ui_entrypoint=cqf",
      text: "cqf_video_nolocal"
    },
    {
      category: "vq",
      token: 202,
      uri: "skype:?cqg&target=video.noremote&ui_entrypoint=cqf",
      text: "cqf_video_noremote"
    },
    {
      category: "vq",
      token: 203,
      uri: "skype:?cqg&target=video.quality.poor&ui_entrypoint=cqf",
      text: "cqf_video_quality_poor"
    },
    {
      category: "vq",
      token: 204,
      uri: "skype:?cqg&target=video.quality.freezing&ui_entrypoint=cqf",
      text: "cqf_video_quality_freezing"
    },
    {
      category: "vq",
      token: 205,
      uri: "skype:?cqg&target=video.dropped&ui_entrypoint=cqf",
      text: "cqf_video_dropped"
    },
    {
      category: "vq",
      token: 206,
      uri: "skype:?cqg&target=video.quality.dark&ui_entrypoint=cqf",
      text: "cqf_video_quality_dark"
    },
    {
      category: "vq",
      token: 207,
      uri: "skype:?cqg&target=video.quality.sync&ui_entrypoint=cqf",
      text: "cqf_video_quality_sync"
    },
    {
      category: "vqe",
      token: 208,
      uri: "skype:?cqg&target=video.other&ui_entrypoint=cqf",
      text: "cqf_video_other",
      editlength: 100
    }
  ];
});
