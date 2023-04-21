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

// node_modules/.pnpm/@jinxb+nexus-ui@1.2.2/node_modules/@jinxb/nexus-ui/nxui.min.es.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var IndexDB = class {
  constructor(dbName, ver) {
    __publicField(this, "_db");
    __publicField(this, "_indexedDB");
    __publicField(this, "dbName");
    __publicField(this, "ver");
    this._db = null;
    this.dbName = dbName || "nexus-ui";
    this.ver = ver || 1;
    this._indexedDB = typeof window !== "undefined" && window.indexedDB;
  }
  open() {
    return new Promise((resolve, reject) => {
      if (this._db) {
        resolve(this._db);
      } else {
        if (!this._indexedDB) {
          console.log("浏览器不支持IndexedDB，请检查");
          return;
        }
        const dbRequest = this._indexedDB.open(this.dbName, this.ver);
        dbRequest.onupgradeneeded = () => {
          if (!dbRequest.result.objectStoreNames.contains("table")) {
            dbRequest.result.createObjectStore("table", { autoIncrement: true });
          }
        };
        dbRequest.onsuccess = () => {
          this._db = dbRequest.result;
          resolve(dbRequest.result);
        };
        dbRequest.onerror = (err) => {
          resolve(err);
        };
      }
    });
  }
  /**
   *
   * @param key
   * @param val
   * @param name 表名
   */
  async set(key, val, name = "table") {
    const db2 = await this.open();
    return new Promise((resolve, reject) => {
      const dbRequest = db2.transaction([name], "readwrite").objectStore(name).put(val, key);
      dbRequest.onsuccess = () => {
        resolve(dbRequest.result);
      };
      dbRequest.onerror = (err) => {
        reject(err);
      };
    });
  }
  /**
   * @param name 表名
   * @param key
   */
  async get(key, name = "table") {
    const db2 = await this.open();
    return new Promise((resolve, reject) => {
      const request = db2.transaction([name]).objectStore(name).get(key);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }
  /**
   * @param name 表名
   * @param key
   */
  async remove(key, name = "table") {
    const db2 = await this.open();
    return new Promise((resolve, reject) => {
      const request = db2.transaction([name], "readwrite").objectStore(name).delete(key);
      request.onsuccess = function() {
        resolve();
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }
  /**
   * @param name 表名
   */
  async clear(name = "table") {
    const db2 = await this.open();
    return new Promise((resolve, reject) => {
      const request = db2.transaction([name], "readwrite").objectStore(name).clear();
      request.onsuccess = function() {
        resolve();
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }
};
var db = new IndexDB();
var _hoisted_1$4 = { class: "btn-list" };
var _hoisted_2$2 = { class: "form-search" };
var _hoisted_3$2 = {
  key: 0,
  class: "label"
};
var _hoisted_4$2 = { class: "left" };
var _hoisted_5$2 = { class: "right" };
var __default__$2 = {
  name: "NxTab"
};
var _sfc_main$4 = defineComponent({
  ...__default__$2,
  props: {
    btnList: {
      type: Array,
      default: () => []
    },
    screenData: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => {
      }
    },
    showBorder: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { emit }) {
    const props = __props;
    const data = reactive({
      page: {}
    });
    watchEffect(() => {
      data.page = props.page || {};
    });
    const onSelectChange = (value, key) => {
      emit(`update:page[${key}]`, value);
      emit("filterChange");
    };
    const handleClear = () => {
      for (const key in data.page) {
        data.page[key] = "";
      }
      emit("filterChange");
    };
    const handleQuery = () => {
      emit("filterChange");
    };
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_el_input = resolveComponent("el-input");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["nx-tab", { "set-border": __props.showBorder }])
      }, [
        createBaseVNode("div", _hoisted_1$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.btnList, (item, index2) => {
            return withDirectives((openBlock(), createBlock(_component_el_button, mergeProps({
              key: index2,
              size: item.size || "small",
              disabled: item.disabled,
              type: item.type || "primary"
            }, item.options, {
              onClick: ($event) => item.cb()
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(item.name), 1)
              ]),
              _: 2
            }, 1040, ["size", "disabled", "type", "onClick"])), [
              [vShow, item.show]
            ]);
          }), 128)),
          renderSlot(_ctx.$slots, "funBtn", {}, void 0, true)
        ]),
        createBaseVNode("div", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.screenData, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              key: index2,
              class: "form-block"
            }, [
              createBaseVNode("div", {
                class: "form-block-label",
                style: normalizeStyle({ width: (item.width || 130) + "px" })
              }, [
                item.label ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(item.label), 1)) : createCommentVNode("", true)
              ], 4),
              item.type === "select" ? (openBlock(), createBlock(_component_el_select, mergeProps({
                key: 0,
                style: { width: (item.width || 240) + "px" }
              }, item, {
                clearable: item.clearable,
                onChange: ($event) => onSelectChange($event, item.key),
                modelValue: data.page[item.key],
                "onUpdate:modelValue": ($event) => data.page[item.key] = $event,
                placeholder: item.placeholder || "请选择"
              }), {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.options, (itemB) => {
                    return openBlock(), createBlock(_component_el_option, mergeProps({
                      key: itemB.value
                    }, itemB), null, 16);
                  }), 128))
                ]),
                _: 2
              }, 1040, ["style", "clearable", "onChange", "modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
              item.type === "date" ? (openBlock(), createBlock(_component_el_date_picker, mergeProps({
                key: 1,
                modelValue: data.page[item.key],
                "onUpdate:modelValue": ($event) => data.page[item.key] = $event
              }, item, {
                type: "daterange",
                style: { width: (item.width || 240) + "px" },
                "range-separator": "至",
                "start-placeholder": "开始日期",
                "end-placeholder": "结束日期",
                "value-format": "YYYY-MM-DD",
                onChange: ($event) => onSelectChange($event, item.key)
              }), null, 16, ["modelValue", "onUpdate:modelValue", "style", "onChange"])) : createCommentVNode("", true),
              item.type === "input" ? (openBlock(), createBlock(_component_el_input, {
                key: 2,
                style: normalizeStyle({ width: (item.width || 240) + "px" }),
                onChange: ($event) => onSelectChange($event, item.key),
                clearable: "",
                modelValue: data.page[item.key],
                "onUpdate:modelValue": ($event) => data.page[item.key] = $event,
                modelModifiers: { trim: true },
                placeholder: item.placeholder || "请输入"
              }, null, 8, ["style", "onChange", "modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true)
            ]);
          }), 128)),
          renderSlot(_ctx.$slots, "other", {}, void 0, true)
        ]),
        createBaseVNode("div", {
          class: "search-btn",
          style: normalizeStyle({ "margin-left": `calc(${data.page["search_left_width"] || "130px"}` })
        }, [
          createBaseVNode("div", _hoisted_4$2, [
            renderSlot(_ctx.$slots, "search_left", {}, void 0, true),
            createVNode(_component_el_button, {
              class: "btn",
              type: "primary",
              size: "mini",
              plain: "",
              onClick: handleClear
            }, {
              default: withCtx(() => [
                createTextVNode("清空")
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              class: "btn",
              type: "primary",
              size: "mini",
              onClick: handleQuery
            }, {
              default: withCtx(() => [
                createTextVNode("查询")
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_5$2, [
            renderSlot(_ctx.$slots, "search_right", {}, void 0, true)
          ])
        ], 4)
      ], 2);
    };
  }
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var NxTab = _export_sfc(_sfc_main$4, [["__scopeId", "data-v-acfb8084"]]);
NxTab.name = "NxTab";
NxTab.install = function(app) {
  app.component(NxTab.name, NxTab);
};
var _hoisted_1$3 = { class: "nx-tabs" };
var __default__$1 = {
  name: "NxTabs"
};
var _sfc_main$3 = defineComponent({
  ...__default__$1,
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    initEmit: {
      type: Boolean,
      default: false
    },
    tabType: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    let activeName = ref("");
    if (props && (props == null ? void 0 : props.data.length)) {
      activeName = ref((_a = props == null ? void 0 : props.data[0]) == null ? void 0 : _a.name);
    }
    const handleClick = (...tab) => {
      emits("change", activeName.value, tab);
    };
    if (props.initEmit && activeName.value) {
      handleClick(props == null ? void 0 : props.data[0]);
    }
    return (_ctx, _cache) => {
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(_component_el_tabs, {
          modelValue: unref(activeName),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(activeName) ? activeName.value = $event : activeName = $event),
          type: __props.tabType,
          onTabClick: handleClick
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (tab, index2) => {
              return openBlock(), createElementBlock(Fragment, null, [
                tab.visible !== false ? (openBlock(), createBlock(_component_el_tab_pane, {
                  key: index2,
                  disabled: tab.disabled,
                  label: tab.label,
                  name: tab.name
                }, null, 8, ["disabled", "label", "name"])) : createCommentVNode("", true)
              ], 64);
            }), 256))
          ]),
          _: 1
        }, 8, ["modelValue", "type"])
      ]);
    };
  }
});
var NxTabs = _export_sfc(_sfc_main$3, [["__scopeId", "data-v-57af5f6f"]]);
NxTabs.name = "NxTabs";
NxTabs.install = function(app) {
  app.component(NxTabs.name, NxTabs);
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var version = "1.14.0";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector)
    return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx)
        break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window)
    return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    if (parentSide === "top" || parentSide === "left") {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible)
      return parent;
    if (parent === getWindowScrollingElement())
      break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i))
      continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
        return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect)
    return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body)
          return getWindowScrollingElement();
        if (gotSelf || includeSelf)
          return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation)
        return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost)
          return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function")
          callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function")
          callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function")
            callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault)
        return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2))
        continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function")
        return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable)
    return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl;
