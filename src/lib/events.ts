import initialEvents from '@/data/events.json';
import type { CEUEvent } from './types';

export * from './types';

export const fallbackEvents: CEUEvent[] = initialEvents as CEUEvent[];

export function getUpcomingEvents(list: CEUEvent[] = fallbackEvents): CEUEvent[] {
  return list.filter((e) => e.status === 'upcoming');
}

export function getPastEvents(list: CEUEvent[] = fallbackEvents): CEUEvent[] {
  return list.filter((e) => e.status === 'past');
}

export function parseEventDate(event: CEUEvent): Date {
  const months: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  const dayMatch = event.date.match(/\b([1-9]|[12][0-9]|3[01])\b/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 15;
  const monthIdx = months[event.month.toLowerCase()] ?? 10;
  const year = event.year || 2026;

  let hours = 19;
  let minutes = 0;
  const timeMatch = event.time.match(/(\d+)(?::(\d+))?\s*(pm|am)?/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[1], 10);
    const m = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const meridian = timeMatch[3]?.toLowerCase();
    if (meridian === 'pm' && h < 12) h += 12;
    if (meridian === 'am' && h === 12) h = 0;
    hours = h;
    minutes = m;
  }

  // WAT is UTC+1, so UTC hour = hours - 1
  return new Date(Date.UTC(year, monthIdx, day, hours - 1, minutes));
}

export function getActiveUpcomingEvent(list: CEUEvent[] = fallbackEvents): CEUEvent {
  // 1. If any event is marked 'live', prioritize it
  const live = list.find((e) => e.status === 'live');
  if (live) return live;

  // 2. Pick the first upcoming event (non-past)
  const upcoming = list.filter((e) => e.status === 'upcoming');
  if (upcoming.length > 0) {
    return upcoming[0];
  }

  // 3. Fallback to latest
  return list[list.length - 1] || fallbackEvents[0];
}
