/**
 * Định dạng số thành tiền tệ VNĐ
 * @param amount Số tiền cần định dạng (VD: 100000)
 * @param suffix Đơn vị tiền tệ (Mặc định: 'đ')
 * @returns Chuỗi đã định dạng (VD: "100.000đ")
 */
export const formatVND = (amount: number | string, suffix: string = 'đ'): string => {
  if (!amount && amount !== 0) return `0${suffix}`; // Xử lý null/undefined
  
  const num = Number(amount);
  if (isNaN(num)) return `0${suffix}`;

  // Regex thêm dấu chấm phân cách hàng nghìn
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
};

/**
 * Rút gọn số lượng lớn (Dùng cho biểu đồ, view count)
 * @param num Số cần rút gọn (VD: 1500000)
 * @returns Chuỗi rút gọn (VD: "1.5tr")
 */
export const shortenNumber = (num: number, toFixed?: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(toFixed||1).replace(/\.0$/, '') + 'tỷ';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(toFixed||1).replace(/\.0$/, '') + 'tr';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(toFixed||1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

// TODO: Sẽ thêm hàm readMoney (Đọc số thành chữ) ở phiên bản sau
// vì logic khá dài, cần tách file riêng.