define("ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-browser-detect",
  "swx-enums",
  "utils/common/rtlChecker"
], function (e, t) {
  function w(e, n, r, i, s) {
    function g(e) {
      return u.itemToPin = e || null, u.itemsForStage = e ? [e] : [], u.itemsForRoster = n.filter(function (t) {
        return t !== e;
      }), u.grid = E(y(1, 1), u.itemsForStage, f, l), u;
    }
    function y(e, t) {
      return e > o ? null : m[Math.min(e, t)];
    }
    var u = {
        self: i,
        localPipInRoster: !0
      }, f = e && e.width || 0, l = e && e.height || 0;
    u.stageWidth = f;
    u.stageHeight = l;
    if (r)
      return g(r);
    var c = y(n.length, s);
    if (!c)
      return g(n[0]);
    var h = n.slice(0, s), p = n.slice(s, n.length), d = E(c, h, f, l);
    if (t.getObscuredByLocalPipPercentage(d, i, f, l) > a) {
      c = y(n.length + 1, s + 1);
      if (!c)
        return g(n[0]);
      var v = n.slice(0, s);
      v.push(i);
      u.localPipInRoster = !1;
      d = E(c, v, f, l);
    }
    return u.itemToPin = null, u.itemsForStage = h, u.itemsForRoster = p, u.grid = d, u;
  }
  function E(e, t, n, r) {
    var i;
    return e.forEach(function (e) {
      var s = S(e, t, n, r);
      if (!i || i.emptySpace > s.emptySpace)
        i = s;
    }), i;
  }
  function S(e, t, n, r) {
    function o(e, t, n) {
      n || (n = []);
      for (var r = 0; r < e.length; r++) {
        n.push(e[r]);
        var i = e.slice(0, r);
        i.push.apply(i, e.slice(r + 1));
        o(i, t, n);
        n.pop();
      }
      e.length || t(n);
    }
    var i, s;
    return o(t, function (t) {
      var o = x(e, t, n, r);
      if (!i || s > o)
        i = t.slice(0), s = o;
    }), {
      cells: e,
      orderedParticipantItems: i,
      emptySpace: s
    };
  }
  function x(e, n, r, i) {
    var s = 0;
    return n.forEach(function (n, o) {
      var u, a, f, l = e[o], c = l.width * r / 100, h = l.height * i / 100;
      n.isVideoActive() && (u = n.isScreenSharing ? n.participant.screenSharing.stream : n.participant.video.channels(0).stream, a = u.width(), f = u.height());
      if (n.isVideoActive() && c && h && a && f) {
        if (!n.isZoomable() || !t.canAutoZoom(a, f, c, h))
          s += t.getEmptySpaceAroundVideo(a, f, c, h);
      } else
        s += c * h;
    }), s;
  }
  function T() {
    return r.supportsCssProperty(r.CSS_PROPERTIES.OBJECT_FIT) || r.getBrowserInfo().browserName !== r.BROWSERS.EDGE;
  }
  var n = e("lodash-compat"), r = e("swx-browser-detect").default, i = e("swx-enums"), s = e("utils/common/rtlChecker"), o = 6, u = 40, a = 30, f = 5, l = [
      "#1f1f1f",
      "#2b2b2b",
      "#252525",
      "#313131"
    ], c = "#000", h = 1, p = 2, d = 4, v = p | d, m = {
      1: [[{
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            atTheBottom: v
          }]],
      2: [
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 100,
            atTheBottom: d
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 100,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 100,
            height: 50,
            atTheBottom: v
          }
        ]
      ],
      3: [
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: d
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 100,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: d
          },
          {
            left: 50,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100,
            height: 100 / 3
          },
          {
            left: 0,
            top: 100 / 3,
            width: 100,
            height: 100 / 3
          },
          {
            left: 0,
            top: 200 / 3,
            width: 100,
            height: 100 / 3,
            atTheBottom: v
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: h
          },
          {
            left: 200 / 3,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: p
          }
        ]
      ],
      4: [
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 50
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: d
          },
          {
            left: 50,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 100 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: h
          },
          {
            left: 200 / 3,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 100,
            atTheBottom: d
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 50,
            top: 100 / 3,
            width: 50,
            height: 100 / 3
          },
          {
            left: 50,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100,
            height: 25
          },
          {
            left: 0,
            top: 25,
            width: 100,
            height: 25
          },
          {
            left: 0,
            top: 50,
            width: 100,
            height: 25
          },
          {
            left: 0,
            top: 75,
            width: 100,
            height: 25,
            atTheBottom: v
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 25,
            height: 100,
            atTheBottom: d
          },
          {
            left: 25,
            top: 0,
            width: 25,
            height: 100,
            atTheBottom: h
          },
          {
            left: 50,
            top: 0,
            width: 25,
            height: 100,
            atTheBottom: h
          },
          {
            left: 75,
            top: 0,
            width: 25,
            height: 100,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: h
          },
          {
            left: 200 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: p
          }
        ]
      ],
      5: [
        [
          {
            left: 0,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 50,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: p
          },
          {
            left: 200 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 0,
            top: 100 / 3,
            width: 50,
            height: 100 / 3
          },
          {
            left: 0,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: d
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 50
          },
          {
            left: 50,
            top: 50,
            width: 50,
            height: 50,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 0,
            top: 100 / 3,
            width: 100,
            height: 100 / 3
          },
          {
            left: 0,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: d
          },
          {
            left: 50,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 0,
            width: 100 / 3,
            height: 100,
            atTheBottom: h
          },
          {
            left: 200 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 200 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: p
          }
        ]
      ],
      6: [
        [
          {
            left: 0,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 0,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: d
          },
          {
            left: 100 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 100 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: h
          },
          {
            left: 200 / 3,
            top: 0,
            width: 100 / 3,
            height: 50
          },
          {
            left: 200 / 3,
            top: 50,
            width: 100 / 3,
            height: 50,
            atTheBottom: p
          }
        ],
        [
          {
            left: 0,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 50,
            top: 0,
            width: 50,
            height: 100 / 3
          },
          {
            left: 0,
            top: 100 / 3,
            width: 50,
            height: 100 / 3
          },
          {
            left: 50,
            top: 100 / 3,
            width: 50,
            height: 100 / 3
          },
          {
            left: 0,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: d
          },
          {
            left: 50,
            top: 200 / 3,
            width: 50,
            height: 100 / 3,
            atTheBottom: p
          }
        ]
      ]
    }, g, y = [], b;
  t.MAX_STAGE_SIZE = o;
  t.GRIDS = m;
  t.getGridConfiguration = function (r) {
    function a() {
      return i && b && i.localPipInRoster === b.localPipInRoster && i.itemsForStage && b.itemsForStage && i.itemsForRoster && b.itemsForRoster && n.isEqual(i.itemsForStage, b.itemsForStage) && n.isEqual(i.itemsForRoster, b.itemsForRoster);
    }
    var i = w(r.stageDimensions, r.items, r.pinnedItem, r.selfParticipantLayoutItem, r.maxVideos || o);
    if (!t.isInActiveSpeakerMode(r.conversation) && a()) {
      var s = b.grid, u = x(s.cells, s.orderedParticipantItems, i.stageWidth, i.stageHeight);
      if (100 * Math.abs(u - i.grid.emptySpace) / u < f)
        return b.stageWidth = i.stageWidth, b.stageHeight = i.stageHeight, b;
    }
    return b = i, i;
  };
  t.arrangeGridItems = function (n, r) {
    if (!n || !n.grid || !n.stageWidth || !n.stageHeight)
      return;
    var i = n.grid.cells, s = t.getSmallestLayoutItemDimension(i, n.stageWidth, n.stageHeight), o = n.self;
    s < 210 ? r(s > 110 ? "stage-avatar_size_100" : "stage-avatar_size_50") : r("");
    n.localPipInRoster !== o.isInRoster() && (o.isInRoster(n.localPipInRoster), n.localPipInRoster && (o.isZoomedIn(!1), o.positionInGrid(""), o.isParticipantAtTheBottom(!1)));
    n.grid.orderedParticipantItems.forEach(function (e, t) {
      var n = i[t];
      e.isParticipantAtTheBottom(!!n.atTheBottom);
      e.positionInGrid("left: " + n.left.toFixed(8) + "%; " + "top: " + n.top.toFixed(8) + "%; " + "width: " + n.width.toFixed(8) + "%; " + "height: " + n.height.toFixed(8) + "%; " + "display: block; " + "background-color: " + (e.isSelfParticipant ? c : l[t % l.length]));
    });
  };
  t.calculateVideoStyles = function (t, n, r, i, s, o) {
    var u, a, f, l = {};
    u = r / t;
    a = i / n;
    if (s && !T() && !o)
      u > a ? (f = (n * u / i - 1) / 2 * 100, f && (l.height = 100 + f + f, l.top = -f)) : (f = (t * a / r - 1) / 2 * 100, f && (l.width = 100 + f + f, l.left = -f));
    else if (!s || o)
      u > a ? (f = (1 - i / (n * u)) / 2 * 100, f && (l.width = 100 - f - f, l.left = f)) : (f = (1 - r / (t * a)) / 2 * 100, f && (l.height = 100 - f - f, l.top = f));
    var c = [];
    return Object.keys(l).forEach(function (e) {
      c.push(e + ": " + l[e].toFixed(8) + "%");
    }), c.join("; ");
  };
  t.canAutoZoom = function (n, r, i, s) {
    return t.getCroppedVideoPercentage(n, r, i, s) <= u;
  };
  t.executeInAnimationFrame = function (t) {
    return function () {
      y.push({
        cb: t,
        args: arguments
      });
      if (g)
        return;
      g = window.requestAnimationFrame(function () {
        g = null;
        var e = [];
        for (var t = y.length; t--;) {
          var n = y[t];
          n.cb.__processed || (e.unshift(n), n.cb.__processed = !0);
        }
        y = [];
        e.forEach(function (e) {
          e.cb.apply(null, e.args);
          delete e.cb.__processed;
        });
      });
    };
  };
  t.getEmptySpaceAroundVideo = function (t, n, r, i) {
    var s = t / r, o = n / i, u, a;
    return s > o ? (u = r, a = n / s) : (u = t / o, a = i), r * i - u * a;
  };
  t.getCroppedVideoPercentage = function (t, n, r, i) {
    var s = r / t, o = i / n, u, a;
    return s > o ? (u = r, a = i + i * (n * s / i - 1)) : (u = r + r * (t * o / r - 1), a = i), 100 - r * i * 100 / (u * a);
  };
  t.getObscuredByLocalPipPercentage = function (t, n, r, i) {
    if (!n.isVideoActive())
      return 0;
    var o, u, a = s.isRtl() ? d : p;
    t.cells.some(function (e, t) {
      return e.atTheBottom && e.atTheBottom & a ? (o = t, !0) : !1;
    });
    u = t.orderedParticipantItems[o];
    if (!u.isVideoActive())
      return 0;
    n._rosterNode || (n._rosterNode = document.querySelector(".call-roster"));
    if (!n._rosterNode)
      return 0;
    var f = n.participant.video.channels(0).stream, l = t.cells[o], c = l.width * r / 100, h = l.height * i / 100, v = (f.width() / f.height()).toFixed(1) === "1.8" ? 16 / 9 : 4 / 3, m = n._rosterNode.offsetHeight, g = m * v;
    return g * m * 100 / (c * h);
  };
  t.getSmallestLayoutItemDimension = function (t, n, r) {
    return t.reduce(function (e, t) {
      return Math.floor(Math.min(e, n * t.width / 100, r * t.height / 100));
    }, Math.floor(Math.min(n, r)));
  };
  t.isInActiveSpeakerMode = function (t) {
    return t.videoService.videoMode() === i.videoMode.ActiveSpeaker && t.isGroupConversation();
  };
});
