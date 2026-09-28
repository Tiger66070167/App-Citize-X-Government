export const profile = {
  name: "คุณมีปอนด์",
  credit: 1250,
  nextLevel: 2000,
  reported: 12,
  resolved: 9,
  badge: "พลเมืองดี",
};

export const communities = [
  "ชุมชนวัดดอนเมือง",
  "ชุมชนสุขใจพัฒนา",
  "ชุมชนริมคลองบางนา",
  "ชุมชนตลาดเก่าอ่อนนุช",
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
