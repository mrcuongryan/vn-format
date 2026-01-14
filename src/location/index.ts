import { removeTone } from '../string';

// Bản đồ sáp nhập 63 -> 34 tỉnh thành (Hiệu lực 12/6/2025)
const MERGE_MAPPING_2025: Record<string, string> = {
  // --- Giữ nguyên (11 tỉnh/thành) ---
  "Hà Nội": "Hà Nội",
  "Thừa Thiên Huế": "Thành phố Huế", // Lưu ý: Lên thành phố trực thuộc TW
  "Quảng Ninh": "Quảng Ninh",
  "Cao Bằng": "Cao Bằng",
  "Lạng Sơn": "Lạng Sơn",
  "Lai Châu": "Lai Châu",
  "Điện Biên": "Điện Biên",
  "Sơn La": "Sơn La",
  "Thanh Hóa": "Thanh Hóa",
  "Nghệ An": "Nghệ An",
  "Hà Tĩnh": "Hà Tĩnh",

  // --- Sáp nhập (23 tỉnh/thành mới) ---
  // 1. Tây Bắc & Đông Bắc
  "Hà Giang": "Tuyên Quang", "Tuyên Quang": "Tuyên Quang",
  "Lào Cai": "Lào Cai", "Yên Bái": "Lào Cai",
  "Thái Nguyên": "Thái Nguyên", "Bắc Kạn": "Thái Nguyên",
  "Phú Thọ": "Phú Thọ", "Vĩnh Phúc": "Phú Thọ", "Hòa Bình": "Phú Thọ",
  "Bắc Ninh": "Bắc Ninh", "Bắc Giang": "Bắc Ninh",
  "Hưng Yên": "Hưng Yên", "Thái Bình": "Hưng Yên",
  "Hải Phòng": "Thành phố Hải Phòng", "Hải Dương": "Thành phố Hải Phòng",
  "Ninh Bình": "Ninh Bình", "Hà Nam": "Ninh Bình", "Nam Định": "Ninh Bình",

  // 2. Miền Trung & Tây Nguyên
  "Quảng Trị": "Quảng Trị", "Quảng Bình": "Quảng Trị",
  "Đà Nẵng": "Thành phố Đà Nẵng", "Quảng Nam": "Thành phố Đà Nẵng",
  "Quảng Ngãi": "Quảng Ngãi", "Kon Tum": "Quảng Ngãi",
  "Gia Lai": "Gia Lai", "Bình Định": "Gia Lai",
  "Đắk Lắk": "Đắk Lắk", "Phú Yên": "Đắk Lắk",
  "Khánh Hòa": "Khánh Hòa", "Ninh Thuận": "Khánh Hòa",
  "Lâm Đồng": "Lâm Đồng", "Đắk Nông": "Lâm Đồng", "Bình Thuận": "Lâm Đồng",

  // 3. Miền Nam
  "Đồng Nai": "Đồng Nai", "Bình Phước": "Đồng Nai",
  "Thành phố Hồ Chí Minh": "Thành phố Hồ Chí Minh", "Bà Rịa - Vũng Tàu": "Thành phố Hồ Chí Minh", "Bình Dương": "Thành phố Hồ Chí Minh",
  "Tây Ninh": "Tây Ninh", "Long An": "Tây Ninh",
  "Đồng Tháp": "Đồng Tháp", "Tiền Giang": "Đồng Tháp",
  "Vĩnh Long": "Vĩnh Long", "Bến Tre": "Vĩnh Long", "Trà Vinh": "Vĩnh Long",
  "Cần Thơ": "Thành phố Cần Thơ", "Sóc Trăng": "Thành phố Cần Thơ", "Hậu Giang": "Thành phố Cần Thơ",
  "Cà Mau": "Cà Mau", "Bạc Liêu": "Cà Mau",
  "An Giang": "An Giang", "Kiên Giang": "An Giang"
};

// Danh sách 63 Tỉnh/Thành phố chuẩn (Cập nhật 2024-2025)
const PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
  "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
  "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
  "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội",
  "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
  "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
  "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
  "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Thành phố Hồ Chí Minh", "Trà Vinh",
  "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

