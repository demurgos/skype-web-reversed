(function (e) {
  var t = typeof window == "undefined" ? null : window;
  typeof define == "function" && define.amd ? define("dompurify/src/purify", [], function () {
    return e(t);
  }) : typeof module != "undefined" ? module.exports = e(t) : t.DOMPurify = e(t);
}(function factory(e) {
  var t = function (e) {
    return factory(e);
  };
  t.version = "0.7.3";
  if (!e || !e.document || e.document.nodeType !== 9)
    return t.isSupported = !1, t;
  var n = e.document, r = n, i = e.DocumentFragment, s = e.HTMLTemplateElement, o = e.NodeFilter, u = e.NamedNodeMap || e.MozNamedAttrMap, a = e.Text, f = e.Comment, l = e.DOMParser;
  typeof s == "function" && (n = n.createElement("template").content.ownerDocument);
  var c = n.implementation, h = n.createNodeIterator, p = n.getElementsByTagName, d = n.createDocumentFragment, v = r.importNode, m = {};
  t.isSupported = typeof c.createHTMLDocument != "undefined" && n.documentMode !== 9;
  var g = function (e, t) {
      var n = t.length;
      while (n--)
        e[t[n]] = !0;
      return e;
    }, y = function (e) {
      var t = {}, n;
      for (n in e)
        e.hasOwnProperty(n) && (t[n] = e[n]);
      return t;
    }, b = null, w = g({}, [
      "a",
      "abbr",
      "acronym",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "bdi",
      "bdo",
      "big",
      "blink",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "center",
      "cite",
      "code",
      "col",
      "colgroup",
      "content",
      "data",
      "datalist",
      "dd",
      "decorator",
      "del",
      "details",
      "dfn",
      "dir",
      "div",
      "dl",
      "dt",
      "element",
      "em",
      "fieldset",
      "figcaption",
      "figure",
      "font",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meter",
      "nav",
      "nobr",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "section",
      "select",
      "shadow",
      "small",
      "source",
      "spacer",
      "span",
      "strike",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "track",
      "tt",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      "svg",
      "altglyph",
      "altglyphdef",
      "altglyphitem",
      "animatecolor",
      "animatemotion",
      "animatetransform",
      "circle",
      "clippath",
      "defs",
      "desc",
      "ellipse",
      "font",
      "g",
      "glyph",
      "glyphref",
      "hkern",
      "image",
      "line",
      "lineargradient",
      "marker",
      "mask",
      "metadata",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialgradient",
      "rect",
      "stop",
      "switch",
      "symbol",
      "text",
      "textpath",
      "title",
      "tref",
      "tspan",
      "view",
      "vkern",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "feSpecularLighting",
      "feTile",
      "feTurbulence",
      "math",
      "menclose",
      "merror",
      "mfenced",
      "mfrac",
      "mglyph",
      "mi",
      "mlabeledtr",
      "mmuliscripts",
      "mn",
      "mo",
      "mover",
      "mpadded",
      "mphantom",
      "mroot",
      "mrow",
      "ms",
      "mpspace",
      "msqrt",
      "mystyle",
      "msub",
      "msup",
      "msubsup",
      "mtable",
      "mtd",
      "mtext",
      "mtr",
      "munder",
      "munderover",
      "#text"
    ]), E = null, S = g({}, [
      "accept",
      "action",
      "align",
      "alt",
      "autocomplete",
      "background",
      "bgcolor",
      "border",
      "cellpadding",
      "cellspacing",
      "checked",
      "cite",
      "class",
      "clear",
      "color",
      "cols",
      "colspan",
      "coords",
      "datetime",
      "default",
      "dir",
      "disabled",
      "download",
      "enctype",
      "face",
      "for",
      "headers",
      "height",
      "hidden",
      "high",
      "href",
      "hreflang",
      "id",
      "ismap",
      "label",
      "lang",
      "list",
      "loop",
      "low",
      "max",
      "maxlength",
      "media",
      "method",
      "min",
      "multiple",
      "name",
      "noshade",
      "novalidate",
      "nowrap",
      "open",
      "optimum",
      "pattern",
      "placeholder",
      "poster",
      "preload",
      "pubdate",
      "radiogroup",
      "readonly",
      "rel",
      "required",
      "rev",
      "reversed",
      "rows",
      "rowspan",
      "spellcheck",
      "scope",
      "selected",
      "shape",
      "size",
      "span",
      "srclang",
      "start",
      "src",
      "step",
      "style",
      "summary",
      "tabindex",
      "title",
      "type",
      "usemap",
      "valign",
      "value",
      "width",
      "xmlns",
      "accent-height",
      "accumulate",
      "additivive",
      "alignment-baseline",
      "ascent",
      "attributename",
      "attributetype",
      "azimuth",
      "basefrequency",
      "baseline-shift",
      "begin",
      "bias",
      "by",
      "clip",
      "clip-path",
      "clip-rule",
      "color",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "cx",
      "cy",
      "d",
      "dx",
      "dy",
      "diffuseconstant",
      "direction",
      "display",
      "divisor",
      "dur",
      "edgemode",
      "elevation",
      "end",
      "fill",
      "fill-opacity",
      "fill-rule",
      "filter",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "fx",
      "fy",
      "g1",
      "g2",
      "glyph-name",
      "glyphref",
      "gradientunits",
      "gradienttransform",
      "image-rendering",
      "in",
      "in2",
      "k",
      "k1",
      "k2",
      "k3",
      "k4",
      "kerning",
      "keypoints",
      "keysplines",
      "keytimes",
      "lengthadjust",
      "letter-spacing",
      "kernelmatrix",
      "kernelunitlength",
      "lighting-color",
      "local",
      "marker-end",
      "marker-mid",
      "marker-start",
      "markerheight",
      "markerunits",
      "markerwidth",
      "maskcontentunits",
      "maskunits",
      "max",
      "mask",
      "mode",
      "min",
      "numoctaves",
      "offset",
      "operator",
      "opacity",
      "order",
      "orient",
      "orientation",
      "origin",
      "overflow",
      "paint-order",
      "path",
      "pathlength",
      "patterncontentunits",
      "patterntransform",
      "patternunits",
      "points",
      "preservealpha",
      "r",
      "rx",
      "ry",
      "radius",
      "refx",
      "refy",
      "repeatcount",
      "repeatdur",
      "restart",
      "rotate",
      "scale",
      "seed",
      "shape-rendering",
      "specularconstant",
      "specularexponent",
      "spreadmethod",
      "stddeviation",
      "stitchtiles",
      "stop-color",
      "stop-opacity",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke",
      "stroke-width",
      "surfacescale",
      "targetx",
      "targety",
      "transform",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "textlength",
      "u1",
      "u2",
      "unicode",
      "values",
      "viewbox",
      "visibility",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "wrap",
      "writing-mode",
      "xchannelselector",
      "ychannelselector",
      "x",
      "x1",
      "x2",
      "y",
      "y1",
      "y2",
      "z",
      "zoomandpan",
      "accent",
      "accentunder",
      "bevelled",
      "close",
      "columnsalign",
      "columnlines",
      "columnspan",
      "denomalign",
      "depth",
      "display",
      "displaystyle",
      "fence",
      "frame",
      "largeop",
      "length",
      "linethickness",
      "lspace",
      "lquote",
      "mathbackground",
      "mathcolor",
      "mathsize",
      "mathvariant",
      "maxsize",
      "minsize",
      "movablelimits",
      "notation",
      "numalign",
      "open",
      "rowalign",
      "rowlines",
      "rowspacing",
      "rowspan",
      "rspace",
      "rquote",
      "scriptlevel",
      "scriptminsize",
      "scriptsizemultiplier",
      "selection",
      "separator",
      "separators",
      "stretchy",
      "subscriptshift",
      "supscriptshift",
      "symmetric",
      "voffset",
      "xlink:href",
      "xml:id",
      "xlink:title",
      "xml:space",
      "xmlns:xlink"
    ]), x = null, T = null, N = !0, C = !1, k = !1, L = !1, A = !1, O = !1, M = !1, _ = !0, D = !0, P = g({}, [
      "audio",
      "head",
      "math",
      "script",
      "style",
      "svg",
      "video"
    ]), H = null, B = n.createElement("form"), j = function (e) {
      typeof e != "object" && (e = {});
      b = "ALLOWED_TAGS" in e ? g({}, e.ALLOWED_TAGS) : w;
      E = "ALLOWED_ATTR" in e ? g({}, e.ALLOWED_ATTR) : S;
      x = "FORBID_TAGS" in e ? g({}, e.FORBID_TAGS) : {};
      T = "FORBID_ATTR" in e ? g({}, e.FORBID_ATTR) : {};
      N = e.ALLOW_DATA_ATTR !== !1;
      C = e.SAFE_FOR_JQUERY || !1;
      k = e.SAFE_FOR_TEMPLATES || !1;
      L = e.WHOLE_DOCUMENT || !1;
      A = e.RETURN_DOM || !1;
      O = e.RETURN_DOM_FRAGMENT || !1;
      M = e.RETURN_DOM_IMPORT || !1;
      _ = e.SANITIZE_DOM !== !1;
      D = e.KEEP_CONTENT !== !1;
      O && (A = !0);
      e.ADD_TAGS && (b === w && (b = y(b)), g(b, e.ADD_TAGS));
      e.ADD_ATTR && (E === S && (E = y(E)), g(E, e.ADD_ATTR));
      D && (b["#text"] = !0);
      Object && "freeze" in Object && Object.freeze(e);
      H = e;
    }, F = function (e) {
      try {
        e.parentNode.removeChild(e);
      } catch (t) {
        e.outerHTML = "";
      }
    }, I = function (e) {
      var t, n;
      try {
        t = new l().parseFromString(e, "text/html");
      } catch (r) {
      }
      return t || (t = c.createHTMLDocument(""), n = t.body, n.parentNode.removeChild(n.parentNode.firstElementChild), n.outerHTML = e), typeof t.getElementsByTagName == "function" ? t.getElementsByTagName(L ? "html" : "body")[0] : p.call(t, L ? "html" : "body")[0];
    }, q = function (e) {
      return h.call(e.ownerDocument || e, e, o.SHOW_ELEMENT | o.SHOW_COMMENT | o.SHOW_TEXT, function () {
        return o.FILTER_ACCEPT;
      }, !1);
    }, R = function (e) {
      return e instanceof a || e instanceof f ? !1 : typeof e.nodeName == "string" && typeof e.textContent == "string" && typeof e.removeChild == "function" && e.attributes instanceof u && typeof e.removeAttribute == "function" && typeof e.setAttribute == "function" ? !1 : !0;
    }, U = /\{\{.*|.*\}\}/gm, z = /<%.*|.*%>/gm, W = function (e) {
      Q("beforeSanitizeElements", e, null);
      if (R(e))
        return F(e), !0;
      var t = e.nodeName.toLowerCase();
      Q("uponSanitizeElement", e, { tagName: t });
      if (!b[t] || x[t]) {
        if (D && !P[t] && typeof e.insertAdjacentHTML == "function")
          try {
            e.insertAdjacentHTML("AfterEnd", e.innerHTML);
          } catch (n) {
          }
        return F(e), !0;
      }
      C && !e.firstElementChild && (!e.content || !e.content.firstElementChild) && (e.innerHTML = e.textContent.replace(/</g, "&lt;"));
      if (k && e.nodeType === 3) {
        var r = e.textContent;
        r = r.replace(U, " ");
        r = r.replace(z, " ");
        e.textContent = r;
      }
      return Q("afterSanitizeElements", e, null), !1;
    }, X = /^data-[\w.\u00B7-\uFFFF-]/, V = /^(?:\w+script|data):/i, $ = /[\x00-\x20\xA0\u1680\u180E\u2000-\u2029\u205f\u3000]/g, J = function (t) {
      Q("beforeSanitizeAttributes", t, null);
      var r = t.attributes;
      if (!r)
        return;
      var i = {
          attrName: "",
          attrValue: "",
          keepAttr: !0
        }, s = r.length, o, u, a, f, l;
      while (s--) {
        o = r[s];
        u = o.name;
        a = o.value;
        f = u.toLowerCase();
        i.attrName = f;
        i.attrValue = a;
        i.keepAttr = !0;
        Q("uponSanitizeAttribute", t, i);
        a = i.attrValue;
        f === "name" && t.nodeName === "IMG" && r.id ? (l = r.id, r = Array.prototype.slice.apply(r), t.removeAttribute("id"), t.removeAttribute(u), r.indexOf(l) > s && t.setAttribute("id", l.value)) : (u === "id" && t.setAttribute(u, ""), t.removeAttribute(u));
        if (!i.keepAttr)
          continue;
        if (_ && (f === "id" || f === "name") && (a in e || a in n || a in B))
          continue;
        if ((E[f] && !T[f] || !k && N && X.test(f)) && (!V.test(a.replace($, "")) || f === "src" && a.indexOf("data:") === 0 && t.nodeName === "IMG"))
          try {
            k && (a = a.replace(U, " "), a = a.replace(z, " "));
            t.setAttribute(u, a);
          } catch (c) {
          }
      }
      Q("afterSanitizeAttributes", t, null);
    }, K = function (e) {
      var t, n = q(e);
      Q("beforeSanitizeShadowDOM", e, null);
      while (t = n.nextNode()) {
        Q("uponSanitizeShadowNode", t, null);
        if (W(t))
          continue;
        t.content instanceof i && K(t.content);
        J(t);
      }
      Q("afterSanitizeShadowDOM", e, null);
    }, Q = function (e, n, r) {
      if (!m[e])
        return;
      m[e].forEach(function (e) {
        e.call(t, n, r, H);
      });
    };
  return t.sanitize = function (n, s) {
    n || (n = "");
    typeof n != "string" && (n = n.toString());
    if (!t.isSupported)
      return typeof e.toStaticHTML == "object" || typeof e.toStaticHTML == "function" ? e.toStaticHTML(n) : n;
    j(s);
    if (!A && !L && n.indexOf("<") === -1)
      return n;
    var o = I(n);
    if (!o)
      return A ? null : "";
    var u, a, f = q(o);
    while (u = f.nextNode()) {
      if (u.nodeType === 3 && u === a)
        continue;
      if (W(u))
        continue;
      u.content instanceof i && K(u.content);
      J(u);
      a = u;
    }
    var l;
    if (A) {
      if (O) {
        l = d.call(o.ownerDocument);
        while (o.firstChild)
          l.appendChild(o.firstChild);
      } else
        l = o;
      return M && (l = v.call(r, l, !0)), l;
    }
    return L ? o.outerHTML : o.innerHTML;
  }, t.addHook = function (e, t) {
    if (typeof t != "function")
      return;
    m[e] = m[e] || [];
    m[e].push(t);
  }, t.removeHook = function (e) {
    m[e] && m[e].pop();
  }, t.removeHooks = function (e) {
    m[e] && (m[e] = []);
  }, t.removeAllHooks = function () {
    m = [];
  }, t;
}));