var parentEl;
var ghostEl;
var rootEl;
var nextEl;
var lastDownEl;
var cloneEl;
var cloneHidden;
var oldIndex;
var newIndex;
var oldDraggableIndex;
var newDraggableIndex;
var activeGroup;
var putSortable;
var awaitingDragStarted = false;
var ignoreNextClick = false;
var sortables = [];
var tapEvt;
var touchEvt;
var lastDx;
var lastDy;
var tapDistanceLeft;
var tapDistanceTop;
var moved;
var lastTarget;
var lastDirection;
var pastFirstInvertThresh = false;
var isCircumstantialInvert = false;
var targetMoveDistance;
var ghostRelativeParent;
var ghostRelativeParentInitialScroll = [];
var _silent = false;
var savedInputChecked = [];
var documentExists = typeof document !== "undefined";
var PositionGhostAbsolutely = IOS;
var CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float";
var supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div");
var supportCssPointerEvents = function() {
  if (!documentExists)
    return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}();
var _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
};
var _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
};
var _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable))
      return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
};
var _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
};
var _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
};
var _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable)
      return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mouseup", _this._onDrop);
      on(ownerDocument, "touchend", _this._onDrop);
      on(ownerDocument, "touchcancel", _this._onDrop);
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(ownerDocument, "mouseup", _this._disableDelayedDrag);
        on(ownerDocument, "touchend", _this._disableDelayedDrag);
        on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent)
          break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document)
            ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled)
        return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent)
      return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled)
      return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled)
        return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled)
        return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array)
    plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils)
      Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [];
