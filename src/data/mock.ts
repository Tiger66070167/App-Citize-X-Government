export const profile = {
  name: "คุณมีปอนด์",
  credit: 1250,
  nextLevel: 2000,
  reported: 12,
  resolved: 9,
  badge: "พลเมืองดี",
};

// Mock geography on the illustrated map (x/y are percentages of the map area).
export type MapPoint = { x: number; y: number };

// Where the simulated GPS fix lands (matches the "my location" dot on /map)
export const gpsFix: MapPoint = { x: 48, y: 48 };

export const places: (MapPoint & { name: string; area: string })[] = [
  { name: "ซอยประชาอุทิศ 12", area: "แขวงสีกัน เขตดอนเมือง กรุงเทพฯ", x: 48, y: 48 },
  { name: "ถนนเชิดวุฒากาศ", area: "แขวงสีกัน เขตดอนเมือง กรุงเทพฯ", x: 15, y: 56 },
  { name: "ถนนสุขุมวิท ใกล้ BTS อ่อนนุช", area: "แขวงพระโขนง เขตวัฒนา กรุงเทพฯ", x: 72, y: 30 },
  { name: "หน้าสำนักงานเขต", area: "แขวงสีกัน เขตดอนเมือง กรุงเทพฯ", x: 50, y: 16 },
  { name: "สวนสาธารณะเขตบางนา", area: "แขวงบางนา เขตบางนา กรุงเทพฯ", x: 44, y: 70 },
  { name: "ริมคลองบางนา", area: "แขวงบางนา เขตบางนา กรุงเทพฯ", x: 80, y: 84 },
];

export const communities: (MapPoint & { name: string; households: number })[] = [
  { name: "ชุมชนวัดดอนเมือง", households: 320, x: 26, y: 34 },
  { name: "ชุมชนสุขใจพัฒนา", households: 185, x: 84, y: 28 },
  { name: "ชุมชนริมคลองบางนา", households: 240, x: 72, y: 86 },
  { name: "ชุมชนตลาดเก่าอ่อนนุช", households: 410, x: 14, y: 66 },
  { name: "หมู่บ้านประชาสุข", households: 150, x: 58, y: 56 },
];

export const dumpIssueTypes = ["ขยะล้น", "มีกลิ่น", "ต้องเพิ่มรอบเก็บ", "ต้องจัดระเบียบพื้นที่"];

export const offenceTypes = ["ทิ้งขยะไม่เป็นที่", "เทขยะไม่ถูกสุขาภิบาล", "ทิ้งก้นบุหรี่", "อื่นๆ"];

export type TrackCase = {
  id: string;
  title: string;
  place: string;
  date: string;
  status: string;
  mine: boolean;
  steps: { label: string; date: string; time: string; done: boolean }[];
  finished?: boolean;
};

export const cases: TrackCase[] = [
  {
    id: "c1",
    title: "ขยะล้นในชุมชน",
    place: "ชุมชนวัดดอนเมือง",
    date: "3 พ.ค. 2568 10:24",
    status: "มอบหมายรถเก็บขยะ",
    mine: true,
    finished: true,
    steps: [
      { label: "รับเรื่อง", date: "3 พ.ค.", time: "10:24", done: true },
      { label: "กำลังตรวจสอบ", date: "3 พ.ค.", time: "11:30", done: true },
      { label: "มอบหมายรถเก็บขยะ", date: "4 พ.ค.", time: "09:15", done: true },
      { label: "เสร็จสิ้น", date: "4 พ.ค.", time: "15:20", done: true },
    ],
  },
  {
    id: "c2",
    title: "พบผู้ทิ้งขยะไม่เป็นที่",
    place: "ถนนสุขุมวิท",
    date: "1 พ.ค. 2568 08:15",
    status: "กำลังตรวจสอบ",
    mine: true,
    steps: [
      { label: "รับเรื่อง", date: "1 พ.ค.", time: "08:20", done: true },
      { label: "กำลังตรวจสอบ", date: "1 พ.ค.", time: "09:40", done: true },
      { label: "มอบหมายเจ้าหน้าที่", date: "-", time: "-", done: false },
      { label: "เสร็จสิ้น", date: "-", time: "-", done: false },
    ],
  },
  {
    id: "c3",
    title: "ขยะล้นที่สาธารณะ",
    place: "สวนสาธารณะเขตบางนา",
    date: "28 เม.ย. 2568 16:40",
    status: "รับเรื่องแล้ว",
    mine: false,
    steps: [
      { label: "รับเรื่อง", date: "28 เม.ย.", time: "16:45", done: true },
      { label: "กำลังตรวจสอบ", date: "-", time: "-", done: false },
      { label: "มอบหมายรถเก็บขยะ", date: "-", time: "-", done: false },
      { label: "เสร็จสิ้น", date: "-", time: "-", done: false },
    ],
  },
];

