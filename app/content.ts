export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type Track = {
  name: string;
  tagline: string;
};

export type Role = {
  index: string;
  title: string;
  description: string;
};

export const event = {
  date: "May 13th",
  year: "2026",
  time: "12PM – 6PM",
  venue: "Cornell Tech",
  address: "2 West Loop Rd, New York, NY 10044",
  email: "yc2699@cornell.edu",
};

export const schedule: ScheduleItem[] = [
  {
    time: "12:00",
    title: "Networking",
    description: "Arrive, grab a drink, meet the other disruptors.",
  },
  {
    time: "12:30",
    title: "Opening Remarks",
    description: "What is DIS:PLAY, and why break the frame?",
  },
  {
    time: "1:00",
    title: "Fashion × Tech",
    description: "Garments as interfaces. Runway meets runtime.",
  },
  {
    time: "1:45",
    title: "Music × Tech",
    description: "Sound design in the age of synthesizers you talk to.",
  },
  {
    time: "2:30",
    title: "Design × Tech",
    description: "Rough edges, wrong fonts, right questions.",
  },
  {
    time: "3:15",
    title: "Film × Tech",
    description: "Moving images, generative frames, new grammars.",
  },
  {
    time: "4:00",
    title: "Panel Talk",
    description: "Cross-discipline artists argue about the future.",
  },
  {
    time: "4:45",
    title: "Work-in-Progress Demos",
    description: "Unfinished. Unpolished. On purpose.",
  },
  {
    time: "5:15",
    title: "Startup Demos",
    description: "Rapid-fire pitches from creative tech founders.",
  },
  {
    time: "5:45",
    title: "Keynotes",
    description: "Closing signals from voices we trust.",
  },
];

export const tracks: Track[] = [
  { name: "Fashion", tagline: "Wearable protest." },
  { name: "Film", tagline: "Frames that fight back." },
  { name: "Design", tagline: "Rules, broken on purpose." },
  { name: "Music", tagline: "Noise with intent." },
];

export const roles: Role[] = [
  {
    index: "01",
    title: "Creative Studio",
    description:
      "Bring your studio on stage. Residency-style showcase with full creative freedom.",
  },
  {
    index: "02",
    title: "Creative Director",
    description:
      "Shape a track end-to-end. Curate artists, set the tone, break the format.",
  },
  {
    index: "03",
    title: "Workshop Host",
    description:
      "Run a hands-on 30–60 min session. Teach a tool, a hack, a way of seeing.",
  },
  {
    index: "04",
    title: "Keynote Speaker",
    description:
      "15 minutes. One provocative idea. No slides required.",
  },
  {
    index: "05",
    title: "Startup Demo",
    description:
      "Show what you're building. Live product walkthrough, feedback welcome.",
  },
  {
    index: "06",
    title: "Rapid-Fire Demo",
    description:
      "Five minutes, one project. Raw, unfinished, unapologetic.",
  },
];
