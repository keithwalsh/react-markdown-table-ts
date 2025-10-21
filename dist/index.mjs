import F, { useId as pr, useDeferredValue as gr, useMemo as mr, useEffect as hr } from "react";
var q = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function vr() {
  if (Se) return W;
  Se = 1;
  var o = F, t = Symbol.for("react.element"), i = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, u = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(m, g, R) {
    var v, C = {}, T = null, k = null;
    R !== void 0 && (T = "" + R), g.key !== void 0 && (T = "" + g.key), g.ref !== void 0 && (k = g.ref);
    for (v in g) d.call(g, v) && !p.hasOwnProperty(v) && (C[v] = g[v]);
    if (m && m.defaultProps) for (v in g = m.defaultProps, g) C[v] === void 0 && (C[v] = g[v]);
    return { $$typeof: t, type: m, key: T, ref: k, props: C, _owner: u.current };
  }
  return W.Fragment = i, W.jsx = h, W.jsxs = h, W;
}
var z = {};
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
function br() {
  return Oe || (Oe = 1, process.env.NODE_ENV !== "production" && (function() {
    var o = F, t = Symbol.for("react.element"), i = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), L = Symbol.iterator, U = "@@iterator";
    function D(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = L && e[L] || e[U];
      return typeof r == "function" ? r : null;
    }
    var A = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          n[a - 1] = arguments[a];
        Pe("error", e, n);
      }
    }
    function Pe(e, r, n) {
      {
        var a = A.ReactDebugCurrentFrame, c = a.getStackAddendum();
        c !== "" && (r += "%s", n = n.concat([c]));
        var f = n.map(function(l) {
          return String(l);
        });
        f.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var $e = !1, Fe = !1, De = !1, Ie = !1, Me = !1, te;
    te = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === d || e === p || Me || e === u || e === R || e === v || Ie || e === k || $e || Fe || De || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === C || e.$$typeof === h || e.$$typeof === m || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === te || e.getModuleId !== void 0));
    }
    function ze(e, r, n) {
      var a = e.displayName;
      if (a)
        return a;
      var c = r.displayName || r.name || "";
      return c !== "" ? n + "(" + c + ")" : n;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case d:
          return "Fragment";
        case i:
          return "Portal";
        case p:
          return "Profiler";
        case u:
          return "StrictMode";
        case R:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            var r = e;
            return ae(r) + ".Consumer";
          case h:
            var n = e;
            return ae(n._context) + ".Provider";
          case g:
            return ze(e, e.render, "ForwardRef");
          case C:
            var a = e.displayName || null;
            return a !== null ? a : S(e.type) || "Memo";
          case T: {
            var c = e, f = c._payload, l = c._init;
            try {
              return S(l(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, I = 0, oe, ie, se, le, ue, ce, fe;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Ye() {
      {
        if (I === 0) {
          oe = console.log, ie = console.info, se = console.warn, le = console.error, ue = console.group, ce = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: de,
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
        I++;
      }
    }
    function Ne() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, e, {
              value: oe
            }),
            info: O({}, e, {
              value: ie
            }),
            warn: O({}, e, {
              value: se
            }),
            error: O({}, e, {
              value: le
            }),
            group: O({}, e, {
              value: ue
            }),
            groupCollapsed: O({}, e, {
              value: ce
            }),
            groupEnd: O({}, e, {
              value: fe
            })
          });
        }
        I < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = A.ReactCurrentDispatcher, G;
    function V(e, r, n) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (c) {
            var a = c.stack.trim().match(/\n( *(at )?)/);
            G = a && a[1] || "";
          }
        return `
` + G + e;
      }
    }
    var X = !1, B;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      B = new Le();
    }
    function pe(e, r) {
      if (!e || X)
        return "";
      {
        var n = B.get(e);
        if (n !== void 0)
          return n;
      }
      var a;
      X = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = K.current, K.current = null, Ye();
      try {
        if (r) {
          var l = function() {
            throw Error();
          };
          if (Object.defineProperty(l.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(l, []);
            } catch (_) {
              a = _;
            }
            Reflect.construct(e, [], l);
          } else {
            try {
              l.call();
            } catch (_) {
              a = _;
            }
            e.call(l.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (_) {
            a = _;
          }
          e();
        }
      } catch (_) {
        if (_ && a && typeof _.stack == "string") {
          for (var s = _.stack.split(`
`), E = a.stack.split(`
`), b = s.length - 1, y = E.length - 1; b >= 1 && y >= 0 && s[b] !== E[y]; )
            y--;
          for (; b >= 1 && y >= 0; b--, y--)
            if (s[b] !== E[y]) {
              if (b !== 1 || y !== 1)
                do
                  if (b--, y--, y < 0 || s[b] !== E[y]) {
                    var x = `
` + s[b].replace(" at new ", " at ");
                    return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && B.set(e, x), x;
                  }
                while (b >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        X = !1, K.current = f, Ne(), Error.prepareStackTrace = c;
      }
      var $ = e ? e.displayName || e.name : "", j = $ ? V($) : "";
      return typeof e == "function" && B.set(e, j), j;
    }
    function Ue(e, r, n) {
      return pe(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function H(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, Ve(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case R:
          return V("Suspense");
        case v:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Ue(e.render);
          case C:
            return H(e.type, r, n);
          case T: {
            var a = e, c = a._payload, f = a._init;
            try {
              return H(f(c), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var M = Object.prototype.hasOwnProperty, ge = {}, me = A.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, n = H(e.type, e._source, r ? r.type : null);
        me.setExtraStackFrame(n);
      } else
        me.setExtraStackFrame(null);
    }
    function Be(e, r, n, a, c) {
      {
        var f = Function.call.bind(M);
        for (var l in e)
          if (f(e, l)) {
            var s = void 0;
            try {
              if (typeof e[l] != "function") {
                var E = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              s = e[l](r, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              s = b;
            }
            s && !(s instanceof Error) && (J(c), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof s), J(null)), s instanceof Error && !(s.message in ge) && (ge[s.message] = !0, J(c), w("Failed %s type: %s", n, s.message), J(null));
          }
      }
    }
    var He = Array.isArray;
    function Z(e) {
      return He(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function qe(e) {
      try {
        return he(e), !1;
      } catch {
        return !0;
      }
    }
    function he(e) {
      return "" + e;
    }
    function ve(e) {
      if (qe(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), he(e);
    }
    var be = A.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ye, we;
    function Ge(e) {
      if (M.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (M.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      typeof e.ref == "string" && be.current;
    }
    function Qe(e, r) {
      {
        var n = function() {
          ye || (ye = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var n = function() {
          we || (we = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, n, a, c, f, l) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: l,
        // Record the component responsible for creating this element.
        _owner: f
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function nr(e, r, n, a, c) {
      {
        var f, l = {}, s = null, E = null;
        n !== void 0 && (ve(n), s = "" + n), Xe(r) && (ve(r.key), s = "" + r.key), Ge(r) && (E = r.ref, Ze(r, c));
        for (f in r)
          M.call(r, f) && !Ke.hasOwnProperty(f) && (l[f] = r[f]);
        if (e && e.defaultProps) {
          var b = e.defaultProps;
          for (f in b)
            l[f] === void 0 && (l[f] = b[f]);
        }
        if (s || E) {
          var y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && Qe(l, y), E && er(l, y);
        }
        return rr(e, s, E, c, a, be.current, l);
      }
    }
    var Q = A.ReactCurrentOwner, Ee = A.ReactDebugCurrentFrame;
    function P(e) {
      if (e) {
        var r = e._owner, n = H(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(n);
      } else
        Ee.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Re() {
      {
        if (Q.current) {
          var e = S(Q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var _e = {};
    function ar(e) {
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
    function Ce(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = ar(r);
        if (_e[n])
          return;
        _e[n] = !0;
        var a = "";
        e && e._owner && e._owner !== Q.current && (a = " It was passed a child from " + S(e._owner.type) + "."), P(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), P(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var n = 0; n < e.length; n++) {
            var a = e[n];
            re(a) && Ce(a, r);
          }
        else if (re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = D(e);
          if (typeof c == "function" && c !== e.entries)
            for (var f = c.call(e), l; !(l = f.next()).done; )
              re(l.value) && Ce(l.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          n = r.propTypes;
        else
          return;
        if (n) {
          var a = S(r);
          Be(n, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !ee) {
          ee = !0;
          var c = S(r);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var a = r[n];
          if (a !== "children" && a !== "key") {
            P(e), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), P(null);
            break;
          }
        }
        e.ref !== null && (P(e), w("Invalid attribute `ref` supplied to `React.Fragment`."), P(null));
      }
    }
    var xe = {};
    function ke(e, r, n, a, c, f) {
      {
        var l = We(e);
        if (!l) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = tr();
          E ? s += E : s += Re();
          var b;
          e === null ? b = "null" : Z(e) ? b = "array" : e !== void 0 && e.$$typeof === t ? (b = "<" + (S(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : b = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", b, s);
        }
        var y = nr(e, r, n, c, f);
        if (y == null)
          return y;
        if (l) {
          var x = r.children;
          if (x !== void 0)
            if (a)
              if (Z(x)) {
                for (var $ = 0; $ < x.length; $++)
                  Te(x[$], e);
                Object.freeze && Object.freeze(x);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(x, e);
        }
        if (M.call(r, "key")) {
          var j = S(e), _ = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), ne = _.length > 0 ? "{key: someKey, " + _.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!xe[j + ne]) {
            var fr = _.length > 0 ? "{" + _.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ne, j, fr, j), xe[j + ne] = !0;
          }
        }
        return e === d ? ir(y) : or(y), y;
      }
    }
    function sr(e, r, n) {
      return ke(e, r, n, !0);
    }
    function lr(e, r, n) {
      return ke(e, r, n, !1);
    }
    var ur = lr, cr = sr;
    z.Fragment = d, z.jsx = ur, z.jsxs = cr;
  })()), z;
}
var je;
function yr() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? q.exports = vr() : q.exports = br()), q.exports;
}
var Y = yr();
function wr(o) {
  const {
    children: t,
    showLineNumbers: i = !1,
    startLine: d = 1,
    className: u = "",
    style: p = {}
  } = o, g = (typeof t == "string" ? t : "").split(`
`).map((R, v) => d + v);
  return F.createElement("pre", {
    className: `language-markdown ${i ? "line-numbers" : ""} ${u}`.trim(),
    "data-start": d,
    style: {
      position: "relative",
      counterReset: `linenumber ${d - 1}`,
      ...i ? { paddingLeft: "3.8em" } : {},
      ...p
    }
  }, [
    F.createElement("code", {
      key: "code",
      className: "language-markdown"
    }, t),
    i && F.createElement("span", {
      key: "line-numbers",
      className: "line-numbers-rows",
      "aria-hidden": "true"
    }, g.map(
      (R, v) => F.createElement("span", {
        key: v
      })
    ))
  ].filter(Boolean));
}
function Ae(o) {
  return o.useTabs ? "	" : o.hasPadding ? " " : "";
}
class Er {
  padding;
  constructor(t) {
    this.padding = Ae(t);
  }
  formatCell(t, i, d) {
    const u = d;
    switch (i) {
      case "right":
        return `${this.padding}${t.padStart(u)}${this.padding}`;
      case "center": {
        const p = u - t.length, h = Math.floor(p / 2), m = p - h;
        return `${this.padding}${" ".repeat(h)}${t}${" ".repeat(m)}${this.padding}`;
      }
      default:
        return `${this.padding}${t.padEnd(u)}${this.padding}`;
    }
  }
}
class Rr {
  static indicators = {
    left: (t) => `:${"-".repeat(t - 1)}`,
    right: (t) => `${"-".repeat(t - 1)}:`,
    center: (t) => `:${"-".repeat(t - 2)}:`,
    none: (t) => "-".repeat(t)
  };
  static formatIndicator(t, i) {
    return this.indicators[t](i);
  }
}
class _r {
  config;
  cellFormatter;
  adjustedAlignments;
  constructor(t) {
    this.config = t, this.cellFormatter = new Er(t), this.adjustedAlignments = this.getAdjustedAlignments();
  }
  getAdjustedAlignments() {
    return this.config.columnAlignments.length < this.config.columnCount ? [
      ...Array.from(this.config.columnAlignments),
      ...Array(this.config.columnCount - this.config.columnAlignments.length).fill("none")
    ] : Array.from(this.config.columnAlignments);
  }
  formatRow(t) {
    return `|${Array.from({ length: this.config.columnCount }, (d, u) => {
      let p = t[u] ?? "";
      this.config.replaceNewlines && (p = p.replace(/\n/g, "<br>"));
      const h = this.adjustedAlignments[u], m = this.config.columnWidths ? this.config.columnWidths[u] : p.length;
      return this.cellFormatter.formatCell(p, h, m);
    }).join("|")}|`;
  }
  formatAlignmentRow() {
    const t = Ae(this.config);
    return `|${Array.from({ length: this.config.columnCount }, (d, u) => {
      const p = this.adjustedAlignments[u], h = this.config.columnWidths ? this.config.columnWidths[u] : 3, m = Rr.formatIndicator(p, h);
      return `${t}${m}${t}`;
    }).join("|")}|`;
  }
}
function Cr(o, t) {
  const i = new Array(t).fill(3);
  return o.forEach((d) => {
    for (let u = 0; u < t; u++) {
      const p = d[u] ?? "";
      i[u] = Math.max(i[u], p.length);
    }
  }), i;
}
function Tr(o) {
  const t = o.inputDataHeader.length, i = o.inputDataBody.map((d) => d.length);
  return Math.max(t, ...i);
}
function xr(o, t, i) {
  return i ? Cr(
    [o.inputDataHeader, ...o.inputDataBody],
    t
  ) : void 0;
}
function kr(o, t, i = !0, d = !1, u = !1, p = !0) {
  const h = Tr(o), m = xr(o, h, i), g = {
    columnCount: h,
    columnAlignments: t,
    columnWidths: m,
    useTabs: d,
    replaceNewlines: u,
    hasPadding: p
  }, R = new _r(g), v = R.formatRow(o.inputDataHeader), C = R.formatAlignmentRow(), T = o.inputDataBody.map((k) => R.formatRow(k)).join(`
`);
  return `${v}
${C}
${T}`.trimEnd();
}
function Sr(o) {
  let t = "", i = o;
  for (; i >= 0; )
    t = String.fromCharCode(i % 26 + 65) + t, i = Math.floor(i / 26) - 1;
  return t;
}
function Or(o) {
  return Array.from({ length: o }, (t, i) => Sr(i));
}
class N extends Error {
  constructor(t, i) {
    super(t, i), this.name = "MarkdownTableError", Object.setPrototypeOf(this, N.prototype);
  }
}
function jr(o) {
  if (o === null || !Array.isArray(o))
    throw new N("The 'data' prop must be a two-dimensional array.");
  if (o.length === 0)
    throw new N("The 'data' array must contain at least one row.");
}
const Ar = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`, Pr = `
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#282a36}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;
function $r(o, t) {
  return t ? { inputDataHeader: o[0], inputDataBody: o.slice(1) } : { inputDataHeader: Or(o[0].length), inputDataBody: o };
}
function Fr(o, t, i, d, u, p, h) {
  try {
    jr(o);
    const { inputDataHeader: m, inputDataBody: g } = $r(o, t);
    return kr(
      { inputDataHeader: m, inputDataBody: g },
      i,
      d,
      u,
      p,
      h
    );
  } catch (m) {
    if (m instanceof N)
      return `Error: ${m.message}`;
    throw m;
  }
}
function Ir({
  inputData: o = null,
  hasHeader: t = !0,
  columnAlignments: i = [],
  isCompact: d = !1,
  hasTabs: u = !1,
  hasPadding: p = !0,
  convertLineBreaks: h = !1,
  className: m,
  onGenerate: g,
  theme: R = "light",
  preStyle: v,
  topPadding: C = 16,
  minWidth: T,
  showLineNumbers: k = !0
}) {
  const L = pr(), U = gr(o), D = mr(() => Fr(
    U,
    t,
    i,
    !d,
    u,
    h,
    p
  ), [
    U,
    t,
    i,
    d,
    u,
    h,
    p
  ]);
  return hr(() => {
    g && g(D);
  }, [D, g]), /* @__PURE__ */ Y.jsxs(Y.Fragment, { children: [
    /* @__PURE__ */ Y.jsxs("style", { children: [
      R === "light" ? Ar : Pr,
      `
          /* Add top spacing for the table content */
          pre > code {
            display: block;
            padding-top: ${C}px !important;
          }
          /* Hide line numbers when disabled */
          pre:not(.line-numbers) .line-numbers-rows {
            display: none !important;
          }
          /* Ensure line numbers are visible */
          .line-numbers .line-numbers-rows {
            display: block !important;
          }
          .line-numbers-rows > span:before {
            display: block !important;
          }
        `
    ] }),
    /* @__PURE__ */ Y.jsx(
      "div",
      {
        id: L,
        style: {
          position: "relative",
          isolation: "isolate",
          display: "inline-block"
        },
        children: /* @__PURE__ */ Y.jsx(
          wr,
          {
            showLineNumbers: k,
            className: m,
            style: {
              width: "fit-content",
              minWidth: T ? `${T}px` : "min-content",
              margin: 0,
              ...v
            },
            children: D
          }
        )
      }
    )
  ] });
}
export {
  Ir as MarkdownTable,
  N as MarkdownTableError
};
