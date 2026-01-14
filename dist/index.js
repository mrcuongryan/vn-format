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
  getPhoneNetwork: () => getPhoneNetwork,
  getProvinces: () => getProvinces,
  isValidCCCD: () => isValidCCCD,
  isValidMST: () => isValidMST,
  isValidPhone: () => isValidPhone,
  isValidProvince: () => isValidProvince,
  maskCard: () => maskCard,
  normalizeName: () => normalizeName,
  normalizeProvince: () => normalizeProvince,
  parseCCCD: () => parseCCCD,
  readMoney: () => readMoney,
  removeTone: () => removeTone,
  shortenNumber: () => shortenNumber,
  slugify: () => slugify
});
module.exports = __toCommonJS(index_exports);

// src/finance/index.ts
var ChuSo = ["kh\xF4ng", "m\u1ED9t", "hai", "ba", "b\u1ED1n", "n\u0103m", "s\xE1u", "b\u1EA3y", "t\xE1m", "ch\xEDn"];
var Tien = [
  "",
  " ngh\xECn",
  " tri\u1EC7u",
  " t\u1EF7",
  " ngh\xECn t\u1EF7",
  " tri\u1EC7u t\u1EF7",
  " t\u1EF7 t\u1EF7",
  " ngh\xECn t\u1EF7 t\u1EF7",
  " tri\u1EC7u t\u1EF7 t\u1EF7",
  " t\u1EF7 t\u1EF7 t\u1EF7",
  " ngh\xECn t\u1EF7 t\u1EF7 t\u1EF7",
  " tri\u1EC7u t\u1EF7 t\u1EF7 t\u1EF7",
  " t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7",
  " t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7",
  " ngh\xECn t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7",
  " tri\u1EC7u t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7",
  " t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7 t\u1EF7"
];
var UNIT_MAPPING = {
  "\u0111": "\u0111\u1ED3ng",
  "vnd": "\u0111\u1ED3ng",
  "vn\u0111": "\u0111\u1ED3ng",
  "$": "\u0111\xF4 la m\u1EF9",
  "usd": "\u0111\xF4 la m\u1EF9",
  "eur": "euro",
  "jpy": "y\xEAn nh\u1EADt",
  "m2": "m\xE9t vu\xF4ng",
  "km": "ki l\xF4 m\xE9t"
};
var docSo3ChuSo = (baso) => {
  const basoStr = baso.toString();
  if (!basoStr || basoStr === "0" || basoStr === "00" || basoStr === "000") return "";
  let tram = -1, chuc = -1, donvi = -1;
  const len = basoStr.length;
  if (len === 3) {
    tram = parseInt(basoStr[0]);
    chuc = parseInt(basoStr[1]);
    donvi = parseInt(basoStr[2]);
  } else if (len === 2) {
    chuc = parseInt(basoStr[0]);
    donvi = parseInt(basoStr[1]);
  } else {
    donvi = parseInt(basoStr[0]);
  }
  let KetQua = "";
  if (tram !== -1) {
    KetQua += ChuSo[tram] + " tr\u0103m";
    if (chuc === 0 && donvi !== 0) KetQua += " linh";
  }
  if (chuc !== -1 && chuc !== 0 && chuc !== 1) {
    KetQua += (KetQua ? " " : "") + ChuSo[chuc] + " m\u01B0\u01A1i";
    if (donvi === 1) KetQua += " m\u1ED1t";
  } else if (chuc === 1) {
    KetQua += (KetQua ? " " : "") + "m\u01B0\u1EDDi";
    if (donvi === 5) KetQua += " l\u0103m";
    else if (donvi !== 0) KetQua += " " + ChuSo[donvi];
  }
  if (donvi !== 0) {
    if (chuc !== 1 && chuc !== 0) {
      if (donvi === 5 && (chuc !== -1 || tram !== -1)) KetQua += " l\u0103m";
      else if (donvi === 1 && chuc > 1) KetQua += " m\u1ED1t";
      else KetQua += (KetQua ? " " : "") + ChuSo[donvi];
    } else if (chuc === 0) {
      KetQua += (KetQua ? " " : "") + ChuSo[donvi];
    }
  }
  return KetQua;
};
var docPhanNguyen = (soStr) => {
  if (soStr === "0") return "kh\xF4ng";
  let so;
  try {
    so = BigInt(soStr);
  } catch (e) {
    return "";
  }
  if (so === 0n) return "kh\xF4ng";
  const ViTri = [];
  let temp = soStr;
  while (temp.length > 3) {
    ViTri.unshift(temp.slice(-3));
    temp = temp.slice(0, -3);
  }
  if (temp.length > 0) ViTri.unshift(temp);
  let KetQua = "";
  const lan = ViTri.length - 1;
  for (let i = 0; i <= lan; i++) {
    const tmp = docSo3ChuSo(ViTri[i]);
    const donViIndex = lan - i;
    if (tmp) {
      if (KetQua) KetQua += ", ";
      KetQua += tmp;
      if (donViIndex > 0 && donViIndex < Tien.length) {
        KetQua += Tien[donViIndex];
      }
    } else {
    }
  }
  return KetQua;
};
var docPhanThapPhan = (decimalStr, style) => {
  if (!decimalStr) return "";
  const cleanStr = decimalStr.replace(/[^\d]/g, "");
  if (!cleanStr) return "";
  if (style === "digit") {
    return cleanStr.split("").map((char) => ChuSo[parseInt(char)]).join(" ");
  }
  return docPhanNguyen(cleanStr);
};
var readMoney = (number, config = {}) => {
  const { unit, decimalSeparator = ".", decimalStyle = "digit" } = config;
  let inputStr = number.toString().trim();
  if (typeof number === "number" && inputStr.includes("e+")) {
    console.warn("vn-format: S\u1ED1 qu\xE1 l\u1EDBn, vui l\xF2ng truy\u1EC1n d\u01B0\u1EDBi d\u1EA1ng String \u0111\u1EC3 kh\xF4ng b\u1ECB m\u1EA5t \u0111\u1ED9 ch\xEDnh x\xE1c.");
  }
  let isNegative = false;
  if (inputStr.startsWith("-")) {
    isNegative = true;
    inputStr = inputStr.substring(1);
  }
  let integerPart = "";
  let decimalPart = "";
  if (decimalSeparator === ".") {
    const parts = inputStr.split(".");
    integerPart = parts[0].replace(/[^0-9]/g, "");
    decimalPart = parts.length > 1 ? parts[1] : "";
  } else {
    const parts = inputStr.split(",");
    integerPart = parts[0].replace(/[^0-9]/g, "");
    decimalPart = parts.length > 1 ? parts[1] : "";
  }
  integerPart = integerPart.replace(/^0+/, "") || "0";
  let result = docPhanNguyen(integerPart);
  if (decimalPart && !/^0+$/.test(decimalPart)) {
    const decimalText = docPhanThapPhan(decimalPart, decimalStyle);
    if (decimalText) {
      result += " ph\u1EA9y " + decimalText;
    }
  }
  if (unit) {
    const cleanUnit = unit.toLowerCase().trim();
    const unitText = UNIT_MAPPING[cleanUnit] || unit;
    result += " " + unitText;
  }
  result = result.trim();
  if (result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  if (isNegative) result = "\xC2m " + result.toLowerCase();
  return result;
};
var formatVND = (amount, suffix = "\u0111") => {
  if (!amount && amount !== 0) return `0${suffix}`;
  const num = Number(amount);
  if (isNaN(num)) return `0${suffix}`;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
};
var shortenNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "t\u1EF7";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "tr";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
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

// src/identity/index.ts
var isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  const regex = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(cleanPhone);
};
var isValidCCCD = (id) => /^\d{12}$/.test(id);
var isValidMST = (mst) => /^\d{10}(-\d{3})?$/.test(mst);
var getPhoneNetwork = (phone) => {
  if (!isValidPhone(phone)) return "Invalid";
  const cleanPhone = phone.replace(/[^\d]/g, "");
  const prefix = cleanPhone.startsWith("84") ? "0" + cleanPhone.slice(2, 4) : cleanPhone.slice(0, 3);
  const viettel = ["086", "096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039"];
  const vina = ["088", "091", "094", "083", "084", "085", "081", "082"];
  const mobi = ["089", "090", "093", "070", "079", "077", "076", "078"];
  const vietnamobile = ["092", "056", "058"];
  const gmobile = ["099", "059"];
  if (viettel.includes(prefix)) return "Viettel";
  if (vina.includes(prefix)) return "Vinaphone";
  if (mobi.includes(prefix)) return "Mobifone";
  if (vietnamobile.includes(prefix)) return "Vietnamobile";
  if (gmobile.includes(prefix)) return "Gmobile";
  return "Unknown";
};
var parseCCCD = (cccd) => {
  if (!isValidCCCD(cccd)) return null;
  const genderCode = parseInt(cccd[3]);
  const yearShort = cccd.slice(4, 6);
  let gender = "Nam";
  let century = 1900;
  if (genderCode === 1 || genderCode === 3 || genderCode === 5 || genderCode === 7) {
    gender = "N\u1EEF";
  }
  if (genderCode === 2 || genderCode === 3) century = 2e3;
  if (genderCode === 4 || genderCode === 5) century = 2100;
  if (genderCode === 6 || genderCode === 7) century = 2200;
  return {
    gender,
    birthYear: century + parseInt(yearShort)
  };
};
var maskCard = (number, maskChar = "*") => {
  const str = number.toString();
  if (str.length < 4) return str;
  const last4 = str.slice(-4);
  const prefix = maskChar.repeat(str.length - 4);
  return prefix + last4;
};

