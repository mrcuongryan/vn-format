/**
 * Danh sách thứ trong tuần
 */
const DAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

// Dữ liệu Can - Chi
const CAN = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
const CHI = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];

/**
 * Định dạng ngày tháng theo chuẩn Việt Nam
 * @param date Date | string | number
 * @param format Mặc định 'dd/MM/yyyy'
 */
export const formatDate = (date: Date | string | number, format = 'dd/MM/yyyy'): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const pad = (n: number) => n < 10 ? `0${n}` : n.toString();

  const map: Record<string, string> = {
    'dd': pad(d.getDate()),
    'MM': pad(d.getMonth() + 1),
    'yyyy': d.getFullYear().toString(),
    'HH': pad(d.getHours()),
    'mm': pad(d.getMinutes()),
    'ss': pad(d.getSeconds())
  };

  return format.replace(/dd|MM|yyyy|HH|mm|ss/g, (matched) => map[matched]);
};

/**
 * Lấy tên thứ trong tuần
 */
export const getDayName = (date: Date | string | number): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return DAYS[d.getDay()];
};

/**
 * Tính thời gian tương đối (Relative time)
 * @param date Ngày cần so sánh
 * @returns VD: "Vừa xong", "5 phút trước", "2 ngày trước"
 */
export const timeAgo = (date: Date | string | number): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 0) return formatDate(date, 'HH:mm dd/MM/yyyy');
  if (seconds < 60) return "Vừa xong";
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;

  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  if (days < 365) return `${Math.floor(days / 30)} tháng trước`;

  return `${Math.floor(days / 365)} năm trước`;
};

/**
 * Tính Can Chi của năm (Dương lịch -> Âm lịch text)
 * @param year Năm dương lịch (VD: 2026)
 * @returns Chuỗi Can Chi (VD: "Bính Ngọ")
 */
export const getCanChi = (year: number | string | Date): string => {
  let y = 0;
  if (typeof year === 'object') y = year.getFullYear();
  else y = Number(year);

  if (isNaN(y) || y <= 0) return "";

  const can = CAN[y % 10];
  const chi = CHI[y % 12];

  return `${can} ${chi}`;
};

/**
 * Kiểm tra xem có phải năm nhuận không
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};