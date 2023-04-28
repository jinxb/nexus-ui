import {
  Fragment,
  KeepAlive,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  openBlock,
  popScopeId,
  pushScopeId,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  toDisplayString,
  toHandlers,
  unref,
  useAttrs,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-5RHOTUZN.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@jinxb+nexus-ui@1.3.4/node_modules/@jinxb/nexus-ui/nxui.min.es.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var B = new class {
  constructor(e2, t2) {
    __publicField(this, "_db");
    __publicField(this, "_indexedDB");
    __publicField(this, "dbName");
    __publicField(this, "ver");
    this._db = null, this.dbName = e2 || "nexus-ui", this.ver = t2 || 1, this._indexedDB = "undefined" != typeof window && window.indexedDB;
  }
  open() {
    return new Promise((e2, t2) => {
      if (this._db)
        e2(this._db);
      else {
        if (!this._indexedDB)
          return;
        const t3 = this._indexedDB.open(this.dbName, this.ver);
        t3.onupgradeneeded = () => {
          t3.result.objectStoreNames.contains("table") || t3.result.createObjectStore("table", { autoIncrement: true });
        }, t3.onsuccess = () => {
          this._db = t3.result, e2(t3.result);
        }, t3.onerror = (t4) => {
          e2(t4);
        };
      }
    });
  }
  async set(e2, t2, o2 = "table") {
    const n2 = await this.open();
    return new Promise((a2, l2) => {
      const i2 = n2.transaction([o2], "readwrite").objectStore(o2).put(t2, e2);
      i2.onsuccess = () => {
        a2(i2.result);
      }, i2.onerror = (e3) => {
        l2(e3);
      };
    });
  }
  async get(e2, t2 = "table") {
    const o2 = await this.open();
    return new Promise((n2, a2) => {
      const l2 = o2.transaction([t2]).objectStore(t2).get(e2);
      l2.onsuccess = () => {
        n2(l2.result);
      }, l2.onerror = (e3) => {
        a2(e3);
      };
    });
  }
  async remove(e2, t2 = "table") {
    const o2 = await this.open();
    return new Promise((n2, a2) => {
      const l2 = o2.transaction([t2], "readwrite").objectStore(t2).delete(e2);
      l2.onsuccess = function() {
        n2();
      }, l2.onerror = (e3) => {
        a2(e3);
      };
    });
  }
  async clear(e2 = "table") {
    const t2 = await this.open();
    return new Promise((o2, n2) => {
      const a2 = t2.transaction([e2], "readwrite").objectStore(e2).clear();
      a2.onsuccess = function() {
        o2();
      }, a2.onerror = (e3) => {
        n2(e3);
      };
    });
  }
}();
var Y = { class: "btn-list" };
var V = { class: "form-search" };
var z = { key: 0, class: "label" };
var X = { class: "left" };
var F = { class: "right" };
var R = defineComponent({ name: "NxFilter", props: { btnList: { type: Array, default: () => [] }, screenData: { type: Array, default: () => [] }, page: { type: Object, default: () => {
} }, showBorder: { type: Boolean, default: false }, ignoredFields: { type: Array, default: () => ["current", "size"] } }, setup(e2, { emit: C2 }) {
  const S2 = e2, x2 = reactive({ page: {} });
  watchEffect(() => {
    x2.page = S2.page || {};
  });
  const _2 = (e3, t2) => {
    C2(`update:page[${t2}]`, e3), C2("filterChange");
  }, E2 = () => {
    for (const e3 in x2.page)
      S2.ignoredFields.includes(e3) || (x2.page[e3] = "");
    C2("filterChange");
  }, D2 = () => {
    C2("filterChange");
  };
  return (t2, o2) => {
    const C3 = resolveComponent("el-button"), k2 = resolveComponent("el-option"), T2 = resolveComponent("el-select"), O2 = resolveComponent("el-date-picker"), N2 = resolveComponent("el-input");
    return openBlock(), createElementBlock("div", { class: normalizeClass(["nx-filter", { "set-border": e2.showBorder }]) }, [createBaseVNode("div", Y, [(openBlock(true), createElementBlock(Fragment, null, renderList(S2.btnList, (e3, t3) => withDirectives((openBlock(), createBlock(C3, mergeProps({ key: t3, size: e3.size || "small", disabled: e3.disabled, type: e3.type || "primary" }, e3.options, { onClick: (t4) => e3.cb() }), { default: withCtx(() => [createTextVNode(toDisplayString(e3.name), 1)]), _: 2 }, 1040, ["size", "disabled", "type", "onClick"])), [[vShow, e3.show]])), 128)), renderSlot(t2.$slots, "funBtn", {}, void 0, true)]), createBaseVNode("div", V, [(openBlock(true), createElementBlock(Fragment, null, renderList(S2.screenData, (e3, t3) => (openBlock(), createElementBlock("div", { key: t3, class: "form-block" }, [createBaseVNode("div", { class: "form-block-label", style: normalizeStyle({ width: (e3.width || 130) + "px" }) }, [e3.label ? (openBlock(), createElementBlock("span", z, toDisplayString(e3.label), 1)) : createCommentVNode("", true)], 4), "select" === e3.type ? (openBlock(), createBlock(T2, mergeProps({ key: 0, style: { width: (e3.width || 240) + "px" } }, e3, { clearable: e3.clearable, onChange: (t4) => _2(t4, e3.key), modelValue: x2.page[e3.key], "onUpdate:modelValue": (t4) => x2.page[e3.key] = t4, placeholder: e3.placeholder || "请选择" }), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.options, (e4) => (openBlock(), createBlock(k2, mergeProps({ key: e4.value }, e4), null, 16))), 128))]), _: 2 }, 1040, ["style", "clearable", "onChange", "modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true), "date" === e3.type ? (openBlock(), createBlock(O2, mergeProps({ key: 1, modelValue: x2.page[e3.key], "onUpdate:modelValue": (t4) => x2.page[e3.key] = t4 }, e3, { type: "daterange", style: { width: (e3.width || 240) + "px" }, "range-separator": "至", "start-placeholder": "开始日期", "end-placeholder": "结束日期", "value-format": "YYYY-MM-DD", onChange: (t4) => _2(t4, e3.key) }), null, 16, ["modelValue", "onUpdate:modelValue", "style", "onChange"])) : createCommentVNode("", true), "input" === e3.type ? (openBlock(), createBlock(N2, { key: 2, style: normalizeStyle({ width: (e3.width || 240) + "px" }), onChange: (t4) => _2(t4, e3.key), clearable: "", modelValue: x2.page[e3.key], "onUpdate:modelValue": (t4) => x2.page[e3.key] = t4, modelModifiers: { trim: true }, placeholder: e3.placeholder || "请输入" }, null, 8, ["style", "onChange", "modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true)]))), 128)), renderSlot(t2.$slots, "other", {}, void 0, true)]), createBaseVNode("div", { class: "search-btn", style: normalizeStyle({ "margin-left": `calc(${x2.page.search_left_width || "130px"}` }) }, [createBaseVNode("div", X, [renderSlot(t2.$slots, "search_left", {}, void 0, true), createVNode(C3, { class: "btn", type: "primary", size: "mini", plain: "", onClick: E2 }, { default: withCtx(() => [createTextVNode("清空")]), _: 1 }), createVNode(C3, { class: "btn", type: "primary", size: "mini", onClick: D2 }, { default: withCtx(() => [createTextVNode("查询")]), _: 1 })]), createBaseVNode("div", F, [renderSlot(t2.$slots, "search_right", {}, void 0, true)])], 4)], 2);
  };
} });
var j = (e2, t2) => {
  const o2 = e2.__vccOpts || e2;
  for (const [e3, n2] of t2)
    o2[e3] = n2;
  return o2;
};
var L = j(R, [["__scopeId", "data-v-c6a4f965"]]);
L.name = "NxFilter", L.install = function(e2) {
  e2.component(L.name, L);
};
var U = { class: "nx-tabs" };
var W = defineComponent({ name: "NxTabs", props: { data: { type: Array, default: () => [], required: true }, initEmit: { type: Boolean, default: false }, tabType: { type: String, default: "" } }, emits: ["change"], setup(e2, { emit: t2 }) {
  var _a;
  const o2 = e2;
  let i2 = ref("");
  o2 && (o2 == null ? void 0 : o2.data.length) && (i2 = ref((_a = o2 == null ? void 0 : o2.data[0]) == null ? void 0 : _a.name));
  const r2 = (...e3) => {
    t2("change", i2.value, e3);
  };
  return o2.initEmit && i2.value && r2(o2 == null ? void 0 : o2.data[0]), (t3, o3) => {
    const d2 = resolveComponent("el-tab-pane"), h2 = resolveComponent("el-tabs");
    return openBlock(), createElementBlock("div", U, [createVNode(h2, { modelValue: unref(i2), "onUpdate:modelValue": o3[0] || (o3[0] = (e3) => isRef(i2) ? i2.value = e3 : i2 = e3), type: e2.tabType, onTabClick: r2 }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.data, (e3, t4) => (openBlock(), createElementBlock(Fragment, null, [false !== e3.visible ? (openBlock(), createBlock(d2, { key: t4, disabled: e3.disabled, label: e3.label, name: e3.name }, null, 8, ["disabled", "label", "name"])) : createCommentVNode("", true)], 64))), 256))]), _: 1 }, 8, ["modelValue", "type"])]);
  };
} });
var H = j(W, [["__scopeId", "data-v-57af5f6f"]]);
function $(e2, t2) {
  var o2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), o2.push.apply(o2, n2);
  }
  return o2;
}
function K(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var o2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? $(Object(o2), true).forEach(function(t3) {
      G(e2, t3, o2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(o2)) : $(Object(o2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(o2, t3));
    });
  }
  return e2;
}
function q(e2) {
  return q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, q(e2);
}
function G(e2, t2, o2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: o2, enumerable: true, configurable: true, writable: true }) : e2[t2] = o2, e2;
}
function Z() {
  return Z = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var o2 = arguments[t2];
      for (var n2 in o2)
        Object.prototype.hasOwnProperty.call(o2, n2) && (e2[n2] = o2[n2]);
    }
    return e2;
  }, Z.apply(this, arguments);
}
function Q(e2, t2) {
  if (null == e2)
    return {};
  var o2, n2, a2 = function(e3, t3) {
    if (null == e3)
      return {};
    var o3, n3, a3 = {}, l3 = Object.keys(e3);
    for (n3 = 0; n3 < l3.length; n3++)
      o3 = l3[n3], t3.indexOf(o3) >= 0 || (a3[o3] = e3[o3]);
    return a3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var l2 = Object.getOwnPropertySymbols(e2);
    for (n2 = 0; n2 < l2.length; n2++)
      o2 = l2[n2], t2.indexOf(o2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, o2) && (a2[o2] = e2[o2]);
  }
  return a2;
}
H.name = "NxTabs", H.install = function(e2) {
  e2.component(H.name, H);
};
function J(e2) {
  if ("undefined" != typeof window && window.navigator)
    return !!navigator.userAgent.match(e2);
}
var ee = J(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var te = J(/Edge/i);
var oe = J(/firefox/i);
var ne = J(/safari/i) && !J(/chrome/i) && !J(/android/i);
var ae = J(/iP(ad|od|hone)/i);
var le = J(/chrome/i) && J(/android/i);
var ie = { capture: false, passive: false };
function re(e2, t2, o2) {
  e2.addEventListener(t2, o2, !ee && ie);
}
function se(e2, t2, o2) {
  e2.removeEventListener(t2, o2, !ee && ie);
}
function ce(e2, t2) {
  if (t2) {
    if (">" === t2[0] && (t2 = t2.substring(1)), e2)
      try {
        if (e2.matches)
          return e2.matches(t2);
        if (e2.msMatchesSelector)
          return e2.msMatchesSelector(t2);
        if (e2.webkitMatchesSelector)
          return e2.webkitMatchesSelector(t2);
      } catch (e3) {
        return false;
      }
    return false;
  }
}
function de(e2) {
  return e2.host && e2 !== document && e2.host.nodeType ? e2.host : e2.parentNode;
}
function ue(e2, t2, o2, n2) {
  if (e2) {
    o2 = o2 || document;
    do {
      if (null != t2 && (">" === t2[0] ? e2.parentNode === o2 && ce(e2, t2) : ce(e2, t2)) || n2 && e2 === o2)
        return e2;
      if (e2 === o2)
        break;
    } while (e2 = de(e2));
  }
  return null;
}
var he;
var pe = /\s+/g;
function fe(e2, t2, o2) {
  if (e2 && t2)
    if (e2.classList)
      e2.classList[o2 ? "add" : "remove"](t2);
    else {
      var n2 = (" " + e2.className + " ").replace(pe, " ").replace(" " + t2 + " ", " ");
      e2.className = (n2 + (o2 ? " " + t2 : "")).replace(pe, " ");
    }
}
function ge(e2, t2, o2) {
  var n2 = e2 && e2.style;
  if (n2) {
    if (void 0 === o2)
      return document.defaultView && document.defaultView.getComputedStyle ? o2 = document.defaultView.getComputedStyle(e2, "") : e2.currentStyle && (o2 = e2.currentStyle), void 0 === t2 ? o2 : o2[t2];
    t2 in n2 || -1 !== t2.indexOf("webkit") || (t2 = "-webkit-" + t2), n2[t2] = o2 + ("string" == typeof o2 ? "" : "px");
  }
}
function me(e2, t2) {
  var o2 = "";
  if ("string" == typeof e2)
    o2 = e2;
  else
    do {
      var n2 = ge(e2, "transform");
      n2 && "none" !== n2 && (o2 = n2 + " " + o2);
    } while (!t2 && (e2 = e2.parentNode));
  var a2 = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return a2 && new a2(o2);
}
function ve(e2, t2, o2) {
  if (e2) {
    var n2 = e2.getElementsByTagName(t2), a2 = 0, l2 = n2.length;
    if (o2)
      for (; a2 < l2; a2++)
        o2(n2[a2], a2);
    return n2;
  }
  return [];
}
function be() {
  var e2 = document.scrollingElement;
  return e2 || document.documentElement;
}
function ye(e2, t2, o2, n2, a2) {
  if (e2.getBoundingClientRect || e2 === window) {
    var l2, i2, r2, s2, c2, d2, u2;
    if (e2 !== window && e2.parentNode && e2 !== be() ? (i2 = (l2 = e2.getBoundingClientRect()).top, r2 = l2.left, s2 = l2.bottom, c2 = l2.right, d2 = l2.height, u2 = l2.width) : (i2 = 0, r2 = 0, s2 = window.innerHeight, c2 = window.innerWidth, d2 = window.innerHeight, u2 = window.innerWidth), (t2 || o2) && e2 !== window && (a2 = a2 || e2.parentNode, !ee))
      do {
        if (a2 && a2.getBoundingClientRect && ("none" !== ge(a2, "transform") || o2 && "static" !== ge(a2, "position"))) {
          var h2 = a2.getBoundingClientRect();
          i2 -= h2.top + parseInt(ge(a2, "border-top-width")), r2 -= h2.left + parseInt(ge(a2, "border-left-width")), s2 = i2 + l2.height, c2 = r2 + l2.width;
          break;
        }
      } while (a2 = a2.parentNode);
    if (n2 && e2 !== window) {
      var p2 = me(a2 || e2), f2 = p2 && p2.a, g2 = p2 && p2.d;
      p2 && (s2 = (i2 /= g2) + (d2 /= g2), c2 = (r2 /= f2) + (u2 /= f2));
    }
    return { top: i2, left: r2, bottom: s2, right: c2, width: u2, height: d2 };
  }
}
function we(e2, t2, o2) {
  for (var n2 = Ee(e2, true), a2 = ye(e2)[t2]; n2; ) {
    var l2 = ye(n2)[o2];
    if (!("top" === o2 || "left" === o2 ? a2 >= l2 : a2 <= l2))
      return n2;
    if (n2 === be())
      break;
    n2 = Ee(n2, false);
  }
  return false;
}
function Ce(e2, t2, o2, n2) {
  for (var a2 = 0, l2 = 0, i2 = e2.children; l2 < i2.length; ) {
    if ("none" !== i2[l2].style.display && i2[l2] !== Tt.ghost && (n2 || i2[l2] !== Tt.dragged) && ue(i2[l2], o2.draggable, e2, false)) {
      if (a2 === t2)
        return i2[l2];
      a2++;
    }
    l2++;
  }
  return null;
}
function Se(e2, t2) {
  for (var o2 = e2.lastElementChild; o2 && (o2 === Tt.ghost || "none" === ge(o2, "display") || t2 && !ce(o2, t2)); )
    o2 = o2.previousElementSibling;
  return o2 || null;
}
function xe(e2, t2) {
  var o2 = 0;
  if (!e2 || !e2.parentNode)
    return -1;
  for (; e2 = e2.previousElementSibling; )
    "TEMPLATE" === e2.nodeName.toUpperCase() || e2 === Tt.clone || t2 && !ce(e2, t2) || o2++;
  return o2;
}
function _e(e2) {
  var t2 = 0, o2 = 0, n2 = be();
  if (e2)
    do {
      var a2 = me(e2), l2 = a2.a, i2 = a2.d;
      t2 += e2.scrollLeft * l2, o2 += e2.scrollTop * i2;
    } while (e2 !== n2 && (e2 = e2.parentNode));
  return [t2, o2];
}
function Ee(e2, t2) {
  if (!e2 || !e2.getBoundingClientRect)
    return be();
  var o2 = e2, n2 = false;
  do {
    if (o2.clientWidth < o2.scrollWidth || o2.clientHeight < o2.scrollHeight) {
      var a2 = ge(o2);
      if (o2.clientWidth < o2.scrollWidth && ("auto" == a2.overflowX || "scroll" == a2.overflowX) || o2.clientHeight < o2.scrollHeight && ("auto" == a2.overflowY || "scroll" == a2.overflowY)) {
        if (!o2.getBoundingClientRect || o2 === document.body)
          return be();
        if (n2 || t2)
          return o2;
        n2 = true;
      }
    }
  } while (o2 = o2.parentNode);
  return be();
}
function De(e2, t2) {
  return Math.round(e2.top) === Math.round(t2.top) && Math.round(e2.left) === Math.round(t2.left) && Math.round(e2.height) === Math.round(t2.height) && Math.round(e2.width) === Math.round(t2.width);
}
function ke(e2, t2) {
  return function() {
    if (!he) {
      var o2 = arguments;
      1 === o2.length ? e2.call(this, o2[0]) : e2.apply(this, o2), he = setTimeout(function() {
        he = void 0;
      }, t2);
    }
  };
}
function Te(e2, t2, o2) {
  e2.scrollLeft += t2, e2.scrollTop += o2;
}
function Oe(e2) {
  var t2 = window.Polymer, o2 = window.jQuery || window.Zepto;
  return t2 && t2.dom ? t2.dom(e2).cloneNode(true) : o2 ? o2(e2).clone(true)[0] : e2.cloneNode(true);
}
var Ne = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ae() {
  var e2, t2 = [];
  return { captureAnimationState: function() {
    (t2 = [], this.options.animation) && [].slice.call(this.el.children).forEach(function(e3) {
      if ("none" !== ge(e3, "display") && e3 !== Tt.ghost) {
        t2.push({ target: e3, rect: ye(e3) });
        var o2 = K({}, t2[t2.length - 1].rect);
        if (e3.thisAnimationDuration) {
          var n2 = me(e3, true);
          n2 && (o2.top -= n2.f, o2.left -= n2.e);
        }
        e3.fromRect = o2;
      }
    });
  }, addAnimationState: function(e3) {
    t2.push(e3);
  }, removeAnimationState: function(e3) {
    t2.splice(function(e4, t3) {
      for (var o2 in e4)
        if (e4.hasOwnProperty(o2)) {
          for (var n2 in t3)
            if (t3.hasOwnProperty(n2) && t3[n2] === e4[o2][n2])
              return Number(o2);
        }
      return -1;
    }(t2, { target: e3 }), 1);
  }, animateAll: function(o2) {
    var n2 = this;
    if (!this.options.animation)
      return clearTimeout(e2), void ("function" == typeof o2 && o2());
    var a2 = false, l2 = 0;
    t2.forEach(function(e3) {
      var t3 = 0, o3 = e3.target, i2 = o3.fromRect, r2 = ye(o3), s2 = o3.prevFromRect, c2 = o3.prevToRect, d2 = e3.rect, u2 = me(o3, true);
      u2 && (r2.top -= u2.f, r2.left -= u2.e), o3.toRect = r2, o3.thisAnimationDuration && De(s2, r2) && !De(i2, r2) && (d2.top - r2.top) / (d2.left - r2.left) == (i2.top - r2.top) / (i2.left - r2.left) && (t3 = function(e4, t4, o4, n3) {
        return Math.sqrt(Math.pow(t4.top - e4.top, 2) + Math.pow(t4.left - e4.left, 2)) / Math.sqrt(Math.pow(t4.top - o4.top, 2) + Math.pow(t4.left - o4.left, 2)) * n3.animation;
      }(d2, s2, c2, n2.options)), De(r2, i2) || (o3.prevFromRect = i2, o3.prevToRect = r2, t3 || (t3 = n2.options.animation), n2.animate(o3, d2, r2, t3)), t3 && (a2 = true, l2 = Math.max(l2, t3), clearTimeout(o3.animationResetTimer), o3.animationResetTimer = setTimeout(function() {
        o3.animationTime = 0, o3.prevFromRect = null, o3.fromRect = null, o3.prevToRect = null, o3.thisAnimationDuration = null;
      }, t3), o3.thisAnimationDuration = t3);
    }), clearTimeout(e2), a2 ? e2 = setTimeout(function() {
      "function" == typeof o2 && o2();
    }, l2) : "function" == typeof o2 && o2(), t2 = [];
  }, animate: function(e3, t3, o2, n2) {
    if (n2) {
      ge(e3, "transition", ""), ge(e3, "transform", "");
      var a2 = me(this.el), l2 = a2 && a2.a, i2 = a2 && a2.d, r2 = (t3.left - o2.left) / (l2 || 1), s2 = (t3.top - o2.top) / (i2 || 1);
      e3.animatingX = !!r2, e3.animatingY = !!s2, ge(e3, "transform", "translate3d(" + r2 + "px," + s2 + "px,0)"), this.forRepaintDummy = function(e4) {
        return e4.offsetWidth;
      }(e3), ge(e3, "transition", "transform " + n2 + "ms" + (this.options.easing ? " " + this.options.easing : "")), ge(e3, "transform", "translate3d(0,0,0)"), "number" == typeof e3.animated && clearTimeout(e3.animated), e3.animated = setTimeout(function() {
        ge(e3, "transition", ""), ge(e3, "transform", ""), e3.animated = false, e3.animatingX = false, e3.animatingY = false;
      }, n2);
    }
  } };
}
var Ie = [];
var Me = { initializeByDefault: true };
var Pe = { mount: function(e2) {
  for (var t2 in Me)
    Me.hasOwnProperty(t2) && !(t2 in e2) && (e2[t2] = Me[t2]);
  Ie.forEach(function(t3) {
    if (t3.pluginName === e2.pluginName)
      throw "Sortable: Cannot mount plugin ".concat(e2.pluginName, " more than once");
  }), Ie.push(e2);
}, pluginEvent: function(e2, t2, o2) {
  var n2 = this;
  this.eventCanceled = false, o2.cancel = function() {
    n2.eventCanceled = true;
  };
  var a2 = e2 + "Global";
  Ie.forEach(function(n3) {
    t2[n3.pluginName] && (t2[n3.pluginName][a2] && t2[n3.pluginName][a2](K({ sortable: t2 }, o2)), t2.options[n3.pluginName] && t2[n3.pluginName][e2] && t2[n3.pluginName][e2](K({ sortable: t2 }, o2)));
  });
}, initializePlugins: function(e2, t2, o2, n2) {
  for (var a2 in Ie.forEach(function(n3) {
    var a3 = n3.pluginName;
    if (e2.options[a3] || n3.initializeByDefault) {
      var l3 = new n3(e2, t2, e2.options);
      l3.sortable = e2, l3.options = e2.options, e2[a3] = l3, Z(o2, l3.defaults);
    }
  }), e2.options)
    if (e2.options.hasOwnProperty(a2)) {
      var l2 = this.modifyOption(e2, a2, e2.options[a2]);
      void 0 !== l2 && (e2.options[a2] = l2);
    }
}, getEventProperties: function(e2, t2) {
  var o2 = {};
  return Ie.forEach(function(n2) {
    "function" == typeof n2.eventProperties && Z(o2, n2.eventProperties.call(t2[n2.pluginName], e2));
  }), o2;
}, modifyOption: function(e2, t2, o2) {
  var n2;
  return Ie.forEach(function(a2) {
    e2[a2.pluginName] && a2.optionListeners && "function" == typeof a2.optionListeners[t2] && (n2 = a2.optionListeners[t2].call(e2[a2.pluginName], o2));
  }), n2;
} };
var Be = ["evt"];
var Ye = function(e2, t2) {
  var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n2 = o2.evt, a2 = Q(o2, Be);
  Pe.pluginEvent.bind(Tt)(e2, t2, K({ dragEl: ze, parentEl: Xe, ghostEl: Fe, rootEl: Re, nextEl: je, lastDownEl: Le, cloneEl: Ue, cloneHidden: We, dragStarted: at, putSortable: Ze, activeSortable: Tt.active, originalEvent: n2, oldIndex: He, oldDraggableIndex: Ke, newIndex: $e, newDraggableIndex: qe, hideGhostForTarget: _t, unhideGhostForTarget: Et, cloneNowHidden: function() {
    We = true;
  }, cloneNowShown: function() {
    We = false;
  }, dispatchSortableEvent: function(e3) {
    Ve({ sortable: t2, name: e3, originalEvent: n2 });
  } }, a2));
};
function Ve(e2) {
  !function(e3) {
    var t2 = e3.sortable, o2 = e3.rootEl, n2 = e3.name, a2 = e3.targetEl, l2 = e3.cloneEl, i2 = e3.toEl, r2 = e3.fromEl, s2 = e3.oldIndex, c2 = e3.newIndex, d2 = e3.oldDraggableIndex, u2 = e3.newDraggableIndex, h2 = e3.originalEvent, p2 = e3.putSortable, f2 = e3.extraEventProperties;
    if (t2 = t2 || o2 && o2[Ne]) {
      var g2, m2 = t2.options, v2 = "on" + n2.charAt(0).toUpperCase() + n2.substr(1);
      !window.CustomEvent || ee || te ? (g2 = document.createEvent("Event")).initEvent(n2, true, true) : g2 = new CustomEvent(n2, { bubbles: true, cancelable: true }), g2.to = i2 || o2, g2.from = r2 || o2, g2.item = a2 || o2, g2.clone = l2, g2.oldIndex = s2, g2.newIndex = c2, g2.oldDraggableIndex = d2, g2.newDraggableIndex = u2, g2.originalEvent = h2, g2.pullMode = p2 ? p2.lastPutMode : void 0;
      var b2 = K(K({}, f2), Pe.getEventProperties(n2, t2));
      for (var y2 in b2)
        g2[y2] = b2[y2];
      o2 && o2.dispatchEvent(g2), m2[v2] && m2[v2].call(t2, g2);
    }
  }(K({ putSortable: Ze, cloneEl: Ue, targetEl: ze, rootEl: Re, oldIndex: He, oldDraggableIndex: Ke, newIndex: $e, newDraggableIndex: qe }, e2));
}
var ze;
var Xe;
var Fe;
var Re;
var je;
var Le;
var Ue;
var We;
var He;
var $e;
var Ke;
var qe;
var Ge;
var Ze;
var Qe;
var Je;
var et;
var tt;
var ot;
var nt;
var at;
var lt;
var it;
var rt;
var st;
var ct = false;
var dt = false;
var ut = [];
var ht = false;
var pt = false;
var ft = [];
var gt = false;
var mt = [];
var vt = "undefined" != typeof document;
var bt = ae;
var yt = te || ee ? "cssFloat" : "float";
var wt = vt && !le && !ae && "draggable" in document.createElement("div");
var Ct = function() {
  if (vt) {
    if (ee)
      return false;
    var e2 = document.createElement("x");
    return e2.style.cssText = "pointer-events:auto", "auto" === e2.style.pointerEvents;
  }
}();
var St = function(e2, t2) {
  var o2 = ge(e2), n2 = parseInt(o2.width) - parseInt(o2.paddingLeft) - parseInt(o2.paddingRight) - parseInt(o2.borderLeftWidth) - parseInt(o2.borderRightWidth), a2 = Ce(e2, 0, t2), l2 = Ce(e2, 1, t2), i2 = a2 && ge(a2), r2 = l2 && ge(l2), s2 = i2 && parseInt(i2.marginLeft) + parseInt(i2.marginRight) + ye(a2).width, c2 = r2 && parseInt(r2.marginLeft) + parseInt(r2.marginRight) + ye(l2).width;
  if ("flex" === o2.display)
    return "column" === o2.flexDirection || "column-reverse" === o2.flexDirection ? "vertical" : "horizontal";
  if ("grid" === o2.display)
    return o2.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (a2 && i2.float && "none" !== i2.float) {
    var d2 = "left" === i2.float ? "left" : "right";
    return !l2 || "both" !== r2.clear && r2.clear !== d2 ? "horizontal" : "vertical";
  }
  return a2 && ("block" === i2.display || "flex" === i2.display || "table" === i2.display || "grid" === i2.display || s2 >= n2 && "none" === o2[yt] || l2 && "none" === o2[yt] && s2 + c2 > n2) ? "vertical" : "horizontal";
};
var xt = function(e2) {
  function t2(e3, o3) {
    return function(n3, a2, l2, i2) {
      var r2 = n3.options.group.name && a2.options.group.name && n3.options.group.name === a2.options.group.name;
      if (null == e3 && (o3 || r2))
        return true;
      if (null == e3 || false === e3)
        return false;
      if (o3 && "clone" === e3)
        return e3;
      if ("function" == typeof e3)
        return t2(e3(n3, a2, l2, i2), o3)(n3, a2, l2, i2);
      var s2 = (o3 ? n3 : a2).options.group.name;
      return true === e3 || "string" == typeof e3 && e3 === s2 || e3.join && e3.indexOf(s2) > -1;
    };
  }
  var o2 = {}, n2 = e2.group;
  n2 && "object" == q(n2) || (n2 = { name: n2 }), o2.name = n2.name, o2.checkPull = t2(n2.pull, true), o2.checkPut = t2(n2.put), o2.revertClone = n2.revertClone, e2.group = o2;
};
var _t = function() {
  !Ct && Fe && ge(Fe, "display", "none");
};
var Et = function() {
  !Ct && Fe && ge(Fe, "display", "");
};
vt && document.addEventListener("click", function(e2) {
  if (dt)
    return e2.preventDefault(), e2.stopPropagation && e2.stopPropagation(), e2.stopImmediatePropagation && e2.stopImmediatePropagation(), dt = false, false;
}, true);
var Dt = function(e2) {
  if (ze) {
    e2 = e2.touches ? e2.touches[0] : e2;
    var t2 = (a2 = e2.clientX, l2 = e2.clientY, ut.some(function(e3) {
      var t3 = e3[Ne].options.emptyInsertThreshold;
      if (t3 && !Se(e3)) {
        var o3 = ye(e3), n3 = a2 >= o3.left - t3 && a2 <= o3.right + t3, r2 = l2 >= o3.top - t3 && l2 <= o3.bottom + t3;
        return n3 && r2 ? i2 = e3 : void 0;
      }
    }), i2);
    if (t2) {
      var o2 = {};
      for (var n2 in e2)
        e2.hasOwnProperty(n2) && (o2[n2] = e2[n2]);
      o2.target = o2.rootEl = t2, o2.preventDefault = void 0, o2.stopPropagation = void 0, t2[Ne]._onDragOver(o2);
    }
  }
  var a2, l2, i2;
};
var kt = function(e2) {
  ze && ze.parentNode[Ne]._isOutsideThisEl(e2.target);
};
function Tt(e2, t2) {
  if (!e2 || !e2.nodeType || 1 !== e2.nodeType)
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e2));
  this.el = e2, this.options = t2 = Z({}, t2), e2[Ne] = this;
  var o2 = { group: null, sort: true, disabled: false, store: null, handle: null, draggable: /^[uo]l$/i.test(e2.nodeName) ? ">li" : ">*", swapThreshold: 1, invertSwap: false, invertedSwapThreshold: null, removeCloneOnHide: true, direction: function() {
    return St(e2, this.options);
  }, ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: true, animation: 0, easing: null, setData: function(e3, t3) {
    e3.setData("Text", t3.textContent);
  }, dropBubble: false, dragoverBubble: false, dataIdAttr: "data-id", delay: 0, delayOnTouchOnly: false, touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1, forceFallback: false, fallbackClass: "sortable-fallback", fallbackOnBody: false, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 }, supportPointer: false !== Tt.supportPointer && "PointerEvent" in window && !ne, emptyInsertThreshold: 5 };
  for (var n2 in Pe.initializePlugins(this, e2, o2), o2)
    !(n2 in t2) && (t2[n2] = o2[n2]);
  for (var a2 in xt(t2), this)
    "_" === a2.charAt(0) && "function" == typeof this[a2] && (this[a2] = this[a2].bind(this));
  this.nativeDraggable = !t2.forceFallback && wt, this.nativeDraggable && (this.options.touchStartThreshold = 1), t2.supportPointer ? re(e2, "pointerdown", this._onTapStart) : (re(e2, "mousedown", this._onTapStart), re(e2, "touchstart", this._onTapStart)), this.nativeDraggable && (re(e2, "dragover", this), re(e2, "dragenter", this)), ut.push(this.el), t2.store && t2.store.get && this.sort(t2.store.get(this) || []), Z(this, Ae());
}
function Ot(e2, t2, o2, n2, a2, l2, i2, r2) {
  var s2, c2, d2 = e2[Ne], u2 = d2.options.onMove;
  return !window.CustomEvent || ee || te ? (s2 = document.createEvent("Event")).initEvent("move", true, true) : s2 = new CustomEvent("move", { bubbles: true, cancelable: true }), s2.to = t2, s2.from = e2, s2.dragged = o2, s2.draggedRect = n2, s2.related = a2 || t2, s2.relatedRect = l2 || ye(t2), s2.willInsertAfter = r2, s2.originalEvent = i2, e2.dispatchEvent(s2), u2 && (c2 = u2.call(d2, s2, i2)), c2;
}
function Nt(e2) {
  e2.draggable = false;
}
function At() {
  gt = false;
}
function It(e2) {
  for (var t2 = e2.tagName + e2.className + e2.src + e2.href + e2.textContent, o2 = t2.length, n2 = 0; o2--; )
    n2 += t2.charCodeAt(o2);
  return n2.toString(36);
}
function Mt(e2) {
  return setTimeout(e2, 0);
}
function Pt(e2) {
  return clearTimeout(e2);
}
Tt.prototype = { constructor: Tt, _isOutsideThisEl: function(e2) {
  this.el.contains(e2) || e2 === this.el || (lt = null);
}, _getDirection: function(e2, t2) {
  return "function" == typeof this.options.direction ? this.options.direction.call(this, e2, t2, ze) : this.options.direction;
}, _onTapStart: function(e2) {
  if (e2.cancelable) {
    var t2 = this, o2 = this.el, n2 = this.options, a2 = n2.preventOnFilter, l2 = e2.type, i2 = e2.touches && e2.touches[0] || e2.pointerType && "touch" === e2.pointerType && e2, r2 = (i2 || e2).target, s2 = e2.target.shadowRoot && (e2.path && e2.path[0] || e2.composedPath && e2.composedPath()[0]) || r2, c2 = n2.filter;
    if (function(e3) {
      mt.length = 0;
      var t3 = e3.getElementsByTagName("input"), o3 = t3.length;
      for (; o3--; ) {
        var n3 = t3[o3];
        n3.checked && mt.push(n3);
      }
    }(o2), !ze && !(/mousedown|pointerdown/.test(l2) && 0 !== e2.button || n2.disabled) && !s2.isContentEditable && (this.nativeDraggable || !ne || !r2 || "SELECT" !== r2.tagName.toUpperCase()) && !((r2 = ue(r2, n2.draggable, o2, false)) && r2.animated || Le === r2)) {
      if (He = xe(r2), Ke = xe(r2, n2.draggable), "function" == typeof c2) {
        if (c2.call(this, e2, r2, this))
          return Ve({ sortable: t2, rootEl: s2, name: "filter", targetEl: r2, toEl: o2, fromEl: o2 }), Ye("filter", t2, { evt: e2 }), void (a2 && e2.cancelable && e2.preventDefault());
      } else if (c2 && (c2 = c2.split(",").some(function(n3) {
        if (n3 = ue(s2, n3.trim(), o2, false))
          return Ve({ sortable: t2, rootEl: n3, name: "filter", targetEl: r2, fromEl: o2, toEl: o2 }), Ye("filter", t2, { evt: e2 }), true;
      })))
        return void (a2 && e2.cancelable && e2.preventDefault());
      n2.handle && !ue(s2, n2.handle, o2, false) || this._prepareDragStart(e2, i2, r2);
    }
  }
}, _prepareDragStart: function(e2, t2, o2) {
  var n2, a2 = this, l2 = a2.el, i2 = a2.options, r2 = l2.ownerDocument;
  if (o2 && !ze && o2.parentNode === l2) {
    var s2 = ye(o2);
    if (Re = l2, Xe = (ze = o2).parentNode, je = ze.nextSibling, Le = o2, Ge = i2.group, Tt.dragged = ze, Qe = { target: ze, clientX: (t2 || e2).clientX, clientY: (t2 || e2).clientY }, ot = Qe.clientX - s2.left, nt = Qe.clientY - s2.top, this._lastX = (t2 || e2).clientX, this._lastY = (t2 || e2).clientY, ze.style["will-change"] = "all", n2 = function() {
      Ye("delayEnded", a2, { evt: e2 }), Tt.eventCanceled ? a2._onDrop() : (a2._disableDelayedDragEvents(), !oe && a2.nativeDraggable && (ze.draggable = true), a2._triggerDragStart(e2, t2), Ve({ sortable: a2, name: "choose", originalEvent: e2 }), fe(ze, i2.chosenClass, true));
    }, i2.ignore.split(",").forEach(function(e3) {
      ve(ze, e3.trim(), Nt);
    }), re(r2, "dragover", Dt), re(r2, "mousemove", Dt), re(r2, "touchmove", Dt), re(r2, "mouseup", a2._onDrop), re(r2, "touchend", a2._onDrop), re(r2, "touchcancel", a2._onDrop), oe && this.nativeDraggable && (this.options.touchStartThreshold = 4, ze.draggable = true), Ye("delayStart", this, { evt: e2 }), !i2.delay || i2.delayOnTouchOnly && !t2 || this.nativeDraggable && (te || ee))
      n2();
    else {
      if (Tt.eventCanceled)
        return void this._onDrop();
      re(r2, "mouseup", a2._disableDelayedDrag), re(r2, "touchend", a2._disableDelayedDrag), re(r2, "touchcancel", a2._disableDelayedDrag), re(r2, "mousemove", a2._delayedDragTouchMoveHandler), re(r2, "touchmove", a2._delayedDragTouchMoveHandler), i2.supportPointer && re(r2, "pointermove", a2._delayedDragTouchMoveHandler), a2._dragStartTimer = setTimeout(n2, i2.delay);
    }
  }
}, _delayedDragTouchMoveHandler: function(e2) {
  var t2 = e2.touches ? e2.touches[0] : e2;
  Math.max(Math.abs(t2.clientX - this._lastX), Math.abs(t2.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
}, _disableDelayedDrag: function() {
  ze && Nt(ze), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
}, _disableDelayedDragEvents: function() {
  var e2 = this.el.ownerDocument;
  se(e2, "mouseup", this._disableDelayedDrag), se(e2, "touchend", this._disableDelayedDrag), se(e2, "touchcancel", this._disableDelayedDrag), se(e2, "mousemove", this._delayedDragTouchMoveHandler), se(e2, "touchmove", this._delayedDragTouchMoveHandler), se(e2, "pointermove", this._delayedDragTouchMoveHandler);
}, _triggerDragStart: function(e2, t2) {
  t2 = t2 || "touch" == e2.pointerType && e2, !this.nativeDraggable || t2 ? this.options.supportPointer ? re(document, "pointermove", this._onTouchMove) : re(document, t2 ? "touchmove" : "mousemove", this._onTouchMove) : (re(ze, "dragend", this), re(Re, "dragstart", this._onDragStart));
  try {
    document.selection ? Mt(function() {
      document.selection.empty();
    }) : window.getSelection().removeAllRanges();
  } catch (e3) {
  }
}, _dragStarted: function(e2, t2) {
  if (ct = false, Re && ze) {
    Ye("dragStarted", this, { evt: t2 }), this.nativeDraggable && re(document, "dragover", kt);
    var o2 = this.options;
    !e2 && fe(ze, o2.dragClass, false), fe(ze, o2.ghostClass, true), Tt.active = this, e2 && this._appendGhost(), Ve({ sortable: this, name: "start", originalEvent: t2 });
  } else
    this._nulling();
}, _emulateDragOver: function() {
  if (Je) {
    this._lastX = Je.clientX, this._lastY = Je.clientY, _t();
    for (var e2 = document.elementFromPoint(Je.clientX, Je.clientY), t2 = e2; e2 && e2.shadowRoot && (e2 = e2.shadowRoot.elementFromPoint(Je.clientX, Je.clientY)) !== t2; )
      t2 = e2;
    if (ze.parentNode[Ne]._isOutsideThisEl(e2), t2)
      do {
        if (t2[Ne]) {
          if (t2[Ne]._onDragOver({ clientX: Je.clientX, clientY: Je.clientY, target: e2, rootEl: t2 }) && !this.options.dragoverBubble)
            break;
        }
        e2 = t2;
      } while (t2 = t2.parentNode);
    Et();
  }
}, _onTouchMove: function(e2) {
  if (Qe) {
    var t2 = this.options, o2 = t2.fallbackTolerance, n2 = t2.fallbackOffset, a2 = e2.touches ? e2.touches[0] : e2, l2 = Fe && me(Fe, true), i2 = Fe && l2 && l2.a, r2 = Fe && l2 && l2.d, s2 = bt && st && _e(st), c2 = (a2.clientX - Qe.clientX + n2.x) / (i2 || 1) + (s2 ? s2[0] - ft[0] : 0) / (i2 || 1), d2 = (a2.clientY - Qe.clientY + n2.y) / (r2 || 1) + (s2 ? s2[1] - ft[1] : 0) / (r2 || 1);
    if (!Tt.active && !ct) {
      if (o2 && Math.max(Math.abs(a2.clientX - this._lastX), Math.abs(a2.clientY - this._lastY)) < o2)
        return;
      this._onDragStart(e2, true);
    }
    if (Fe) {
      l2 ? (l2.e += c2 - (et || 0), l2.f += d2 - (tt || 0)) : l2 = { a: 1, b: 0, c: 0, d: 1, e: c2, f: d2 };
      var u2 = "matrix(".concat(l2.a, ",").concat(l2.b, ",").concat(l2.c, ",").concat(l2.d, ",").concat(l2.e, ",").concat(l2.f, ")");
      ge(Fe, "webkitTransform", u2), ge(Fe, "mozTransform", u2), ge(Fe, "msTransform", u2), ge(Fe, "transform", u2), et = c2, tt = d2, Je = a2;
    }
    e2.cancelable && e2.preventDefault();
  }
}, _appendGhost: function() {
  if (!Fe) {
    var e2 = this.options.fallbackOnBody ? document.body : Re, t2 = ye(ze, true, bt, true, e2), o2 = this.options;
    if (bt) {
      for (st = e2; "static" === ge(st, "position") && "none" === ge(st, "transform") && st !== document; )
        st = st.parentNode;
      st !== document.body && st !== document.documentElement ? (st === document && (st = be()), t2.top += st.scrollTop, t2.left += st.scrollLeft) : st = be(), ft = _e(st);
    }
    fe(Fe = ze.cloneNode(true), o2.ghostClass, false), fe(Fe, o2.fallbackClass, true), fe(Fe, o2.dragClass, true), ge(Fe, "transition", ""), ge(Fe, "transform", ""), ge(Fe, "box-sizing", "border-box"), ge(Fe, "margin", 0), ge(Fe, "top", t2.top), ge(Fe, "left", t2.left), ge(Fe, "width", t2.width), ge(Fe, "height", t2.height), ge(Fe, "opacity", "0.8"), ge(Fe, "position", bt ? "absolute" : "fixed"), ge(Fe, "zIndex", "100000"), ge(Fe, "pointerEvents", "none"), Tt.ghost = Fe, e2.appendChild(Fe), ge(Fe, "transform-origin", ot / parseInt(Fe.style.width) * 100 + "% " + nt / parseInt(Fe.style.height) * 100 + "%");
  }
}, _onDragStart: function(e2, t2) {
  var o2 = this, n2 = e2.dataTransfer, a2 = o2.options;
  Ye("dragStart", this, { evt: e2 }), Tt.eventCanceled ? this._onDrop() : (Ye("setupClone", this), Tt.eventCanceled || ((Ue = Oe(ze)).draggable = false, Ue.style["will-change"] = "", this._hideClone(), fe(Ue, this.options.chosenClass, false), Tt.clone = Ue), o2.cloneId = Mt(function() {
    Ye("clone", o2), Tt.eventCanceled || (o2.options.removeCloneOnHide || Re.insertBefore(Ue, ze), o2._hideClone(), Ve({ sortable: o2, name: "clone" }));
  }), !t2 && fe(ze, a2.dragClass, true), t2 ? (dt = true, o2._loopId = setInterval(o2._emulateDragOver, 50)) : (se(document, "mouseup", o2._onDrop), se(document, "touchend", o2._onDrop), se(document, "touchcancel", o2._onDrop), n2 && (n2.effectAllowed = "move", a2.setData && a2.setData.call(o2, n2, ze)), re(document, "drop", o2), ge(ze, "transform", "translateZ(0)")), ct = true, o2._dragStartId = Mt(o2._dragStarted.bind(o2, t2, e2)), re(document, "selectstart", o2), at = true, ne && ge(document.body, "user-select", "none"));
}, _onDragOver: function(e2) {
  var t2, o2, n2, a2, l2 = this.el, i2 = e2.target, r2 = this.options, s2 = r2.group, c2 = Tt.active, d2 = Ge === s2, u2 = r2.sort, h2 = Ze || c2, p2 = this, f2 = false;
  if (!gt) {
    if (void 0 !== e2.preventDefault && e2.cancelable && e2.preventDefault(), i2 = ue(i2, r2.draggable, l2, true), O2("dragOver"), Tt.eventCanceled)
      return f2;
    if (ze.contains(e2.target) || i2.animated && i2.animatingX && i2.animatingY || p2._ignoreWhileAnimating === i2)
      return A2(false);
    if (dt = false, c2 && !r2.disabled && (d2 ? u2 || (n2 = Xe !== Re) : Ze === this || (this.lastPutMode = Ge.checkPull(this, c2, ze, e2)) && s2.checkPut(this, c2, ze, e2))) {
      if (a2 = "vertical" === this._getDirection(e2, i2), t2 = ye(ze), O2("dragOverValid"), Tt.eventCanceled)
        return f2;
      if (n2)
        return Xe = Re, N2(), this._hideClone(), O2("revert"), Tt.eventCanceled || (je ? Re.insertBefore(ze, je) : Re.appendChild(ze)), A2(true);
      var g2 = Se(l2, r2.draggable);
      if (!g2 || function(e3, t3, o3) {
        var n3 = ye(Se(o3.el, o3.options.draggable)), a3 = 10;
        return t3 ? e3.clientX > n3.right + a3 || e3.clientX <= n3.right && e3.clientY > n3.bottom && e3.clientX >= n3.left : e3.clientX > n3.right && e3.clientY > n3.top || e3.clientX <= n3.right && e3.clientY > n3.bottom + a3;
      }(e2, a2, this) && !g2.animated) {
        if (g2 === ze)
          return A2(false);
        if (g2 && l2 === e2.target && (i2 = g2), i2 && (o2 = ye(i2)), false !== Ot(Re, l2, ze, t2, i2, o2, e2, !!i2))
          return N2(), l2.appendChild(ze), Xe = l2, I2(), A2(true);
      } else if (g2 && function(e3, t3, o3) {
        var n3 = ye(Ce(o3.el, 0, o3.options, true)), a3 = 10;
        return t3 ? e3.clientX < n3.left - a3 || e3.clientY < n3.top && e3.clientX < n3.right : e3.clientY < n3.top - a3 || e3.clientY < n3.bottom && e3.clientX < n3.left;
      }(e2, a2, this)) {
        var m2 = Ce(l2, 0, r2, true);
        if (m2 === ze)
          return A2(false);
        if (o2 = ye(i2 = m2), false !== Ot(Re, l2, ze, t2, i2, o2, e2, false))
          return N2(), l2.insertBefore(ze, m2), Xe = l2, I2(), A2(true);
      } else if (i2.parentNode === l2) {
        o2 = ye(i2);
        var v2, b2, y2, w2 = ze.parentNode !== l2, C2 = !function(e3, t3, o3) {
          var n3 = o3 ? e3.left : e3.top, a3 = o3 ? e3.right : e3.bottom, l3 = o3 ? e3.width : e3.height, i3 = o3 ? t3.left : t3.top, r3 = o3 ? t3.right : t3.bottom, s3 = o3 ? t3.width : t3.height;
          return n3 === i3 || a3 === r3 || n3 + l3 / 2 === i3 + s3 / 2;
        }(ze.animated && ze.toRect || t2, i2.animated && i2.toRect || o2, a2), S2 = a2 ? "top" : "left", x2 = we(i2, "top", "top") || we(ze, "top", "top"), _2 = x2 ? x2.scrollTop : void 0;
        if (lt !== i2 && (b2 = o2[S2], ht = false, pt = !C2 && r2.invertSwap || w2), v2 = function(e3, t3, o3, n3, a3, l3, i3, r3) {
          var s3 = n3 ? e3.clientY : e3.clientX, c3 = n3 ? o3.height : o3.width, d3 = n3 ? o3.top : o3.left, u3 = n3 ? o3.bottom : o3.right, h3 = false;
          if (!i3) {
            if (r3 && rt < c3 * a3) {
              if (!ht && (1 === it ? s3 > d3 + c3 * l3 / 2 : s3 < u3 - c3 * l3 / 2) && (ht = true), ht)
                h3 = true;
              else if (1 === it ? s3 < d3 + rt : s3 > u3 - rt)
                return -it;
            } else if (s3 > d3 + c3 * (1 - a3) / 2 && s3 < u3 - c3 * (1 - a3) / 2)
              return function(e4) {
                return xe(ze) < xe(e4) ? 1 : -1;
              }(t3);
          }
          if ((h3 = h3 || i3) && (s3 < d3 + c3 * l3 / 2 || s3 > u3 - c3 * l3 / 2))
            return s3 > d3 + c3 / 2 ? 1 : -1;
          return 0;
        }(e2, i2, o2, a2, C2 ? 1 : r2.swapThreshold, null == r2.invertedSwapThreshold ? r2.swapThreshold : r2.invertedSwapThreshold, pt, lt === i2), 0 !== v2) {
          var E2 = xe(ze);
          do {
            E2 -= v2, y2 = Xe.children[E2];
          } while (y2 && ("none" === ge(y2, "display") || y2 === Fe));
        }
        if (0 === v2 || y2 === i2)
          return A2(false);
        lt = i2, it = v2;
        var D2 = i2.nextElementSibling, k2 = false, T2 = Ot(Re, l2, ze, t2, i2, o2, e2, k2 = 1 === v2);
        if (false !== T2)
          return 1 !== T2 && -1 !== T2 || (k2 = 1 === T2), gt = true, setTimeout(At, 30), N2(), k2 && !D2 ? l2.appendChild(ze) : i2.parentNode.insertBefore(ze, k2 ? D2 : i2), x2 && Te(x2, 0, _2 - x2.scrollTop), Xe = ze.parentNode, void 0 === b2 || pt || (rt = Math.abs(b2 - ye(i2)[S2])), I2(), A2(true);
      }
      if (l2.contains(ze))
        return A2(false);
    }
    return false;
  }
  function O2(r3, s3) {
    Ye(r3, p2, K({ evt: e2, isOwner: d2, axis: a2 ? "vertical" : "horizontal", revert: n2, dragRect: t2, targetRect: o2, canSort: u2, fromSortable: h2, target: i2, completed: A2, onMove: function(o3, n3) {
      return Ot(Re, l2, ze, t2, o3, ye(o3), e2, n3);
    }, changed: I2 }, s3));
  }
  function N2() {
    O2("dragOverAnimationCapture"), p2.captureAnimationState(), p2 !== h2 && h2.captureAnimationState();
  }
  function A2(t3) {
    return O2("dragOverCompleted", { insertion: t3 }), t3 && (d2 ? c2._hideClone() : c2._showClone(p2), p2 !== h2 && (fe(ze, Ze ? Ze.options.ghostClass : c2.options.ghostClass, false), fe(ze, r2.ghostClass, true)), Ze !== p2 && p2 !== Tt.active ? Ze = p2 : p2 === Tt.active && Ze && (Ze = null), h2 === p2 && (p2._ignoreWhileAnimating = i2), p2.animateAll(function() {
      O2("dragOverAnimationComplete"), p2._ignoreWhileAnimating = null;
    }), p2 !== h2 && (h2.animateAll(), h2._ignoreWhileAnimating = null)), (i2 === ze && !ze.animated || i2 === l2 && !i2.animated) && (lt = null), r2.dragoverBubble || e2.rootEl || i2 === document || (ze.parentNode[Ne]._isOutsideThisEl(e2.target), !t3 && Dt(e2)), !r2.dragoverBubble && e2.stopPropagation && e2.stopPropagation(), f2 = true;
  }
  function I2() {
    $e = xe(ze), qe = xe(ze, r2.draggable), Ve({ sortable: p2, name: "change", toEl: l2, newIndex: $e, newDraggableIndex: qe, originalEvent: e2 });
  }
}, _ignoreWhileAnimating: null, _offMoveEvents: function() {
  se(document, "mousemove", this._onTouchMove), se(document, "touchmove", this._onTouchMove), se(document, "pointermove", this._onTouchMove), se(document, "dragover", Dt), se(document, "mousemove", Dt), se(document, "touchmove", Dt);
}, _offUpEvents: function() {
  var e2 = this.el.ownerDocument;
  se(e2, "mouseup", this._onDrop), se(e2, "touchend", this._onDrop), se(e2, "pointerup", this._onDrop), se(e2, "touchcancel", this._onDrop), se(document, "selectstart", this);
}, _onDrop: function(e2) {
  var t2 = this.el, o2 = this.options;
  $e = xe(ze), qe = xe(ze, o2.draggable), Ye("drop", this, { evt: e2 }), Xe = ze && ze.parentNode, $e = xe(ze), qe = xe(ze, o2.draggable), Tt.eventCanceled || (ct = false, pt = false, ht = false, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Pt(this.cloneId), Pt(this._dragStartId), this.nativeDraggable && (se(document, "drop", this), se(t2, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ne && ge(document.body, "user-select", ""), ge(ze, "transform", ""), e2 && (at && (e2.cancelable && e2.preventDefault(), !o2.dropBubble && e2.stopPropagation()), Fe && Fe.parentNode && Fe.parentNode.removeChild(Fe), (Re === Xe || Ze && "clone" !== Ze.lastPutMode) && Ue && Ue.parentNode && Ue.parentNode.removeChild(Ue), ze && (this.nativeDraggable && se(ze, "dragend", this), Nt(ze), ze.style["will-change"] = "", at && !ct && fe(ze, Ze ? Ze.options.ghostClass : this.options.ghostClass, false), fe(ze, this.options.chosenClass, false), Ve({ sortable: this, name: "unchoose", toEl: Xe, newIndex: null, newDraggableIndex: null, originalEvent: e2 }), Re !== Xe ? ($e >= 0 && (Ve({ rootEl: Xe, name: "add", toEl: Xe, fromEl: Re, originalEvent: e2 }), Ve({ sortable: this, name: "remove", toEl: Xe, originalEvent: e2 }), Ve({ rootEl: Xe, name: "sort", toEl: Xe, fromEl: Re, originalEvent: e2 }), Ve({ sortable: this, name: "sort", toEl: Xe, originalEvent: e2 })), Ze && Ze.save()) : $e !== He && $e >= 0 && (Ve({ sortable: this, name: "update", toEl: Xe, originalEvent: e2 }), Ve({ sortable: this, name: "sort", toEl: Xe, originalEvent: e2 })), Tt.active && (null != $e && -1 !== $e || ($e = He, qe = Ke), Ve({ sortable: this, name: "end", toEl: Xe, originalEvent: e2 }), this.save())))), this._nulling();
}, _nulling: function() {
  Ye("nulling", this), Re = ze = Xe = Fe = je = Ue = Le = We = Qe = Je = at = $e = qe = He = Ke = lt = it = Ze = Ge = Tt.dragged = Tt.ghost = Tt.clone = Tt.active = null, mt.forEach(function(e2) {
    e2.checked = true;
  }), mt.length = et = tt = 0;
}, handleEvent: function(e2) {
  switch (e2.type) {
    case "drop":
    case "dragend":
      this._onDrop(e2);
      break;
    case "dragenter":
    case "dragover":
      ze && (this._onDragOver(e2), function(e3) {
        e3.dataTransfer && (e3.dataTransfer.dropEffect = "move");
        e3.cancelable && e3.preventDefault();
      }(e2));
      break;
    case "selectstart":
      e2.preventDefault();
  }
}, toArray: function() {
  for (var e2, t2 = [], o2 = this.el.children, n2 = 0, a2 = o2.length, l2 = this.options; n2 < a2; n2++)
    ue(e2 = o2[n2], l2.draggable, this.el, false) && t2.push(e2.getAttribute(l2.dataIdAttr) || It(e2));
  return t2;
}, sort: function(e2, t2) {
  var o2 = {}, n2 = this.el;
  this.toArray().forEach(function(e3, t3) {
    var a2 = n2.children[t3];
    ue(a2, this.options.draggable, n2, false) && (o2[e3] = a2);
  }, this), t2 && this.captureAnimationState(), e2.forEach(function(e3) {
    o2[e3] && (n2.removeChild(o2[e3]), n2.appendChild(o2[e3]));
  }), t2 && this.animateAll();
}, save: function() {
  var e2 = this.options.store;
  e2 && e2.set && e2.set(this);
}, closest: function(e2, t2) {
  return ue(e2, t2 || this.options.draggable, this.el, false);
}, option: function(e2, t2) {
  var o2 = this.options;
  if (void 0 === t2)
    return o2[e2];
  var n2 = Pe.modifyOption(this, e2, t2);
  o2[e2] = void 0 !== n2 ? n2 : t2, "group" === e2 && xt(o2);
}, destroy: function() {
  Ye("destroy", this);
  var e2 = this.el;
  e2[Ne] = null, se(e2, "mousedown", this._onTapStart), se(e2, "touchstart", this._onTapStart), se(e2, "pointerdown", this._onTapStart), this.nativeDraggable && (se(e2, "dragover", this), se(e2, "dragenter", this)), Array.prototype.forEach.call(e2.querySelectorAll("[draggable]"), function(e3) {
    e3.removeAttribute("draggable");
  }), this._onDrop(), this._disableDelayedDragEvents(), ut.splice(ut.indexOf(this.el), 1), this.el = e2 = null;
}, _hideClone: function() {
  if (!We) {
    if (Ye("hideClone", this), Tt.eventCanceled)
      return;
    ge(Ue, "display", "none"), this.options.removeCloneOnHide && Ue.parentNode && Ue.parentNode.removeChild(Ue), We = true;
  }
}, _showClone: function(e2) {
  if ("clone" === e2.lastPutMode) {
    if (We) {
      if (Ye("showClone", this), Tt.eventCanceled)
        return;
      ze.parentNode != Re || this.options.group.revertClone ? je ? Re.insertBefore(Ue, je) : Re.appendChild(Ue) : Re.insertBefore(Ue, ze), this.options.group.revertClone && this.animate(ze, Ue), ge(Ue, "display", ""), We = false;
    }
  } else
    this._hideClone();
} }, vt && re(document, "touchmove", function(e2) {
  (Tt.active || ct) && e2.cancelable && e2.preventDefault();
}), Tt.utils = { on: re, off: se, css: ge, find: ve, is: function(e2, t2) {
  return !!ue(e2, t2, e2, false);
}, extend: function(e2, t2) {
  if (e2 && t2)
    for (var o2 in t2)
      t2.hasOwnProperty(o2) && (e2[o2] = t2[o2]);
  return e2;
}, throttle: ke, closest: ue, toggleClass: fe, clone: Oe, index: xe, nextTick: Mt, cancelNextTick: Pt, detectDirection: St, getChild: Ce }, Tt.get = function(e2) {
  return e2[Ne];
}, Tt.mount = function() {
  for (var e2 = arguments.length, t2 = new Array(e2), o2 = 0; o2 < e2; o2++)
    t2[o2] = arguments[o2];
  t2[0].constructor === Array && (t2 = t2[0]), t2.forEach(function(e3) {
    if (!e3.prototype || !e3.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e3));
    e3.utils && (Tt.utils = K(K({}, Tt.utils), e3.utils)), Pe.mount(e3);
  });
}, Tt.create = function(e2, t2) {
  return new Tt(e2, t2);
}, Tt.version = "1.14.0";
var Bt;
var Yt;
var Vt;
var zt;
var Xt;
var Ft;
var Rt = [];
var jt = false;
function Lt() {
  Rt.forEach(function(e2) {
    clearInterval(e2.pid);
  }), Rt = [];
}
function Ut() {
  clearInterval(Ft);
}
var Wt = ke(function(e2, t2, o2, n2) {
  if (t2.scroll) {
    var a2, l2 = (e2.touches ? e2.touches[0] : e2).clientX, i2 = (e2.touches ? e2.touches[0] : e2).clientY, r2 = t2.scrollSensitivity, s2 = t2.scrollSpeed, c2 = be(), d2 = false;
    Yt !== o2 && (Yt = o2, Lt(), Bt = t2.scroll, a2 = t2.scrollFn, true === Bt && (Bt = Ee(o2, true)));
    var u2 = 0, h2 = Bt;
    do {
      var p2 = h2, f2 = ye(p2), g2 = f2.top, m2 = f2.bottom, v2 = f2.left, b2 = f2.right, y2 = f2.width, w2 = f2.height, C2 = void 0, S2 = void 0, x2 = p2.scrollWidth, _2 = p2.scrollHeight, E2 = ge(p2), D2 = p2.scrollLeft, k2 = p2.scrollTop;
      p2 === c2 ? (C2 = y2 < x2 && ("auto" === E2.overflowX || "scroll" === E2.overflowX || "visible" === E2.overflowX), S2 = w2 < _2 && ("auto" === E2.overflowY || "scroll" === E2.overflowY || "visible" === E2.overflowY)) : (C2 = y2 < x2 && ("auto" === E2.overflowX || "scroll" === E2.overflowX), S2 = w2 < _2 && ("auto" === E2.overflowY || "scroll" === E2.overflowY));
      var T2 = C2 && (Math.abs(b2 - l2) <= r2 && D2 + y2 < x2) - (Math.abs(v2 - l2) <= r2 && !!D2), O2 = S2 && (Math.abs(m2 - i2) <= r2 && k2 + w2 < _2) - (Math.abs(g2 - i2) <= r2 && !!k2);
      if (!Rt[u2])
        for (var N2 = 0; N2 <= u2; N2++)
          Rt[N2] || (Rt[N2] = {});
      Rt[u2].vx == T2 && Rt[u2].vy == O2 && Rt[u2].el === p2 || (Rt[u2].el = p2, Rt[u2].vx = T2, Rt[u2].vy = O2, clearInterval(Rt[u2].pid), 0 == T2 && 0 == O2 || (d2 = true, Rt[u2].pid = setInterval(function() {
        n2 && 0 === this.layer && Tt.active._onTouchMove(Xt);
        var t3 = Rt[this.layer].vy ? Rt[this.layer].vy * s2 : 0, o3 = Rt[this.layer].vx ? Rt[this.layer].vx * s2 : 0;
        "function" == typeof a2 && "continue" !== a2.call(Tt.dragged.parentNode[Ne], o3, t3, e2, Xt, Rt[this.layer].el) || Te(Rt[this.layer].el, o3, t3);
      }.bind({ layer: u2 }), 24))), u2++;
    } while (t2.bubbleScroll && h2 !== c2 && (h2 = Ee(h2, false)));
    jt = d2;
  }
}, 30);
var Ht = function(e2) {
  var t2 = e2.originalEvent, o2 = e2.putSortable, n2 = e2.dragEl, a2 = e2.activeSortable, l2 = e2.dispatchSortableEvent, i2 = e2.hideGhostForTarget, r2 = e2.unhideGhostForTarget;
  if (t2) {
    var s2 = o2 || a2;
    i2();
    var c2 = t2.changedTouches && t2.changedTouches.length ? t2.changedTouches[0] : t2, d2 = document.elementFromPoint(c2.clientX, c2.clientY);
    r2(), s2 && !s2.el.contains(d2) && (l2("spill"), this.onSpill({ dragEl: n2, putSortable: o2 }));
  }
};
function $t() {
}
function Kt() {
}
$t.prototype = { startIndex: null, dragStart: function(e2) {
  var t2 = e2.oldDraggableIndex;
  this.startIndex = t2;
}, onSpill: function(e2) {
  var t2 = e2.dragEl, o2 = e2.putSortable;
  this.sortable.captureAnimationState(), o2 && o2.captureAnimationState();
  var n2 = Ce(this.sortable.el, this.startIndex, this.options);
  n2 ? this.sortable.el.insertBefore(t2, n2) : this.sortable.el.appendChild(t2), this.sortable.animateAll(), o2 && o2.animateAll();
}, drop: Ht }, Z($t, { pluginName: "revertOnSpill" }), Kt.prototype = { onSpill: function(e2) {
  var t2 = e2.dragEl, o2 = e2.putSortable || this.sortable;
  o2.captureAnimationState(), t2.parentNode && t2.parentNode.removeChild(t2), o2.animateAll();
}, drop: Ht }, Z(Kt, { pluginName: "removeOnSpill" }), Tt.mount(new function() {
  function e2() {
    for (var e3 in this.defaults = { scroll: true, forceAutoScrollFallback: false, scrollSensitivity: 30, scrollSpeed: 10, bubbleScroll: true }, this)
      "_" === e3.charAt(0) && "function" == typeof this[e3] && (this[e3] = this[e3].bind(this));
  }
  return e2.prototype = { dragStarted: function(e3) {
    var t2 = e3.originalEvent;
    this.sortable.nativeDraggable ? re(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? re(document, "pointermove", this._handleFallbackAutoScroll) : t2.touches ? re(document, "touchmove", this._handleFallbackAutoScroll) : re(document, "mousemove", this._handleFallbackAutoScroll);
  }, dragOverCompleted: function(e3) {
    var t2 = e3.originalEvent;
    this.options.dragOverBubble || t2.rootEl || this._handleAutoScroll(t2);
  }, drop: function() {
    this.sortable.nativeDraggable ? se(document, "dragover", this._handleAutoScroll) : (se(document, "pointermove", this._handleFallbackAutoScroll), se(document, "touchmove", this._handleFallbackAutoScroll), se(document, "mousemove", this._handleFallbackAutoScroll)), Ut(), Lt(), clearTimeout(he), he = void 0;
  }, nulling: function() {
    Xt = Yt = Bt = jt = Ft = Vt = zt = null, Rt.length = 0;
  }, _handleFallbackAutoScroll: function(e3) {
    this._handleAutoScroll(e3, true);
  }, _handleAutoScroll: function(e3, t2) {
    var o2 = this, n2 = (e3.touches ? e3.touches[0] : e3).clientX, a2 = (e3.touches ? e3.touches[0] : e3).clientY, l2 = document.elementFromPoint(n2, a2);
    if (Xt = e3, t2 || this.options.forceAutoScrollFallback || te || ee || ne) {
      Wt(e3, this.options, l2, t2);
      var i2 = Ee(l2, true);
      !jt || Ft && n2 === Vt && a2 === zt || (Ft && Ut(), Ft = setInterval(function() {
        var l3 = Ee(document.elementFromPoint(n2, a2), true);
        l3 !== i2 && (i2 = l3, Lt()), Wt(e3, o2.options, l3, t2);
      }, 10), Vt = n2, zt = a2);
    } else {
      if (!this.options.bubbleScroll || Ee(l2, true) === be())
        return void Lt();
      Wt(e3, this.options, Ee(l2, false), false);
    }
  } }, Z(e2, { pluginName: "scroll", initializeByDefault: true });
}()), Tt.mount(Kt, $t);
var qt = createBaseVNode("i", { class: "el-icon-s-grid" }, null, -1);
var Gt = createBaseVNode("i", { class: "el-icon-caret-bottom" }, null, -1);
var Zt = createBaseVNode("div", { class: "nx-dropdown-title" }, "列表设置", -1);
var Qt = { key: 0, class: "nx-dropdown-height" };
var Jt = createBaseVNode("span", null, "行高设置", -1);
var eo = createBaseVNode("i", { class: "icon-easy" }, null, -1);
var to = createBaseVNode("i", { class: "icon-medium" }, null, -1);
var oo = createBaseVNode("i", { class: "icon-compact" }, null, -1);
var no = { class: "nx-dropdown-border" };
var ao = createBaseVNode("span", null, "边框颜色", -1);
var lo = ["onClick"];
var io = ["onClick"];
var ro = defineComponent({ __name: "filter-x", props: { th: { type: Array, required: true }, tableTh: { type: Array, required: true }, cacheKey: { type: String, default: "" }, heightStyle: { type: String, default: "medium" }, dropdownClass: { type: String, default: "" }, borderColor: { type: String, default: "#E6E8EA" }, heightControl: { type: Boolean, default: true }, hasToolBar: { type: Boolean, default: false } }, setup(e2, { expose: t2, emit: o2 }) {
  const d2 = e2, h2 = ref(true);
  function m2(e3) {
    o2("update:borderColor", e3), B.set("nx_border-color", d2.borderColor);
  }
  function v2(e3, t3) {
    o2("fixedChange", e3, t3);
  }
  function S2(e3) {
    const { oldIndex: t3, newIndex: n2 } = e3;
    o2("filterSort", t3, n2), h2.value = false, nextTick(() => {
      h2.value = true, setTimeout(() => {
        x2(true);
      }, 100);
    });
  }
  function x2(e3) {
    if (e3) {
      const e4 = document.querySelector(d2.dropdownClass ? `.${d2.dropdownClass}` : ".nx-dropdown-items");
      Tt.create(e4, { animation: 150, onEnd: S2, handle: ".drag", draggable: ".drags" });
    }
  }
  function D2() {
    if (!d2.cacheKey)
      return;
    const e3 = d2.th.map((e4) => ({ title: e4.title, visible: e4.visible, resizeWidth: e4.resizeWidth, fixed: e4.fixed || null }));
    B.set(d2.cacheKey, e3);
  }
  watch(() => d2.th.length, () => {
    D2();
  });
  return t2({ initDropdownData: async () => {
    if (!d2.cacheKey)
      return d2.th;
    try {
      const e3 = await B.get(d2.cacheKey);
      if (d2.th.forEach((e4) => {
        e4.visible = void 0 === e4.visible || !!e4.visible, e4.fixed = e4.fixed || null, e4.children && e4.children.forEach((e5) => {
          e5.fixed = null;
        });
      }), e3) {
        const t3 = e3;
        return t3.forEach((e4, t4) => {
          e4.index = t4;
        }), d2.th.forEach((e4) => {
          const o3 = t3.find((t4) => t4.title === e4.title);
          o3 && (e4.visible = void 0 !== o3.visible ? o3.visible : e4.visible, e4.index = o3.index, e4.fixed = o3.fixed || null, o3.resizeWidth && (e4.resizeWidth = o3.resizeWidth, e4.width = o3.resizeWidth));
        }), d2.th.sort((e4, t4) => e4.index - t4.index), d2.th;
      }
      return d2.th;
    } catch (e3) {
      return d2.th;
    }
  }, cacheDropdownData: D2 }), (t3, d3) => {
    const C2 = resolveComponent("el-button"), S3 = resolveComponent("el-color-picker"), _2 = resolveComponent("el-checkbox"), E2 = resolveComponent("el-dropdown-item"), D3 = resolveComponent("el-dropdown-menu"), k2 = resolveComponent("el-dropdown");
    return openBlock(), createElementBlock("div", { class: normalizeClass(["nx-table-filter", { "default-style": !e2.hasToolBar, "has-tools": e2.hasToolBar }]) }, [createVNode(k2, { trigger: "click", "hide-on-click": false, placement: "bottom-end", onVisibleChange: x2 }, { dropdown: withCtx(() => [createVNode(D3, { class: "nx-dropdown" }, { default: withCtx(() => [Zt, e2.heightControl ? (openBlock(), createElementBlock("div", Qt, [Jt, createBaseVNode("div", { class: normalizeClass({ active: "medium" === e2.heightStyle }), onClick: d3[0] || (d3[0] = (e3) => o2("update:heightStyle", "medium")) }, [eo, createTextVNode("宽松 ")], 2), createBaseVNode("div", { class: normalizeClass({ active: "small" === e2.heightStyle }), onClick: d3[1] || (d3[1] = (e3) => o2("update:heightStyle", "small")) }, [to, createTextVNode("中等 ")], 2), createBaseVNode("div", { class: normalizeClass({ active: "mini" === e2.heightStyle }), onClick: d3[2] || (d3[2] = (e3) => o2("update:heightStyle", "mini")) }, [oo, createTextVNode("紧凑 ")], 2)])) : createCommentVNode("", true), createBaseVNode("div", no, [ao, createBaseVNode("div", null, [createBaseVNode("span", { style: normalizeStyle({ "background-color": e2.borderColor }) }, null, 4), createVNode(S3, { value: e2.borderColor, "show-alpha": "", onChange: m2 }, null, 8, ["value"])])]), h2.value ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["nx-dropdown-items", e2.dropdownClass]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.tableTh, (e3) => (openBlock(), createElementBlock(Fragment, null, [false !== e3.show ? (openBlock(), createBlock(E2, { key: e3.title, class: normalizeClass({ drags: !e3.fixed }), style: normalizeStyle([{ display: e3.title ? "flex" : "none" }, { "align-items": "center" }]) }, { default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(["el-icon-download fixed-left", { active: "left" === e3.fixed }]), onClick: (t4) => v2(e3, "left") }, null, 10, lo), createBaseVNode("i", { class: normalizeClass(["el-icon-download fixed-right", { active: "right" === e3.fixed }]), onClick: (t4) => v2(e3, "right") }, null, 10, io), createVNode(_2, { modelValue: e3.visible, "onUpdate:modelValue": (t4) => e3.visible = t4, style: { width: "100%" }, class: "checkbox-item", onChange: (t4) => function(e4) {
      o2("checkChange", e4);
    }(e3) }, { default: withCtx(() => [createTextVNode(toDisplayString(e3.title), 1)]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"]), e3.fixed ? createCommentVNode("", true) : (openBlock(), createElementBlock("i", { key: 0, class: normalizeClass(["iconfont icon-rank", { drag: !e3.fixed }]), style: { color: "#c0c4cc", "margin-left": "10px", "font-size": "18px", "margin-right": "0" } }, null, 2))]), _: 2 }, 1032, ["class", "style"])) : createCommentVNode("", true)], 64))), 256))], 2)) : createCommentVNode("", true)]), _: 1 })]), default: withCtx(() => [createVNode(C2, { size: "mini", class: "filter-button" }, { default: withCtx(() => [qt, Gt]), _: 1 })]), _: 1 })], 2);
  };
} });
var so = { style: { display: "none" } };
var co = j({ name: "InitColor", props: { borderColor: { type: String, default: "#E6E8EA" }, heightStyle: { type: String, default: "#E6E8EA" }, cacheKey: { type: String, default: "" } }, async activated() {
  const e2 = await B.get("nx_border-color"), t2 = await B.get("nx_height-style");
  e2 && this.$emit("update:borderColor", e2), t2 && this.$emit("update:heightStyle", t2);
} }, [["render", function(e2, t2, o2, n2, i2, r2) {
  return openBlock(), createElementBlock("div", so);
}]]);
var uo = (e2) => (pushScopeId("data-v-72dda2ae"), e2 = e2(), popScopeId(), e2);
var ho = { key: 0, class: "icon-filterh" };
var po = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var fo = { key: 1, class: "icon-filterhActive" };
var go = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var mo = { class: "btns" };
var vo = ["onClick"];
var bo = ["onClick"];
var yo = { class: "options" };
var wo = ["onClick"];
var Co = { key: 0, class: "icon-filterh" };
var So = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var xo = { key: 1, class: "icon-filterhActive" };
var _o = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var Eo = { key: 0, class: "icon-filterh" };
var Do = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var ko = { key: 1, class: "icon-filterhActive" };
var To = [uo(() => createBaseVNode("span", { class: "path1" }, null, -1)), uo(() => createBaseVNode("span", { class: "path2" }, null, -1))];
var Oo = { key: 0, class: "table-sum" };
var No = [uo(() => createBaseVNode("span", null, [createBaseVNode("i", { class: "el-icon-loading" }), createTextVNode("正在加载中 ")], -1))];
var Ao = defineComponent({ name: "NxTable", props: { th: { type: Array, default: () => [] }, tr: { type: Array, default: () => [] }, attributes: { type: Object, default: () => {
} }, toolBar: { type: Object, default: () => ({ toolbarShow: false, borderShow: true }) }, events: { type: Object, default: () => {
} }, operateColumn: { type: Boolean, default: false }, operateWidth: { type: String, default: "" }, operateFixed: { type: [String, Boolean], default: false }, showSum: { type: Boolean, default: true }, total: { type: [Number, String], default: 0 }, loading: { type: Boolean, default: false }, cacheKey: { type: String, default: "" }, dropdownClass: { type: String, default: "" }, scrollX: { type: Object, default: () => ({ gt: -1 }) }, scrollY: { type: Object, default: () => ({ gt: -1 }) }, showOverflow: { type: null, default: "tooltip" }, heightControl: { type: Boolean, default: true }, height: { type: String, default: "auto" }, page: { type: Object, pageSize: { type: Number, default: 30 }, pageNum: { type: Number, default: 0 }, default: null }, showPage: { type: Boolean, default: false }, highlightHoverRow: { type: Boolean, default: true } }, setup(e2, { expose: o2, emit: x2 }) {
  const M2 = e2, P2 = useAttrs(), Y2 = reactive({ loadingObj: {}, tableTh: [], showFilter: true, heightStyle: "medium", borderColor: "#E6E8EA", cachePageSize: 30 }), V2 = ref(null), z2 = computed(() => ({ shortcuts: [{ text: "今天", onClick(e3) {
    const t2 = /* @__PURE__ */ new Date(), o3 = /* @__PURE__ */ new Date();
    o3.setTime(o3.getTime() - 0), e3.emit("pick", [o3, t2]);
  } }, { text: "最近一周", onClick(e3) {
    const t2 = /* @__PURE__ */ new Date(), o3 = /* @__PURE__ */ new Date();
    o3.setTime(o3.getTime() - 6048e5), e3.emit("pick", [o3, t2]);
  } }, { text: "最近一个月", onClick(e3) {
    const t2 = /* @__PURE__ */ new Date(), o3 = /* @__PURE__ */ new Date();
    o3.setTime(o3.getTime() - 2592e6), e3.emit("pick", [o3, t2]);
  } }] })), X2 = computed(() => M2.page.pageNum + 1), F2 = computed(() => M2.page && M2.page.pageNum >= 0 && M2.page.pageSize && M2.showPage);
  watch(() => M2.cacheKey, () => {
    Y2.showFilter = false, Y2.tableTh = [], setTimeout(() => {
      Y2.showFilter = true, nextTick(async () => {
        Y2.tableTh = await V2.value.initDropdownData();
      });
    }, 50);
  }), watch(() => M2.th.length, () => {
    M2.cacheKey || (Y2.tableTh = M2.th);
  });
  const R2 = ref(), j2 = ref(), L2 = (e3) => {
  };
  function U2(e3) {
    const t2 = M2.page;
    t2.pageNum = e3 - 1, x2("update:page", t2), x2("pageChange");
  }
  function W2(e3) {
    const t2 = M2.page;
    t2.pageSize = e3, B.set("pageSize", e3), x2("update:page", t2), x2("pageChange");
  }
  function H2(e3, t2) {
    var _a;
    Y2.tableTh.forEach((o3) => {
      o3.title === e3.title && (o3.fixed === t2 ? o3.fixed = null : o3.fixed = t2, Y2.tableTh = [], nextTick(() => {
        Y2.tableTh = M2.th;
      }));
    }), (_a = R2 == null ? void 0 : R2.value) == null ? void 0 : _a.recalculate(true), V2.value.cacheDropdownData();
  }
  function $2({ column: e3 }) {
    M2.th.find((t2) => t2.title === e3.title).resizeWidth = e3.resizeWidth, V2.value.cacheDropdownData();
  }
  function K2(e3) {
    Y2.tableTh.find((t2) => t2.title === e3.title).visible = e3.visible, x2("headerChange", Y2.tableTh), V2.value.cacheDropdownData();
  }
  function q2(e3, t2) {
    const o3 = Y2.tableTh[e3];
    Y2.tableTh.splice(e3, 1), Y2.tableTh.splice(t2, 0, o3), x2("update:th", Y2.tableTh), x2("headerChange", Y2.tableTh), V2.value.cacheDropdownData();
  }
  function G2(e3) {
    let t2 = "number" === e3.type ? parseFloat(e3.template) : e3.template;
    t2 = t2 || 0 === t2 ? t2 : "", "number" === e3.type && t2 && (e3.precision || 0 === e3.precision) && (t2 = t2.toFixed(e3.precision)), e3.template = t2, e3.value = t2, x2("filter-confirm", e3.field, e3.value);
  }
  function Z2({ scrollTop: e3 }) {
    if (void 0 === P2.onScrollLoad || M2.loading)
      return;
    const t2 = R2.value.$el.querySelector(".vxe-table--body-wrapper"), o3 = +t2.scrollHeight, n2 = +t2.clientHeight;
    o3 !== n2 && e3 >= o3 - n2 - 50 && x2("scrollLoad");
  }
  return watch(() => Y2.heightStyle, (e3) => {
    R2.value && (R2.value.recalculate(), R2.value.refreshScroll()), B.set("nx_height-style", Y2.heightStyle), x2("styleChange", e3);
  }), watch(() => Y2.borderColor, (e3) => {
    e3 || (Y2.borderColor = "#E6E8EA"), B.set("nx_border-color", e3);
  }), onMounted(async () => {
    nextTick(() => {
      const e3 = R2.value, t2 = j2.value;
      t2 && (e3 == null ? void 0 : e3.connect(t2));
    }), Y2.tableTh = M2.cacheKey ? await V2.value.initDropdownData() : M2.th, Y2.tableTh.forEach((e3) => {
      switch (e3.type) {
        case "search":
        case "number":
          e3.template = "";
          break;
        case "filter":
          e3.template = e3.options.map((e4) => e4.key), e3.checkAll = true;
      }
    });
  }), o2({ tableEmit: function(e3, ...t2) {
    return R2.value[e3](...t2);
  }, runCache: function() {
    V2.value.cacheDropdownData();
  } }), (t2, o3) => {
    const C2 = resolveComponent("vxe-toolbar"), _2 = resolveComponent("vxe-table-column"), E2 = resolveComponent("vxe-table-colgroup"), D2 = resolveComponent("el-date-picker"), k2 = resolveComponent("el-popover"), T2 = resolveComponent("el-checkbox"), P3 = resolveComponent("el-checkbox-group"), B2 = resolveComponent("el-scrollbar"), Q2 = resolveComponent("el-input"), J2 = resolveComponent("el-autocomplete"), ee2 = resolveComponent("vxe-table"), te2 = resolveComponent("el-pagination");
    return openBlock(), createElementBlock("div", { class: "nx-table-x", style: normalizeStyle({ maxHeight: M2.showSum ? M2.toolBar.toolbarShow ? "calc(100% - 86px)" : "calc(100% - 36px)" : M2.toolBar.toolbarShow ? "calc(100% - 50px)" : "100%" }) }, [(openBlock(), createBlock(KeepAlive, null, [createVNode(co, { "border-color": Y2.borderColor, "onUpdate:borderColor": o3[0] || (o3[0] = (e3) => Y2.borderColor = e3), "cache-key": M2.cacheKey, "height-style": Y2.heightStyle, "onUpdate:heightStyle": o3[1] || (o3[1] = (e3) => Y2.heightStyle = e3) }, null, 8, ["border-color", "cache-key", "height-style"])], 1024)), createBaseVNode("div", { class: normalizeClass({ "tool-bar": M2.toolBar.toolbarShow, "set-border": M2.toolBar.borderShow }) }, [withDirectives(createVNode(C2, mergeProps({ ref_key: "nxToolbar", ref: j2 }, M2.toolBar), { buttons: withCtx(() => [renderSlot(t2.$slots, "toolBarBtns", {}, void 0, true)]), _: 3 }, 16), [[vShow, M2.toolBar.toolbarShow]]), M2.th.length && Y2.showFilter && M2.cacheKey ? (openBlock(), createBlock(ro, { key: 0, ref_key: "filter", ref: V2, "border-color": Y2.borderColor, "onUpdate:borderColor": o3[2] || (o3[2] = (e3) => Y2.borderColor = e3), "height-style": Y2.heightStyle, "onUpdate:heightStyle": o3[3] || (o3[3] = (e3) => Y2.heightStyle = e3), "cache-key": M2.cacheKey, th: M2.th, hasToolBar: M2.toolBar.toolbarShow, "height-control": M2.heightControl, "table-th": Y2.tableTh, "dropdown-class": M2.dropdownClass, onFixedChange: H2, onCheckChange: K2, onFilterSort: q2 }, null, 8, ["border-color", "height-style", "cache-key", "th", "hasToolBar", "height-control", "table-th", "dropdown-class"])) : createCommentVNode("", true)], 2), withDirectives(createVNode(ee2, mergeProps({ ref_key: "nxTable", ref: R2, border: "none", data: M2.tr, resizable: "" }, M2.attributes, { "auto-resize": "", height: M2.height, "highlight-hover-row": M2.highlightHoverRow, "show-header": "", "show-header-overflow": "", "show-overflow": M2.showOverflow, loading: false, "scroll-x": M2.scrollX, "scroll-y": M2.scrollY, "column-config": { minWidth: 88 }, "print-config": {}, class: { "height-medium": "small" === Y2.heightStyle && M2.heightControl, "height-compact": "mini" === Y2.heightStyle && M2.heightControl }, "cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": Y2.borderColor }, "header-cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": Y2.borderColor }, "footer-cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": Y2.borderColor }, style: { "border-color": Y2.borderColor } }, toHandlers(M2.events), { toolbar: { refresh: true }, onRefreshChange: L2, onScroll: Z2, onResizableChange: $2 }), { empty: withCtx(() => [createTextVNode(toDisplayString(M2.loading ? "数据加载中" : "暂无数据"), 1)]), default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(Y2.tableTh, (e3) => (openBlock(), createElementBlock(Fragment, null, [e3.children && false !== e3.show && false !== e3.visible ? (openBlock(), createBlock(E2, mergeProps({ key: e3.title }, e3), { default: withCtx(() => [createBaseVNode("template", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.children, (e4) => (openBlock(), createBlock(_2, mergeProps({ key: e4.title, fixed: null }, e4), { default: withCtx((o4) => [renderSlot(t2.$slots, e4.field, { scope: o4, params: e4.params }, () => [createTextVNode(toDisplayString(o4.row[e4.field]), 1)], true)]), _: 2 }, 1040))), 128))])]), _: 2 }, 1040)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [false !== e3.show && false !== e3.visible ? (openBlock(), createBlock(_2, mergeProps({ key: e3.title || "selection" }, e3), createSlots({ _: 2 }, ["seq" !== e3.type && "checkbox" !== e3.type ? { name: "header", fn: withCtx((n2) => ["date" === e3.type ? (openBlock(), createBlock(k2, { key: 0, placement: "bottom-start", width: 260, "popper-class": "popper-filter", trigger: "hover" }, { reference: withCtx(() => [createBaseVNode("div", { onClick: o3[4] || (o3[4] = withModifiers(() => {
    }, ["stop"])) }, [createTextVNode(toDisplayString(n2.column.title) + " ", 1), e3.value ? (openBlock(), createElementBlock("span", fo, go)) : (openBlock(), createElementBlock("span", ho, po))])]), default: withCtx(() => [createVNode(D2, { modelValue: e3.value, "onUpdate:modelValue": (t3) => e3.value = t3, type: "daterange", "unlink-panels": "", "range-separator": "至", "start-placeholder": "开始日期", "end-placeholder": "结束日期", "value-format": "YYYY-MM-DD", style: { width: "260px" }, "picker-options": unref(z2), onChange: (t3) => x2("filter-confirm", e3.field, e3.value) }, null, 8, ["modelValue", "onUpdate:modelValue", "picker-options", "onChange"])]), _: 2 }, 1024)) : "filter" === e3.type ? (openBlock(), createBlock(k2, { key: 1, width: 260, placement: "bottom-start", "popper-class": "popper-filter", trigger: "hover" }, { reference: withCtx(() => [createBaseVNode("div", { onClick: o3[5] || (o3[5] = withModifiers(() => {
    }, ["stop"])) }, [createTextVNode(toDisplayString(n2.column.title) + " ", 1), 0 === e3.value.length ? (openBlock(), createElementBlock("span", Co, So)) : (openBlock(), createElementBlock("span", xo, _o))])]), default: withCtx(() => [createBaseVNode("div", mo, [createBaseVNode("div", { class: normalizeClass({ disabled: e3.options.length === e3.template.length }), onClick: (t3) => function(e4) {
      e4.template.length !== e4.options.length && (e4.checkAll = true, e4.template = e4.options.map((e5) => e5.key), e4.value = [], x2("filter-confirm", e4.field, []));
    }(e3) }, " 重置 ", 10, vo), createBaseVNode("div", { class: normalizeClass({ disabled: 0 === e3.template.length }), onClick: (t3) => function(e4) {
      0 !== e4.template.length && (e4.value = e4.template.length === e4.options.length ? [] : e4.template, x2("filter-confirm", e4.field, e4.value));
    }(e3) }, " 筛选 ", 10, bo)]), createBaseVNode("div", yo, [createVNode(B2, { style: { height: "100%" } }, { default: withCtx(() => [createBaseVNode("ul", null, [createVNode(T2, { modelValue: e3.checkAll, "onUpdate:modelValue": (t3) => e3.checkAll = t3, indeterminate: 0 !== e3.template.length && e3.template.length !== e3.options.length, label: "全部", onChange: (t3) => function(e4, t4) {
      t4.template = e4 ? t4.options.map((e5) => e5.key) : [];
    }(t3, e3) }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onChange"])]), createVNode(P3, { modelValue: e3.template, "onUpdate:modelValue": (t3) => e3.template = t3, onChange: (t3) => e3.checkAll = e3.template.length === e3.options.length }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.options, (t3) => (openBlock(), createElementBlock("ul", { key: t3.key }, [createVNode(T2, { label: t3.key }, { default: withCtx(() => [createTextVNode(toDisplayString(t3.label), 1)]), _: 2 }, 1032, ["label"]), createBaseVNode("div", { class: "only", onClick: (o4) => function(e4, t4) {
      e4.template = [t4.key], e4.value = e4.template, x2("filter-confirm", e4.field, e4.value);
    }(e3, t3) }, "仅筛选此项", 8, wo)]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])]), _: 2 }, 1024)])]), _: 2 }, 1024)) : "search" === e3.type || "number" === e3.type ? (openBlock(), createBlock(k2, { key: 2, width: 260, "popper-class": "popper-filter", placement: "bottom-start", trigger: "hover" }, { reference: withCtx(() => [createBaseVNode("div", { onClick: o3[6] || (o3[6] = withModifiers(() => {
    }, ["stop"])) }, [createTextVNode(toDisplayString(n2.column.title) + " ", 1), e3.value ? (openBlock(), createElementBlock("span", ko, To)) : (openBlock(), createElementBlock("span", Eo, Do))])]), default: withCtx(() => [e3.selectList ? (openBlock(), createBlock(J2, { key: 1, modelValue: e3.template, "onUpdate:modelValue": (t3) => e3.template = t3, placeholder: "请输入搜索内容", "fetch-suggestions": (t3, o4) => {
      !function(e4, t4, o5) {
        let n3 = o5.selectList;
        n3 = o5.selectList.filter((t5) => -1 !== t5.toLowerCase().indexOf(e4.toLowerCase())), t4(n3.map((e5) => ({ value: e5 })));
      }(t3, o4, e3);
    }, clearable: "", name: e3.field, "popper-append-to-body": false, onChange: (t3) => G2(e3), onSelect: (t3) => G2(e3), onClear: (t3) => G2(e3) }, null, 8, ["modelValue", "onUpdate:modelValue", "fetch-suggestions", "name", "onChange", "onSelect", "onClear"])) : (openBlock(), createBlock(Q2, { key: 0, modelValue: e3.template, "onUpdate:modelValue": (t3) => e3.template = t3, placeholder: "请输入搜索内容", maxlength: "30", clearable: "", onChange: (t3) => G2(e3) }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]))]), _: 2 }, 1024)) : renderSlot(t2.$slots, e3.field + "_header", { key: 3, scope: n2, params: e3.params }, () => [createTextVNode(toDisplayString(n2.column.title), 1)], true)]), key: "0" } : void 0, "seq" !== e3.type && "checkbox" !== e3.type ? { name: "default", fn: withCtx((o4) => [renderSlot(t2.$slots, e3.slots ? e3.slots : e3.field, { scope: o4, params: e3.params }, () => [createTextVNode(toDisplayString(o4.row[e3.field]), 1)], true)]), key: "1" } : void 0]), 1040)) : createCommentVNode("", true)], 64))], 64))), 256)), M2.operateColumn ? (openBlock(), createBlock(_2, { key: "operate", title: "操作", fixed: M2.operateFixed, width: M2.operateWidth ? M2.operateWidth : "60", align: "center" }, { default: withCtx((e3) => [createBaseVNode("div", null, [renderSlot(t2.$slots, "operate_slot", { scope: e3 }, void 0, true)])]), _: 3 }, 8, ["fixed", "width"])) : createCommentVNode("", true)]), _: 3 }, 16, ["data", "height", "highlight-hover-row", "show-overflow", "scroll-x", "scroll-y", "class", "cell-style", "header-cell-style", "footer-cell-style", "style"]), [[vShow, Y2.tableTh.length]]), e2.showSum ? (openBlock(), createElementBlock("div", Oo, " 已加载" + toDisplayString(M2.tr.length) + "条，共计" + toDisplayString(M2.total) + "条 ", 1)) : createCommentVNode("", true), withDirectives(createBaseVNode("div", { class: "scroll-loading", style: normalizeStyle({ bottom: M2.showSum ? "54px" : "18px" }) }, No, 4), [[vShow, M2.loading]]), unref(F2) ? (openBlock(), createBlock(te2, { key: 1, "current-page": unref(X2), "page-sizes": [30, 40, 50, 100], "page-size": M2.page.pageSize, layout: "total, sizes, prev, pager, next, jumper", total: M2.total, onSizeChange: W2, onCurrentChange: U2 }, null, 8, ["current-page", "page-size", "total"])) : createCommentVNode("", true)], 4);
  };
} });
var Io = j(Ao, [["__scopeId", "data-v-72dda2ae"]]);
function Mo(e2) {
  return async function(t2, o2) {
    let n2;
    t2.loading = true;
    try {
      n2 = await e2(o2);
    } catch (e3) {
    } finally {
      t2.loading = false;
    }
    return n2;
  };
}
function Po(e2) {
  return isRef(e2) ? e2.value : e2;
}
function Bo(e2, t2, o2, n2, a2) {
  const l2 = /* @__PURE__ */ new Map();
  let i2 = false;
  "object" == typeof n2 && a2 && (i2 = true);
  const r2 = async (r3 = false, s2 = (e3) => e3) => {
    var _a;
    let c2;
    if (i2) {
      if (!l2.has(Po(a2))) {
        const e3 = Mo(n2[Po(a2)]);
        l2.set(Po(a2), e3);
      }
      c2 = l2.get(Po(a2));
    } else
      c2 = Mo(n2);
    r3 && (t2.tr = [], o2.current = 1);
    const d2 = await c2(t2, o2);
    if (!d2)
      return;
    const { records: u2 = [], total: h2 = 0 } = s2(d2);
    t2.tr.push(...u2), t2.total = h2, (_a = e2.value) == null ? void 0 : _a.tableEmit("updateData");
  };
  return { getListData: r2, scrollLoad: async () => {
    (t2 == null ? void 0 : t2.loading) || t2.total <= t2.tr.length || (o2.current++, await r2());
  } };
}
Io.name = "NxTable", Io.install = function(e2) {
  e2.component(Io.name, Io);
};
var Yo = [L, Io, H];
var Vo = function(e2) {
  Yo.forEach((t2) => {
    e2.component(t2.name, t2);
  });
};
"undefined" != typeof window && (window.NXUI = { install: Vo }, window.$db = B, B.open());
var zo = { install: Vo };
export {
  zo as Nxui,
  B as db,
  Bo as useTableData
};
//# sourceMappingURL=@jinxb_nexus-ui.js.map
