// --- CẤU HÌNH HỆ THỐNG ---
const ChuSo = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const Tien = [
  "", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ", " tỷ tỷ",
  " nghìn tỷ tỷ", " triệu tỷ tỷ", " tỷ tỷ tỷ", " nghìn tỷ tỷ tỷ",
  " triệu tỷ tỷ tỷ", " tỷ tỷ tỷ tỷ", " tỷ tỷ tỷ tỷ tỷ",
  " nghìn tỷ tỷ tỷ tỷ", " triệu tỷ tỷ tỷ tỷ", " tỷ tỷ tỷ tỷ tỷ tỷ"
];

const UNIT_MAPPING: Record<string, string> = {
  "đ": "đồng", "vnd": "đồng", "vnđ": "đồng",
  "$": "đô la mỹ", "usd": "đô la mỹ",
  "eur": "euro", "jpy": "yên nhật",
  "m2": "mét vuông", "km": "ki lô mét"
};

export interface ReadMoneyConfig {
  unit?: string; // Đơn vị tính
  decimalSeparator?: '.' | ','; // Dấu phân cách thập phân
  decimalStyle?: 'digit' | 'group'; // Cách đọc thập phân: 'digit' (một hai) | 'group' (mười hai)
}

/**
 * Đọc bộ 3 số (Internal)
 */
const docSo3ChuSo = (baso: string): string => {
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
    KetQua += ChuSo[tram] + " trăm";
    if (chuc === 0 && donvi !== 0) KetQua += " linh";
  }

  if (chuc !== -1 && chuc !== 0 && chuc !== 1) {
    KetQua += (KetQua ? " " : "") + ChuSo[chuc] + " mươi";
    if (donvi === 1) KetQua += " mốt";
  } else if (chuc === 1) {
    KetQua += (KetQua ? " " : "") + "mười";
    if (donvi === 5) KetQua += " lăm";
    else if (donvi !== 0) KetQua += " " + ChuSo[donvi];
  }

  if (donvi !== 0) {
    if (chuc !== 1 && chuc !== 0) {
      if (donvi === 5 && (chuc !== -1 || tram !== -1)) KetQua += " lăm";
      else if (donvi === 1 && chuc > 1) KetQua += " mốt";
      else KetQua += (KetQua ? " " : "") + ChuSo[donvi];
    } else if (chuc === 0) {
      KetQua += (KetQua ? " " : "") + ChuSo[donvi];
    }
  }

  return KetQua;
}

/**
 * Đọc phần nguyên (Hỗ trợ BigInt)
 */
const docPhanNguyen = (soStr: string): string => {
  if (soStr === '0') return "không";
  let so: bigint;
  try { so = BigInt(soStr); } catch (e) { return ""; }
  if (so === 0n) return "không";

  const ViTri: string[] = [];
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
      if (KetQua) KetQua += ", "; // Dấu ngắt câu cho dễ đọc
      KetQua += tmp;
      if (donViIndex > 0 && donViIndex < Tien.length) {
        KetQua += Tien[donViIndex];
      }
    } else {
      // Xử lý trường hợp hàng tỷ, triệu bị rỗng (000) nhưng vẫn cần đọc tên hàng lớn
      // Logic này phức tạp với số siêu lớn, tạm thời giữ nguyên logic bỏ qua 000
    }
  }
  return KetQua;
};

/**
 * Đọc phần thập phân
 */
const docPhanThapPhan = (decimalStr: string, style: 'digit' | 'group'): string => {
  if (!decimalStr) return "";
  // Xóa các ký tự không phải số nhỡ còn sót
  const cleanStr = decimalStr.replace(/[^\d]/g, '');
  if (!cleanStr) return "";

  if (style === 'digit') {
    return cleanStr.split('').map(char => ChuSo[parseInt(char)]).join(' ');
  } 
  return docPhanNguyen(cleanStr);
};

/**
 * MAIN: Đọc tiền/số thành chữ
 */
export const readMoney = (number: string | number | bigint, config: ReadMoneyConfig = {}): string => {
  const { unit, decimalSeparator = '.', decimalStyle = 'digit' } = config;
  
  // 1. Chuyển đổi Input thành String chuẩn
  let inputStr = number.toString().trim();
  
  // Cảnh báo nếu người dùng truyền Number quá lớn (Scientific notation: 1.23e+20)
  if (typeof number === 'number' && inputStr.includes('e+')) {
    console.warn("vn-format: Số quá lớn, vui lòng truyền dưới dạng String để không bị mất độ chính xác.");
  }

  let isNegative = false;
  if (inputStr.startsWith('-')) {
    isNegative = true;
    inputStr = inputStr.substring(1);
  }

  // 2. Tách phần nguyên và thập phân
  let integerPart = "";
  let decimalPart = "";

  if (decimalSeparator === '.') {
    // Kiểu 20000.123
    const parts = inputStr.split('.');
    integerPart = parts[0].replace(/[^0-9]/g, ''); // Chỉ giữ lại số
    decimalPart = parts.length > 1 ? parts[1] : "";
  } else {
    // Kiểu 20000,123 (Việt Nam)
    const parts = inputStr.split(',');
    integerPart = parts[0].replace(/[^0-9]/g, '');
    decimalPart = parts.length > 1 ? parts[1] : "";
  }

  integerPart = integerPart.replace(/^0+/, '') || '0';

  // 3. Thực hiện đọc
  let result = docPhanNguyen(integerPart);

  // Xử lý thập phân
  if (decimalPart && !/^0+$/.test(decimalPart)) {
    const decimalText = docPhanThapPhan(decimalPart, decimalStyle);
    if (decimalText) {
      result += " phẩy " + decimalText;
    }
  }

  // 4. Thêm đơn vị
  if (unit) {
    const cleanUnit = unit.toLowerCase().trim();
    const unitText = UNIT_MAPPING[cleanUnit] || unit;
    result += " " + unitText;
  }

  // 5. Chuẩn hóa chuỗi kết quả
  result = result.trim();
  if (result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  if (isNegative) result = "Âm " + result.toLowerCase();

  return result;
};


// --- UTILITIES CŨ ---
export const formatVND = (amount: number | string, suffix: string = 'đ'): string => {
  if (!amount && amount !== 0) return `0${suffix}`;
  const num = Number(amount);
  if (isNaN(num)) return `0${suffix}`;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
};

export const shortenNumber = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'tỷ';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'tr';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
};