import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number) {
  try {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString('vi-VN')} VND`;
  }
}
export function formatDate(dateIso?: string) {
  if (!dateIso) return '';
  try {
    return new Date(dateIso).toLocaleDateString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  } catch {
    return '';
  }
}
export function formatDateForInput(dateIso?: string) {
  if (!dateIso) return '';
  try {
    return new Date(dateIso).toISOString().split('T')[0];
  } catch {
    return '';
  }
}