import { formatDate, getDayName, getCanChi, timeAgo } from '../src/date';

describe('Module Date', () => {
  // Mock thời gian cố định để test không bị sai lệch
  const fixedDate = new Date('2026-01-14T15:30:00'); // 14/01/2026 15:30

  test('formatDate() - Định dạng ngày', () => {
    expect(formatDate(fixedDate)).toBe("14/01/2026");
    expect(formatDate(fixedDate, "HH:mm")).toBe("15:30");
    expect(formatDate(fixedDate, "yyyy-MM-dd")).toBe("2026-01-14");
  });

  test('getDayName() - Lấy thứ', () => {
    expect(getDayName(fixedDate)).toBe("Thứ Tư");
  });

  test('getCanChi() - Tính năm âm lịch', () => {
    expect(getCanChi(2024)).toBe("Giáp Thìn");
    expect(getCanChi(2025)).toBe("Ất Tỵ");
    expect(getCanChi(2026)).toBe("Bính Ngọ");
    expect(getCanChi(1990)).toBe("Canh Ngọ");
  });

  test('timeAgo() - Tính thời gian tương đối', () => {
    // Test "Vừa xong"
    expect(timeAgo(new Date())).toBe("Vừa xong");
    
    // Test quá khứ
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(timeAgo(twoHoursAgo)).toBe("2 giờ trước");
  });
});