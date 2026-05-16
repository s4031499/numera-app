import type { NumerologyNumber, NumerologyNumbers } from '@/types/numerology';

// ── Pythagorean table ──────────────────────────────────────────────────────
const PYTHAGOREAN: Record<string, number> = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8,
};

const VOWELS = new Set(['A','E','I','O','U','Y']);

// ── Vietnamese diacritic normalization ────────────────────────────────────
const VI_MAP: Record<string, string> = {
  à:'a',á:'a',â:'a',ã:'a',ả:'a',ạ:'a',ă:'a',ắ:'a',ặ:'a',ằ:'a',ẳ:'a',ẵ:'a',
  ấ:'a',ầ:'a',ẩ:'a',ẫ:'a',ậ:'a',
  è:'e',é:'e',ê:'e',ẽ:'e',ẻ:'e',ẹ:'e',ế:'e',ề:'e',ể:'e',ễ:'e',ệ:'e',
  ì:'i',í:'i',î:'i',ĩ:'i',ỉ:'i',ị:'i',
  ò:'o',ó:'o',ô:'o',õ:'o',ỏ:'o',ọ:'o',ơ:'o',ớ:'o',ợ:'o',ờ:'o',ở:'o',ỡ:'o',
  ố:'o',ồ:'o',ổ:'o',ỗ:'o',ộ:'o',
  ù:'u',ú:'u',û:'u',ũ:'u',ủ:'u',ụ:'u',ư:'u',ứ:'u',ừ:'u',ử:'u',ữ:'u',ự:'u',
  ỳ:'y',ý:'y',ỷ:'y',ỹ:'y',ỵ:'y',
  đ:'d',
  À:'A',Á:'A',Â:'A',Ã:'A',Ả:'A',Ạ:'A',Ă:'A',Ắ:'A',Ặ:'A',Ằ:'A',Ẳ:'A',Ẵ:'A',
  Ấ:'A',Ầ:'A',Ẩ:'A',Ẫ:'A',Ậ:'A',
  È:'E',É:'E',Ê:'E',Ẽ:'E',Ẻ:'E',Ẹ:'E',Ế:'E',Ề:'E',Ể:'E',Ễ:'E',Ệ:'E',
  Ì:'I',Í:'I',Î:'I',Ĩ:'I',Ỉ:'I',Ị:'I',
  Ò:'O',Ó:'O',Ô:'O',Õ:'O',Ỏ:'O',Ọ:'O',Ơ:'O',Ớ:'O',Ợ:'O',Ờ:'O',Ở:'O',Ỡ:'O',
  Ố:'O',Ồ:'O',Ổ:'O',Ỗ:'O',Ộ:'O',
  Ù:'U',Ú:'U',Û:'U',Ũ:'U',Ủ:'U',Ụ:'U',Ư:'U',Ứ:'U',Ừ:'U',Ử:'U',Ữ:'U',Ự:'U',
  Ỳ:'Y',Ý:'Y',Ỷ:'Y',Ỹ:'Y',Ỵ:'Y',
  Đ:'D',
};

export function normalizeVietnamese(name: string): string {
  return name
    .normalize('NFC')                    // precompose → VI_MAP keys match
    .split('')
    .map(c => VI_MAP[c] ?? c)           // map Vietnamese-specific chars (đ/ơ/ư…)
    .join('')
    .normalize('NFD')                    // decompose any remaining diacritics
    .replace(/\p{M}/gu, '')             // strip all Unicode combining marks
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '')           // strip any non-alpha leftovers
    .trim();
}

// ── Digit sum ──────────────────────────────────────────────────────────────
function digitSum(n: number): number {
  return String(n).split('').reduce((a, d) => a + parseInt(d), 0);
}

// ── Reduce number — keeps master numbers (11, 22, 33) ─────────────────────
export function reduceNumber(n: number, keepMaster = true): NumerologyNumber {
  if (keepMaster && (n === 11 || n === 22 || n === 33)) return n as NumerologyNumber;
  while (n > 9) {
    n = digitSum(n);
    if (keepMaster && (n === 11 || n === 22 || n === 33)) return n as NumerologyNumber;
  }
  return n as NumerologyNumber;
}

// ── Life Path — Cách B: sum ALL digits of day+month+year at once then reduce
// Ví dụ: 15/08/1990 → 1+5+0+8+1+9+9+0 = 33 → giữ nguyên (master number)
export function calcLifePath(day: number, month: number, year: number): NumerologyNumber {
  const allDigits =
    String(day).padStart(2, '0') +
    String(month).padStart(2, '0') +
    String(year);
  const sum = allDigits.split('').reduce((a, d) => a + parseInt(d), 0);
  return reduceNumber(sum);
}

// ── Expression: all letters ────────────────────────────────────────────────
export function calcExpression(fullName: string): NumerologyNumber {
  const normalized = normalizeVietnamese(fullName);
  const sum = normalized
    .split('')
    .filter(c => c !== ' ')
    .reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
  return reduceNumber(sum);
}

// ── Soul Urge: vowels only ─────────────────────────────────────────────────
export function calcSoulUrge(fullName: string): NumerologyNumber {
  const normalized = normalizeVietnamese(fullName);
  const sum = normalized
    .split('')
    .filter(c => VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
  return reduceNumber(sum);
}

// ── Personality: consonants only ──────────────────────────────────────────
export function calcPersonality(fullName: string): NumerologyNumber {
  const normalized = normalizeVietnamese(fullName);
  const sum = normalized
    .split('')
    .filter(c => c !== ' ' && !VOWELS.has(c) && PYTHAGOREAN[c])
    .reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
  return reduceNumber(sum);
}

// ── Birthday: day of month, keep 11 & 22 ──────────────────────────────────
export function calcBirthday(day: number): number {
  if (day === 11 || day === 22) return day;
  return reduceNumber(day, true);
}

// ── Personal Year ──────────────────────────────────────────────────────────
export function calcPersonalYear(day: number, month: number, currentYear: number): NumerologyNumber {
  const d = reduceNumber(day);
  const m = reduceNumber(month);
  const y = reduceNumber(
    String(currentYear).split('').reduce((a, c) => a + parseInt(c), 0)
  );
  return reduceNumber(d + m + y);
}

// ── Calculate all at once ──────────────────────────────────────────────────
export function calcAll(
  name: string,
  day: number,
  month: number,
  year: number,
  currentYear = new Date().getFullYear()
): NumerologyNumbers {
  return {
    lifePath:    calcLifePath(day, month, year),
    expression:  calcExpression(name),
    soulUrge:    calcSoulUrge(name),
    personality: calcPersonality(name),
    birthday:    calcBirthday(day),
    personalYear:calcPersonalYear(day, month, currentYear),
  };
}