// Mapping dữ liệu: [Input người dùng] => [Tên chuẩn]
// Key phải viết thường, không dấu để tối ưu tốc độ tìm kiếm
const PROVINCE_ALIAS: Record<string, string> = {
  // --- 1. CÁC THÀNH PHỐ LỚN & VIẾT TẮT ---
  "hcm": "Thành phố Hồ Chí Minh",
  "tphcm": "Thành phố Hồ Chí Minh",
  "sai gon": "Thành phố Hồ Chí Minh",
  "sg": "Thành phố Hồ Chí Minh",
  "ho chi minh": "Thành phố Hồ Chí Minh",
  
  "hn": "Hà Nội",
  "ha noi": "Hà Nội",
  "thu do": "Hà Nội",
  
  "dn": "Đà Nẵng",
  "da nang": "Đà Nẵng",
  
  "hp": "Hải Phòng",
  "hai phong": "Hải Phòng",
  
  "ct": "Cần Thơ",
  "can tho": "Cần Thơ",

  // --- 2. CÁC TỈNH CÓ TÊN VIẾT TẮT/KHÓ GÕ ---
  "brvt": "Bà Rịa - Vũng Tàu",
  "vt": "Bà Rịa - Vũng Tàu",
  "vung tau": "Bà Rịa - Vũng Tàu",
  "ba ria": "Bà Rịa - Vũng Tàu",
  
  "tth": "Thừa Thiên Huế",
  "hue": "Thừa Thiên Huế",
  "thua thien": "Thừa Thiên Huế",
  
  "dak lak": "Đắk Lắk",
  "dac lac": "Đắk Lắk",
  "daklak": "Đắk Lắk",
  
  "dak nong": "Đắk Nông",
  "dac nong": "Đắk Nông",
  "daknong": "Đắk Nông",
  
  "bac kan": "Bắc Kạn",
  "bac can": "Bắc Kạn",

  // --- 3. XỬ LÝ SÁP NHẬP / TÊN CŨ (HISTORICAL) ---
  "ha tay": "Hà Nội",        // Đã sáp nhập vào HN
  "ha son binh": "Hà Nội",   // Tên rất cũ
  "song be": "Bình Dương",   // Tách thành Bình Dương & Bình Phước (ưu tiên BD)
  "minh hai": "Cà Mau",      // Tách thành Cà Mau & Bạc Liêu (ưu tiên CM)
  "cuu long": "Vĩnh Long",   // Tách thành Vĩnh Long & Trà Vinh
  "nghia binh": "Bình Định", // Tách thành BĐ & Quảng Ngãi
  "phu khanh": "Khánh Hòa",  // Tách thành KH & Phú Yên

  // --- 4. MAP THÀNH PHỐ DU LỊCH VỀ TỈNH (Tính năng nâng cao) ---
  // Giúp người dùng nhập "Nha Trang" vẫn hiểu là tỉnh "Khánh Hòa"
  "nha trang": "Khánh Hòa",
  "da lat": "Lâm Đồng",
  "dalat": "Lâm Đồng",
  "vinh": "Nghệ An",
  "ha long": "Quảng Ninh",
  "buon ma thuot": "Đắk Lắk",
  "bmt": "Đắk Lắk",
  "bien hoa": "Đồng Nai",
  "pleiku": "Gia Lai",
  "quy nhon": "Bình Định",
  "rach gia": "Kiên Giang",
  "phan thiet": "Bình Thuận",
  "mui ne": "Bình Thuận",
  "sapa": "Lào Cai",
  "sa pa": "Lào Cai",
  "phu quoc": "Kiên Giang",
  "con dao": "Bà Rịa - Vũng Tàu"
};

/**
 * Lấy danh sách toàn bộ 63 tỉnh thành
 */
export const getProvinces = (): string[] => {
  return PROVINCES.sort((a, b) => a.localeCompare(b));
};

/**
 * Tìm và chuẩn hóa tên tỉnh thành
 * @param input VD: "tp hcm", "sài gòn", "đà lạt", "hà tây"
 * @returns Tên chuẩn "Thành phố Hồ Chí Minh" hoặc null
 */
export const normalizeProvince = (input: string): string | null => {
  if (!input) return null;

  // 1. Clean input
  const cleanInput = removeTone(input).toLowerCase().trim()
    .replace(/^tp\s+/, "")     // Bỏ chữ "tp " ở đầu (vd: tp ha noi -> ha noi)
    .replace(/^tinh\s+/, "")   // Bỏ chữ "tinh " ở đầu
    .replace(/\s+/g, " ");     // Bỏ khoảng trắng thừa

  // 2. Check trong Alias (Ưu tiên map 1-1 chính xác)
  if (PROVINCE_ALIAS[cleanInput]) {
    return PROVINCE_ALIAS[cleanInput];
  }

  // 3. Tìm trong Alias (Dạng chứa, VD user nhập "tp sài gòn" -> chứa "sài gòn")
  for (const [key, value] of Object.entries(PROVINCE_ALIAS)) {
    if (cleanInput.includes(key)) return value;
  }

  // 4. Tìm kiếm trong danh sách chuẩn (Fuzzy search nhẹ)
  const found = PROVINCES.find(prov => {
    const cleanProv = removeTone(prov).toLowerCase();
    return cleanProv === cleanInput || cleanProv.includes(cleanInput) || cleanInput.includes(cleanProv);
  });

  return found || null;
};

/**
 * Kiểm tra tỉnh thành hợp lệ
 */
export const isValidProvince = (provinceName: string): boolean => {
  return normalizeProvince(provinceName) !== null;
};

/**
 * Chuyển đổi tên tỉnh thành cũ (63 tỉnh) sang mới (34 tỉnh)
 * Dựa trên Nghị quyết sáp nhập 12/6/2025
 */
export const convertToNewProvince = (currentProvince: string): string | null => {
  // 1. Chuẩn hóa tên đầu vào trước (để xử lý case như "tphcm", "daklak"...)
  const normalized = normalizeProvince(currentProvince);
  if (!normalized) return null;

  // 2. Map sang tên mới
  return MERGE_MAPPING_2025[normalized] || normalized; // Fallback về tên cũ nếu không tìm thấy mapping
};