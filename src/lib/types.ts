export interface Presenter {
  name: string;
  credentials: string;
  title: string;
  organization?: string;
  bio?: string;
  avatar?: string;
}

export interface Certification {
  isPaid: boolean;
  nigeriaPrice: string;
  internationalPrice: string;
  notes?: string;
}

export interface CEUEvent {
  id: string;
  month: string;
  year: number;
  episode: number;
  status: 'past' | 'upcoming' | 'live';
  title: string;
  presenter: Presenter;
  date: string;
  time: string;
  timezone: string;
  platform: string;
  zoomLink?: string;
  zoomPasscode?: string;
  registrationLink?: string;
  certification: Certification;
  audience?: string;
  highlights?: string[];
  poster?: string;
  theme?: {
    primary: string;
    accent: string;
    gradient: string;
  };
}
