import { readMoney, formatVND, shortenNumber } from '../src/finance';

describe('Module Finance', () => {
  
  // 1. Test tính năng đọc số cơ bản
  describe('readMoney() - Cơ bản', () => {
    test('Đọc số tiền VNĐ chuẩn', () => {
      expect(readMoney(500000)).toBe('Năm trăm nghìn');
    });

    test('Đọc số 0', () => {
      expect(readMoney(0)).toBe('Không');
    });

    test('Đọc số âm', () => {
      expect(readMoney(-50000)).toBe('Âm năm mươi nghìn');
    });
  });

  // 2. Test tính năng đọc số siêu lớn (BigInt)
  describe('readMoney() - Số siêu lớn', () => {
    test('Đọc hàng tỷ', () => {
      expect(readMoney(1000000000)).toBe('Một tỷ');
    });

    // Case này kiểm tra xem logic BigInt của bạn có hoạt động không
    test('Đọc số cực lớn (String Input)', () => {
      const input = "1000000000000000000"; // 1 tỷ tỷ
      expect(readMoney(input)).toBe('Một tỷ tỷ');
    });
  });

  // 3. Test cấu hình nâng cao (Đơn vị & Số thập phân)
  describe('readMoney() - Nâng cao', () => {
    test('Đọc USD', () => {
      expect(readMoney("100", { unit: 'USD' })).toBe('Một trăm đô la mỹ');
    });

    test('Đọc số thập phân (kiểu dấu chấm)', () => {
      // 10.5 USD -> Mười phẩy năm đô la mỹ
      expect(readMoney("10.5", { unit: 'USD', decimalSeparator: '.' }))
        .toBe('Mười phẩy năm đô la mỹ');
    });

    test('Đọc số thập phân (kiểu dấu phẩy VN)', () => {
      // 10,5 VNĐ -> Mười phẩy năm đồng
      expect(readMoney("10,5", { decimalSeparator: ',' }))
        .toBe('Mười phẩy năm');
    });
    
    test('Đọc số thập phân kiểu gộp (Group)', () => {
       expect(readMoney("5.15", { decimalStyle: 'group', unit: 'm2' }))
        .toBe('Năm phẩy mười lăm mét vuông');
    });
  });

  // 4. Test hàm formatVND
  describe('formatVND()', () => {
    test('Định dạng cơ bản', () => {
      expect(formatVND(1000000)).toBe('1.000.000đ');
    });
    
    test('Định dạng số 0', () => {
      expect(formatVND(0)).toBe('0đ');
    });
  });

  describe('shortenNumber() - Rút gọn số', () => {
  test('Rút gọn hàng tỷ', () => {
    expect(shortenNumber(1500000000)).toBe("1.5tỷ");
  });

  test('Rút gọn hàng triệu', () => {
    expect(shortenNumber(2500000)).toBe("2.5tr");
  });

  test('Rút gọn hàng nghìn', () => {
    expect(shortenNumber(12500)).toBe("12.5k");
  });

  test('Số nhỏ giữ nguyên', () => {
    expect(shortenNumber(500)).toBe("500");
  });
});
});