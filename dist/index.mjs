import Ie, { useRef as hr, useId as vr, useDeferredValue as br, useTransition as yr, useMemo as wr, useEffect as Ae } from "react";
import Er from "prismjs";
var K = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function _r() {
  if ($e) return W;
  $e = 1;
  var t = Ie, a = Symbol.for("react.element"), c = Symbol.for("react.fragment"), w = Object.prototype.hasOwnProperty, d = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, v = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(f, o, p) {
    var s, i = {}, g = null, b = null;
    p !== void 0 && (g = "" + p), o.key !== void 0 && (g = "" + o.key), o.ref !== void 0 && (b = o.ref);
    for (s in o) w.call(o, s) && !v.hasOwnProperty(s) && (i[s] = o[s]);
    if (f && f.defaultProps) for (s in o = f.defaultProps, o) i[s] === void 0 && (i[s] = o[s]);
    return { $$typeof: a, type: f, key: g, ref: b, props: i, _owner: d.current };
  }
  return W.Fragment = c, W.jsx = l, W.jsxs = l, W;
}
var H = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function Rr() {
  return Oe || (Oe = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Ie, a = Symbol.for("react.element"), c = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), f = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), i = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), S = Symbol.iterator, C = "@@iterator";
    function $(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = S && e[S] || e[C];
      return typeof r == "function" ? r : null;
    }
    var R = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), u = 1; u < r; u++)
          n[u - 1] = arguments[u];
        j("error", e, n);
      }
    }
    function j(e, r, n) {
      {
        var u = R.ReactDebugCurrentFrame, y = u.getStackAddendum();
        y !== "" && (r += "%s", n = n.concat([y]));
        var _ = n.map(function(h) {
          return String(h);
        });
        _.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, _);
      }
    }
    var Y = !1, De = !1, Me = !1, ze = !1, Le = !1, ae;
    ae = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === w || e === v || Le || e === d || e === p || e === s || ze || e === b || Y || De || Me || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === i || e.$$typeof === l || e.$$typeof === f || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function He(e, r, n) {
      var u = e.displayName;
      if (u)
        return u;
      var y = r.displayName || r.name || "";
      return y !== "" ? n + "(" + y + ")" : n;
    }
    function ie(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case w:
          return "Fragment";
        case c:
          return "Portal";
        case v:
          return "Profiler";
        case d:
          return "StrictMode";
        case p:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            var r = e;
            return ie(r) + ".Consumer";
          case l:
            var n = e;
            return ie(n._context) + ".Provider";
          case o:
            return He(e, e.render, "ForwardRef");
          case i:
            var u = e.displayName || null;
            return u !== null ? u : P(e.type) || "Memo";
          case g: {
            var y = e, _ = y._payload, h = y._init;
            try {
              return P(h(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, z = 0, oe, se, le, ue, ce, fe, de;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function qe() {
      {
        if (z === 0) {
          oe = console.log, se = console.info, le = console.warn, ue = console.error, ce = console.group, fe = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        z++;
      }
    }
    function Ye() {
      {
        if (z--, z === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: oe
            }),
            info: N({}, e, {
              value: se
            }),
            warn: N({}, e, {
              value: le
            }),
            error: N({}, e, {
              value: ue
            }),
            group: N({}, e, {
              value: ce
            }),
            groupCollapsed: N({}, e, {
              value: fe
            }),
            groupEnd: N({}, e, {
              value: de
            })
          });
        }
        z < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = R.ReactCurrentDispatcher, X;
    function V(e, r, n) {
      {
        if (X === void 0)
          try {
            throw Error();
          } catch (y) {
            var u = y.stack.trim().match(/\n( *(at )?)/);
            X = u && u[1] || "";
          }
        return `
` + X + e;
      }
    }
    var Z = !1, U;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      U = new Ve();
    }
    function ge(e, r) {
      if (!e || Z)
        return "";
      {
        var n = U.get(e);
        if (n !== void 0)
          return n;
      }
      var u;
      Z = !0;
      var y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = G.current, G.current = null, qe();
      try {
        if (r) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (A) {
              u = A;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (A) {
              u = A;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            u = A;
          }
          e();
        }
      } catch (A) {
        if (A && u && typeof A.stack == "string") {
          for (var m = A.stack.split(`
`), T = u.stack.split(`
`), k = m.length - 1, x = T.length - 1; k >= 1 && x >= 0 && m[k] !== T[x]; )
            x--;
          for (; k >= 1 && x >= 0; k--, x--)
            if (m[k] !== T[x]) {
              if (k !== 1 || x !== 1)
                do
                  if (k--, x--, x < 0 || m[k] !== T[x]) {
                    var O = `
` + m[k].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, O), O;
                  }
                while (k >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        Z = !1, G.current = _, Ye(), Error.prepareStackTrace = y;
      }
      var D = e ? e.displayName || e.name : "", I = D ? V(D) : "";
      return typeof e == "function" && U.set(e, I), I;
    }
    function Ue(e, r, n) {
      return ge(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function B(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, Be(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case p:
          return V("Suspense");
        case s:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return Ue(e.render);
          case i:
            return B(e.type, r, n);
          case g: {
            var u = e, y = u._payload, _ = u._init;
            try {
              return B(_(y), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, me = {}, he = R.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, n = B(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(n);
      } else
        he.setExtraStackFrame(null);
    }
    function Je(e, r, n, u, y) {
      {
        var _ = Function.call.bind(L);
        for (var h in e)
          if (_(e, h)) {
            var m = void 0;
            try {
              if (typeof e[h] != "function") {
                var T = Error((u || "React class") + ": " + n + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw T.name = "Invariant Violation", T;
              }
              m = e[h](r, h, u, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              m = k;
            }
            m && !(m instanceof Error) && (J(y), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", n, h, typeof m), J(null)), m instanceof Error && !(m.message in me) && (me[m.message] = !0, J(y), E("Failed %s type: %s", n, m.message), J(null));
          }
      }
    }
    var Ke = Array.isArray;
    function Q(e) {
      return Ke(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Xe(e) {
      try {
        return ve(e), !1;
      } catch {
        return !0;
      }
    }
    function ve(e) {
      return "" + e;
    }
    function be(e) {
      if (Xe(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), ve(e);
    }
    var ye = R.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, we, Ee;
    function Qe(e) {
      if (L.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function er(e) {
      if (L.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rr(e, r) {
      typeof e.ref == "string" && ye.current;
    }
    function nr(e, r) {
      {
        var n = function() {
          we || (we = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var n = function() {
          Ee || (Ee = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var ar = function(e, r, n, u, y, _, h) {
      var m = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: h,
        // Record the component responsible for creating this element.
        _owner: _
      };
      return m._store = {}, Object.defineProperty(m._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(m, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(m, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
    };
    function ir(e, r, n, u, y) {
      {
        var _, h = {}, m = null, T = null;
        n !== void 0 && (be(n), m = "" + n), er(r) && (be(r.key), m = "" + r.key), Qe(r) && (T = r.ref, rr(r, y));
        for (_ in r)
          L.call(r, _) && !Ze.hasOwnProperty(_) && (h[_] = r[_]);
        if (e && e.defaultProps) {
          var k = e.defaultProps;
          for (_ in k)
            h[_] === void 0 && (h[_] = k[_]);
        }
        if (m || T) {
          var x = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          m && nr(h, x), T && tr(h, x);
        }
        return ar(e, m, T, y, u, ye.current, h);
      }
    }
    var ee = R.ReactCurrentOwner, _e = R.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var r = e._owner, n = B(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(n);
      } else
        _e.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ne(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Re() {
      {
        if (ee.current) {
          var e = P(ee.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function or(e) {
      return "";
    }
    var ke = {};
    function sr(e) {
      {
        var r = Re();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function xe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = sr(r);
        if (ke[n])
          return;
        ke[n] = !0;
        var u = "";
        e && e._owner && e._owner !== ee.current && (u = " It was passed a child from " + P(e._owner.type) + "."), F(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, u), F(null);
      }
    }
    function Se(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Q(e))
          for (var n = 0; n < e.length; n++) {
            var u = e[n];
            ne(u) && xe(u, r);
          }
        else if (ne(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var y = $(e);
          if (typeof y == "function" && y !== e.entries)
            for (var _ = y.call(e), h; !(h = _.next()).done; )
              ne(h.value) && xe(h.value, r);
        }
      }
    }
    function lr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === i))
          n = r.propTypes;
        else
          return;
        if (n) {
          var u = P(r);
          Je(n, e.props, "prop", u, e);
        } else if (r.PropTypes !== void 0 && !re) {
          re = !0;
          var y = P(r);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var u = r[n];
          if (u !== "children" && u !== "key") {
            F(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    var Ce = {};
    function Te(e, r, n, u, y, _) {
      {
        var h = We(e);
        if (!h) {
          var m = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = or();
          T ? m += T : m += Re();
          var k;
          e === null ? k = "null" : Q(e) ? k = "array" : e !== void 0 && e.$$typeof === a ? (k = "<" + (P(e.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : k = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, m);
        }
        var x = ir(e, r, n, y, _);
        if (x == null)
          return x;
        if (h) {
          var O = r.children;
          if (O !== void 0)
            if (u)
              if (Q(O)) {
                for (var D = 0; D < O.length; D++)
                  Se(O[D], e);
                Object.freeze && Object.freeze(O);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Se(O, e);
        }
        if (L.call(r, "key")) {
          var I = P(e), A = Object.keys(r).filter(function(mr) {
            return mr !== "key";
          }), te = A.length > 0 ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ce[I + te]) {
            var gr = A.length > 0 ? "{" + A.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, te, I, gr, I), Ce[I + te] = !0;
          }
        }
        return e === w ? ur(x) : lr(x), x;
      }
    }
    function cr(e, r, n) {
      return Te(e, r, n, !0);
    }
    function fr(e, r, n) {
      return Te(e, r, n, !1);
    }
    var dr = fr, pr = cr;
    H.Fragment = w, H.jsx = dr, H.jsxs = pr;
  })()), H;
}
var je;
function kr() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? K.exports = _r() : K.exports = Rr()), K.exports;
}
var M = kr();
(function(t) {
  var a = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function c(s) {
    return s = s.replace(/<inner>/g, function() {
      return a;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + s + ")");
  }
  var w = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, d = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return w;
  }), v = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  t.languages.markdown = t.languages.extend("markup", {}), t.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: t.languages.yaml
        }
      }
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + d + v + "(?:" + d + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + d + v + ")(?:" + d + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(w),
              inside: t.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + d + ")" + v + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + d + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(w),
              alias: "important",
              inside: t.languages.markdown
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
      pattern: c(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
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
      pattern: c(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
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
      pattern: c(/(~~?)(?:(?!~)<inner>)+\2/.source),
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
      pattern: c(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
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
  }), ["url", "bold", "italic", "strike"].forEach(function(s) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(i) {
      s !== i && (t.languages.markdown[s].inside.content.inside[i] = t.languages.markdown[i]);
    });
  }), t.hooks.add("after-tokenize", function(s) {
    if (s.language !== "markdown" && s.language !== "md")
      return;
    function i(g) {
      if (!(!g || typeof g == "string"))
        for (var b = 0, S = g.length; b < S; b++) {
          var C = g[b];
          if (C.type !== "code") {
            i(C.content);
            continue;
          }
          var $ = C.content[1], R = C.content[3];
          if ($ && R && $.type === "code-language" && R.type === "code-block" && typeof $.content == "string") {
            var E = $.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            E = (/[a-z][\w-]*/i.exec(E) || [""])[0].toLowerCase();
            var j = "language-" + E;
            R.alias ? typeof R.alias == "string" ? R.alias = [R.alias, j] : R.alias.push(j) : R.alias = [j];
          }
        }
    }
    i(s.tokens);
  }), t.hooks.add("wrap", function(s) {
    if (s.type === "code-block") {
      for (var i = "", g = 0, b = s.classes.length; g < b; g++) {
        var S = s.classes[g], C = /language-(.+)/.exec(S);
        if (C) {
          i = C[1];
          break;
        }
      }
      var $ = t.languages[i];
      if ($)
        s.content = t.highlight(p(s.content), $, i);
      else if (i && i !== "none" && t.plugins.autoloader) {
        var R = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        s.attributes.id = R, t.plugins.autoloader.loadLanguages(i, function() {
          var E = document.getElementById(R);
          E && (E.innerHTML = t.highlight(E.textContent, t.languages[i], i));
        });
      }
    }
  });
  var l = RegExp(t.languages.markup.tag.pattern.source, "gi"), f = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, o = String.fromCodePoint || String.fromCharCode;
  function p(s) {
    var i = s.replace(l, "");
    return i = i.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(g, b) {
      if (b = b.toLowerCase(), b[0] === "#") {
        var S;
        return b[1] === "x" ? S = parseInt(b.slice(2), 16) : S = Number(b.slice(1)), o(S);
      } else {
        var C = f[b];
        return C || g;
      }
    }), i;
  }
  t.languages.md = t.languages.markdown;
})(Prism);
var Pe = {}, Ne;
function xr() {
  return Ne || (Ne = 1, (function() {
    if (typeof Prism > "u" || typeof document > "u")
      return;
    var t = "line-numbers", a = /\n(?!$)/g, c = Prism.plugins.lineNumbers = {
      /**
       * Get node for provided line number
       *
       * @param {Element} element pre element
       * @param {number} number line number
       * @returns {Element|undefined}
       */
      getLine: function(l, f) {
        if (!(l.tagName !== "PRE" || !l.classList.contains(t))) {
          var o = l.querySelector(".line-numbers-rows");
          if (o) {
            var p = parseInt(l.getAttribute("data-start"), 10) || 1, s = p + (o.children.length - 1);
            f < p && (f = p), f > s && (f = s);
            var i = f - p;
            return o.children[i];
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
      resize: function(l) {
        w([l]);
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
    function w(l) {
      if (l = l.filter(function(o) {
        var p = d(o), s = p["white-space"];
        return s === "pre-wrap" || s === "pre-line";
      }), l.length != 0) {
        var f = l.map(function(o) {
          var p = o.querySelector("code"), s = o.querySelector(".line-numbers-rows");
          if (!(!p || !s)) {
            var i = o.querySelector(".line-numbers-sizer"), g = p.textContent.split(a);
            i || (i = document.createElement("span"), i.className = "line-numbers-sizer", p.appendChild(i)), i.innerHTML = "0", i.style.display = "block";
            var b = i.getBoundingClientRect().height;
            return i.innerHTML = "", {
              element: o,
              lines: g,
              lineHeights: [],
              oneLinerHeight: b,
              sizer: i
            };
          }
        }).filter(Boolean);
        f.forEach(function(o) {
          var p = o.sizer, s = o.lines, i = o.lineHeights, g = o.oneLinerHeight;
          i[s.length - 1] = void 0, s.forEach(function(b, S) {
            if (b && b.length > 1) {
              var C = p.appendChild(document.createElement("span"));
              C.style.display = "block", C.textContent = b;
            } else
              i[S] = g;
          });
        }), f.forEach(function(o) {
          for (var p = o.sizer, s = o.lineHeights, i = 0, g = 0; g < s.length; g++)
            s[g] === void 0 && (s[g] = p.children[i++].getBoundingClientRect().height);
        }), f.forEach(function(o) {
          var p = o.sizer, s = o.element.querySelector(".line-numbers-rows");
          p.style.display = "none", p.innerHTML = "", o.lineHeights.forEach(function(i, g) {
            s.children[g].style.height = i + "px";
          });
        });
      }
    }
    function d(l) {
      return l ? window.getComputedStyle ? getComputedStyle(l) : l.currentStyle || null : null;
    }
    var v = void 0;
    window.addEventListener("resize", function() {
      c.assumeViewportIndependence && v === window.innerWidth || (v = window.innerWidth, w(Array.prototype.slice.call(document.querySelectorAll("pre." + t))));
    }), Prism.hooks.add("complete", function(l) {
      if (l.code) {
        var f = (
          /** @type {Element} */
          l.element
        ), o = (
          /** @type {HTMLElement} */
          f.parentNode
        );
        if (!(!o || !/pre/i.test(o.nodeName)) && !f.querySelector(".line-numbers-rows") && Prism.util.isActive(f, t)) {
          f.classList.remove(t), o.classList.add(t);
          var p = l.code.match(a), s = p ? p.length + 1 : 1, i, g = new Array(s + 1).join("<span></span>");
          i = document.createElement("span"), i.setAttribute("aria-hidden", "true"), i.className = "line-numbers-rows", i.innerHTML = g, o.hasAttribute("data-start") && (o.style.counterReset = "linenumber " + (parseInt(o.getAttribute("data-start"), 10) - 1)), l.element.appendChild(i), w([o]), Prism.hooks.run("line-numbers", l);
        }
      }
    }), Prism.hooks.add("line-numbers", function(l) {
      l.plugins = l.plugins || {}, l.plugins.lineNumbers = !0;
    });
  })()), Pe;
}
xr();
function Fe(t) {
  return t.useTabs ? "	" : t.hasPadding ? " " : "";
}
class Sr {
  padding;
  constructor(a) {
    this.padding = Fe(a);
  }
  formatCell(a, c, w) {
    const d = w;
    switch (c) {
      case "right":
        return `${this.padding}${a.padStart(d)}${this.padding}`;
      case "center": {
        const v = d - a.length, l = Math.floor(v / 2), f = v - l;
        return `${this.padding}${" ".repeat(l)}${a}${" ".repeat(f)}${this.padding}`;
      }
      default:
        return `${this.padding}${a.padEnd(d)}${this.padding}`;
    }
  }
}
class Cr {
  static indicators = {
    left: (a) => `:${"-".repeat(a - 1)}`,
    right: (a) => `${"-".repeat(a - 1)}:`,
    center: (a) => `:${"-".repeat(a - 2)}:`,
    none: (a) => "-".repeat(a)
  };
  static formatIndicator(a, c) {
    return this.indicators[a](c);
  }
}
class Tr {
  config;
  cellFormatter;
  adjustedAlignments;
  constructor(a) {
    this.config = a, this.cellFormatter = new Sr(a), this.adjustedAlignments = this.getAdjustedAlignments();
  }
  getAdjustedAlignments() {
    return this.config.columnAlignments.length < this.config.columnCount ? [
      ...Array.from(this.config.columnAlignments),
      ...Array(this.config.columnCount - this.config.columnAlignments.length).fill("none")
    ] : Array.from(this.config.columnAlignments);
  }
  formatRow(a) {
    return `|${Array.from({ length: this.config.columnCount }, (w, d) => {
      let v = a[d] ?? "";
      this.config.replaceNewlines && (v = v.replace(/\n/g, "<br>"));
      const l = this.adjustedAlignments[d], f = this.config.columnWidths ? this.config.columnWidths[d] : v.length;
      return this.cellFormatter.formatCell(v, l, f);
    }).join("|")}|`;
  }
  formatAlignmentRow() {
    const a = Fe(this.config);
    return `|${Array.from({ length: this.config.columnCount }, (w, d) => {
      const v = this.adjustedAlignments[d], l = this.config.columnWidths ? this.config.columnWidths[d] : 3, f = Cr.formatIndicator(v, l);
      return `${a}${f}${a}`;
    }).join("|")}|`;
  }
}
function Ar(t, a) {
  const c = new Array(a).fill(3);
  return t.forEach((w) => {
    for (let d = 0; d < a; d++) {
      const v = w[d] ?? "";
      c[d] = Math.max(c[d], v.length);
    }
  }), c;
}
function $r(t) {
  const a = t.inputDataHeader.length, c = t.inputDataBody.map((w) => w.length);
  return Math.max(a, ...c);
}
function Or(t, a, c) {
  return c ? Ar(
    [t.inputDataHeader, ...t.inputDataBody],
    a
  ) : void 0;
}
function jr(t, a, c = !0, w = !1, d = !1, v = !0) {
  const l = $r(t), f = Or(t, l, c), o = {
    columnCount: l,
    columnAlignments: a,
    columnWidths: f,
    useTabs: w,
    replaceNewlines: d,
    hasPadding: v
  }, p = new Tr(o), s = p.formatRow(t.inputDataHeader), i = p.formatAlignmentRow(), g = t.inputDataBody.map((b) => p.formatRow(b)).join(`
`);
  return `${s}
${i}
${g}`.trimEnd();
}
function Pr(t) {
  let a = "", c = t;
  for (; c >= 0; )
    a = String.fromCharCode(c % 26 + 65) + a, c = Math.floor(c / 26) - 1;
  return a;
}
function Nr(t) {
  return Array.from({ length: t }, (a, c) => Pr(c));
}
class q extends Error {
  constructor(a, c) {
    super(a, c), this.name = "MarkdownTableError", Object.setPrototypeOf(this, q.prototype);
  }
}
function Ir(t) {
  if (t === null || !Array.isArray(t))
    throw new q("The 'data' prop must be a two-dimensional array.");
  if (t.length === 0)
    throw new q("The 'data' array must contain at least one row.");
}
const Fr = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`, Dr = `
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#282a36}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;
function Mr(t, a) {
  return a ? { inputDataHeader: t[0], inputDataBody: t.slice(1) } : { inputDataHeader: Nr(t[0].length), inputDataBody: t };
}
function zr(t, a, c, w, d, v, l) {
  try {
    Ir(t);
    const { inputDataHeader: f, inputDataBody: o } = Mr(t, a);
    return jr(
      { inputDataHeader: f, inputDataBody: o },
      c,
      w,
      d,
      v,
      l
    );
  } catch (f) {
    if (f instanceof q)
      return `Error: ${f.message}`;
    throw f;
  }
}
function Hr({
  inputData: t = null,
  hasHeader: a = !0,
  columnAlignments: c = [],
  isCompact: w = !1,
  hasTabs: d = !1,
  hasPadding: v = !0,
  convertLineBreaks: l = !1,
  className: f,
  onGenerate: o,
  theme: p = "light",
  preStyle: s,
  topPadding: i = 16,
  minWidth: g,
  showLineNumbers: b = !0
}) {
  const S = hr(null), C = vr(), $ = br(t), [, R] = yr(), E = wr(() => zr(
    $,
    a,
    c,
    !w,
    d,
    l,
    v
  ), [
    $,
    a,
    c,
    w,
    d,
    l,
    v
  ]);
  return Ae(() => {
    o && o(E);
  }, [E, o]), Ae(() => {
    const j = S.current?.querySelector("code");
    j && E && R(() => {
      requestAnimationFrame(() => {
        if (Er.highlightElement(j), !b && S.current) {
          const Y = S.current.querySelector(".line-numbers-rows");
          Y && Y.remove();
        }
      });
    });
  }, [E, R, b]), /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
    /* @__PURE__ */ M.jsxs("style", { children: [
      p === "light" ? Fr : Dr,
      `
          pre {
            position: relative;
            padding-top: ${i}px !important;
          }
          pre::before {
            position: absolute;
            top: 8px;
            left: 12px;
            color: ${p === "light" ? "#666" : "#999"};
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
    /* @__PURE__ */ M.jsx(
      "div",
      {
        id: C,
        style: {
          position: "relative",
          isolation: "isolate",
          display: "inline-block"
        },
        children: /* @__PURE__ */ M.jsx(
          "pre",
          {
            ref: S,
            className: `${f} language-markdown ${b ? "line-numbers" : ""} ${p === "dark" ? "dark-theme" : ""}`,
            style: {
              width: "fit-content",
              minWidth: g ? `${g}px` : "min-content",
              margin: 0,
              ...s
            },
            children: /* @__PURE__ */ M.jsx("code", { className: "language-markdown", role: "code", children: E })
          }
        )
      }
    )
  ] });
}
export {
  Hr as MarkdownTable,
  q as MarkdownTableError
};
