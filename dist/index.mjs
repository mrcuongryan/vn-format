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
export {
  formatVND,
  normalizeName,
  removeTone,
  shortenNumber,
  slugify
};
