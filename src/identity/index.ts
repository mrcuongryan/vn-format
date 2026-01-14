// src/identity/index.ts
import { CCCD_PROVINCE_CODES } from './data';
import { convertToNewProvince } from '../location'; // <--- Import hàm chuyển đổi
// --- PHẦN 1: VALIDATION (KIỂM TRA) ---

/**
 * Kiểm tra số điện thoại Việt Nam hợp lệ
 */
export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const regex = /^((0084|\+84|84|0)+[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(cleanPhone);
};

/**
 * Kiểm tra CCCD (12 số)
 */
export const isValidCCCD = (id: string): boolean => /^\d{12}$/.test(id);

// --- PHẦN MỚI: TRÍCH XUẤT CCCD ---

export interface CCCDInfo {
  isValid: boolean;
  code: string;
  province?: string; // Nơi khai sinh
  newProvince?: string | null; // Tên tỉnh sau sáp nhập (2025)
  gender?: "Nam" | "Nữ";
  birthYear?: number;
  fullDate?: string; // Sẽ null vì CCCD không chứa ngày tháng, chỉ có năm
}

export interface ExtractOptions {
  format?: 'json' | 'string'; // Định dạng trả về
}

/**
 * Trích xuất thông tin chi tiết từ CCCD
 * @param cccd Số CCCD (12 số)
 * @param options Cấu hình trả về
 */
export const extractCCCD = (
  cccd: string | number, 
  options: ExtractOptions = { format: 'json' }
): CCCDInfo | string | null => {
  
  const str = cccd.toString();
  
  // 1. Validate cơ bản
  if (!/^\d{12}$/.test(str)) {
    return null;
  }

  // 2. Cắt chuỗi
  const provinceCode = str.substring(0, 3);
  const genderCode = str.substring(3, 4);
  const yearCode = str.substring(4, 6);
  // const randomPart = str.substring(6);

  // 3. Xử lý Tỉnh thành
  const currentProvince = CCCD_PROVINCE_CODES[provinceCode] || "Không xác định";

  // --- LOGIC MỚI: Lấy tên tỉnh sau sáp nhập ---
  // Nếu không xác định được tỉnh thì newProvince là null
  const newProvince = currentProvince !== "Không xác định" 
    ? convertToNewProvince(currentProvince) 
    : null;
  // -------------------------------------------

  // 4. Xử lý Giới tính & Thế kỷ
  const gCode = parseInt(genderCode);
  let gender: "Nam" | "Nữ" = "Nam";
  let century = 1900;

  // Logic theo quy định Bộ Công An
  if ([1, 3, 5, 7, 9].includes(gCode)) gender = "Nữ";
  
  if (gCode === 0 || gCode === 1) century = 1900;
  if (gCode === 2 || gCode === 3) century = 2000;
  if (gCode === 4 || gCode === 5) century = 2100;
  if (gCode === 6 || gCode === 7) century = 2200;
  if (gCode === 8 || gCode === 9) century = 2300;

  const fullYear = century + parseInt(yearCode);

  // 5. Trả về kết quả
  const result: CCCDInfo = {
    isValid: true,
    code: str,
    province: currentProvince,
    newProvince,
    gender,
    birthYear: fullYear
  };

  if (options.format === 'string') {
    return `CCCD: ${str} | Nơi sinh: ${currentProvince} | Tỉnh mới: ${newProvince} | Giới tính: ${gender} | Năm sinh: ${fullYear}`;
  }

  return result;
};

/**
 * Kiểm tra Mã Số Thuế (10 hoặc 13 số)
 */
export const isValidMST = (mst: string): boolean => /^\d{10}(-\d{3})?$/.test(mst);


// --- PHẦN 2: EXTRACTION (TRÍCH XUẤT THÔNG TIN) ---

/**
 * Xác định nhà mạng từ số điện thoại
 * @param phone Số điện thoại
 * @returns Tên nhà mạng (Viettel, Vinaphone, Mobifone, Vietnamobile, Gmobile, hoặc 'Unknown')
 */
export const getPhoneNetwork = (phone: string): string => {
  if (!isValidPhone(phone)) return "Invalid";

  const cleanPhone = phone.replace(/[^\d]/g, ''); // Bỏ dấu +, chỉ lấy số
  // Lấy 3 số đầu (nếu là 09x) hoặc chuyển 849x thành 09x
  const prefix = cleanPhone.startsWith('84') ? '0' + cleanPhone.slice(2, 4) : cleanPhone.slice(0, 3);

  const viettel = ['086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039'];
  const vina = ['088', '091', '094', '083', '084', '085', '081', '082'];
  const mobi = ['089', '090', '093', '070', '079', '077', '076', '078'];
  const vietnamobile = ['092', '056', '058'];
  const gmobile = ['099', '059'];

  if (viettel.includes(prefix)) return "Viettel";
  if (vina.includes(prefix)) return "Vinaphone";
  if (mobi.includes(prefix)) return "Mobifone";
  if (vietnamobile.includes(prefix)) return "Vietnamobile";
  if (gmobile.includes(prefix)) return "Gmobile";
  
  return "Unknown";
};

/**
 * Trích xuất thông tin từ số CCCD
 * @param cccd Số CCCD 12 số
 * @returns Object chứa giới tính và năm sinh (VD: { gender: 'Nam', birthYear: 1996 })
 */
export const parseCCCD = (cccd: string) => {
  if (!isValidCCCD(cccd)) return null;

  // Số thứ 4 trong CCCD quy định giới tính và thế kỷ
  // 0: Nam - TK20 | 1: Nữ - TK20
  // 2: Nam - TK21 | 3: Nữ - TK21
  const genderCode = parseInt(cccd[3]);
  const yearShort = cccd.slice(4, 6); // 2 số tiếp theo là năm sinh

  let gender = "Nam";
  let century = 1900;

  if (genderCode === 1 || genderCode === 3 || genderCode === 5 || genderCode === 7) {
    gender = "Nữ";
  }

  if (genderCode === 2 || genderCode === 3) century = 2000;
  if (genderCode === 4 || genderCode === 5) century = 2100;
  if (genderCode === 6 || genderCode === 7) century = 2200;

  return {
    gender,
    birthYear: century + parseInt(yearShort)
  };
};

// --- PHẦN 3: SECURITY (BẢO MẬT) ---

/**
 * Ẩn bớt số thẻ/tài khoản, chỉ hiện 4 số cuối
 * @param number Chuỗi số (VD: 123456789)
 * @param maskChar Ký tự thay thế (mặc định *)
 * @returns VD: *****6789
 */
export const maskCard = (number: string, maskChar = '*'): string => {
  const str = number.toString();
  if (str.length < 4) return str;
  const last4 = str.slice(-4);
  const prefix = maskChar.repeat(str.length - 4);
  return prefix + last4;
};