"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  formatVND: () => formatVND,
  normalizeName: () => normalizeName,
  removeTone: () => removeTone,
  shortenNumber: () => shortenNumber,
  slugify: () => slugify
});
module.exports = __toCommonJS(index_exports);

// src/finance/index.ts
var formatVND = (amount, suffix = "\u0111") => {
  if (!amount && amount !== 0) return `0${suffix}`;
  const num = Number(amount);
  if (isNaN(num)) return `0${suffix}`;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
};
var shortenNumber = (num, toFixed) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(toFixed || 1).replace(/\.0$/, "") + "t\u1EF7";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(toFixed || 1).replace(/\.0$/, "") + "tr";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(toFixed || 1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

// src/string/index.ts
var removeTone = (str) => {
  if (!str) return "";
  let result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  result = result.replace(/đ/g, "d").replace(/Đ/g, "D");
  return result;
};
var slugify = (str) => {
  if (!str) return "";
  return removeTone(str).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
};
var normalizeName = (str) => {
  if (!str) return "";
  return str.toLowerCase().trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatVND,
  normalizeName,
  removeTone,
  shortenNumber,
  slugify
});
