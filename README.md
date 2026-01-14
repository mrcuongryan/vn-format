# vn-format

![npm version](https://img.shields.io/badge/npm-v0.1.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![size](https://img.shields.io/badge/size-2kb-orange)

**vn-format** là bộ thư viện tiện ích (utility library) "All-in-one" dành cho lập trình viên Việt Nam. Mục tiêu là cung cấp các hàm định dạng, xác thực và xử lý dữ liệu đặc thù cho thị trường Việt Nam một cách chuẩn xác, nhẹ và hiệu năng cao.

## Tại sao chọn vn-format?

* 🚀 **Zero Dependency**: Không phụ thuộc thư viện bên thứ 3, siêu nhẹ.
* 🇻🇳 **Chuẩn Việt Nam**: Tối ưu hóa cho các quy tắc tài chính, hành chính và ngữ pháp tiếng Việt.
* 📦 **Modular**: Hỗ trợ Tree-shaking (chỉ import những gì bạn cần).
* 🔧 **TypeScript**: Viết bằng TypeScript, hỗ trợ autocomplete tuyệt đối.

## Cài đặt

```bash
npm install vn-format
# hoặc
yarn add vn-format
```

## Tính năng (v0.1.0)
Phiên bản Core tập trung vào hai module chính: Tài chính (Finance) và Chuỗi (String).

### 1. Finance (Tiền tệ & Số học)
Xử lý hiển thị tiền tệ và chuyển đổi số.

```JavaScript

import { formatVND, readMoney, shortenNumber } from 'vn-format';

// 1. Định dạng tiền tệ
formatVND(1250000); 
// Output: "1.250.000 đ"

// 2. Đọc số thành chữ (Hỗ trợ cấu hình giọng Bắc/Nam)
readMoney(10500500); 
// Output: "Mười triệu năm trăm nghìn năm trăm đồng"

// 3. Rút gọn số lớn (Cho biểu đồ, dashboard)
shortenNumber(1500000000); 
// Output: "1.5 tỷ"
shortenNumber(12500); 
// Output: "12.5k"
```
### 2. String (Xử lý Tiếng Việt)
Các tiện ích xử lý chuỗi tiếng Việt thường gặp.

```JavaScript

import { removeTone, slugify, normalizeName } from 'vn-format';

// 1. Bỏ dấu tiếng Việt (Dùng cho tìm kiếm)
removeTone("Nguyễn Mạnh Cường"); 
// Output: "Nguyen Manh Cuong"

// 2. Tạo URL Slug chuẩn SEO
slugify("Khai trương nhà máy DEGO ORGANIC"); 
// Output: "khai-truong-nha-may-dego-organic"

// 3. Chuẩn hóa tên người (Viết hoa chữ cái đầu)
normalizeName("nguyễn   mạnh cường"); 
// Output: "Nguyễn Mạnh Cường"
```
## Lộ trình phát triển (Roadmap)
- [x] v0.1.0: Core (Finance & String Utils).
- [ ] v0.2.0: Identity (Validate CCCD, Mã số thuế, Số điện thoại).
- [ ] v0.3.0: DateTime (Âm lịch, Ngày lễ Việt Nam).
- [ ] v1.0.0: Stable Release & Full Unit Test.

Đóng góp
Mọi đóng góp (Pull Requests) đều được hoan nghênh. Vui lòng đọc file CONTRIBUTING.md trước khi bắt đầu.

License
MIT © [Nguyen Manh Cuong]