// src/location/index.ts
var PROVINCES = [
  "An Giang",
  "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "B\u1EAFc Giang",
  "B\u1EAFc K\u1EA1n",
  "B\u1EA1c Li\xEAu",
  "B\u1EAFc Ninh",
  "B\u1EBFn Tre",
  "B\xECnh \u0110\u1ECBnh",
  "B\xECnh D\u01B0\u01A1ng",
  "B\xECnh Ph\u01B0\u1EDBc",
  "B\xECnh Thu\u1EADn",
  "C\xE0 Mau",
  "C\u1EA7n Th\u01A1",
  "Cao B\u1EB1ng",
  "\u0110\xE0 N\u1EB5ng",
  "\u0110\u1EAFk L\u1EAFk",
  "\u0110\u1EAFk N\xF4ng",
  "\u0110i\u1EC7n Bi\xEAn",
  "\u0110\u1ED3ng Nai",
  "\u0110\u1ED3ng Th\xE1p",
  "Gia Lai",
  "H\xE0 Giang",
  "H\xE0 Nam",
  "H\xE0 N\u1ED9i",
  "H\xE0 T\u0129nh",
  "H\u1EA3i D\u01B0\u01A1ng",
  "H\u1EA3i Ph\xF2ng",
  "H\u1EADu Giang",
  "H\xF2a B\xECnh",
  "H\u01B0ng Y\xEAn",
  "Kh\xE1nh H\xF2a",
  "Ki\xEAn Giang",
  "Kon Tum",
  "Lai Ch\xE2u",
  "L\xE2m \u0110\u1ED3ng",
  "L\u1EA1ng S\u01A1n",
  "L\xE0o Cai",
  "Long An",
  "Nam \u0110\u1ECBnh",
  "Ngh\u1EC7 An",
  "Ninh B\xECnh",
  "Ninh Thu\u1EADn",
  "Ph\xFA Th\u1ECD",
  "Ph\xFA Y\xEAn",
  "Qu\u1EA3ng B\xECnh",
  "Qu\u1EA3ng Nam",
  "Qu\u1EA3ng Ng\xE3i",
  "Qu\u1EA3ng Ninh",
  "Qu\u1EA3ng Tr\u1ECB",
  "S\xF3c Tr\u0103ng",
  "S\u01A1n La",
  "T\xE2y Ninh",
  "Th\xE1i B\xECnh",
  "Th\xE1i Nguy\xEAn",
  "Thanh H\xF3a",
  "Th\u1EEBa Thi\xEAn Hu\u1EBF",
  "Ti\u1EC1n Giang",
  "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "Tr\xE0 Vinh",
  "Tuy\xEAn Quang",
  "V\u0129nh Long",
  "V\u0129nh Ph\xFAc",
  "Y\xEAn B\xE1i"
];
var PROVINCE_ALIAS = {
  // --- 1. CÁC THÀNH PHỐ LỚN & VIẾT TẮT ---
  "hcm": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "tphcm": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "sai gon": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "sg": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "ho chi minh": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "hn": "H\xE0 N\u1ED9i",
  "ha noi": "H\xE0 N\u1ED9i",
  "thu do": "H\xE0 N\u1ED9i",
  "dn": "\u0110\xE0 N\u1EB5ng",
  "da nang": "\u0110\xE0 N\u1EB5ng",
  "hp": "H\u1EA3i Ph\xF2ng",
  "hai phong": "H\u1EA3i Ph\xF2ng",
  "ct": "C\u1EA7n Th\u01A1",
  "can tho": "C\u1EA7n Th\u01A1",
  // --- 2. CÁC TỈNH CÓ TÊN VIẾT TẮT/KHÓ GÕ ---
  "brvt": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "vt": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "vung tau": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "ba ria": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "tth": "Th\u1EEBa Thi\xEAn Hu\u1EBF",
  "hue": "Th\u1EEBa Thi\xEAn Hu\u1EBF",
  "thua thien": "Th\u1EEBa Thi\xEAn Hu\u1EBF",
  "dak lak": "\u0110\u1EAFk L\u1EAFk",
  "dac lac": "\u0110\u1EAFk L\u1EAFk",
  "daklak": "\u0110\u1EAFk L\u1EAFk",
  "dak nong": "\u0110\u1EAFk N\xF4ng",
  "dac nong": "\u0110\u1EAFk N\xF4ng",
  "daknong": "\u0110\u1EAFk N\xF4ng",
  "bac kan": "B\u1EAFc K\u1EA1n",
  "bac can": "B\u1EAFc K\u1EA1n",
  // --- 3. XỬ LÝ SÁP NHẬP / TÊN CŨ (HISTORICAL) ---
  "ha tay": "H\xE0 N\u1ED9i",
  // Đã sáp nhập vào HN
  "ha son binh": "H\xE0 N\u1ED9i",
  // Tên rất cũ
  "song be": "B\xECnh D\u01B0\u01A1ng",
  // Tách thành Bình Dương & Bình Phước (ưu tiên BD)
  "minh hai": "C\xE0 Mau",
  // Tách thành Cà Mau & Bạc Liêu (ưu tiên CM)
  "cuu long": "V\u0129nh Long",
  // Tách thành Vĩnh Long & Trà Vinh
  "nghia binh": "B\xECnh \u0110\u1ECBnh",
  // Tách thành BĐ & Quảng Ngãi
  "phu khanh": "Kh\xE1nh H\xF2a",
  // Tách thành KH & Phú Yên
  // --- 4. MAP THÀNH PHỐ DU LỊCH VỀ TỈNH (Tính năng nâng cao) ---
  // Giúp người dùng nhập "Nha Trang" vẫn hiểu là tỉnh "Khánh Hòa"
  "nha trang": "Kh\xE1nh H\xF2a",
  "da lat": "L\xE2m \u0110\u1ED3ng",
  "dalat": "L\xE2m \u0110\u1ED3ng",
  "vinh": "Ngh\u1EC7 An",
  "ha long": "Qu\u1EA3ng Ninh",
  "buon ma thuot": "\u0110\u1EAFk L\u1EAFk",
  "bmt": "\u0110\u1EAFk L\u1EAFk",
  "bien hoa": "\u0110\u1ED3ng Nai",
  "pleiku": "Gia Lai",
  "quy nhon": "B\xECnh \u0110\u1ECBnh",
  "rach gia": "Ki\xEAn Giang",
  "phan thiet": "B\xECnh Thu\u1EADn",
  "mui ne": "B\xECnh Thu\u1EADn",
  "sapa": "L\xE0o Cai",
  "sa pa": "L\xE0o Cai",
  "phu quoc": "Ki\xEAn Giang",
  "con dao": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u"
};
var getProvinces = () => {
  return PROVINCES.sort((a, b) => a.localeCompare(b));
};
var normalizeProvince = (input) => {
  if (!input) return null;
  const cleanInput = removeTone(input).toLowerCase().trim().replace(/^tp\s+/, "").replace(/^tinh\s+/, "").replace(/\s+/g, " ");
  if (PROVINCE_ALIAS[cleanInput]) {
    return PROVINCE_ALIAS[cleanInput];
  }
  for (const [key, value] of Object.entries(PROVINCE_ALIAS)) {
    if (cleanInput.includes(key)) return value;
  }
  const found = PROVINCES.find((prov) => {
    const cleanProv = removeTone(prov).toLowerCase();
    return cleanProv === cleanInput || cleanProv.includes(cleanInput) || cleanInput.includes(cleanProv);
  });
  return found || null;
};
var isValidProvince = (provinceName) => {
  return normalizeProvince(provinceName) !== null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatVND,
  getPhoneNetwork,
  getProvinces,
  isValidCCCD,
  isValidMST,
  isValidPhone,
  isValidProvince,
  maskCard,
  normalizeName,
  normalizeProvince,
  parseCCCD,
  readMoney,
  removeTone,
  shortenNumber,
  slugify
});
