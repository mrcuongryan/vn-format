// test.js
const { formatVND, removeTone, slugify, normalizeName } = require('./dist/index.js');

console.log("--- FINANCE ---");
console.log("Tiền:", formatVND(500000));

console.log("\n--- STRING ---");
console.log("Bỏ dấu:", removeTone("Thử nghiệm tiếng Việt"));
console.log("Slug:", slugify("Hướng dẫn ReactJS cơ bản 2024!"));
console.log("Tên:", normalizeName("  nguyễn    MẠNH cường  "));