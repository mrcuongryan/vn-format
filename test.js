const { readMoney } = require('./dist/index.js');

// const { readMoney } = require('vn-format');

// ❌ SAI: Truyền Number (JS tự làm tròn mất đuôi .123)
console.log(readMoney(20695101234560980000.123)); 
// Output: "Hai mươi tỷ tỷ... chín trăm tám mươi nghìn" (Mất phần phẩy)

// ✅ ĐÚNG: Truyền String (Giữ nguyên độ chính xác)
console.log(readMoney("-20695101234560980000.123")); 
// Output: "Hai mươi tỷ tỷ... chín trăm tám mươi nghìn phẩy một hai ba"

// Test đọc gộp phần thập phân
console.log(readMoney("20.15", { decimalStyle: 'group' }));
// Output: "Hai mươi phẩy mười lăm"