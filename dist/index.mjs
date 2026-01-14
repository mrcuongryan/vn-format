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
  if (decimalPart) {
    decimalPart = decimalPart.replace(/0+$/, "");
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

// src/identity/data.ts
var CCCD_PROVINCE_CODES = {
  // Miền Bắc
  "001": "H\xE0 N\u1ED9i",
  "002": "H\xE0 Giang",
  "004": "Cao B\u1EB1ng",
  "006": "B\u1EAFc K\u1EA1n",
  "008": "Tuy\xEAn Quang",
  "010": "L\xE0o Cai",
  "011": "\u0110i\u1EC7n Bi\xEAn",
  "012": "Lai Ch\xE2u",
  "014": "S\u01A1n La",
  "015": "Y\xEAn B\xE1i",
  "017": "H\xF2a B\xECnh",
  "019": "Th\xE1i Nguy\xEAn",
  "020": "L\u1EA1ng S\u01A1n",
  "022": "Qu\u1EA3ng Ninh",
  "024": "B\u1EAFc Giang",
  "025": "Ph\xFA Th\u1ECD",
  "026": "V\u0129nh Ph\xFAc",
  "027": "B\u1EAFc Ninh",
  "030": "H\u1EA3i D\u01B0\u01A1ng",
  "031": "H\u1EA3i Ph\xF2ng",
  "033": "H\u01B0ng Y\xEAn",
  "034": "Th\xE1i B\xECnh",
  "035": "H\xE0 Nam",
  "036": "Nam \u0110\u1ECBnh",
  "037": "Ninh B\xECnh",
  // Miền Trung
  "038": "Thanh H\xF3a",
  "040": "Ngh\u1EC7 An",
  "042": "H\xE0 T\u0129nh",
  "044": "Qu\u1EA3ng B\xECnh",
  "045": "Qu\u1EA3ng Tr\u1ECB",
  "046": "Th\u1EEBa Thi\xEAn Hu\u1EBF",
  "048": "\u0110\xE0 N\u1EB5ng",
  "049": "Qu\u1EA3ng Nam",
  "051": "Qu\u1EA3ng Ng\xE3i",
  "052": "B\xECnh \u0110\u1ECBnh",
  "054": "Ph\xFA Y\xEAn",
  "056": "Kh\xE1nh H\xF2a",
  "058": "Ninh Thu\u1EADn",
  "060": "B\xECnh Thu\u1EADn",
  "062": "Kon Tum",
  "064": "Gia Lai",
  "066": "\u0110\u1EAFk L\u1EAFk",
  "067": "\u0110\u1EAFk N\xF4ng",
  "068": "L\xE2m \u0110\u1ED3ng",
  // Miền Nam
  "070": "B\xECnh Ph\u01B0\u1EDBc",
  "072": "T\xE2y Ninh",
  "074": "B\xECnh D\u01B0\u01A1ng",
  "075": "\u0110\u1ED3ng Nai",
  "077": "B\xE0 R\u1ECBa - V\u0169ng T\xE0u",
  "079": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "080": "Long An",
  "082": "Ti\u1EC1n Giang",
  "083": "B\u1EBFn Tre",
  "084": "Tr\xE0 Vinh",
  "086": "V\u0129nh Long",
  "087": "\u0110\u1ED3ng Th\xE1p",
  "089": "An Giang",
  "091": "Ki\xEAn Giang",
  "092": "C\u1EA7n Th\u01A1",
  "093": "H\u1EADu Giang",
  "094": "S\xF3c Tr\u0103ng",
  "095": "B\u1EA1c Li\xEAu",
  "096": "C\xE0 Mau"
};

// src/location/index.ts
var MERGE_MAPPING_2025 = {
  // --- Giữ nguyên (11 tỉnh/thành) ---
  "H\xE0 N\u1ED9i": "H\xE0 N\u1ED9i",
  "Th\u1EEBa Thi\xEAn Hu\u1EBF": "Th\xE0nh ph\u1ED1 Hu\u1EBF",
  // Lưu ý: Lên thành phố trực thuộc TW
  "Qu\u1EA3ng Ninh": "Qu\u1EA3ng Ninh",
  "Cao B\u1EB1ng": "Cao B\u1EB1ng",
  "L\u1EA1ng S\u01A1n": "L\u1EA1ng S\u01A1n",
  "Lai Ch\xE2u": "Lai Ch\xE2u",
  "\u0110i\u1EC7n Bi\xEAn": "\u0110i\u1EC7n Bi\xEAn",
  "S\u01A1n La": "S\u01A1n La",
  "Thanh H\xF3a": "Thanh H\xF3a",
  "Ngh\u1EC7 An": "Ngh\u1EC7 An",
  "H\xE0 T\u0129nh": "H\xE0 T\u0129nh",
  // --- Sáp nhập (23 tỉnh/thành mới) ---
  // 1. Tây Bắc & Đông Bắc
  "H\xE0 Giang": "Tuy\xEAn Quang",
  "Tuy\xEAn Quang": "Tuy\xEAn Quang",
  "L\xE0o Cai": "L\xE0o Cai",
  "Y\xEAn B\xE1i": "L\xE0o Cai",
  "Th\xE1i Nguy\xEAn": "Th\xE1i Nguy\xEAn",
  "B\u1EAFc K\u1EA1n": "Th\xE1i Nguy\xEAn",
  "Ph\xFA Th\u1ECD": "Ph\xFA Th\u1ECD",
  "V\u0129nh Ph\xFAc": "Ph\xFA Th\u1ECD",
  "H\xF2a B\xECnh": "Ph\xFA Th\u1ECD",
  "B\u1EAFc Ninh": "B\u1EAFc Ninh",
  "B\u1EAFc Giang": "B\u1EAFc Ninh",
  "H\u01B0ng Y\xEAn": "H\u01B0ng Y\xEAn",
  "Th\xE1i B\xECnh": "H\u01B0ng Y\xEAn",
  "H\u1EA3i Ph\xF2ng": "Th\xE0nh ph\u1ED1 H\u1EA3i Ph\xF2ng",
  "H\u1EA3i D\u01B0\u01A1ng": "Th\xE0nh ph\u1ED1 H\u1EA3i Ph\xF2ng",
  "Ninh B\xECnh": "Ninh B\xECnh",
  "H\xE0 Nam": "Ninh B\xECnh",
  "Nam \u0110\u1ECBnh": "Ninh B\xECnh",
  // 2. Miền Trung & Tây Nguyên
  "Qu\u1EA3ng Tr\u1ECB": "Qu\u1EA3ng Tr\u1ECB",
  "Qu\u1EA3ng B\xECnh": "Qu\u1EA3ng Tr\u1ECB",
  "\u0110\xE0 N\u1EB5ng": "Th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng",
  "Qu\u1EA3ng Nam": "Th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng",
  "Qu\u1EA3ng Ng\xE3i": "Qu\u1EA3ng Ng\xE3i",
  "Kon Tum": "Qu\u1EA3ng Ng\xE3i",
  "Gia Lai": "Gia Lai",
  "B\xECnh \u0110\u1ECBnh": "Gia Lai",
  "\u0110\u1EAFk L\u1EAFk": "\u0110\u1EAFk L\u1EAFk",
  "Ph\xFA Y\xEAn": "\u0110\u1EAFk L\u1EAFk",
  "Kh\xE1nh H\xF2a": "Kh\xE1nh H\xF2a",
  "Ninh Thu\u1EADn": "Kh\xE1nh H\xF2a",
  "L\xE2m \u0110\u1ED3ng": "L\xE2m \u0110\u1ED3ng",
  "\u0110\u1EAFk N\xF4ng": "L\xE2m \u0110\u1ED3ng",
  "B\xECnh Thu\u1EADn": "L\xE2m \u0110\u1ED3ng",
  // 3. Miền Nam
  "\u0110\u1ED3ng Nai": "\u0110\u1ED3ng Nai",
  "B\xECnh Ph\u01B0\u1EDBc": "\u0110\u1ED3ng Nai",
  "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "B\xE0 R\u1ECBa - V\u0169ng T\xE0u": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "B\xECnh D\u01B0\u01A1ng": "Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",
  "T\xE2y Ninh": "T\xE2y Ninh",
  "Long An": "T\xE2y Ninh",
  "\u0110\u1ED3ng Th\xE1p": "\u0110\u1ED3ng Th\xE1p",
  "Ti\u1EC1n Giang": "\u0110\u1ED3ng Th\xE1p",
  "V\u0129nh Long": "V\u0129nh Long",
  "B\u1EBFn Tre": "V\u0129nh Long",
  "Tr\xE0 Vinh": "V\u0129nh Long",
  "C\u1EA7n Th\u01A1": "Th\xE0nh ph\u1ED1 C\u1EA7n Th\u01A1",
  "S\xF3c Tr\u0103ng": "Th\xE0nh ph\u1ED1 C\u1EA7n Th\u01A1",
  "H\u1EADu Giang": "Th\xE0nh ph\u1ED1 C\u1EA7n Th\u01A1",
  "C\xE0 Mau": "C\xE0 Mau",
  "B\u1EA1c Li\xEAu": "C\xE0 Mau",
  "An Giang": "An Giang",
  "Ki\xEAn Giang": "An Giang"
};
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
var convertToNewProvince = (currentProvince) => {
  const normalized = normalizeProvince(currentProvince);
  if (!normalized) return null;
  return MERGE_MAPPING_2025[normalized] || normalized;
};

// src/identity/index.ts
var isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  const regex = /^((0084|\+84|84|0)+[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(cleanPhone);
};
var isValidCCCD = (id) => /^\d{12}$/.test(id);
var extractCCCD = (cccd, options = { format: "json" }) => {
  const str = cccd.toString();
  if (!/^\d{12}$/.test(str)) {
    return null;
  }
  const provinceCode = str.substring(0, 3);
  const genderCode = str.substring(3, 4);
  const yearCode = str.substring(4, 6);
  const currentProvince = CCCD_PROVINCE_CODES[provinceCode] || "Kh\xF4ng x\xE1c \u0111\u1ECBnh";
  const newProvince = currentProvince !== "Kh\xF4ng x\xE1c \u0111\u1ECBnh" ? convertToNewProvince(currentProvince) : null;
  const gCode = parseInt(genderCode);
  let gender = "Nam";
  let century = 1900;
  if ([1, 3, 5, 7, 9].includes(gCode)) gender = "N\u1EEF";
  if (gCode === 0 || gCode === 1) century = 1900;
  if (gCode === 2 || gCode === 3) century = 2e3;
  if (gCode === 4 || gCode === 5) century = 2100;
  if (gCode === 6 || gCode === 7) century = 2200;
  if (gCode === 8 || gCode === 9) century = 2300;
  const fullYear = century + parseInt(yearCode);
  const result = {
    isValid: true,
    code: str,
    province: currentProvince,
    newProvince,
    gender,
    birthYear: fullYear
  };
  if (options.format === "string") {
    return `CCCD: ${str} | N\u01A1i sinh: ${currentProvince} | T\u1EC9nh m\u1EDBi: ${newProvince} | Gi\u1EDBi t\xEDnh: ${gender} | N\u0103m sinh: ${fullYear}`;
  }
  return result;
};
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

// src/date/index.ts
var DAYS = ["Ch\u1EE7 Nh\u1EADt", "Th\u1EE9 Hai", "Th\u1EE9 Ba", "Th\u1EE9 T\u01B0", "Th\u1EE9 N\u0103m", "Th\u1EE9 S\xE1u", "Th\u1EE9 B\u1EA3y"];
var CAN = ["Canh", "T\xE2n", "Nh\xE2m", "Qu\xFD", "Gi\xE1p", "\u1EA4t", "B\xEDnh", "\u0110inh", "M\u1EADu", "K\u1EF7"];
var CHI = ["Th\xE2n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i", "T\xFD", "S\u1EEDu", "D\u1EA7n", "M\xE3o", "Th\xECn", "T\u1EF5", "Ng\u1ECD", "M\xF9i"];
var formatDate = (date, format = "dd/MM/yyyy") => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const pad = (n) => n < 10 ? `0${n}` : n.toString();
  const map = {
    "dd": pad(d.getDate()),
    "MM": pad(d.getMonth() + 1),
    "yyyy": d.getFullYear().toString(),
    "HH": pad(d.getHours()),
    "mm": pad(d.getMinutes()),
    "ss": pad(d.getSeconds())
  };
  return format.replace(/dd|MM|yyyy|HH|mm|ss/g, (matched) => map[matched]);
};
var getDayName = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return DAYS[d.getDay()];
};
var timeAgo = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const now = /* @__PURE__ */ new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1e3);
  if (seconds < 0) return formatDate(date, "HH:mm dd/MM/yyyy");
  if (seconds < 60) return "V\u1EEBa xong";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ph\xFAt tr\u01B0\u1EDBc`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} gi\u1EDD tr\u01B0\u1EDBc`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ng\xE0y tr\u01B0\u1EDBc`;
  if (days < 30) return `${Math.floor(days / 7)} tu\u1EA7n tr\u01B0\u1EDBc`;
  if (days < 365) return `${Math.floor(days / 30)} th\xE1ng tr\u01B0\u1EDBc`;
  return `${Math.floor(days / 365)} n\u0103m tr\u01B0\u1EDBc`;
};
var getCanChi = (year) => {
  let y = 0;
  if (typeof year === "object") y = year.getFullYear();
  else y = Number(year);
  if (isNaN(y) || y <= 0) return "";
  const can = CAN[y % 10];
  const chi = CHI[y % 12];
  return `${can} ${chi}`;
};
var isLeapYear = (year) => {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
export {
  convertToNewProvince,
  extractCCCD,
  formatDate,
  formatVND,
  getCanChi,
  getDayName,
  getPhoneNetwork,
  getProvinces,
  isLeapYear,
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
  slugify,
  timeAgo
};
