import oe, { useRef as ie, useId as se, useDeferredValue as le, useTransition as ue, useMemo as ce, useEffect as D } from "react";
import de from "prismjs";
var j = { exports: {} }, A = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var U;
function fe() {
  if (U) return A;
  U = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function s(m, i, d) {
    var a = null;
    if (d !== void 0 && (a = "" + d), i.key !== void 0 && (a = "" + i.key), "key" in i) {
      d = {};
      for (var u in i)
        u !== "key" && (d[u] = i[u]);
    } else d = i;
    return i = d.ref, {
      $$typeof: n,
      type: m,
      key: a,
      ref: i !== void 0 ? i : null,
      props: d
    };
  }
  return A.Fragment = t, A.jsx = s, A.jsxs = s, A;
}
var T = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var V;
function pe() {
  return V || (V = 1, process.env.NODE_ENV !== "production" && (function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === te ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case k:
          return "Fragment";
        case _:
          return "Profiler";
        case E:
          return "StrictMode";
        case Q:
          return "Suspense";
        case K:
          return "SuspenseList";
        case ne:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case y:
            return "Portal";
          case $:
            return e.displayName || "Context";
          case R:
            return (e._context.displayName || "Context") + ".Consumer";
          case Z:
            var c = e.render;
            return e = e.displayName, e || (e = c.displayName || c.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ee:
            return c = e.displayName || null, c !== null ? c : n(e.type) || "Memo";
          case O:
            c = e._payload, e = e._init;
            try {
              return n(e(c));
            } catch {
            }
        }
      return null;
    }
    function t(e) {
      return "" + e;
    }
    function s(e) {
      try {
        t(e);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var h = c.error, b = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return h.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          b
        ), t(e);
      }
    }
    function m(e) {
      if (e === k) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === O)
        return "<...>";
      try {
        var c = n(e);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var e = z.A;
      return e === null ? null : e.getOwner();
    }
    function d() {
      return Error("react-stack-top-frame");
    }
    function a(e) {
      if (L.call(e, "key")) {
        var c = Object.getOwnPropertyDescriptor(e, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function u(e, c) {
      function h() {
        H || (H = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      h.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: h,
        configurable: !0
      });
    }
    function l() {
      var e = n(this.type);
      return W[e] || (W[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function f(e, c, h, b, N, M) {
      var w = h.ref;
      return e = {
        $$typeof: v,
        type: e,
        key: c,
        props: h,
        _owner: b
      }, (w !== void 0 ? w : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: N
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function o(e, c, h, b, N, M) {
      var w = c.children;
      if (w !== void 0)
        if (b)
          if (re(w)) {
            for (b = 0; b < w.length; b++)
              r(w[b]);
            Object.freeze && Object.freeze(w);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else r(w);
      if (L.call(c, "key")) {
        w = n(e);
        var x = Object.keys(c).filter(function(ae) {
          return ae !== "key";
        });
        b = 0 < x.length ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}", Y[w + b] || (x = 0 < x.length ? "{" + x.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          b,
          w,
          x,
          w
        ), Y[w + b] = !0);
      }
      if (w = null, h !== void 0 && (s(h), w = "" + h), a(c) && (s(c.key), w = "" + c.key), "key" in c) {
        h = {};
        for (var I in c)
          I !== "key" && (h[I] = c[I]);
      } else h = c;
      return w && u(
        h,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), f(
        e,
        w,
        h,
        i(),
        N,
        M
      );
    }
    function r(e) {
      p(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === O && (e._payload.status === "fulfilled" ? p(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function p(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    var g = oe, v = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), $ = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), te = Symbol.for("react.client.reference"), z = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, re = Array.isArray, P = console.createTask ? console.createTask : function() {
      return null;
    };
    g = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var H, W = {}, F = g.react_stack_bottom_frame.bind(
      g,
      d
    )(), q = P(m(d)), Y = {};
    T.Fragment = k, T.jsx = function(e, c, h) {
      var b = 1e4 > z.recentlyCreatedOwnerStacks++;
      return o(
        e,
        c,
        h,
        !1,
        b ? Error("react-stack-top-frame") : F,
        b ? P(m(e)) : q
      );
    }, T.jsxs = function(e, c, h) {
      var b = 1e4 > z.recentlyCreatedOwnerStacks++;
      return o(
        e,
        c,
        h,
        !0,
        b ? Error("react-stack-top-frame") : F,
        b ? P(m(e)) : q
      );
    };
  })()), T;
}
var J;
function ge() {
  return J || (J = 1, process.env.NODE_ENV === "production" ? j.exports = fe() : j.exports = pe()), j.exports;
}
var S = ge();
(function(n) {
  var t = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function s(o) {
    return o = o.replace(/<inner>/g, function() {
      return t;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + o + ")");
  }
  var m = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, i = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return m;
  }), d = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  n.languages.markdown = n.languages.extend("markup", {}), n.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: n.languages.yaml
        }
      }
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + i + d + "(?:" + i + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + i + d + ")(?:" + i + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(m),
              inside: n.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + i + ")" + d + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + i + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(m),
              alias: "important",
              inside: n.languages.markdown
            },
            punctuation: /\|/
          }
        }
      }
    },
    code: [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: !0,
        alias: "keyword"
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: !0,
        inside: {
          "code-block": {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: !0
          },
          "code-language": {
            pattern: /^(```).+/,
            lookbehind: !0
          },
          punctuation: /```/
        }
      }
    ],
    title: [
      {
        // title 1
        // =======
        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
        alias: "important",
        inside: {
          punctuation: /==+$|--+$/
        }
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: !0,
        alias: "important",
        inside: {
          punctuation: /^#+|#+$/
        }
      }
    ],
    hr: {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    list: {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    "url-reference": {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: !0
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/
      },
      alias: "url"
    },
    bold: {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: s(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /\*\*|__/
      }
    },
    italic: {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: s(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /[*_]/
      }
    },
    strike: {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: s(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /~~?/
      }
    },
    "code-snippet": {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: !0,
      greedy: !0,
      alias: ["code", "keyword"]
    },
    url: {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: s(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        variable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: !0
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: !0
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: !0
        }
      }
    }
  }), ["url", "bold", "italic", "strike"].forEach(function(o) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(r) {
      o !== r && (n.languages.markdown[o].inside.content.inside[r] = n.languages.markdown[r]);
    });
  }), n.hooks.add("after-tokenize", function(o) {
    if (o.language !== "markdown" && o.language !== "md")
      return;
    function r(p) {
      if (!(!p || typeof p == "string"))
        for (var g = 0, v = p.length; g < v; g++) {
          var y = p[g];
          if (y.type !== "code") {
            r(y.content);
            continue;
          }
          var k = y.content[1], E = y.content[3];
          if (k && E && k.type === "code-language" && E.type === "code-block" && typeof k.content == "string") {
            var _ = k.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            _ = (/[a-z][\w-]*/i.exec(_) || [""])[0].toLowerCase();
            var R = "language-" + _;
            E.alias ? typeof E.alias == "string" ? E.alias = [E.alias, R] : E.alias.push(R) : E.alias = [R];
          }
        }
    }
    r(o.tokens);
  }), n.hooks.add("wrap", function(o) {
    if (o.type === "code-block") {
      for (var r = "", p = 0, g = o.classes.length; p < g; p++) {
        var v = o.classes[p], y = /language-(.+)/.exec(v);
        if (y) {
          r = y[1];
          break;
        }
      }
      var k = n.languages[r];
      if (k)
        o.content = n.highlight(f(o.content), k, r);
      else if (r && r !== "none" && n.plugins.autoloader) {
        var E = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        o.attributes.id = E, n.plugins.autoloader.loadLanguages(r, function() {
          var _ = document.getElementById(E);
          _ && (_.innerHTML = n.highlight(_.textContent, n.languages[r], r));
        });
      }
    }
  });
  var a = RegExp(n.languages.markup.tag.pattern.source, "gi"), u = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, l = String.fromCodePoint || String.fromCharCode;
  function f(o) {
    var r = o.replace(a, "");
    return r = r.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(p, g) {
      if (g = g.toLowerCase(), g[0] === "#") {
        var v;
        return g[1] === "x" ? v = parseInt(g.slice(2), 16) : v = Number(g.slice(1)), l(v);
      } else {
        var y = u[g];
        return y || p;
      }
    }), r;
  }
  n.languages.md = n.languages.markdown;
})(Prism);
var G = {}, X;
function me() {
  return X || (X = 1, (function() {
    if (typeof Prism > "u" || typeof document > "u")
      return;
    var n = "line-numbers", t = /\n(?!$)/g, s = Prism.plugins.lineNumbers = {
      /**
       * Get node for provided line number
       *
       * @param {Element} element pre element
       * @param {number} number line number
       * @returns {Element|undefined}
       */
      getLine: function(a, u) {
        if (!(a.tagName !== "PRE" || !a.classList.contains(n))) {
          var l = a.querySelector(".line-numbers-rows");
          if (l) {
            var f = parseInt(a.getAttribute("data-start"), 10) || 1, o = f + (l.children.length - 1);
            u < f && (u = f), u > o && (u = o);
            var r = u - f;
            return l.children[r];
          }
        }
      },
      /**
       * Resizes the line numbers of the given element.
       *
       * This function will not add line numbers. It will only resize existing ones.
       *
       * @param {HTMLElement} element A `<pre>` element with line numbers.
       * @returns {void}
       */
      resize: function(a) {
        m([a]);
      },
      /**
       * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
       * the current viewport.
       *
       * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
       *
       * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
       *
       * @type {boolean}
       */
      assumeViewportIndependence: !0
    };
    function m(a) {
      if (a = a.filter(function(l) {
        var f = i(l), o = f["white-space"];
        return o === "pre-wrap" || o === "pre-line";
      }), a.length != 0) {
        var u = a.map(function(l) {
          var f = l.querySelector("code"), o = l.querySelector(".line-numbers-rows");
          if (!(!f || !o)) {
            var r = l.querySelector(".line-numbers-sizer"), p = f.textContent.split(t);
            r || (r = document.createElement("span"), r.className = "line-numbers-sizer", f.appendChild(r)), r.innerHTML = "0", r.style.display = "block";
            var g = r.getBoundingClientRect().height;
            return r.innerHTML = "", {
              element: l,
              lines: p,
              lineHeights: [],
              oneLinerHeight: g,
              sizer: r
            };
          }
        }).filter(Boolean);
        u.forEach(function(l) {
          var f = l.sizer, o = l.lines, r = l.lineHeights, p = l.oneLinerHeight;
          r[o.length - 1] = void 0, o.forEach(function(g, v) {
            if (g && g.length > 1) {
              var y = f.appendChild(document.createElement("span"));
              y.style.display = "block", y.textContent = g;
            } else
              r[v] = p;
          });
        }), u.forEach(function(l) {
          for (var f = l.sizer, o = l.lineHeights, r = 0, p = 0; p < o.length; p++)
            o[p] === void 0 && (o[p] = f.children[r++].getBoundingClientRect().height);
        }), u.forEach(function(l) {
          var f = l.sizer, o = l.element.querySelector(".line-numbers-rows");
          f.style.display = "none", f.innerHTML = "", l.lineHeights.forEach(function(r, p) {
            o.children[p].style.height = r + "px";
          });
        });
      }
    }
    function i(a) {
      return a ? window.getComputedStyle ? getComputedStyle(a) : a.currentStyle || null : null;
    }
    var d = void 0;
    window.addEventListener("resize", function() {
      s.assumeViewportIndependence && d === window.innerWidth || (d = window.innerWidth, m(Array.prototype.slice.call(document.querySelectorAll("pre." + n))));
    }), Prism.hooks.add("complete", function(a) {
      if (a.code) {
        var u = (
          /** @type {Element} */
          a.element
        ), l = (
          /** @type {HTMLElement} */
          u.parentNode
        );
        if (!(!l || !/pre/i.test(l.nodeName)) && !u.querySelector(".line-numbers-rows") && Prism.util.isActive(u, n)) {
          u.classList.remove(n), l.classList.add(n);
          var f = a.code.match(t), o = f ? f.length + 1 : 1, r, p = new Array(o + 1).join("<span></span>");
          r = document.createElement("span"), r.setAttribute("aria-hidden", "true"), r.className = "line-numbers-rows", r.innerHTML = p, l.hasAttribute("data-start") && (l.style.counterReset = "linenumber " + (parseInt(l.getAttribute("data-start"), 10) - 1)), a.element.appendChild(r), m([l]), Prism.hooks.run("line-numbers", a);
        }
      }
    }), Prism.hooks.add("line-numbers", function(a) {
      a.plugins = a.plugins || {}, a.plugins.lineNumbers = !0;
    });
  })()), G;
}
me();
function B(n) {
  return n.useTabs ? "	" : n.hasPadding ? " " : "";
}
class he {
  padding;
  constructor(t) {
    this.padding = B(t);
  }
  formatCell(t, s, m) {
    const i = m;
    switch (s) {
      case "right":
        return `${this.padding}${t.padStart(i)}${this.padding}`;
      case "center": {
        const d = i - t.length, a = Math.floor(d / 2), u = d - a;
        return `${this.padding}${" ".repeat(a)}${t}${" ".repeat(u)}${this.padding}`;
      }
      default:
        return `${this.padding}${t.padEnd(i)}${this.padding}`;
    }
  }
}
class be {
  static indicators = {
    left: (t) => `:${"-".repeat(t - 1)}`,
    right: (t) => `${"-".repeat(t - 1)}:`,
    center: (t) => `:${"-".repeat(t - 2)}:`,
    none: (t) => "-".repeat(t)
  };
  static formatIndicator(t, s) {
    return this.indicators[t](s);
  }
}
class we {
  config;
  cellFormatter;
  adjustedAlignments;
  constructor(t) {
    this.config = t, this.cellFormatter = new he(t), this.adjustedAlignments = this.getAdjustedAlignments();
  }
  getAdjustedAlignments() {
    return this.config.columnAlignments.length < this.config.columnCount ? [
      ...Array.from(this.config.columnAlignments),
      ...Array(this.config.columnCount - this.config.columnAlignments.length).fill("none")
    ] : Array.from(this.config.columnAlignments);
  }
  formatRow(t) {
    return `|${Array.from({ length: this.config.columnCount }, (m, i) => {
      let d = t[i] ?? "";
      this.config.replaceNewlines && (d = d.replace(/\n/g, "<br>"));
      const a = this.adjustedAlignments[i], u = this.config.columnWidths ? this.config.columnWidths[i] : d.length;
      return this.cellFormatter.formatCell(d, a, u);
    }).join("|")}|`;
  }
  formatAlignmentRow() {
    const t = B(this.config);
    return `|${Array.from({ length: this.config.columnCount }, (m, i) => {
      const d = this.adjustedAlignments[i], a = this.config.columnWidths ? this.config.columnWidths[i] : 3, u = be.formatIndicator(d, a);
      return `${t}${u}${t}`;
    }).join("|")}|`;
  }
}
function ve(n, t) {
  const s = new Array(t).fill(3);
  return n.forEach((m) => {
    for (let i = 0; i < t; i++) {
      const d = m[i] ?? "";
      s[i] = Math.max(s[i], d.length);
    }
  }), s;
}
function ye(n) {
  const t = n.inputDataHeader.length, s = n.inputDataBody.map((m) => m.length);
  return Math.max(t, ...s);
}
function Ee(n, t, s) {
  return s ? ve(
    [n.inputDataHeader, ...n.inputDataBody],
    t
  ) : void 0;
}
function _e(n, t, s = !0, m = !1, i = !1, d = !0) {
  const a = ye(n), u = Ee(n, a, s), l = {
    columnCount: a,
    columnAlignments: t,
    columnWidths: u,
    useTabs: m,
    replaceNewlines: i,
    hasPadding: d
  }, f = new we(l), o = f.formatRow(n.inputDataHeader), r = f.formatAlignmentRow(), p = n.inputDataBody.map((g) => f.formatRow(g)).join(`
`);
  return `${o}
${r}
${p}`.trimEnd();
}
function ke(n) {
  let t = "", s = n;
  for (; s >= 0; )
    t = String.fromCharCode(s % 26 + 65) + t, s = Math.floor(s / 26) - 1;
  return t;
}
function Re(n) {
  return Array.from({ length: n }, (t, s) => ke(s));
}
class C extends Error {
  constructor(t, s) {
    super(t, s), this.name = "MarkdownTableError", Object.setPrototypeOf(this, C.prototype);
  }
}
function xe(n) {
  if (n === null || !Array.isArray(n))
    throw new C("The 'data' prop must be a two-dimensional array.");
  if (n.length === 0)
    throw new C("The 'data' array must contain at least one row.");
}
const Se = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`, Ae = `
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#282a36}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;
function Te(n, t) {
  return t ? { inputDataHeader: n[0], inputDataBody: n.slice(1) } : { inputDataHeader: Re(n[0].length), inputDataBody: n };
}
function Ce(n, t, s, m, i, d, a) {
  try {
    xe(n);
    const { inputDataHeader: u, inputDataBody: l } = Te(n, t);
    return _e(
      { inputDataHeader: u, inputDataBody: l },
      s,
      m,
      i,
      d,
      a
    );
  } catch (u) {
    if (u instanceof C)
      return `Error: ${u.message}`;
    throw u;
  }
}
function je({
  inputData: n = null,
  hasHeader: t = !0,
  columnAlignments: s = [],
  isCompact: m = !1,
  hasTabs: i = !1,
  hasPadding: d = !0,
  convertLineBreaks: a = !1,
  className: u,
  onGenerate: l,
  theme: f = "light",
  preStyle: o,
  topPadding: r = 16,
  minWidth: p,
  showLineNumbers: g = !0
}) {
  const v = ie(null), y = se(), k = le(n), [, E] = ue(), _ = ce(() => Ce(
    k,
    t,
    s,
    !m,
    i,
    a,
    d
  ), [
    k,
    t,
    s,
    m,
    i,
    a,
    d
  ]);
  return D(() => {
    l && l(_);
  }, [_, l]), D(() => {
    const R = v.current?.querySelector("code");
    R && _ && E(() => {
      requestAnimationFrame(() => {
        if (de.highlightElement(R), !g && v.current) {
          const $ = v.current.querySelector(".line-numbers-rows");
          $ && $.remove();
        }
      });
    });
  }, [_, E, g]), /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
    /* @__PURE__ */ S.jsxs("style", { children: [
      f === "light" ? Se : Ae,
      `
          pre {
            position: relative;
            padding-top: ${r}px !important;
          }
          pre::before {
            position: absolute;
            top: 8px;
            left: 12px;
            color: ${f === "light" ? "#666" : "#999"};
            letter-spacing: 2px;
            font-size: 12px;
          }
          /* Hide line numbers when showLineNumbers is false */
          pre:not(.line-numbers) .line-numbers-rows {
            display: none !important;
          }
          /* Remove left padding when line numbers are hidden */
          pre:not(.line-numbers) {
            padding-left: 1em !important;
          }
          pre:not(.line-numbers) > code {
            padding-left: 0 !important;
          }
        `
    ] }),
    /* @__PURE__ */ S.jsx(
      "div",
      {
        id: y,
        style: {
          position: "relative",
          isolation: "isolate",
          display: "inline-block"
        },
        children: /* @__PURE__ */ S.jsx(
          "pre",
          {
            ref: v,
            className: `${u} language-markdown ${g ? "line-numbers" : ""} ${f === "dark" ? "dark-theme" : ""}`,
            style: {
              width: "fit-content",
              minWidth: p ? `${p}px` : "min-content",
              margin: 0,
              ...o
            },
            children: /* @__PURE__ */ S.jsx("code", { className: "language-markdown", role: "code", children: _ })
          }
        )
      }
    )
  ] });
}
export {
  je as MarkdownTable,
  C as MarkdownTableError
};
