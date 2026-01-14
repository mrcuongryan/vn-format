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