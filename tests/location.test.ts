import { normalizeProvince, isValidProvince, getProvinces } from '../src/location';

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
});