import { normalizeProvince, isValidProvince, getProvinces, convertToNewProvince } from '../src/location';

describe('Module Location', () => {
  test('getProvinces() - Lấy danh sách', () => {
    const list = getProvinces();
    expect(list.length).toBe(63); // Việt Nam có 63 tỉnh thành
    expect(list).toContain("Hà Nội");
    expect(list).toContain("Thành phố Hồ Chí Minh");
  });

  test('normalizeProvince() - Chuẩn hóa tên', () => {
    // Case chính xác
    expect(normalizeProvince("Hà Nội")).toBe("Hà Nội");

    // Case viết tắt / Tên thông dụng
    expect(normalizeProvince("tphcm")).toBe("Thành phố Hồ Chí Minh");
    expect(normalizeProvince("Sài Gòn")).toBe("Thành phố Hồ Chí Minh");
    expect(normalizeProvince("hn")).toBe("Hà Nội");

    // Case không dấu / viết hoa thường
    expect(normalizeProvince("da nang")).toBe("Đà Nẵng");
    expect(normalizeProvince("vung tau")).toBe("Bà Rịa - Vũng Tàu");

    // Case map Thành phố -> Tỉnh
    expect(normalizeProvince("Nha Trang")).toBe("Khánh Hòa");
    expect(normalizeProvince("Đà Lạt")).toBe("Lâm Đồng");
    expect(normalizeProvince("Phú Quốc")).toBe("Kiên Giang");

    // Case lịch sử
    expect(normalizeProvince("Hà Tây")).toBe("Hà Nội");
  });

  test('isValidProvince()', () => {
    expect(isValidProvince("Hà Nội")).toBe(true);
    expect(isValidProvince("Tokyo")).toBe(false);
  });

  test('convertToNewProvince() - Sáp nhập 63 -> 34 tỉnh', () => {
    // 1. Nhóm giữ nguyên
    expect(convertToNewProvince("Hà Nội")).toBe("Hà Nội");
    expect(convertToNewProvince("Nghệ An")).toBe("Nghệ An");

    // 2. Nhóm sáp nhập Miền Bắc
    expect(convertToNewProvince("Hải Dương")).toBe("Thành phố Hải Phòng");
    expect(convertToNewProvince("Bắc Giang")).toBe("Bắc Ninh"); // Bắc Ninh + Bắc Giang -> Bắc Ninh
    expect(convertToNewProvince("Hà Nam")).toBe("Ninh Bình");  // Hà Nam + Nam Định + Ninh Bình -> Ninh Bình

    // 3. Nhóm sáp nhập Miền Trung/Tây Nguyên
    expect(convertToNewProvince("Bình Định")).toBe("Gia Lai"); // Gia Lai + Bình Định -> Gia Lai
    expect(convertToNewProvince("Quảng Nam")).toBe("Thành phố Đà Nẵng");
    expect(convertToNewProvince("Phú Yên")).toBe("Đắk Lắk");

    // 4. Nhóm sáp nhập Miền Nam
    expect(convertToNewProvince("Bình dương")).toBe("Thành phố Hồ Chí Minh");
    expect(convertToNewProvince("Tiền Giang")).toBe("Đồng Tháp");
    expect(convertToNewProvince("Bạc Liêu")).toBe("Cà Mau");

    // 5. Test input chưa chuẩn hóa
    expect(convertToNewProvince("tphcm")).toBe("Thành phố Hồ Chí Minh"); // Input viết tắt
    expect(convertToNewProvince("dak lak")).toBe("Đắk Lắk");
  });
});