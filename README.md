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
## Tính năng nổi bật
💰 Tài chính: Đọc số thành chữ (hỗ trợ số siêu lớn tỷ tỷ), định dạng tiền tệ, xử lý dấu phẩy/chấm linh hoạt.

🌏 Hành chính: Chuẩn hóa tên Tỉnh/Thành (HCM -> Thành phố Hồ Chí Minh), map thành phố du lịch về tỉnh.

🆔 Định danh: Kiểm tra/Validate số điện thoại, CCCD, Mã số thuế. Tự động nhận diện nhà mạng.

📅 Thời gian: Format ngày tháng, tính thời gian "vừa xong", tính năm Can Chi (Giáp Thìn).

🔤 Chuỗi: Bỏ dấu tiếng Việt, tạo Slug, chuẩn hóa tên người.

## Hướng dẫn sử dụng
### 1. Tài chính (Finance)
```JavaScript
import { readMoney, formatVND } from 'vn-format';

// Đọc số thành chữ (Hỗ trợ cấu hình đơn vị, dấu phân cách)
readMoney("10500000"); 
// -> "Mười triệu năm trăm nghìn"

readMoney("100.50", { unit: 'USD', decimalStyle: 'group' });
// -> "Một trăm phẩy năm mươi đô la mỹ"

// Định dạng hiển thị
formatVND(500000); // -> "500.000đ"
```
### 2. Địa lý (Location)
Tự động sửa lỗi chính tả và chuẩn hóa tên tỉnh thành.

```JavaScript
import { normalizeProvince } from 'vn-format';

normalizeProvince("tphcm"); // -> "Thành phố Hồ Chí Minh"
normalizeProvince("hà tây"); // -> "Hà Nội" (Tự map lịch sử)
normalizeProvince("Đà Lạt"); // -> "Lâm Đồng" (Map địa danh về tỉnh)
```
### 3. Thời gian (Date)
```JavaScript
import { formatDate, timeAgo, getCanChi } from 'vn-format';

const now = new Date();

formatDate(now, "HH:mm dd/MM/yyyy"); // -> "15:30 14/01/2026"
timeAgo(new Date("2026-01-01")); // -> "2 tuần trước"
getCanChi(2026); // -> "Bính Ngọ"
```

### 4. Định danh (Identity)
```JavaScript
import { getPhoneNetwork, isValidCCCD } from 'vn-format';

getPhoneNetwork("0981234567"); // -> "Viettel"
isValidCCCD("001096000000"); // -> true
```
### 5. Chuỗi (String)
```JavaScript
import { removeTone, slugify } from 'vn-format';

removeTone("Nguyễn Mạnh Cường"); // -> "Nguyen Manh Cuong"
slugify("Khai trương nhà máy DEGO"); // -> "khai-truong-nha-may-dego"
```

---
## Lộ trình phát triển (Roadmap)
- [x] v0.1.0: Core (Finance & String Utils).
- [ ] v0.2.0: Identity (Validate CCCD, Mã số thuế, Số điện thoại).
- [ ] v0.3.0: DateTime (Âm lịch, Ngày lễ Việt Nam).
- [ ] v1.0.0: Stable Release & Full Unit Test.

## Đóng góp
Mọi đóng góp (Pull Requests) đều được hoan nghênh. Vui lòng đọc file CONTRIBUTING.md trước khi bắt đầu.

## License
MIT © [Nguyen Manh Cuong]