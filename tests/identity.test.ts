import { isValidPhone, getPhoneNetwork, isValidCCCD, isValidMST, maskCard, extractCCCD } from '../src/identity';

describe('Module Identity', () => {
  describe('Phone Number', () => {
    test('isValidPhone()', () => {
      expect(isValidPhone("0981234567")).toBe(true);
      expect(isValidPhone("84981234567")).toBe(true);
      expect(isValidPhone("0123456789")).toBe(false); // Đầu số không tồn tại
      expect(isValidPhone("abc")).toBe(false);
    });

    test('getPhoneNetwork() - Nhận diện nhà mạng', () => {
      expect(getPhoneNetwork("0981234567")).toBe("Viettel");
      expect(getPhoneNetwork("0901234567")).toBe("Mobifone");
      expect(getPhoneNetwork("0911234567")).toBe("Vinaphone");
      expect(getPhoneNetwork("0591234567")).toBe("Gmobile");
      expect(getPhoneNetwork("0119999999")).toBe("Invalid"); // Đầu số sai
      expect(getPhoneNetwork("0319999999")).toBe("Unknown");
    });
  });

  describe('Administrative IDs', () => {
    test('isValidCCCD() - Kiểm tra CCCD', () => {
      expect(isValidCCCD("001097000001")).toBe(true); // 12 số
      expect(isValidCCCD("123")).toBe(false);
      expect(isValidCCCD("0010970000019")).toBe(false); // 13 số
    });

    test('isValidMST() - Kiểm tra Mã số thuế', () => {
      expect(isValidMST("0101234567")).toBe(true); // 10 số (Doanh nghiệp)
      expect(isValidMST("0101234567-001")).toBe(true); // 13 số (Chi nhánh)
      expect(isValidMST("010123456")).toBe(false); // 9 số
    });
  });

  describe('Security', () => {
    test('maskCard() - Che số thẻ', () => {
      expect(maskCard("1234567890123456")).toBe("************3456");
      expect(maskCard("123")).toBe("123"); // Quá ngắn không che
    });
  });

  describe('extractCCCD() - Trích xuất thông tin CCCD', () => {
    test('Trích xuất thông tin cơ bản (Nam, Thế kỷ 20, Hà Nội)', () => {
      // 001: HN, 0: Nam TK20, 96: 1996
      const info = extractCCCD("001096000001");

      // Chúng ta ép kiểu về object để typescript nhận diện đúng khi test
      const result = info as any;

      expect(result.isValid).toBe(true);
      expect(result.province).toBe("Hà Nội");
      expect(result.gender).toBe("Nam");
      expect(result.birthYear).toBe(1996);
    });

    test('Trích xuất thông tin (Nữ, Thế kỷ 21, TP.HCM)', () => {
      // 079: HCM, 3: Nữ TK21, 01: 2001
      const info = extractCCCD("079301000002");
      const result = info as any;

      expect(result.province).toBe("Thành phố Hồ Chí Minh");
      expect(result.gender).toBe("Nữ");
      expect(result.birthYear).toBe(2001);
    });

    test('Định dạng Output String', () => {
      const text = extractCCCD("048090000000", { format: 'string' });
      expect(text).toContain("Đà Nẵng");
      expect(text).toContain("Nam");
      expect(text).toContain("1990");
    });

    test('Input Number', () => {
      // Lưu ý: Số number trong JS nếu bắt đầu bằng 0 sẽ bị mất số 0 (001 -> 1)
      // Nên hàm extractCCCD đã xử lý chuyển toString, nhưng tốt nhất user nên truyền string
      // Test case này giả định user truyền số nguyên (mất số 0 đầu) -> sẽ fail length check
      expect(extractCCCD(1096000001)).toBe(null); // Length 10 -> Null

      // Test số đủ 12 chữ số (VD: Tỉnh mã 1xx trở lên)
      // 123456789012
      // expect(extractCCCD(123456789012)).not.toBe(null); 
    });

    test('Mã không hợp lệ', () => {
      expect(extractCCCD("abc")).toBe(null);
      expect(extractCCCD("123")).toBe(null);
    });

    describe('extractCCCD() - Với New Province', () => {
      test('Check tỉnh bị sáp nhập (Hà Nam -> Ninh Bình)', () => {
        // 035: Hà Nam
        const info = extractCCCD("035096000001") as any;

        expect(info.province).toBe("Hà Nam");       // Tên cũ
        expect(info.newProvince).toBe("Ninh Bình"); // Tên mới (sau sáp nhập)
      });

      test('Check tỉnh giữ nguyên (Hà Nội)', () => {
        // 001: Hà Nội
        const info = extractCCCD("001096000001") as any;

        expect(info.province).toBe("Hà Nội");
        expect(info.newProvince).toBe("Hà Nội");
      });

      test('Check format String', () => {
        // 035: Hà Nam
        const text = extractCCCD("035096000001", { format: 'string' });
        // Kỳ vọng output chứa cả tên cũ và mới
        expect(text).toContain("Hà Nam");
        expect(text).toContain("Ninh Bình");
      });
    });
  });
});