export const rewards = [
  { icon: "%", title: "คูปองส่วนลด", detail: "ร้านค้าในชุมชน", cost: 500 },
  { icon: "💙", title: "สิทธิพิเศษ", detail: "บริการชุมชน", cost: 800 },
  { icon: "🎁", title: "แลกของรางวัล", detail: "สินค้ารักษ์โลก", cost: 1000 },
];

export const levels = [
  { name: "พลเมืองดี", detail: "ทำดีเพื่อชุมชน", icon: "🌿", active: true },
  { name: "ผู้เฝ้าระวังชุมชน", detail: "ช่วยสอดส่อง ดูแลพื้นที่", icon: "⭐", active: true },
];

export type MapPinKind = "dump" | "offender" | "done" | "bin";

// x/y are percentages on the illustrated map
export const mapPins: {
  id: string;
  kind: MapPinKind;
  title: string;
  place: string;
  status: string;
  date: string;
  x: number;
  y: number;
}[] = [
  {
    id: "c1",
    kind: "done",
    title: "ขยะล้นในชุมชน",
    place: "ชุมชนวัดดอนเมือง",
    status: "เสร็จสิ้น",
    date: "4 พ.ค. 2568",
    x: 28,
    y: 30,
  },
  {
    id: "c2",
    kind: "offender",
    title: "พบผู้ทิ้งขยะไม่เป็นที่",
    place: "ถนนสุขุมวิท ใกล้ BTS อ่อนนุช",
    status: "กำลังตรวจสอบ",
    date: "1 พ.ค. 2568",
    x: 66,
    y: 44,
  },
  {
    id: "c3",
    kind: "dump",
    title: "ขยะล้นที่สาธารณะ",
    place: "สวนสาธารณะเขตบางนา",
    status: "รับเรื่องแล้ว",
    date: "28 เม.ย. 2568",
    x: 44,
    y: 68,
  },
  {
    id: "c4",
    kind: "dump",
    title: "กองขยะริมคลอง",
    place: "ชุมชนริมคลองบางนา",
    status: "มอบหมายรถเก็บขยะ",
    date: "2 พ.ค. 2568",
    x: 80,
    y: 74,
  },
  {
    id: "c5",
    kind: "done",
    title: "ถังขยะชำรุด",
    place: "ตลาดเก่าอ่อนนุช",
    status: "เสร็จสิ้น",
    date: "26 เม.ย. 2568",
    x: 16,
    y: 62,
  },
  {
    id: "b1",
    kind: "bin",
    title: "จุดทิ้งขยะรีไซเคิล",
    place: "หน้าสำนักงานเขต",
    status: "เปิดทุกวัน 06:00–20:00",
    date: "",
    x: 52,
    y: 22,
  },
  {
    id: "b2",
    kind: "bin",
    title: "จุดรับขยะอันตราย",
    place: "ศูนย์ชุมชนสุขใจพัฒนา",
    status: "ทุกวันเสาร์ 09:00–15:00",
    date: "",
    x: 86,
    y: 30,
  },
];

export type NewsItem = {
  id: string;
  category: "ประกาศ" | "กิจกรรม" | "ความรู้";
  title: string;
  summary: string;
  body: string[];
  agency: string;
  date: string;
  image: "hero" | "before" | "after";
};

