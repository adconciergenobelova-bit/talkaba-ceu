import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import type { CEUEvent } from './types';

export * from './types';

export function getProjectRoot(): string {
  return process.cwd();
}

export function resolveEventsFilePath(): string {
  return path.resolve(getProjectRoot(), 'src', 'data', 'events.json');
}

export async function readEvents(): Promise<CEUEvent[]> {
  try {
    const filePath = resolveEventsFilePath();
    if (fsSync.existsSync(filePath)) {
      const raw = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading events:', err);
  }
  return [];
}

export async function writeEvents(events: CEUEvent[]): Promise<boolean> {
  try {
    const filePath = resolveEventsFilePath();
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(events, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing events:', err);
    return false;
  }
}

export async function saveEvent(eventData: Partial<CEUEvent>): Promise<CEUEvent> {
  const events = await readEvents();
  const id =
    eventData.id ||
    `${eventData.month?.toLowerCase() || 'event'}-${eventData.year || 2026}-${Date.now()
      .toString()
      .slice(-4)}`;

  const existingIndex = events.findIndex((e) => e.id === id);

  const newEvent: CEUEvent = {
    id,
    month: eventData.month || 'New Month',
    year: eventData.year || 2026,
    episode: eventData.episode || events.length + 1,
    status: eventData.status || 'upcoming',
    title: eventData.title || 'Monthly CEU Presentation',
    presenter: {
      name: eventData.presenter?.name || 'Guest Speaker',
      credentials: eventData.presenter?.credentials || 'BCBA',
      title: eventData.presenter?.title || 'ABA Specialist',
      organization: eventData.presenter?.organization || '',
      bio: eventData.presenter?.bio || '',
      avatar: eventData.presenter?.avatar || '',
    },
    date: eventData.date || 'To Be Announced',
    time: eventData.time || '7:00 PM',
    timezone: eventData.timezone || 'WAT (Nigerian Time)',
    platform: eventData.platform || 'Via Zoom',
    zoomLink: eventData.zoomLink || 'https://tinyurl.com/JoinCEUEvent',
    zoomPasscode: eventData.zoomPasscode || 'TalkABA',
    registrationLink: eventData.registrationLink || 'https://tinyurl.com/talkABAregForm',
    certification: {
      isPaid: true,
      nigeriaPrice: eventData.certification?.nigeriaPrice || '₦3,500 per unit',
      internationalPrice: eventData.certification?.internationalPrice || '$5 per unit',
      notes: eventData.certification?.notes || 'Participation is free. Certification fee is paid.',
    },
    audience:
      eventData.audience ||
      'ABA professionals, paraprofessionals, parents, caregivers, and all players involved in behaviour analysis.',
    highlights: eventData.highlights || [
      'Expert Insights',
      'Practical Strategies',
      'Professional Development',
      'Real-World Applications',
    ],
    poster: eventData.poster || '',
    theme: eventData.theme || {
      primary: '#006978',
      accent: '#00acc1',
      gradient: 'from-teal-800 to-cyan-600',
    },
  };

  if (existingIndex >= 0) {
    events[existingIndex] = newEvent;
  } else {
    events.push(newEvent);
  }

  await writeEvents(events);
  return newEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = await readEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  return writeEvents(filtered);
}
