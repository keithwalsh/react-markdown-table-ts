import Ge, { useRef as wn, useId as xn, useDeferredValue as En, useTransition as kn, useMemo as An, useEffect as Ne } from "react";
var We = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _n(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var ye = { exports: {} }, de = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function Sn() {
  if (He) return de;
  He = 1;
  var l = Ge, g = Symbol.for("react.element"), t = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, v = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(a, c, E) {
    var p, f = {}, k = null, C = null;
    E !== void 0 && (k = "" + E), c.key !== void 0 && (k = "" + c.key), c.ref !== void 0 && (C = c.ref);
    for (p in c) m.call(c, p) && !x.hasOwnProperty(p) && (f[p] = c[p]);
    if (a && a.defaultProps) for (p in c = a.defaultProps, c) f[p] === void 0 && (f[p] = c[p]);
    return { $$typeof: g, type: a, key: k, ref: C, props: f, _owner: v.current };
  }
  return de.Fragment = t, de.jsx = h, de.jsxs = h, de;
}
var fe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function Fn() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && (function() {
    var l = Ge, g = Symbol.for("react.element"), t = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), P = Symbol.iterator, S = "@@iterator";
    function _(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = P && e[P] || e[S];
      return typeof i == "function" ? i : null;
    }
    var A = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(e) {
      {
        for (var i = arguments.length, d = new Array(i > 1 ? i - 1 : 0), w = 1; w < i; w++)
          d[w - 1] = arguments[w];
        r("error", e, d);
      }
    }
    function r(e, i, d) {
      {
        var w = A.ReactDebugCurrentFrame, $ = w.getStackAddendum();
        $ !== "" && (i += "%s", d = d.concat([$]));
        var O = d.map(function(T) {
          return String(T);
        });
        O.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, O);
      }
    }
    var o = !1, s = !1, u = !1, y = !1, R = !1, b;
    b = Symbol.for("react.module.reference");
    function j(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === x || R || e === v || e === E || e === p || y || e === C || o || s || u || typeof e == "object" && e !== null && (e.$$typeof === k || e.$$typeof === f || e.$$typeof === h || e.$$typeof === a || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === b || e.getModuleId !== void 0));
    }
    function z(e, i, d) {
      var w = e.displayName;
      if (w)
        return w;
      var $ = i.displayName || i.name || "";
      return $ !== "" ? d + "(" + $ + ")" : d;
    }
    function U(e) {
      return e.displayName || "Context";
    }
    function Y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && n("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case t:
          return "Portal";
        case x:
          return "Profiler";
        case v:
          return "StrictMode";
        case E:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case a:
            var i = e;
            return U(i) + ".Consumer";
          case h:
            var d = e;
            return U(d._context) + ".Provider";
          case c:
            return z(e, e.render, "ForwardRef");
          case f:
            var w = e.displayName || null;
            return w !== null ? w : Y(e.type) || "Memo";
          case k: {
            var $ = e, O = $._payload, T = $._init;
            try {
              return Y(T(O));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var B = Object.assign, Q = 0, pe, le, M, H, G, ee, N;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function V() {
      {
        if (Q === 0) {
          pe = console.log, le = console.info, M = console.warn, H = console.error, G = console.group, ee = console.groupCollapsed, N = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
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
        Q++;
      }
    }
    function ne() {
      {
        if (Q--, Q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: B({}, e, {
              value: pe
            }),
            info: B({}, e, {
              value: le
            }),
            warn: B({}, e, {
              value: M
            }),
            error: B({}, e, {
              value: H
            }),
            group: B({}, e, {
              value: G
            }),
            groupCollapsed: B({}, e, {
              value: ee
            }),
            groupEnd: B({}, e, {
              value: N
            })
          });
        }
        Q < 0 && n("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = A.ReactCurrentDispatcher, K;
    function Z(e, i, d) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch ($) {
            var w = $.stack.trim().match(/\n( *(at )?)/);
            K = w && w[1] || "";
          }
        return `
` + K + e;
      }
    }
    var te = !1, X;
    {
      var ae = typeof WeakMap == "function" ? WeakMap : Map;
      X = new ae();
    }
    function me(e, i) {
      if (!e || te)
        return "";
      {
        var d = X.get(e);
        if (d !== void 0)
          return d;
      }
      var w;
      te = !0;
      var $ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var O;
      O = J.current, J.current = null, V();
      try {
        if (i) {
          var T = function() {
            throw Error();
          };
          if (Object.defineProperty(T.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(T, []);
            } catch (W) {
              w = W;
            }
            Reflect.construct(e, [], T);
          } else {
            try {
              T.call();
            } catch (W) {
              w = W;
            }
            e.call(T.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (W) {
            w = W;
          }
          e();
        }
      } catch (W) {
        if (W && w && typeof W.stack == "string") {
          for (var F = W.stack.split(`
`), L = w.stack.split(`
`), I = F.length - 1, D = L.length - 1; I >= 1 && D >= 0 && F[I] !== L[D]; )
            D--;
          for (; I >= 1 && D >= 0; I--, D--)
            if (F[I] !== L[D]) {
              if (I !== 1 || D !== 1)
                do
                  if (I--, D--, D < 0 || F[I] !== L[D]) {
                    var q = `
` + F[I].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, q), q;
                  }
                while (I >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        te = !1, J.current = O, ne(), Error.prepareStackTrace = $;
      }
      var oe = e ? e.displayName || e.name : "", re = oe ? Z(oe) : "";
      return typeof e == "function" && X.set(e, re), re;
    }
    function ue(e, i, d) {
      return me(e, !1);
    }
    function Ke(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function ve(e, i, d) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return me(e, Ke(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case E:
          return Z("Suspense");
        case p:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return ue(e.render);
          case f:
            return ve(e.type, i, d);
          case k: {
            var w = e, $ = w._payload, O = w._init;
            try {
              return ve(O($), i, d);
            } catch {
            }
          }
        }
      return "";
    }
    var ce = Object.prototype.hasOwnProperty, Se = {}, Fe = A.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var i = e._owner, d = ve(e.type, e._source, i ? i.type : null);
        Fe.setExtraStackFrame(d);
      } else
        Fe.setExtraStackFrame(null);
    }
    function Ze(e, i, d, w, $) {
      {
        var O = Function.call.bind(ce);
        for (var T in e)
          if (O(e, T)) {
            var F = void 0;
            try {
              if (typeof e[T] != "function") {
                var L = Error((w || "React class") + ": " + d + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw L.name = "Invariant Violation", L;
              }
              F = e[T](i, T, w, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (I) {
              F = I;
            }
            F && !(F instanceof Error) && (be($), n("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", d, T, typeof F), be(null)), F instanceof Error && !(F.message in Se) && (Se[F.message] = !0, be($), n("Failed %s type: %s", d, F.message), be(null));
          }
      }
    }
    var Xe = Array.isArray;
    function we(e) {
      return Xe(e);
    }
    function Qe(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, d = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return d;
      }
    }
    function en(e) {
      try {
        return Re(e), !1;
      } catch {
        return !0;
      }
    }
    function Re(e) {
      return "" + e;
    }
    function Ce(e) {
      if (en(e))
        return n("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Re(e);
    }
    var Te = A.ReactCurrentOwner, nn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, $e, Oe;
    function rn(e) {
      if (ce.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tn(e) {
      if (ce.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function an(e, i) {
      typeof e.ref == "string" && Te.current;
    }
    function on(e, i) {
      {
        var d = function() {
          $e || ($e = !0, n("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: d,
          configurable: !0
        });
      }
    }
    function sn(e, i) {
      {
        var d = function() {
          Oe || (Oe = !0, n("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var ln = function(e, i, d, w, $, O, T) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: d,
        props: T,
        // Record the component responsible for creating this element.
        _owner: O
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function un(e, i, d, w, $) {
      {
        var O, T = {}, F = null, L = null;
        d !== void 0 && (Ce(d), F = "" + d), tn(i) && (Ce(i.key), F = "" + i.key), rn(i) && (L = i.ref, an(i, $));
        for (O in i)
          ce.call(i, O) && !nn.hasOwnProperty(O) && (T[O] = i[O]);
        if (e && e.defaultProps) {
          var I = e.defaultProps;
          for (O in I)
            T[O] === void 0 && (T[O] = I[O]);
        }
        if (F || L) {
          var D = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          F && on(T, D), L && sn(T, D);
        }
        return ln(e, F, L, $, w, Te.current, T);
      }
    }
    var xe = A.ReactCurrentOwner, je = A.ReactDebugCurrentFrame;
    function ie(e) {
      if (e) {
        var i = e._owner, d = ve(e.type, e._source, i ? i.type : null);
        je.setExtraStackFrame(d);
      } else
        je.setExtraStackFrame(null);
    }
    var Ee;
    Ee = !1;
    function ke(e) {
      return typeof e == "object" && e !== null && e.$$typeof === g;
    }
    function Pe() {
      {
        if (xe.current) {
          var e = Y(xe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function cn(e) {
      return "";
    }
    var Ie = {};
    function dn(e) {
      {
        var i = Pe();
        if (!i) {
          var d = typeof e == "string" ? e : e.displayName || e.name;
          d && (i = `

Check the top-level render call using <` + d + ">.");
        }
        return i;
      }
    }
    function De(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var d = dn(i);
        if (Ie[d])
          return;
        Ie[d] = !0;
        var w = "";
        e && e._owner && e._owner !== xe.current && (w = " It was passed a child from " + Y(e._owner.type) + "."), ie(e), n('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, w), ie(null);
      }
    }
    function Me(e, i) {
      {
        if (typeof e != "object")
          return;
        if (we(e))
          for (var d = 0; d < e.length; d++) {
            var w = e[d];
            ke(w) && De(w, i);
          }
        else if (ke(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var $ = _(e);
          if (typeof $ == "function" && $ !== e.entries)
            for (var O = $.call(e), T; !(T = O.next()).done; )
              ke(T.value) && De(T.value, i);
        }
      }
    }
    function fn(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var d;
        if (typeof i == "function")
          d = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === f))
          d = i.propTypes;
        else
          return;
        if (d) {
          var w = Y(i);
          Ze(d, e.props, "prop", w, e);
        } else if (i.PropTypes !== void 0 && !Ee) {
          Ee = !0;
          var $ = Y(i);
          n("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $ || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && n("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gn(e) {
      {
        for (var i = Object.keys(e.props), d = 0; d < i.length; d++) {
          var w = i[d];
          if (w !== "children" && w !== "key") {
            ie(e), n("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), ie(null);
            break;
          }
        }
        e.ref !== null && (ie(e), n("Invalid attribute `ref` supplied to `React.Fragment`."), ie(null));
      }
    }
    var ze = {};
    function Le(e, i, d, w, $, O) {
      {
        var T = j(e);
        if (!T) {
          var F = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = cn();
          L ? F += L : F += Pe();
          var I;
          e === null ? I = "null" : we(e) ? I = "array" : e !== void 0 && e.$$typeof === g ? (I = "<" + (Y(e.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : I = typeof e, n("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", I, F);
        }
        var D = un(e, i, d, $, O);
        if (D == null)
          return D;
        if (T) {
          var q = i.children;
          if (q !== void 0)
            if (w)
              if (we(q)) {
                for (var oe = 0; oe < q.length; oe++)
                  Me(q[oe], e);
                Object.freeze && Object.freeze(q);
              } else
                n("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(q, e);
        }
        if (ce.call(i, "key")) {
          var re = Y(e), W = Object.keys(i).filter(function(yn) {
            return yn !== "key";
          }), Ae = W.length > 0 ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ze[re + Ae]) {
            var bn = W.length > 0 ? "{" + W.join(": ..., ") + ": ...}" : "{}";
            n(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ae, re, bn, re), ze[re + Ae] = !0;
          }
        }
        return e === m ? gn(D) : fn(D), D;
      }
    }
    function pn(e, i, d) {
      return Le(e, i, d, !0);
    }
    function hn(e, i, d) {
      return Le(e, i, d, !1);
    }
    var mn = hn, vn = pn;
    fe.Fragment = m, fe.jsx = mn, fe.jsxs = vn;
  })()), fe;
}
var Ue;
function Rn() {
  return Ue || (Ue = 1, process.env.NODE_ENV === "production" ? ye.exports = Sn() : ye.exports = Fn()), ye.exports;
}
var se = Rn(), _e = { exports: {} }, Ye;
function Cn() {
  return Ye || (Ye = 1, (function(l) {
    var g = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     *
     * @license MIT <https://opensource.org/licenses/MIT>
     * @author Lea Verou <https://lea.verou.me>
     * @namespace
     * @public
     */
    var t = (function(m) {
      var v = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, x = 0, h = {}, a = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: m.Prism && m.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: m.Prism && m.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function n(r) {
            return r instanceof c ? new c(r.type, n(r.content), r.alias) : Array.isArray(r) ? r.map(n) : r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(n) {
            return Object.prototype.toString.call(n).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(n) {
            return n.__id || Object.defineProperty(n, "__id", { value: ++x }), n.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function n(r, o) {
            o = o || {};
            var s, u;
            switch (a.util.type(r)) {
              case "Object":
                if (u = a.util.objId(r), o[u])
                  return o[u];
                s = /** @type {Record<string, any>} */
                {}, o[u] = s;
                for (var y in r)
                  r.hasOwnProperty(y) && (s[y] = n(r[y], o));
                return (
                  /** @type {any} */
                  s
                );
              case "Array":
                return u = a.util.objId(r), o[u] ? o[u] : (s = [], o[u] = s, /** @type {Array} */
                /** @type {any} */
                r.forEach(function(R, b) {
                  s[b] = n(R, o);
                }), /** @type {any} */
                s);
              default:
                return r;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(n) {
            for (; n; ) {
              var r = v.exec(n.className);
              if (r)
                return r[1].toLowerCase();
              n = n.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(n, r) {
            n.className = n.className.replace(RegExp(v, "gi"), ""), n.classList.add("language-" + r);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document > "u")
              return null;
            if (document.currentScript && document.currentScript.tagName === "SCRIPT")
              return (
                /** @type {any} */
                document.currentScript
              );
            try {
              throw new Error();
            } catch (s) {
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(s.stack) || [])[1];
              if (n) {
                var r = document.getElementsByTagName("script");
                for (var o in r)
                  if (r[o].src == n)
                    return r[o];
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(n, r, o) {
            for (var s = "no-" + r; n; ) {
              var u = n.classList;
              if (u.contains(r))
                return !0;
              if (u.contains(s))
                return !1;
              n = n.parentElement;
            }
            return !!o;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: h,
          plaintext: h,
          text: h,
          txt: h,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(n, r) {
            var o = a.util.clone(a.languages[n]);
            for (var s in r)
              o[s] = r[s];
            return o;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(n, r, o, s) {
            s = s || /** @type {any} */
            a.languages;
            var u = s[n], y = {};
            for (var R in u)
              if (u.hasOwnProperty(R)) {
                if (R == r)
                  for (var b in o)
                    o.hasOwnProperty(b) && (y[b] = o[b]);
                o.hasOwnProperty(R) || (y[R] = u[R]);
              }
            var j = s[n];
            return s[n] = y, a.languages.DFS(a.languages, function(z, U) {
              U === j && z != n && (this[z] = y);
            }), y;
          },
          // Traverse a language definition with Depth First Search
          DFS: function n(r, o, s, u) {
            u = u || {};
            var y = a.util.objId;
            for (var R in r)
              if (r.hasOwnProperty(R)) {
                o.call(r, R, r[R], s || R);
                var b = r[R], j = a.util.type(b);
                j === "Object" && !u[y(b)] ? (u[y(b)] = !0, n(b, o, null, u)) : j === "Array" && !u[y(b)] && (u[y(b)] = !0, n(b, o, R, u));
              }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(n, r) {
          a.highlightAllUnder(document, n, r);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(n, r, o) {
          var s = {
            callback: o,
            container: n,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          a.hooks.run("before-highlightall", s), s.elements = Array.prototype.slice.apply(s.container.querySelectorAll(s.selector)), a.hooks.run("before-all-elements-highlight", s);
          for (var u = 0, y; y = s.elements[u++]; )
            a.highlightElement(y, r === !0, s.callback);
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(n, r, o) {
          var s = a.util.getLanguage(n), u = a.languages[s];
          a.util.setLanguage(n, s);
          var y = n.parentElement;
          y && y.nodeName.toLowerCase() === "pre" && a.util.setLanguage(y, s);
          var R = n.textContent, b = {
            element: n,
            language: s,
            grammar: u,
            code: R
          };
          function j(U) {
            b.highlightedCode = U, a.hooks.run("before-insert", b), b.element.innerHTML = b.highlightedCode, a.hooks.run("after-highlight", b), a.hooks.run("complete", b), o && o.call(b.element);
          }
          if (a.hooks.run("before-sanity-check", b), y = b.element.parentElement, y && y.nodeName.toLowerCase() === "pre" && !y.hasAttribute("tabindex") && y.setAttribute("tabindex", "0"), !b.code) {
            a.hooks.run("complete", b), o && o.call(b.element);
            return;
          }
          if (a.hooks.run("before-highlight", b), !b.grammar) {
            j(a.util.encode(b.code));
            return;
          }
          if (r && m.Worker) {
            var z = new Worker(a.filename);
            z.onmessage = function(U) {
              j(U.data);
            }, z.postMessage(JSON.stringify({
              language: b.language,
              code: b.code,
              immediateClose: !0
            }));
          } else
            j(a.highlight(b.code, b.grammar, b.language));
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(n, r, o) {
          var s = {
            code: n,
            grammar: r,
            language: o
          };
          if (a.hooks.run("before-tokenize", s), !s.grammar)
            throw new Error('The language "' + s.language + '" has no grammar.');
          return s.tokens = a.tokenize(s.code, s.grammar), a.hooks.run("after-tokenize", s), c.stringify(a.util.encode(s.tokens), s.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(n, r) {
          var o = r.rest;
          if (o) {
            for (var s in o)
              r[s] = o[s];
            delete r.rest;
          }
          var u = new f();
          return k(u, u.head, n), p(n, u, r, u.head, 0), P(u);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(n, r) {
            var o = a.hooks.all;
            o[n] = o[n] || [], o[n].push(r);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(n, r) {
            var o = a.hooks.all[n];
            if (!(!o || !o.length))
              for (var s = 0, u; u = o[s++]; )
                u(r);
          }
        },
        Token: c
      };
      m.Prism = a;
      function c(n, r, o, s) {
        this.type = n, this.content = r, this.alias = o, this.length = (s || "").length | 0;
      }
      c.stringify = function n(r, o) {
        if (typeof r == "string")
          return r;
        if (Array.isArray(r)) {
          var s = "";
          return r.forEach(function(j) {
            s += n(j, o);
          }), s;
        }
        var u = {
          type: r.type,
          content: n(r.content, o),
          tag: "span",
          classes: ["token", r.type],
          attributes: {},
          language: o
        }, y = r.alias;
        y && (Array.isArray(y) ? Array.prototype.push.apply(u.classes, y) : u.classes.push(y)), a.hooks.run("wrap", u);
        var R = "";
        for (var b in u.attributes)
          R += " " + b + '="' + (u.attributes[b] || "").replace(/"/g, "&quot;") + '"';
        return "<" + u.tag + ' class="' + u.classes.join(" ") + '"' + R + ">" + u.content + "</" + u.tag + ">";
      };
      function E(n, r, o, s) {
        n.lastIndex = r;
        var u = n.exec(o);
        if (u && s && u[1]) {
          var y = u[1].length;
          u.index += y, u[0] = u[0].slice(y);
        }
        return u;
      }
      function p(n, r, o, s, u, y) {
        for (var R in o)
          if (!(!o.hasOwnProperty(R) || !o[R])) {
            var b = o[R];
            b = Array.isArray(b) ? b : [b];
            for (var j = 0; j < b.length; ++j) {
              if (y && y.cause == R + "," + j)
                return;
              var z = b[j], U = z.inside, Y = !!z.lookbehind, B = !!z.greedy, Q = z.alias;
              if (B && !z.pattern.global) {
                var pe = z.pattern.toString().match(/[imsuy]*$/)[0];
                z.pattern = RegExp(z.pattern.source, pe + "g");
              }
              for (var le = z.pattern || z, M = s.next, H = u; M !== r.tail && !(y && H >= y.reach); H += M.value.length, M = M.next) {
                var G = M.value;
                if (r.length > n.length)
                  return;
                if (!(G instanceof c)) {
                  var ee = 1, N;
                  if (B) {
                    if (N = E(le, H, n, Y), !N || N.index >= n.length)
                      break;
                    var J = N.index, he = N.index + N[0].length, V = H;
                    for (V += M.value.length; J >= V; )
                      M = M.next, V += M.value.length;
                    if (V -= M.value.length, H = V, M.value instanceof c)
                      continue;
                    for (var ne = M; ne !== r.tail && (V < he || typeof ne.value == "string"); ne = ne.next)
                      ee++, V += ne.value.length;
                    ee--, G = n.slice(H, V), N.index -= H;
                  } else if (N = E(le, 0, G, Y), !N)
                    continue;
                  var J = N.index, K = N[0], Z = G.slice(0, J), te = G.slice(J + K.length), X = H + G.length;
                  y && X > y.reach && (y.reach = X);
                  var ae = M.prev;
                  Z && (ae = k(r, ae, Z), H += Z.length), C(r, ae, ee);
                  var me = new c(R, U ? a.tokenize(K, U) : K, Q, K);
                  if (M = k(r, ae, me), te && k(r, M, te), ee > 1) {
                    var ue = {
                      cause: R + "," + j,
                      reach: X
                    };
                    p(n, r, o, M.prev, H, ue), y && ue.reach > y.reach && (y.reach = ue.reach);
                  }
                }
              }
            }
          }
      }
      function f() {
        var n = { value: null, prev: null, next: null }, r = { value: null, prev: n, next: null };
        n.next = r, this.head = n, this.tail = r, this.length = 0;
      }
      function k(n, r, o) {
        var s = r.next, u = { value: o, prev: r, next: s };
        return r.next = u, s.prev = u, n.length++, u;
      }
      function C(n, r, o) {
        for (var s = r.next, u = 0; u < o && s !== n.tail; u++)
          s = s.next;
        r.next = s, s.prev = r, n.length -= u;
      }
      function P(n) {
        for (var r = [], o = n.head.next; o !== n.tail; )
          r.push(o.value), o = o.next;
        return r;
      }
      if (!m.document)
        return m.addEventListener && (a.disableWorkerMessageHandler || m.addEventListener("message", function(n) {
          var r = JSON.parse(n.data), o = r.language, s = r.code, u = r.immediateClose;
          m.postMessage(a.highlight(s, a.languages[o], o)), u && m.close();
        }, !1)), a;
      var S = a.util.currentScript();
      S && (a.filename = S.src, S.hasAttribute("data-manual") && (a.manual = !0));
      function _() {
        a.manual || a.highlightAll();
      }
      if (!a.manual) {
        var A = document.readyState;
        A === "loading" || A === "interactive" && S && S.defer ? document.addEventListener("DOMContentLoaded", _) : window.requestAnimationFrame ? window.requestAnimationFrame(_) : window.setTimeout(_, 16);
      }
      return a;
    })(g);
    l.exports && (l.exports = t), typeof We < "u" && (We.Prism = t), t.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: !0
                }
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, t.languages.markup.tag.inside["attr-value"].inside.entity = t.languages.markup.entity, t.languages.markup.doctype.inside["internal-subset"].inside = t.languages.markup, t.hooks.add("wrap", function(m) {
      m.type === "entity" && (m.attributes.title = m.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(t.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function(v, x) {
        var h = {};
        h["language-" + x] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: t.languages[x]
        }, h.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var a = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: h
          }
        };
        a["language-" + x] = {
          pattern: /[\s\S]+/,
          inside: t.languages[x]
        };
        var c = {};
        c[v] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return v;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: a
        }, t.languages.insertBefore("markup", "cdata", c);
      }
    }), Object.defineProperty(t.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(m, v) {
        t.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + m + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [v, "language-" + v],
                  inside: t.languages[v]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    }), t.languages.html = t.languages.markup, t.languages.mathml = t.languages.markup, t.languages.svg = t.languages.markup, t.languages.xml = t.languages.extend("markup", {}), t.languages.ssml = t.languages.xml, t.languages.atom = t.languages.xml, t.languages.rss = t.languages.xml, (function(m) {
      var v = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      m.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + v.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + v.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + v.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + v.source + ")*(?=\\s*\\{)"),
          lookbehind: !0
        },
        string: {
          pattern: v,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, m.languages.css.atrule.inside.rest = m.languages.css;
      var x = m.languages.markup;
      x && (x.tag.addInlined("style", "css"), x.tag.addAttribute("style", "css"));
    })(t), t.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    }, t.languages.javascript = t.languages.extend("clike", {
      "class-name": [
        t.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), t.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, t.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: t.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: t.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), t.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: t.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), t.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), t.languages.markup && (t.languages.markup.tag.addInlined("script", "javascript"), t.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), t.languages.js = t.languages.javascript, (function() {
      if (typeof t > "u" || typeof document > "u")
        return;
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
      var m = "Loading…", v = function(S, _) {
        return "✖ Error " + S + " while fetching file: " + _;
      }, x = "✖ Error: File does not exist or is empty", h = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, a = "data-src-status", c = "loading", E = "loaded", p = "failed", f = "pre[data-src]:not([" + a + '="' + E + '"]):not([' + a + '="' + c + '"])';
      function k(S, _, A) {
        var n = new XMLHttpRequest();
        n.open("GET", S, !0), n.onreadystatechange = function() {
          n.readyState == 4 && (n.status < 400 && n.responseText ? _(n.responseText) : n.status >= 400 ? A(v(n.status, n.statusText)) : A(x));
        }, n.send(null);
      }
      function C(S) {
        var _ = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S || "");
        if (_) {
          var A = Number(_[1]), n = _[2], r = _[3];
          return n ? r ? [A, Number(r)] : [A, void 0] : [A, A];
        }
      }
      t.hooks.add("before-highlightall", function(S) {
        S.selector += ", " + f;
      }), t.hooks.add("before-sanity-check", function(S) {
        var _ = (
          /** @type {HTMLPreElement} */
          S.element
        );
        if (_.matches(f)) {
          S.code = "", _.setAttribute(a, c);
          var A = _.appendChild(document.createElement("CODE"));
          A.textContent = m;
          var n = _.getAttribute("data-src"), r = S.language;
          if (r === "none") {
            var o = (/\.(\w+)$/.exec(n) || [, "none"])[1];
            r = h[o] || o;
          }
          t.util.setLanguage(A, r), t.util.setLanguage(_, r);
          var s = t.plugins.autoloader;
          s && s.loadLanguages(r), k(
            n,
            function(u) {
              _.setAttribute(a, E);
              var y = C(_.getAttribute("data-range"));
              if (y) {
                var R = u.split(/\r\n?|\n/g), b = y[0], j = y[1] == null ? R.length : y[1];
                b < 0 && (b += R.length), b = Math.max(0, Math.min(b - 1, R.length)), j < 0 && (j += R.length), j = Math.max(0, Math.min(j, R.length)), u = R.slice(b, j).join(`
`), _.hasAttribute("data-start") || _.setAttribute("data-start", String(b + 1));
              }
              A.textContent = u, t.highlightElement(A);
            },
            function(u) {
              _.setAttribute(a, p), A.textContent = u;
            }
          );
        }
      }), t.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function(_) {
          for (var A = (_ || document).querySelectorAll(f), n = 0, r; r = A[n++]; )
            t.highlightElement(r);
        }
      };
      var P = !1;
      t.fileHighlight = function() {
        P || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), P = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(_e)), _e.exports;
}
var Tn = Cn();
const $n = /* @__PURE__ */ _n(Tn);
(function(l) {
  var g = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function t(p) {
    return p = p.replace(/<inner>/g, function() {
      return g;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + p + ")");
  }
  var m = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, v = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return m;
  }), x = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  l.languages.markdown = l.languages.extend("markup", {}), l.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: l.languages.yaml
        }
      }
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + v + x + "(?:" + v + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + v + x + ")(?:" + v + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(m),
              inside: l.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + v + ")" + x + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + v + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(m),
              alias: "important",
              inside: l.languages.markdown
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
      pattern: t(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
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
      pattern: t(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
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
      pattern: t(/(~~?)(?:(?!~)<inner>)+\2/.source),
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
      pattern: t(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
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
  }), ["url", "bold", "italic", "strike"].forEach(function(p) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(f) {
      p !== f && (l.languages.markdown[p].inside.content.inside[f] = l.languages.markdown[f]);
    });
  }), l.hooks.add("after-tokenize", function(p) {
    if (p.language !== "markdown" && p.language !== "md")
      return;
    function f(k) {
      if (!(!k || typeof k == "string"))
        for (var C = 0, P = k.length; C < P; C++) {
          var S = k[C];
          if (S.type !== "code") {
            f(S.content);
            continue;
          }
          var _ = S.content[1], A = S.content[3];
          if (_ && A && _.type === "code-language" && A.type === "code-block" && typeof _.content == "string") {
            var n = _.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            n = (/[a-z][\w-]*/i.exec(n) || [""])[0].toLowerCase();
            var r = "language-" + n;
            A.alias ? typeof A.alias == "string" ? A.alias = [A.alias, r] : A.alias.push(r) : A.alias = [r];
          }
        }
    }
    f(p.tokens);
  }), l.hooks.add("wrap", function(p) {
    if (p.type === "code-block") {
      for (var f = "", k = 0, C = p.classes.length; k < C; k++) {
        var P = p.classes[k], S = /language-(.+)/.exec(P);
        if (S) {
          f = S[1];
          break;
        }
      }
      var _ = l.languages[f];
      if (_)
        p.content = l.highlight(E(p.content), _, f);
      else if (f && f !== "none" && l.plugins.autoloader) {
        var A = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        p.attributes.id = A, l.plugins.autoloader.loadLanguages(f, function() {
          var n = document.getElementById(A);
          n && (n.innerHTML = l.highlight(n.textContent, l.languages[f], f));
        });
      }
    }
  });
  var h = RegExp(l.languages.markup.tag.pattern.source, "gi"), a = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, c = String.fromCodePoint || String.fromCharCode;
  function E(p) {
    var f = p.replace(h, "");
    return f = f.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(k, C) {
      if (C = C.toLowerCase(), C[0] === "#") {
        var P;
        return C[1] === "x" ? P = parseInt(C.slice(2), 16) : P = Number(C.slice(1)), c(P);
      } else {
        var S = a[C];
        return S || k;
      }
    }), f;
  }
  l.languages.md = l.languages.markdown;
})(Prism);
var Be = {}, Ve;
function On() {
  return Ve || (Ve = 1, (function() {
    if (typeof Prism > "u" || typeof document > "u")
      return;
    var l = "line-numbers", g = /\n(?!$)/g, t = Prism.plugins.lineNumbers = {
      /**
       * Get node for provided line number
       *
       * @param {Element} element pre element
       * @param {number} number line number
       * @returns {Element|undefined}
       */
      getLine: function(h, a) {
        if (!(h.tagName !== "PRE" || !h.classList.contains(l))) {
          var c = h.querySelector(".line-numbers-rows");
          if (c) {
            var E = parseInt(h.getAttribute("data-start"), 10) || 1, p = E + (c.children.length - 1);
            a < E && (a = E), a > p && (a = p);
            var f = a - E;
            return c.children[f];
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
      resize: function(h) {
        m([h]);
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
    function m(h) {
      if (h = h.filter(function(c) {
        var E = v(c), p = E["white-space"];
        return p === "pre-wrap" || p === "pre-line";
      }), h.length != 0) {
        var a = h.map(function(c) {
          var E = c.querySelector("code"), p = c.querySelector(".line-numbers-rows");
          if (!(!E || !p)) {
            var f = c.querySelector(".line-numbers-sizer"), k = E.textContent.split(g);
            f || (f = document.createElement("span"), f.className = "line-numbers-sizer", E.appendChild(f)), f.innerHTML = "0", f.style.display = "block";
            var C = f.getBoundingClientRect().height;
            return f.innerHTML = "", {
              element: c,
              lines: k,
              lineHeights: [],
              oneLinerHeight: C,
              sizer: f
            };
          }
        }).filter(Boolean);
        a.forEach(function(c) {
          var E = c.sizer, p = c.lines, f = c.lineHeights, k = c.oneLinerHeight;
          f[p.length - 1] = void 0, p.forEach(function(C, P) {
            if (C && C.length > 1) {
              var S = E.appendChild(document.createElement("span"));
              S.style.display = "block", S.textContent = C;
            } else
              f[P] = k;
          });
        }), a.forEach(function(c) {
          for (var E = c.sizer, p = c.lineHeights, f = 0, k = 0; k < p.length; k++)
            p[k] === void 0 && (p[k] = E.children[f++].getBoundingClientRect().height);
        }), a.forEach(function(c) {
          var E = c.sizer, p = c.element.querySelector(".line-numbers-rows");
          E.style.display = "none", E.innerHTML = "", c.lineHeights.forEach(function(f, k) {
            p.children[k].style.height = f + "px";
          });
        });
      }
    }
    function v(h) {
      return h ? window.getComputedStyle ? getComputedStyle(h) : h.currentStyle || null : null;
    }
    var x = void 0;
    window.addEventListener("resize", function() {
      t.assumeViewportIndependence && x === window.innerWidth || (x = window.innerWidth, m(Array.prototype.slice.call(document.querySelectorAll("pre." + l))));
    }), Prism.hooks.add("complete", function(h) {
      if (h.code) {
        var a = (
          /** @type {Element} */
          h.element
        ), c = (
          /** @type {HTMLElement} */
          a.parentNode
        );
        if (!(!c || !/pre/i.test(c.nodeName)) && !a.querySelector(".line-numbers-rows") && Prism.util.isActive(a, l)) {
          a.classList.remove(l), c.classList.add(l);
          var E = h.code.match(g), p = E ? E.length + 1 : 1, f, k = new Array(p + 1).join("<span></span>");
          f = document.createElement("span"), f.setAttribute("aria-hidden", "true"), f.className = "line-numbers-rows", f.innerHTML = k, c.hasAttribute("data-start") && (c.style.counterReset = "linenumber " + (parseInt(c.getAttribute("data-start"), 10) - 1)), h.element.appendChild(f), m([c]), Prism.hooks.run("line-numbers", h);
        }
      }
    }), Prism.hooks.add("line-numbers", function(h) {
      h.plugins = h.plugins || {}, h.plugins.lineNumbers = !0;
    });
  })()), Be;
}
On();
function Je(l) {
  return l.useTabs ? "	" : l.hasPadding ? " " : "";
}
class jn {
  padding;
  constructor(g) {
    this.padding = Je(g);
  }
  formatCell(g, t, m) {
    const v = m;
    switch (t) {
      case "right":
        return `${this.padding}${g.padStart(v)}${this.padding}`;
      case "center": {
        const x = v - g.length, h = Math.floor(x / 2), a = x - h;
        return `${this.padding}${" ".repeat(h)}${g}${" ".repeat(a)}${this.padding}`;
      }
      default:
        return `${this.padding}${g.padEnd(v)}${this.padding}`;
    }
  }
}
class Pn {
  static indicators = {
    left: (g) => `:${"-".repeat(g - 1)}`,
    right: (g) => `${"-".repeat(g - 1)}:`,
    center: (g) => `:${"-".repeat(g - 2)}:`,
    none: (g) => "-".repeat(g)
  };
  static formatIndicator(g, t) {
    return this.indicators[g](t);
  }
}
class In {
  config;
  cellFormatter;
  adjustedAlignments;
  constructor(g) {
    this.config = g, this.cellFormatter = new jn(g), this.adjustedAlignments = this.getAdjustedAlignments();
  }
  getAdjustedAlignments() {
    return this.config.columnAlignments.length < this.config.columnCount ? [
      ...Array.from(this.config.columnAlignments),
      ...Array(this.config.columnCount - this.config.columnAlignments.length).fill("none")
    ] : Array.from(this.config.columnAlignments);
  }
  formatRow(g) {
    return `|${Array.from({ length: this.config.columnCount }, (m, v) => {
      let x = g[v] ?? "";
      this.config.replaceNewlines && (x = x.replace(/\n/g, "<br>"));
      const h = this.adjustedAlignments[v], a = this.config.columnWidths ? this.config.columnWidths[v] : x.length;
      return this.cellFormatter.formatCell(x, h, a);
    }).join("|")}|`;
  }
  formatAlignmentRow() {
    const g = Je(this.config);
    return `|${Array.from({ length: this.config.columnCount }, (m, v) => {
      const x = this.adjustedAlignments[v], h = this.config.columnWidths ? this.config.columnWidths[v] : 3, a = Pn.formatIndicator(x, h);
      return `${g}${a}${g}`;
    }).join("|")}|`;
  }
}
function Dn(l, g) {
  const t = new Array(g).fill(3);
  return l.forEach((m) => {
    for (let v = 0; v < g; v++) {
      const x = m[v] ?? "";
      t[v] = Math.max(t[v], x.length);
    }
  }), t;
}
function Mn(l) {
  const g = l.inputDataHeader.length, t = l.inputDataBody.map((m) => m.length);
  return Math.max(g, ...t);
}
function zn(l, g, t) {
  return t ? Dn(
    [l.inputDataHeader, ...l.inputDataBody],
    g
  ) : void 0;
}
function Ln(l, g, t = !0, m = !1, v = !1, x = !0) {
  const h = Mn(l), a = zn(l, h, t), c = {
    columnCount: h,
    columnAlignments: g,
    columnWidths: a,
    useTabs: m,
    replaceNewlines: v,
    hasPadding: x
  }, E = new In(c), p = E.formatRow(l.inputDataHeader), f = E.formatAlignmentRow(), k = l.inputDataBody.map((C) => E.formatRow(C)).join(`
`);
  return `${p}
${f}
${k}`.trimEnd();
}
function Nn(l) {
  let g = "", t = l;
  for (; t >= 0; )
    g = String.fromCharCode(t % 26 + 65) + g, t = Math.floor(t / 26) - 1;
  return g;
}
function Wn(l) {
  return Array.from({ length: l }, (g, t) => Nn(t));
}
class ge extends Error {
  constructor(g, t) {
    super(g, t), this.name = "MarkdownTableError", Object.setPrototypeOf(this, ge.prototype);
  }
}
function Hn(l) {
  if (l === null || !Array.isArray(l))
    throw new ge("The 'data' prop must be a two-dimensional array.");
  if (l.length === 0)
    throw new ge("The 'data' array must contain at least one row.");
}
const qn = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`, Un = `
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#282a36}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;
function Yn(l, g) {
  return g ? { inputDataHeader: l[0], inputDataBody: l.slice(1) } : { inputDataHeader: Wn(l[0].length), inputDataBody: l };
}
function Bn(l, g, t, m, v, x, h) {
  try {
    Hn(l);
    const { inputDataHeader: a, inputDataBody: c } = Yn(l, g);
    return Ln(
      { inputDataHeader: a, inputDataBody: c },
      t,
      m,
      v,
      x,
      h
    );
  } catch (a) {
    if (a instanceof ge)
      return `Error: ${a.message}`;
    throw a;
  }
}
function Gn({
  inputData: l = null,
  hasHeader: g = !0,
  columnAlignments: t = [],
  isCompact: m = !1,
  hasTabs: v = !1,
  hasPadding: x = !0,
  convertLineBreaks: h = !1,
  className: a,
  onGenerate: c,
  theme: E = "light",
  preStyle: p,
  topPadding: f = 16,
  minWidth: k,
  showLineNumbers: C = !0
}) {
  const P = wn(null), S = xn(), _ = En(l), [, A] = kn(), n = An(() => Bn(
    _,
    g,
    t,
    !m,
    v,
    h,
    x
  ), [
    _,
    g,
    t,
    m,
    v,
    h,
    x
  ]);
  return Ne(() => {
    c && c(n);
  }, [n, c]), Ne(() => {
    const r = P.current?.querySelector("code");
    r && n && A(() => {
      requestAnimationFrame(() => {
        if ($n.highlightElement(r), !C && P.current) {
          const o = P.current.querySelector(".line-numbers-rows");
          o && o.remove();
        }
      });
    });
  }, [n, A, C]), /* @__PURE__ */ se.jsxs(se.Fragment, { children: [
    /* @__PURE__ */ se.jsxs("style", { children: [
      E === "light" ? qn : Un,
      `
          pre {
            position: relative;
            padding-top: ${f}px !important;
          }
          pre::before {
            position: absolute;
            top: 8px;
            left: 12px;
            color: ${E === "light" ? "#666" : "#999"};
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
    /* @__PURE__ */ se.jsx(
      "div",
      {
        id: S,
        style: {
          position: "relative",
          isolation: "isolate",
          display: "inline-block"
        },
        children: /* @__PURE__ */ se.jsx(
          "pre",
          {
            ref: P,
            className: `${a} language-markdown ${C ? "line-numbers" : ""} ${E === "dark" ? "dark-theme" : ""}`,
            style: {
              width: "fit-content",
              minWidth: k ? `${k}px` : "min-content",
              margin: 0,
              ...p
            },
            children: /* @__PURE__ */ se.jsx("code", { className: "language-markdown", role: "code", children: n })
          }
        )
      }
    )
  ] });
}
export {
  Gn as MarkdownTable,
  ge as MarkdownTableError
};
