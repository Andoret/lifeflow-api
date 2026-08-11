export const SCHEDULE_CATEGORIES = [
  'FITNESS',
  'FINANCE',
  'GENERAL',
  'HEALTH',
  'WORK',
  'PERSONAL',
] as const;

export type ScheduleCategory = (typeof SCHEDULE_CATEGORIES)[number];
