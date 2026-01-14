/**
 * Định dạng số thành tiền tệ VNĐ
 * @param amount Số tiền cần định dạng (VD: 100000)
 * @param suffix Đơn vị tiền tệ (Mặc định: 'đ')
 * @returns Chuỗi đã định dạng (VD: "100.000đ")
 */
declare const formatVND: (amount: number | string, suffix?: string) => string;
/**
 * Rút gọn số lượng lớn (Dùng cho biểu đồ, view count)
 * @param num Số cần rút gọn (VD: 1500000)
 * @returns Chuỗi rút gọn (VD: "1.5tr")
 */
declare const shortenNumber: (num: number, toFixed?: number) => string;

/**
 * Loại bỏ dấu tiếng Việt (Dùng cho tính năng tìm kiếm)
 * @param str Chuỗi tiếng Việt có dấu
 * @returns Chuỗi không dấu
 */
declare const removeTone: (str: string) => string;
/**
 * Tạo URL Slug chuẩn SEO từ chuỗi tiếng Việt
 * @param str Tiêu đề bài viết (VD: "Chào thế giới!")
 * @returns Slug (VD: "chao-the-gioi")
 */
declare const slugify: (str: string) => string;
/**
 * Chuẩn hóa tên người (Viết hoa chữ cái đầu mỗi từ)
 * @param str Tên người nhập lộn xộn (VD: "nguyễn   VĂN a")
 * @returns Tên chuẩn (VD: "Nguyễn Văn A")
 */
declare const normalizeName: (str: string) => string;

export { formatVND, normalizeName, removeTone, shortenNumber, slugify };