export const news: NewsItem[] = [
  {
    id: "n1",
    category: "ประกาศ",
    title: "ปรับรอบเก็บขยะเขตดอนเมือง เพิ่มเป็นวันละ 2 รอบ",
    summary:
      "เริ่ม 15 พ.ค. 2568 รถเก็บขยะจะเข้าพื้นที่ช่วงเช้าและเย็น ตามข้อมูลที่ประชาชนแจ้งผ่านแอป",
    body: [
      "จากรายงานของประชาชนผ่านแอปร่วมใจจัดการขยะ พบว่าพื้นที่เขตดอนเมืองมีปัญหาขยะล้นในช่วงเย็นบ่อยครั้ง",
      "สำนักงานเขตจึงปรับรอบการเก็บขยะเป็นวันละ 2 รอบ คือ 06:00–08:00 น. และ 17:00–19:00 น. เริ่มตั้งแต่วันที่ 15 พ.ค. 2568 เป็นต้นไป",
      "ขอความร่วมมือประชาชนนำขยะออกมาวางก่อนเวลารถเข้า และแยกขยะเปียก-แห้งเพื่อความสะดวกของเจ้าหน้าที่",
    ],
    agency: "สำนักงานเขตดอนเมือง",
    date: "5 พ.ค. 2568",
    image: "hero",
  },
  {
    id: "n2",
    category: "กิจกรรม",
    title: "Big Cleaning Day ชุมชนริมคลองบางนา",
    summary: "ชวนอาสาสมัครร่วมเก็บขยะริมคลอง รับ 200 คะแนน Social Credit ต่อการเข้าร่วม",
    body: [
      "ขอเชิญชวนประชาชนร่วมกิจกรรม Big Cleaning Day ทำความสะอาดริมคลองบางนา วันเสาร์ที่ 17 พ.ค. 2568 เวลา 07:00–11:00 น.",
      "จุดนัดพบ: ศาลาชุมชนริมคลองบางนา มีอุปกรณ์ ถุงมือ และอาหารว่างให้",
      "ผู้เข้าร่วมสแกน QR ที่จุดลงทะเบียนเพื่อรับ 200 คะแนน Social Credit",
    ],
    agency: "เทศบาลเมืองของเรา",
    date: "3 พ.ค. 2568",
    image: "after",
  },
  {
    id: "n3",
    category: "ความรู้",
    title: "แยกขยะง่ายๆ 4 ประเภท ที่ทุกบ้านทำได้",
    summary: "ขยะเปียก ขยะรีไซเคิล ขยะทั่วไป และขยะอันตราย แยกอย่างไรให้ถูกต้อง",
    body: [
      "ขยะเปียก (ถังสีเขียว): เศษอาหาร เปลือกผลไม้ นำไปทำปุ๋ยหมักได้",
      "ขยะรีไซเคิล (ถังสีเหลือง): ขวดพลาสติก กระป๋อง กระดาษ แก้ว ควรล้างให้สะอาดก่อนทิ้ง",
      "ขยะทั่วไป (ถังสีน้ำเงิน): ถุงขนม ซองบะหมี่ โฟมเปื้อนอาหาร",
      "ขยะอันตราย (ถังสีแดง): ถ่านไฟฉาย หลอดไฟ กระป๋องสเปรย์ นำไปทิ้งที่จุดรับขยะอันตรายเท่านั้น",
    ],
    agency: "กรมควบคุมมลพิษ",
    date: "1 พ.ค. 2568",
    image: "before",
  },
  {
    id: "n4",
    category: "ประกาศ",
    title: "เพิ่มโทษปรับทิ้งขยะไม่เป็นที่ สูงสุด 5,000 บาท",
    summary: "ผู้แจ้งเบาะแสที่นำไปสู่การดำเนินคดี รับคะแนนพิเศษและส่วนแบ่งค่าปรับ",
    body: [
      "ตาม พ.ร.บ.รักษาความสะอาดและความเป็นระเบียบเรียบร้อยของบ้านเมือง ผู้ทิ้งขยะในที่สาธารณะมีโทษปรับสูงสุด 5,000 บาท",
      "ประชาชนที่แจ้งเบาะแสผ่านแอปพร้อมหลักฐานภาพหรือวิดีโอ และนำไปสู่การดำเนินคดี จะได้รับคะแนน Social Credit พิเศษ 300 คะแนน",
      "ข้อมูลผู้แจ้งจะถูกเก็บเป็นความลับตาม PDPA",
    ],
    agency: "สำนักเทศกิจ",
    date: "28 เม.ย. 2568",
    image: "before",
  },
];

export const collectionSchedule = [
  { day: "จ.–ศ.", time: "06:00–08:00", type: "ขยะทั่วไป" },
  { day: "พ. / ส.", time: "09:00–11:00", type: "ขยะรีไซเคิล" },
  { day: "ส. แรกของเดือน", time: "09:00–15:00", type: "ขยะอันตราย" },
];

export const pointHistory = [
  { title: "แจ้งจุดทิ้งขยะ (ยืนยันแล้ว)", date: "4 พ.ค. 2568", points: 50 },
  { title: "แลกคูปองส่วนลด", date: "2 พ.ค. 2568", points: -500 },
  { title: "เข้าร่วม Big Cleaning Day", date: "20 เม.ย. 2568", points: 200 },
  { title: "แจ้งผู้กระทำผิด (ดำเนินคดีแล้ว)", date: "12 เม.ย. 2568", points: 300 },
];
