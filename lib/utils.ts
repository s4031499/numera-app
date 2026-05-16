import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function formatDate(day: number, month: number, year: number, sep = ' / '): string {
  return `${String(day).padStart(2, '0')}${sep}${String(month).padStart(2, '0')}${sep}${year}`;
}
