/**
 * Định dạng số thành tiền tệ VNĐ (Ví dụ: 1000000 -> 1.000.000)
 */
function formatVND(amount, suffix = 'đ') {
  if (isNaN(amount)) return '0' + suffix;
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
}

/**
 * Rút gọn số lớn (Ví dụ: 1500000 -> 1.5tr, 2000000000 -> 2tỷ)
 */
function simplifyNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'tỷ';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'tr';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

module.exports = { formatVND, simplifyNumber };