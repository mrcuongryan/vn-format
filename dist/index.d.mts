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
interface CCCDInfo {
    isValid: boolean;
    code: string;
    province?: string;
    newProvince?: string | null;
    gender?: "Nam" | "Nữ";
    birthYear?: number;
    fullDate?: string;
}
interface ExtractOptions {
    format?: 'json' | 'string';
}
/**
 * Trích xuất thông tin chi tiết từ CCCD
 * @param cccd Số CCCD (12 số)
 * @param options Cấu hình trả về
 */
declare const extractCCCD: (cccd: string | number, options?: ExtractOptions) => CCCDInfo | string | null;
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
/**
 * Chuyển đổi tên tỉnh thành cũ (63 tỉnh) sang mới (34 tỉnh)
 * Dựa trên Nghị quyết sáp nhập 12/6/2025
 */
declare const convertToNewProvince: (currentProvince: string) => string | null;

/**
 * Định dạng ngày tháng theo chuẩn Việt Nam
 * @param date Date | string | number
 * @param format Mặc định 'dd/MM/yyyy'
 */
declare const formatDate: (date: Date | string | number, format?: string) => string;
/**
 * Lấy tên thứ trong tuần
 */
declare const getDayName: (date: Date | string | number) => string;
/**
 * Tính thời gian tương đối (Relative time)
 * @param date Ngày cần so sánh
 * @returns VD: "Vừa xong", "5 phút trước", "2 ngày trước"
 */
declare const timeAgo: (date: Date | string | number) => string;
/**
 * Tính Can Chi của năm (Dương lịch -> Âm lịch text)
 * @param year Năm dương lịch (VD: 2026)
 * @returns Chuỗi Can Chi (VD: "Bính Ngọ")
 */
declare const getCanChi: (year: number | string | Date) => string;
/**
 * Kiểm tra xem có phải năm nhuận không
 */
declare const isLeapYear: (year: number) => boolean;

export { type CCCDInfo, type ExtractOptions, type ReadMoneyConfig, convertToNewProvince, extractCCCD, formatDate, formatVND, getCanChi, getDayName, getPhoneNetwork, getProvinces, isLeapYear, isValidCCCD, isValidMST, isValidPhone, isValidProvince, maskCard, normalizeName, normalizeProvince, parseCCCD, readMoney, removeTone, shortenNumber, slugify, timeAgo };
