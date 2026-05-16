// ── Core number types ──────────────────────────────────────────────────────
export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;
export type MasterNumber = 11 | 22 | 33;
export type BirthdayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type CompatibilityLevel = 'excellent' | 'good' | 'neutral' | 'challenging';

// ── User profile ───────────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  day: number;
  month: number;
  year: number;
}

// ── Computed numerology numbers ────────────────────────────────────────────
export interface NumerologyNumbers {
  lifePath: NumerologyNumber;
  expression: NumerologyNumber;
  soulUrge: NumerologyNumber;
  personality: NumerologyNumber;
  birthday: number;
  personalYear: NumerologyNumber;
}

// ── Reading types ──────────────────────────────────────────────────────────
export type ReadingType = 'lifePath' | 'expression' | 'soulUrge' | 'personality' | 'birthday' | 'personalYear';

export interface LifePathReading {
  number: number;
  name: string;
  title: string;
  isMaster?: boolean;
  keywords: string[];
  overview: string;
  strengths: string[];
  challenges: string[];
  career: string;
  love: string;
  advice: string;
  famousPeople?: string[];
  element: string;
  planet: string;
}

export interface ExpressionReading {
  number: number;
  name: string;
  isMaster?: boolean;
  keywords: string[];
  meaning: string;
  talents: string[];
  purpose: string;
  career: string;
}

export interface SoulUrgeReading {
  number: number;
  name: string;
  isMaster?: boolean;
  keywords: string[];
  innerDesire: string;
  hiddenNeed: string;
  fulfilled: string;
  unfulfilled: string;
  advice: string;
}

export interface PersonalityReading {
  number: number;
  name: string;
  isMaster?: boolean;
  keywords: string[];
  impression: string;
  firstImpression: string;
  attractedTo: string;
  caution: string;
  style: string;
}

export interface BirthdayReading {
  number: number;
  name?: string;
  reducedTo?: number;
  isMaster?: boolean;
  keywords: string[];
  gift: string;
  detail: string;
}

export interface PersonalYearReading {
  number: number;
  name?: string;
  isMaster?: boolean;
  theme: string;
  energy: string;
  overview: string;
  opportunities: string[];
  challenges: string;
  advice: string;
  love: string;
  career: string;
  health: string;
  color: string;
  monthFocus: { best: number[]; avoid: number[] };
}

// Union of all reading types
export type AnyReading = LifePathReading | ExpressionReading | SoulUrgeReading | PersonalityReading | BirthdayReading | PersonalYearReading;

// Flexible record for UI consumption (all reading fields as optional)
export interface ReadingRecord {
  name?: string;
  keywords?: string[];
  overview?: string;
  meaning?: string;
  innerDesire?: string;
  impression?: string;
  gift?: string;
  career?: string;
  love?: string;
  fulfilled?: string;
  attractedTo?: string;
  strengths?: string[];
  challenges?: string[];
  advice?: string;
}

// ── Lucky info ─────────────────────────────────────────────────────────────
export interface LuckyColor {
  name: string;
  hex: string;
  meaning: string;
}

export interface LuckyGem {
  name: string;
  color: string;
  benefit: string;
}

export interface LuckyInfo {
  lifePathNumber: number;
  colors: LuckyColor[];
  gems: LuckyGem[];
  planet: string;
  planetMeaning: string;
  luckyDays: string[];
  luckyNumbers: number[];
  luckyMonths: number[];
  element: string;
  metal: string;
  chakra: string;
}

// ── Compatibility ──────────────────────────────────────────────────────────
export interface CompatibilityPair {
  level: CompatibilityLevel;
  score: number;
  summary: string;
}

export interface CompatibilityLevelInfo {
  label: string;
  color: string;
  icon: string;
  description: string;
}

// ── Saved readings ─────────────────────────────────────────────────────────
export type Relationship = 'personal' | 'family' | 'friend' | 'partner';

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  personal: 'Cá nhân',
  family:   'Người thân',
  friend:   'Bạn bè',
  partner:  'Người yêu',
};

export interface SavedReading {
  id: string;
  name: string;
  day: number;
  month: number;
  year: number;
  relationship: Relationship;
  numbers: NumerologyNumbers;
  savedAt: string; // ISO date string
}

// ── Indicator metadata (for display) ──────────────────────────────────────
export interface IndicatorMeta {
  key: ReadingType;
  label: string;
  shortLabel: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const INDICATORS: IndicatorMeta[] = [
  { key: 'lifePath',    label: 'Số Đường Đời',  shortLabel: 'Đường Đời',  color: '#f59e0b', bgClass: 'bg-life-path/10',   textClass: 'text-life-path',   borderClass: 'border-life-path/30' },
  { key: 'expression',  label: 'Số Sứ Mệnh',    shortLabel: 'Sứ Mệnh',    color: '#f472b6', bgClass: 'bg-expression/10',  textClass: 'text-expression',  borderClass: 'border-expression/30' },
  { key: 'soulUrge',    label: 'Số Linh Hồn',   shortLabel: 'Linh Hồn',   color: '#a78bfa', bgClass: 'bg-soul/10',        textClass: 'text-soul',        borderClass: 'border-soul/30' },
  { key: 'personality', label: 'Số Nhân Cách',  shortLabel: 'Nhân Cách',  color: '#34d399', bgClass: 'bg-personality/10', textClass: 'text-personality', borderClass: 'border-personality/30' },
  { key: 'birthday',    label: 'Số Ngày Sinh',  shortLabel: 'Ngày Sinh',  color: '#60a5fa', bgClass: 'bg-birthday/10',    textClass: 'text-birthday',    borderClass: 'border-birthday/30' },
  { key: 'personalYear',label: 'Năm Cá Nhân',   shortLabel: 'Năm Cá Nhân',color: '#f97316', bgClass: 'bg-pyear/10',       textClass: 'text-pyear',       borderClass: 'border-pyear/30' },
];
