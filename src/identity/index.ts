/**
 * Kiểm tra số điện thoại Việt Nam hợp lệ
 * Hỗ trợ các đầu số mới nhất của Viettel, Vinaphone, Mobifone, Vietnamobile, Gmobile
 * @param phone Số điện thoại (VD: 0901234567, +84901234567)
 * @returns true nếu hợp lệ
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  // Loại bỏ ký tự không phải số (trừ dấu +)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Regex: 
  // (84|0): Bắt đầu bằng 84 hoặc 0
  // (3|5|7|8|9): Đầu số nhà mạng (03x, 05x, 07x, 08x, 09x)
  // [0-9]{8}: 8 số cuối
  const regex = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(cleanPhone);
};

/**
 * Kiểm tra thẻ Căn Cước Công Dân (CCCD)
 * @param id Số CCCD (12 số)
 * @returns true nếu đúng định dạng 12 số
 */
export const isValidCCCD = (id: string): boolean => {
  if (!id) return false;
  // CCCD phải là chuỗi số và đủ 12 ký tự
  return /^\d{12}$/.test(id);
};

/**
 * Kiểm tra Mã Số Thuế (MST)
 * Hỗ trợ MST Doanh nghiệp (10 số) và Cá nhân/Chi nhánh (13 số)
 * @param mst Mã số thuế
 * @returns true nếu đúng định dạng
 */
export const isValidMST = (mst: string): boolean => {
  if (!mst) return false;
  // MST doanh nghiệp: 10 số
  // MST cá nhân/chi nhánh: 10 số + gạch ngang + 3 số (VD: 0101234567-001)
  return /^\d{10}(-\d{3})?$/.test(mst);
};