var scrollEl;
var scrollRootEl;
var scrolling = false;
var lastAutoScrollX;
var lastAutoScrollY;
var touchEvt$1;
var pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll)
    return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent)
    return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
var _hoisted_1$2 = createBaseVNode("i", { class: "el-icon-s-grid" }, null, -1);
var _hoisted_2$1 = createBaseVNode("i", { class: "el-icon-caret-bottom" }, null, -1);
var _hoisted_3$1 = createBaseVNode("div", { class: "nx-dropdown-title" }, "列表设置", -1);
var _hoisted_4$1 = {
  key: 0,
  class: "nx-dropdown-height"
};
var _hoisted_5$1 = createBaseVNode("span", null, "行高设置", -1);
var _hoisted_6$1 = createBaseVNode("i", { class: "icon-easy" }, null, -1);
var _hoisted_7$1 = createBaseVNode("i", { class: "icon-medium" }, null, -1);
var _hoisted_8$1 = createBaseVNode("i", { class: "icon-compact" }, null, -1);
var _hoisted_9$1 = { class: "nx-dropdown-border" };
var _hoisted_10$1 = createBaseVNode("span", null, "边框颜色", -1);
var _hoisted_11$1 = ["onClick"];
var _hoisted_12$1 = ["onClick"];
var _sfc_main$2 = defineComponent({
  __name: "filter-x",
  props: {
    th: {
      type: Array,
      required: true
    },
    tableTh: {
      type: Array,
      required: true
    },
    cacheKey: {
      type: String,
      default: ""
    },
    heightStyle: {
      type: String,
      default: "medium"
    },
    dropdownClass: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: "#E6E8EA"
    },
    heightControl: {
      type: Boolean,
      default: true
    },
    hasToolBar: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { expose, emit }) {
    const props = __props;
    const show = ref(true);
    watch(
      () => props.th.length,
      () => {
        cacheDropdownData();
      }
    );
    function colorChange(value) {
      emit("update:borderColor", value);
      db.set("nx_border-color", props.borderColor);
    }
    function setFixed(item, type) {
      emit("fixedChange", item, type);
    }
    function checkChange(item) {
      emit("checkChange", item);
    }
    function sort2(evt) {
      const { oldIndex: oldIndex2, newIndex: newIndex2 } = evt;
      emit("filterSort", oldIndex2, newIndex2);
      show.value = false;
      nextTick(() => {
        show.value = true;
        setTimeout(() => {
          visibleChange(true);
        }, 100);
      });
    }
    function visibleChange(flag) {
      if (flag) {
        const dom = document.querySelector(props.dropdownClass ? `.${props.dropdownClass}` : ".nx-dropdown-items");
        Sortable.create(dom, {
          animation: 150,
          onEnd: sort2,
          handle: ".drag",
          draggable: ".drags"
        });
      }
    }
    function cacheDropdownData() {
      if (!props.cacheKey) {
        return;
      }
      const dropdownDataItem = props.th.map((data) => {
        return { title: data.title, visible: data.visible, resizeWidth: data.resizeWidth, fixed: data.fixed || null };
      });
      db.set(props.cacheKey, dropdownDataItem);
    }
    const initDropdownData = async () => {
      if (!props.cacheKey) {
        return props.th;
      }
      try {
        const dropdownDataStr = await db.get(props.cacheKey);
        props.th.forEach((value) => {
          value.visible = value.visible !== void 0 ? !!value.visible : true;
          value.fixed = value.fixed || null;
          if (value.children) {
            value.children.forEach((item) => {
              item.fixed = null;
            });
          }
        });
        if (dropdownDataStr) {
          const dropdownData = dropdownDataStr;
          dropdownData.forEach((item, index2) => {
            item.index = index2;
          });
          props.th.forEach((value) => {
            const cacheDropdown = dropdownData.find((dropdown) => dropdown.title === value.title);
            if (cacheDropdown) {
              value.visible = cacheDropdown.visible !== void 0 ? cacheDropdown.visible : value.visible;
              value.index = cacheDropdown.index;
              value.fixed = cacheDropdown.fixed || null;
              if (cacheDropdown.resizeWidth) {
                value.resizeWidth = cacheDropdown.resizeWidth;
                value.width = cacheDropdown.resizeWidth;
              }
            }
          });
          props.th.sort((a, b) => a.index - b.index);
          return props.th;
        }
        return props.th;
      } catch (err) {
        return props.th;
      }
    };
    expose({
      initDropdownData,
      cacheDropdownData
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_color_picker = resolveComponent("el-color-picker");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["nx-table-filter", { "default-style": !__props.hasToolBar, "has-tools": __props.hasToolBar }])
      }, [
        createVNode(_component_el_dropdown, {
          trigger: "click",
          "hide-on-click": false,
          placement: "bottom-end",
          onVisibleChange: visibleChange
        }, {
          dropdown: withCtx(() => [
            createVNode(_component_el_dropdown_menu, { class: "nx-dropdown" }, {
              default: withCtx(() => [
                _hoisted_3$1,
                __props.heightControl ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
                  _hoisted_5$1,
                  createBaseVNode("div", {
                    class: normalizeClass({ active: __props.heightStyle === "medium" }),
                    onClick: _cache[0] || (_cache[0] = ($event) => emit("update:heightStyle", "medium"))
                  }, [
                    _hoisted_6$1,
                    createTextVNode("宽松 ")
                  ], 2),
                  createBaseVNode("div", {
                    class: normalizeClass({ active: __props.heightStyle === "small" }),
                    onClick: _cache[1] || (_cache[1] = ($event) => emit("update:heightStyle", "small"))
                  }, [
                    _hoisted_7$1,
                    createTextVNode("中等 ")
                  ], 2),
                  createBaseVNode("div", {
                    class: normalizeClass({ active: __props.heightStyle === "mini" }),
                    onClick: _cache[2] || (_cache[2] = ($event) => emit("update:heightStyle", "mini"))
                  }, [
                    _hoisted_8$1,
                    createTextVNode("紧凑 ")
                  ], 2)
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_9$1, [
                  _hoisted_10$1,
                  createBaseVNode("div", null, [
                    createBaseVNode("span", {
                      style: normalizeStyle({ "background-color": __props.borderColor })
                    }, null, 4),
                    createVNode(_component_el_color_picker, {
                      value: __props.borderColor,
                      "show-alpha": "",
                      onChange: colorChange
                    }, null, 8, ["value"])
                  ])
                ]),
                show.value ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(["nx-dropdown-items", __props.dropdownClass])
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tableTh, (item) => {
                    return openBlock(), createElementBlock(Fragment, null, [
                      item.show !== false ? (openBlock(), createBlock(_component_el_dropdown_item, {
                        key: item.title,
                        class: normalizeClass({ drags: !item.fixed }),
                        style: normalizeStyle([{ display: item.title ? "flex" : "none" }, { "align-items": "center" }])
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("i", {
                            class: normalizeClass(["el-icon-download fixed-left", { active: item.fixed === "left" }]),
                            onClick: ($event) => setFixed(item, "left")
                          }, null, 10, _hoisted_11$1),
                          createBaseVNode("i", {
                            class: normalizeClass(["el-icon-download fixed-right", { active: item.fixed === "right" }]),
                            onClick: ($event) => setFixed(item, "right")
                          }, null, 10, _hoisted_12$1),
                          createVNode(_component_el_checkbox, {
                            modelValue: item.visible,
                            "onUpdate:modelValue": ($event) => item.visible = $event,
                            style: { "width": "100%" },
                            class: "checkbox-item",
                            onChange: ($event) => checkChange(item)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"]),
                          !item.fixed ? (openBlock(), createElementBlock("i", {
                            key: 0,
                            class: normalizeClass(["iconfont icon-rank", { drag: !item.fixed }]),
                            style: { "color": "#c0c4cc", "margin-left": "10px", "font-size": "18px", "margin-right": "0" }
                          }, null, 2)) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["class", "style"])) : createCommentVNode("", true)
                    ], 64);
                  }), 256))
                ], 2)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_el_button, {
              size: "mini",
              class: "filter-button"
            }, {
              default: withCtx(() => [
                _hoisted_1$2,
                _hoisted_2$1
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 2);
    };
  }
});
var _sfc_main$1 = {
  name: "InitColor",
  props: {
    borderColor: {
      type: String,
      default: "#E6E8EA"
    },
    heightStyle: {
      type: String,
      default: "#E6E8EA"
    },
    cacheKey: {
      type: String,
      default: ""
    }
  },
  async activated() {
    const borderColor = await db.get("nx_border-color");
    const heightStyle = await db.get("nx_height-style");
    if (borderColor) {
      this.$emit("update:borderColor", borderColor);
    }
    if (heightStyle) {
      this.$emit("update:heightStyle", heightStyle);
    }
  }
};
var _hoisted_1$1 = { style: { "display": "none" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1);
}
var InitColor = _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
var _withScopeId = (n) => (pushScopeId("data-v-92810e87"), n = n(), popScopeId(), n);
var _hoisted_1 = {
  key: 0,
  class: "icon-filterh"
};
var _hoisted_2 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_3 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
var _hoisted_5 = {
  key: 1,
  class: "icon-filterhActive"
};
var _hoisted_6 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_7 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_8 = [
  _hoisted_6,
  _hoisted_7
];
var _hoisted_9 = { class: "btns" };
var _hoisted_10 = ["onClick"];
var _hoisted_11 = ["onClick"];
var _hoisted_12 = { class: "options" };
var _hoisted_13 = ["onClick"];
var _hoisted_14 = {
  key: 0,
  class: "icon-filterh"
};
var _hoisted_15 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_16 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_17 = [
  _hoisted_15,
  _hoisted_16
];
var _hoisted_18 = {
  key: 1,
  class: "icon-filterhActive"
};
var _hoisted_19 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_20 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_21 = [
  _hoisted_19,
  _hoisted_20
];
var _hoisted_22 = {
  key: 0,
  class: "icon-filterh"
};
var _hoisted_23 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_24 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_25 = [
  _hoisted_23,
  _hoisted_24
];
var _hoisted_26 = {
  key: 1,
  class: "icon-filterhActive"
};
var _hoisted_27 = _withScopeId(() => createBaseVNode("span", { class: "path1" }, null, -1));
var _hoisted_28 = _withScopeId(() => createBaseVNode("span", { class: "path2" }, null, -1));
var _hoisted_29 = [
  _hoisted_27,
  _hoisted_28
];
var _hoisted_30 = {
  key: 0,
  class: "table-sum"
};
var _hoisted_31 = _withScopeId(() => createBaseVNode("span", null, [
  createBaseVNode("i", { class: "el-icon-loading" }),
  createTextVNode("正在加载中 ")
], -1));
var _hoisted_32 = [
  _hoisted_31
];
var __default__ = {
  name: "NxTable"
};
var _sfc_main = defineComponent({
  ...__default__,
  props: {
    th: {
      type: Array,
      default: () => []
    },
    tr: {
      type: Array,
      default: () => []
    },
    attributes: {
      type: Object,
      default: () => {
      }
    },
    toolBar: {
      type: Object,
      default: () => ({
        toolbarShow: false,
        borderShow: true
      })
    },
    events: {
      type: Object,
      default: () => {
      }
    },
    operateColumn: {
      type: Boolean,
      default: false
    },
    operateWidth: {
      type: String,
      default: ""
    },
    operateFixed: {
      type: [String, Boolean],
      default: false
    },
    showSum: {
      type: Boolean,
      default: true
    },
    total: {
      type: [Number, String],
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    cacheKey: {
      type: String,
      default: ""
    },
    dropdownClass: {
      type: String,
      default: ""
    },
    scrollX: {
      type: Object,
      default: () => {
        return { gt: -1 };
      }
    },
    scrollY: {
      type: Object,
      default: () => {
        return { gt: -1 };
      }
    },
    showOverflow: {
      type: null,
      default: "tooltip"
    },
    heightControl: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "auto"
    },
    page: {
      type: Object,
      pageSize: {
        type: Number,
        default: 30
      },
      pageNum: {
        type: Number,
        default: 0
      },
      default: null
    },
    showPage: {
      type: Boolean,
      default: false
    },
    highlightHoverRow: {
      type: Boolean,
      default: true
    }
  },
  setup(__props, { expose, emit }) {
    const props = __props;
    const attrs = useAttrs();
    const data = reactive({
      loadingObj: {},
      tableTh: [],
      showFilter: true,
      heightStyle: "medium",
      borderColor: "#E6E8EA",
      cachePageSize: 30
    });
    const filter = ref(null);
    const pickerOptions = computed(() => {
      return {
        shortcuts: [{
          text: "今天",
          onClick(picker) {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 0);
            picker.emit("pick", [start, end]);
          }
        }, {
          text: "最近一周",
          onClick(picker) {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 7);
            picker.emit("pick", [start, end]);
          }
        }, {
          text: "最近一个月",
          onClick(picker) {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 30);
            picker.emit("pick", [start, end]);
          }
        }]
      };
    });
    const currentPage = computed(() => props.page.pageNum + 1);
    const pageExist = computed(() => props.page && props.page.pageNum >= 0 && props.page.pageSize && props.showPage);
    watch(
      () => props.cacheKey,
      () => {
        data.showFilter = false;
        data.tableTh = [];
        setTimeout(() => {
          data.showFilter = true;
          nextTick(async () => {
            data.tableTh = await filter.value.initDropdownData();
          });
        }, 50);
      }
    );
    watch(
      () => props.th.length,
      () => {
        if (!props.cacheKey)
          data.tableTh = props.th;
      }
    );
    const nxTable = ref();
    const nxToolbar = ref();
    watch(
      () => data.heightStyle,
      (value) => {
        if (nxTable.value) {
          nxTable.value.recalculate();
          nxTable.value.refreshScroll();
        }
        db.set("nx_height-style", data.heightStyle);
        emit("styleChange", value);
      }
    );
    watch(
      () => data.borderColor,
      (value) => {
        if (!value)
          data.borderColor = "#E6E8EA";
        db.set("nx_border-color", value);
      }
    );
    onMounted(async () => {
      nextTick(() => {
        const $table = nxTable.value;
        const $toolbar = nxToolbar.value;
        console.log($table, $toolbar);
        $toolbar && ($table == null ? void 0 : $table.connect($toolbar));
      });
      data.tableTh = props.cacheKey ? await filter.value.initDropdownData() : props.th;
      data.tableTh.forEach((th) => {
        switch (th.type) {
          case "search":
          case "number":
            th.template = "";
            break;
          case "filter":
            th.template = th.options.map((o) => {
              return o.key;
            });
            th.checkAll = true;
            break;
        }
      });
    });
    function handleCurrentChange(val) {
      const data2 = props.page;
      data2.pageNum = val - 1;
      emit("update:page", data2);
      emit("pageChange");
    }
    function handleSizeChange(val) {
      const data2 = props.page;
      data2.pageSize = val;
      db.set("pageSize", val);
      emit("update:page", data2);
      emit("pageChange");
    }
    function fixedChange(column, type) {
      var _a;
      data.tableTh.forEach((item) => {
        if (item.title === column.title) {
          if (item.fixed === type) {
            item.fixed = null;
          } else {
            item.fixed = type;
          }
          data.tableTh = [];
          nextTick(() => {
            data.tableTh = props.th;
          });
        }
      });
      (_a = nxTable == null ? void 0 : nxTable.value) == null ? void 0 : _a.recalculate(true);
      filter.value.cacheDropdownData();
    }
    function resizableChange({ column }) {
      const prop = props.th.find((item) => item.title === column.title);
      prop.resizeWidth = column.resizeWidth;
      filter.value.cacheDropdownData();
    }
    function checkChange(item) {
      const check = data.tableTh.find((value) => value.title === item.title);
      check.visible = item.visible;
      emit("headerChange", data.tableTh);
      filter.value.cacheDropdownData();
    }
    function runCache() {
      filter.value.cacheDropdownData();
    }
    function filterSort(oldIndex2, newIndex2) {
      const key = data.tableTh[oldIndex2];
      data.tableTh.splice(oldIndex2, 1);
      data.tableTh.splice(newIndex2, 0, key);
      emit("update:th", data.tableTh);
      emit("headerChange", data.tableTh);
      filter.value.cacheDropdownData();
    }
    function onCheckAllChange(value, head) {
      head.template = value ? head.options.map((o) => {
        return o.key;
      }) : [];
    }
    function onClickReset(head) {
      if (head.template.length === head.options.length) {
        return;
      }
      head.checkAll = true;
      head.template = head.options.map((o) => {
        return o.key;
      });
      head.value = [];
      emit("filter-confirm", head.field, []);
    }
    function onClickFilter(head) {
      if (head.template.length === 0) {
        return;
      }
      head.value = head.template.length === head.options.length ? [] : head.template;
      emit("filter-confirm", head.field, head.value);
    }
    function onClickOnly(head, option2) {
      head.template = [option2.key];
      head.value = head.template;
      emit("filter-confirm", head.field, head.value);
    }
    function querySearch(queryString, cb, head) {
      let list = head.selectList;
      list = head.selectList.filter((item) => {
        return item.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
      });
      cb(list.map((item) => {
        return { value: item };
      }));
    }
    function onChangeSearch(head) {
      let value = head.type === "number" ? parseFloat(head.template) : head.template;
      value = value || value === 0 ? value : "";
      if (head.type === "number" && value && (head.precision || head.precision === 0)) {
        value = value.toFixed(head.precision);
      }
      head.template = value;
      head.value = value;
      emit("filter-confirm", head.field, head.value);
    }
    function scrollEvent({ scrollTop }) {
      if (attrs.onScrollLoad === void 0 || props.loading)
        return;
      const el = nxTable.value.$el.querySelector(".vxe-table--body-wrapper");
      const scrollHeight = +el.scrollHeight;
      const clientHeight = +el.clientHeight;
      if (scrollHeight === clientHeight)
        return;
      if (scrollTop >= scrollHeight - clientHeight - 50) {
        emit("scrollLoad");
      }
    }
    function tableEmit(name, ...params) {
      return nxTable.value[name](...params);
    }
    expose({
      tableEmit,
      runCache
    });
    return (_ctx, _cache) => {
      const _component_vxe_toolbar = resolveComponent("vxe-toolbar");
      const _component_vxe_table_column = resolveComponent("vxe-table-column");
      const _component_vxe_table_colgroup = resolveComponent("vxe-table-colgroup");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_autocomplete = resolveComponent("el-autocomplete");
      const _component_vxe_table = resolveComponent("vxe-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      return openBlock(), createElementBlock("div", {
        class: "nx-table-x",
        style: normalizeStyle({ maxHeight: props.showSum ? props.toolBar.toolbarShow ? "calc(100% - 86px)" : "calc(100% - 36px)" : props.toolBar.toolbarShow ? "calc(100% - 50px)" : "100%" })
      }, [
        (openBlock(), createBlock(KeepAlive, null, [
          createVNode(InitColor, {
            "border-color": data.borderColor,
            "onUpdate:borderColor": _cache[0] || (_cache[0] = ($event) => data.borderColor = $event),
            "cache-key": props.cacheKey,
            "height-style": data.heightStyle,
            "onUpdate:heightStyle": _cache[1] || (_cache[1] = ($event) => data.heightStyle = $event)
          }, null, 8, ["border-color", "cache-key", "height-style"])
        ], 1024)),
        createBaseVNode("div", {
          class: normalizeClass({ "tool-bar": props.toolBar.toolbarShow, "set-border": props.toolBar.borderShow })
        }, [
          withDirectives(createVNode(_component_vxe_toolbar, mergeProps({
            ref_key: "nxToolbar",
            ref: nxToolbar
          }, props.toolBar), {
            buttons: withCtx(() => [
              renderSlot(_ctx.$slots, "toolBarBtns", {}, void 0, true)
            ]),
            _: 3
          }, 16), [
            [vShow, props.toolBar.toolbarShow]
          ]),
          props.th.length && data.showFilter && props.cacheKey ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            ref_key: "filter",
            ref: filter,
            "border-color": data.borderColor,
            "onUpdate:borderColor": _cache[2] || (_cache[2] = ($event) => data.borderColor = $event),
            "height-style": data.heightStyle,
            "onUpdate:heightStyle": _cache[3] || (_cache[3] = ($event) => data.heightStyle = $event),
            "cache-key": props.cacheKey,
            th: props.th,
            hasToolBar: props.toolBar.toolbarShow,
            "height-control": props.heightControl,
            "table-th": data.tableTh,
            "dropdown-class": props.dropdownClass,
            onFixedChange: fixedChange,
            onCheckChange: checkChange,
            onFilterSort: filterSort
          }, null, 8, ["border-color", "height-style", "cache-key", "th", "hasToolBar", "height-control", "table-th", "dropdown-class"])) : createCommentVNode("", true)
        ], 2),
        withDirectives(createVNode(_component_vxe_table, mergeProps({
          ref_key: "nxTable",
          ref: nxTable,
          border: "none",
          data: props.tr,
          resizable: ""
        }, props.attributes, {
          "auto-resize": "",
          height: props.height,
          "highlight-hover-row": props.highlightHoverRow,
          "show-header": "",
          "show-header-overflow": "",
          "show-overflow": props.showOverflow,
          loading: false,
          "scroll-x": props.scrollX,
          "scroll-y": props.scrollY,
          "column-config": { minWidth: 88 },
          "print-config": {},
          class: { "height-medium": data.heightStyle === "small" && props.heightControl, "height-compact": data.heightStyle === "mini" && props.heightControl },
          "cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": data.borderColor },
          "header-cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": data.borderColor },
          "footer-cell-style": { "border-right": "1px solid", "border-bottom": "1px solid", "border-color": data.borderColor },
          style: { "border-color": data.borderColor }
        }, toHandlers(props.events), {
          onScroll: scrollEvent,
          onResizableChange: resizableChange
        }), {
          empty: withCtx(() => [
            createTextVNode(toDisplayString(props.loading ? "数据加载中" : "暂无数据"), 1)
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(data.tableTh, (head) => {
              return openBlock(), createElementBlock(Fragment, null, [
                head.children && head.show !== false && head.visible !== false ? (openBlock(), createBlock(_component_vxe_table_colgroup, mergeProps({
                  key: head.title
                }, head), {
                  default: withCtx(() => [
                    createBaseVNode("template", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(head.children, (column) => {
                        return openBlock(), createBlock(_component_vxe_table_column, mergeProps({
                          key: column.title,
                          fixed: null
                        }, column), {
                          default: withCtx((scope) => [
                            renderSlot(_ctx.$slots, column.field, {
                              scope,
                              params: column.params
                            }, () => [
                              createTextVNode(toDisplayString(scope.row[column.field]), 1)
                            ], true)
                          ]),
                          _: 2
                        }, 1040);
                      }), 128))
                    ])
                  ]),
                  _: 2
                }, 1040)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  head.show !== false && head.visible !== false ? (openBlock(), createBlock(_component_vxe_table_column, mergeProps({
                    key: head.title || "selection"
                  }, head), createSlots({ _: 2 }, [
                    head.type !== "seq" && head.type !== "checkbox" ? {
                      name: "header",
                      fn: withCtx((scope) => [
                        head.type === "date" ? (openBlock(), createBlock(_component_el_popover, {
                          key: 0,
                          placement: "bottom-start",
                          width: 260,
                          "popper-class": "popper-filter",
                          trigger: "hover"
                        }, {
                          reference: withCtx(() => [
                            createBaseVNode("div", {
                              onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                              }, ["stop"]))
                            }, [
                              createTextVNode(toDisplayString(scope.column.title) + " ", 1),
                              !head.value ? (openBlock(), createElementBlock("span", _hoisted_1, _hoisted_4)) : (openBlock(), createElementBlock("span", _hoisted_5, _hoisted_8))
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_date_picker, {
                              modelValue: head.value,
                              "onUpdate:modelValue": ($event) => head.value = $event,
                              type: "daterange",
                              "unlink-panels": "",
                              "range-separator": "至",
                              "start-placeholder": "开始日期",
                              "end-placeholder": "结束日期",
                              "value-format": "YYYY-MM-DD",
                              style: { "width": "260px" },
                              "picker-options": unref(pickerOptions),
                              onChange: ($event) => emit("filter-confirm", head.field, head.value)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "picker-options", "onChange"])
                          ]),
                          _: 2
                        }, 1024)) : head.type === "filter" ? (openBlock(), createBlock(_component_el_popover, {
                          key: 1,
                          width: 260,
                          placement: "bottom-start",
                          "popper-class": "popper-filter",
                          trigger: "hover"
                        }, {
                          reference: withCtx(() => [
                            createBaseVNode("div", {
                              onClick: _cache[5] || (_cache[5] = withModifiers(() => {
                              }, ["stop"]))
                            }, [
                              createTextVNode(toDisplayString(scope.column.title) + " ", 1),
                              head.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_14, _hoisted_17)) : (openBlock(), createElementBlock("span", _hoisted_18, _hoisted_21))
                            ])
                          ]),
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_9, [
                              createBaseVNode("div", {
                                class: normalizeClass({ "disabled": head.options.length === head.template.length }),
                                onClick: ($event) => onClickReset(head)
                              }, "重置", 10, _hoisted_10),
                              createBaseVNode("div", {
                                class: normalizeClass({ "disabled": head.template.length === 0 }),
                                onClick: ($event) => onClickFilter(head)
                              }, "筛选", 10, _hoisted_11)
                            ]),
                            createBaseVNode("div", _hoisted_12, [
                              createVNode(_component_el_scrollbar, { style: { "height": "100%" } }, {
                                default: withCtx(() => [
                                  createBaseVNode("ul", null, [
                                    createVNode(_component_el_checkbox, {
                                      modelValue: head.checkAll,
                                      "onUpdate:modelValue": ($event) => head.checkAll = $event,
                                      indeterminate: head.template.length !== 0 && head.template.length !== head.options.length,
                                      label: "全部",
                                      onChange: ($event) => onCheckAllChange($event, head)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onChange"])
                                  ]),
                                  createVNode(_component_el_checkbox_group, {
                                    modelValue: head.template,
                                    "onUpdate:modelValue": ($event) => head.template = $event,
                                    onChange: ($event) => head.checkAll = head.template.length === head.options.length
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(head.options, (option2) => {
                                        return openBlock(), createElementBlock("ul", {
                                          key: option2.key
                                        }, [
                                          createVNode(_component_el_checkbox, {
                                            label: option2.key
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(option2.label), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["label"]),
                                          createBaseVNode("div", {
                                            class: "only",
                                            onClick: ($event) => onClickOnly(head, option2)
                                          }, "仅筛选此项", 8, _hoisted_13)
                                        ]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1024)) : head.type === "search" || head.type === "number" ? (openBlock(), createBlock(_component_el_popover, {
                          key: 2,
                          width: 260,
                          "popper-class": "popper-filter",
                          placement: "bottom-start",
                          trigger: "hover"
                        }, {
                          reference: withCtx(() => [
                            createBaseVNode("div", {
                              onClick: _cache[6] || (_cache[6] = withModifiers(() => {
                              }, ["stop"]))
                            }, [
                              createTextVNode(toDisplayString(scope.column.title) + " ", 1),
                              !head.value ? (openBlock(), createElementBlock("span", _hoisted_22, _hoisted_25)) : (openBlock(), createElementBlock("span", _hoisted_26, _hoisted_29))
                            ])
                          ]),
                          default: withCtx(() => [
                            !head.selectList ? (openBlock(), createBlock(_component_el_input, {
                              key: 0,
                              modelValue: head.template,
                              "onUpdate:modelValue": ($event) => head.template = $event,
                              placeholder: "请输入搜索内容",
                              maxlength: "30",
                              clearable: "",
                              onChange: ($event) => onChangeSearch(head)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock(_component_el_autocomplete, {
                              key: 1,
                              modelValue: head.template,
                              "onUpdate:modelValue": ($event) => head.template = $event,
                              placeholder: "请输入搜索内容",
                              "fetch-suggestions": (queryString, cb) => {
                                querySearch(queryString, cb, head);
                              },
                              clearable: "",
                              name: head.field,
                              "popper-append-to-body": false,
                              onChange: ($event) => onChangeSearch(head),
                              onSelect: ($event) => onChangeSearch(head),
                              onClear: ($event) => onChangeSearch(head)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "fetch-suggestions", "name", "onChange", "onSelect", "onClear"]))
                          ]),
                          _: 2
                        }, 1024)) : renderSlot(_ctx.$slots, head.field + "_header", {
                          key: 3,
                          scope,
                          params: head.params
                        }, () => [
                          createTextVNode(toDisplayString(scope.column.title), 1)
                        ], true)
                      ]),
                      key: "0"
                    } : void 0,
                    head.type !== "seq" && head.type !== "checkbox" ? {
                      name: "default",
                      fn: withCtx((scope) => [
                        renderSlot(_ctx.$slots, head.slots ? head.slots : head.field, {
                          scope,
                          params: head.params
                        }, () => [
                          createTextVNode(toDisplayString(scope.row[head.field]), 1)
                        ], true)
                      ]),
                      key: "1"
                    } : void 0
                  ]), 1040)) : createCommentVNode("", true)
                ], 64))
              ], 64);
            }), 256)),
            props.operateColumn ? (openBlock(), createBlock(_component_vxe_table_column, {
              key: "operate",
              title: "操作",
              fixed: props.operateFixed,
              width: props.operateWidth ? props.operateWidth : "60",
              align: "center"
            }, {
              default: withCtx((scope) => [
                createBaseVNode("div", null, [
                  renderSlot(_ctx.$slots, "operate_slot", { scope }, void 0, true)
                ])
              ]),
              _: 3
            }, 8, ["fixed", "width"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16, ["data", "height", "highlight-hover-row", "show-overflow", "scroll-x", "scroll-y", "class", "cell-style", "header-cell-style", "footer-cell-style", "style"]), [
          [vShow, data.tableTh.length]
        ]),
        __props.showSum ? (openBlock(), createElementBlock("div", _hoisted_30, "已加载" + toDisplayString(props.tr.length) + "条，共计" + toDisplayString(props.total) + "条", 1)) : createCommentVNode("", true),
        withDirectives(createBaseVNode("div", {
          class: "scroll-loading",
          style: normalizeStyle({ bottom: props.showSum ? "54px" : "18px" })
        }, _hoisted_32, 4), [
          [vShow, props.loading]
        ]),
        unref(pageExist) ? (openBlock(), createBlock(_component_el_pagination, {
          key: 1,
          "current-page": unref(currentPage),
          "page-sizes": [30, 40, 50, 100],
          "page-size": props.page.pageSize,
          layout: "total, sizes, prev, pager, next, jumper",
          total: props.total,
          onSizeChange: handleSizeChange,
          onCurrentChange: handleCurrentChange
        }, null, 8, ["current-page", "page-size", "total"])) : createCommentVNode("", true)
      ], 4);
    };
  }
});
var NxTable = _export_sfc(_sfc_main, [["__scopeId", "data-v-92810e87"]]);
NxTable.name = "NxTable";
NxTable.install = function(app) {
  app.component(NxTable.name, NxTable);
};
var components = [NxTab, NxTable, NxTabs];
var install = function(app) {
  components.forEach((cpn) => {
    app.component(cpn.name, cpn);
  });
};
if (typeof window !== "undefined") {
  window["NXUI"] = { install };
  window["$db"] = db;
  db.open();
}
var Nxui = { install };
export {
  Nxui,
  db
};
/*! Bundled license information:

@jinxb/nexus-ui/nxui.min.es.js:
  (**!
   * Sortable 1.14.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=@jinxb_nexus-ui.js.map
