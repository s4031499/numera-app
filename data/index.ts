import { LIFE_PATH } from './life-path';
import { EXPRESSION } from './expression';
import { SOUL_URGE } from './soul-urge';
import { PERSONALITY } from './personality';
import { BIRTHDAY } from './birthday';
import { PERSONAL_YEAR } from './personal-year';
import { LUCKY } from './lucky';
import { COMPATIBILITY_MATRIX, COMPATIBILITY_LEVELS } from './compatibility';

export {
  LIFE_PATH, EXPRESSION, SOUL_URGE, PERSONALITY,
  BIRTHDAY, PERSONAL_YEAR, LUCKY,
  COMPATIBILITY_MATRIX, COMPATIBILITY_LEVELS,
};

import type {
  ReadingType, LifePathReading, ExpressionReading, SoulUrgeReading,
  PersonalityReading, BirthdayReading, PersonalYearReading,
  AnyReading, LuckyInfo, CompatibilityPair,
} from '@/types/numerology';

function reduceToSingle(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) n = String(n).split('').reduce((a, d) => a + parseInt(d), 0);
  return n;
}

export function getReading(type: 'lifePath', number: number): LifePathReading | null;
export function getReading(type: 'expression', number: number): ExpressionReading | null;
export function getReading(type: 'soulUrge', number: number): SoulUrgeReading | null;
export function getReading(type: 'personality', number: number): PersonalityReading | null;
export function getReading(type: 'birthday', number: number): BirthdayReading | null;
export function getReading(type: 'personalYear', number: number): PersonalYearReading | null;
export function getReading(type: ReadingType, number: number): AnyReading | null;
export function getReading(type: ReadingType, number: number): AnyReading | null {
  const maps: Record<ReadingType, Record<number, unknown>> = {
    lifePath: LIFE_PATH,
    expression: EXPRESSION,
    soulUrge: SOUL_URGE,
    personality: PERSONALITY,
    birthday: BIRTHDAY,
    personalYear: PERSONAL_YEAR,
  };
  const map = maps[type];
  if (!map) return null;
  return (map[number] ?? map[reduceToSingle(number)] ?? null) as AnyReading | null;
}

export function getLucky(lifePathNumber: number): LuckyInfo {
  const map = LUCKY as unknown as Record<number, LuckyInfo>;
  return map[lifePathNumber] ?? map[9];
}

export function getCompatibility(num1: number, num2: number): CompatibilityPair {
  const row = (COMPATIBILITY_MATRIX as Record<number, Record<number, CompatibilityPair>>)[num1]
    ?? (COMPATIBILITY_MATRIX as Record<number, Record<number, CompatibilityPair>>)[9];
  return row?.[num2] ?? row?.[9] ?? { level: 'neutral', score: 60, summary: 'Dữ liệu chưa có.' };
}
