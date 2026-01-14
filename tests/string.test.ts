import { removeTone, slugify, normalizeName } from '../src/string';

describe('Module String', () => {
  test('removeTone() - Bỏ dấu tiếng Việt', () => {
    expect(removeTone("Nguyễn Mạnh Cường")).toBe("Nguyen Manh Cuong");
    expect(removeTone("Đà Nẵng")).toBe("Da Nang"); // Test chữ Đ
    expect(removeTone("")).toBe("");
  });

  test('slugify() - Tạo URL thân thiện', () => {
    expect(slugify("Chào thế giới 2026!")).toBe("chao-the-gioi-2026");
    expect(slugify("  Lập trình   NodeJS  ")).toBe("lap-trinh-nodejs");
    expect(slugify("Mẹ&Bé")).toBe("mebe"); // Ký tự đặc biệt
  });

  test('normalizeName() - Chuẩn hóa tên người', () => {
    expect(normalizeName("nguyễn   văn   a")).toBe("Nguyễn Văn A");
    expect(normalizeName("PHẠM NHẬT VƯỢNG")).toBe("Phạm Nhật Vượng");
    expect(normalizeName("  le  van  luyen  ")).toBe("Le Van Luyen");
  });
});