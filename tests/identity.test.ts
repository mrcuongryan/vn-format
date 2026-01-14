import { isValidPhone, getPhoneNetwork, isValidCCCD, isValidMST, maskCard } from '../src/identity';

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
});