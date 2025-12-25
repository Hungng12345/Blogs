// lib/utils/date.ts

/**
 * Format ngày kiểu Việt Nam.
 * Input thường gặp:
 * - "2025-01-03" (khuyến nghị)
 * - ISO string "2025-01-03T00:00:00.000Z"
 * - Date object
 */
export function formatDateVi(input?: string | Date): string {
  if (!input) return "";

  const d = parseToDate(input);
  if (!d) return typeof input === "string" ? input : "";

  // ví dụ: "03 tháng 01, 2025"
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Parse an toàn cho nhiều format */
export function parseToDate(input: string | Date): Date | null {
  try {
    if (input instanceof Date) {
      return Number.isNaN(input.getTime()) ? null : input;
    }

    const s = String(input).trim();
    if (!s) return null;

    // Ưu tiên xử lý "YYYY-MM-DD" để tránh lệch timezone
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) {
      const year = Number(m[1]);
      const month = Number(m[2]);
      const day = Number(m[3]);
      // tạo Date theo local time để không bị trừ ngày
      const dt = new Date(year, month - 1, day);
      return Number.isNaN(dt.getTime()) ? null : dt;
    }

    // fallback: để JS parse ISO/Date string khác
    const dt = new Date(s);
    return Number.isNaN(dt.getTime()) ? null : dt;
  } catch {
    return null;
  }
}
