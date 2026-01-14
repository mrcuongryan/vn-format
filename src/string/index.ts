/**
 * Loại bỏ dấu tiếng Việt (Dùng cho tính năng tìm kiếm)
 * @param str Chuỗi tiếng Việt có dấu
 * @returns Chuỗi không dấu
 */
export const removeTone = (str: string): string => {
  if (!str) return "";
  
  // 1. Tách các ký tự có dấu thành ký tự gốc + dấu (Ví dụ: á -> a + ´)
  // 2. Loại bỏ các dấu đó
  let result = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  
  // 3. Xử lý chữ Đ/đ đặc biệt (normalize không xử lý được chữ này)
  result = result.replace(/đ/g, "d").replace(/Đ/g, "D");
  
  return result;
};

/**
 * Tạo URL Slug chuẩn SEO từ chuỗi tiếng Việt
 * @param str Tiêu đề bài viết (VD: "Chào thế giới!")
 * @returns Slug (VD: "chao-the-gioi")
 */
export const slugify = (str: string): string => {
  if (!str) return "";
  
  // Bỏ dấu -> Chữ thường -> Xóa ký tự lạ -> Thay khoảng trắng bằng gạch ngang
  return removeTone(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-"); // Thay khoảng trắng bằng -
};

/**
 * Chuẩn hóa tên người (Viết hoa chữ cái đầu mỗi từ)
 * @param str Tên người nhập lộn xộn (VD: "nguyễn   VĂN a")
 * @returns Tên chuẩn (VD: "Nguyễn Văn A")
 */
export const normalizeName = (str: string): string => {
  if (!str) return "";
  
  return str
    .toLowerCase() // Về chữ thường hết
    .trim()
    .split(/\s+/) // Tách mảng dựa trên khoảng trắng (bất kể bao nhiêu dấu cách)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ đầu
    .join(" ");
};