interface ReadMoneyConfig {
    unit?: string;
    decimalSeparator?: '.' | ',';
    decimalStyle?: 'digit' | 'group';
}
/**
 * MAIN: Đọc tiền/số thành chữ
 */
declare const readMoney: (number: string | number | bigint, config?: ReadMoneyConfig) => string;
declare const formatVND: (amount: number | string, suffix?: string) => string;
declare const shortenNumber: (num: number) => string;

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

/**
 * Kiểm tra số điện thoại Việt Nam hợp lệ
 */
declare const isValidPhone: (phone: string) => boolean;
/**
 * Kiểm tra CCCD (12 số)
 */
declare const isValidCCCD: (id: string) => boolean;
/**
 * Kiểm tra Mã Số Thuế (10 hoặc 13 số)
 */
declare const isValidMST: (mst: string) => boolean;
/**
 * Xác định nhà mạng từ số điện thoại
 * @param phone Số điện thoại
 * @returns Tên nhà mạng (Viettel, Vinaphone, Mobifone, Vietnamobile, Gmobile, hoặc 'Unknown')
 */
declare const getPhoneNetwork: (phone: string) => string;
/**
 * Trích xuất thông tin từ số CCCD
 * @param cccd Số CCCD 12 số
 * @returns Object chứa giới tính và năm sinh (VD: { gender: 'Nam', birthYear: 1996 })
 */
declare const parseCCCD: (cccd: string) => {
    gender: string;
    birthYear: number;
} | null;
/**
 * Ẩn bớt số thẻ/tài khoản, chỉ hiện 4 số cuối
 * @param number Chuỗi số (VD: 123456789)
 * @param maskChar Ký tự thay thế (mặc định *)
 * @returns VD: *****6789
 */
declare const maskCard: (number: string, maskChar?: string) => string;

/**
 * Lấy danh sách toàn bộ 63 tỉnh thành
 */
declare const getProvinces: () => string[];
/**
 * Tìm và chuẩn hóa tên tỉnh thành
 * @param input VD: "tp hcm", "sài gòn", "đà lạt", "hà tây"
 * @returns Tên chuẩn "Thành phố Hồ Chí Minh" hoặc null
 */
declare const normalizeProvince: (input: string) => string | null;
/**
 * Kiểm tra tỉnh thành hợp lệ
 */
declare const isValidProvince: (provinceName: string) => boolean;

export { type ReadMoneyConfig, formatVND, getPhoneNetwork, getProvinces, isValidCCCD, isValidMST, isValidPhone, isValidProvince, maskCard, normalizeName, normalizeProvince, parseCCCD, readMoney, removeTone, shortenNumber, slugify };
