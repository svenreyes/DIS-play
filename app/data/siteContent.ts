// Central event copy shared across the landing page sections.
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
  meta: string[];
};

export const event = {
  date: "May 13th",
  year: "2026",
  time: "12PM – 6PM",
  venue: "Cornell Tech",
  address: "2 West Loop Rd, New York, NY 10044",
  email: "yc2699@cornell.edu",
  contactName: "Cecilia Chen",
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
      "Run a studio, agency, or creative practice? Exhibit your portfolio, meet potential collaborators, and connect with Cornell Tech students during our opening gallery hour.",
    meta: [
      "60-minute networking showcase (12–1 PM)",
      "Bring prints, screens, or physical work",
      "Table + display space provided",
      "Open to studios and solo practitioners",
    ],
  },
  {
    index: "02",
    title: "Creative Director",
    description:
      "Looking for experienced creative leaders to share their feedback on student portfolios.",
    meta: ["Open to directors in creative studios"],
  },
  {
    index: "03",
    title: "Workshop Host",
    description:
      "Got a skill at the intersection of creativity and technology? Lead a 45-minute hands-on workshop for an audience of builders and makers.",
    meta: [
      "45-minute session",
      "Interactive and hands-on preferred over lecture-style",
    ],
  },
  {
    index: "04",
    title: "Keynote Speaker",
    description:
      "We're looking for speakers who challenge conventions and inspire action.",
    meta: [
      "20-minute keynote slot",
      "Topics: creative entrepreneurship, art × code, industry disruption",
    ],
  },
  {
    index: "05",
    title: "Startup Demo",
    description: "Share the founder story and your product with the crowd.",
    meta: ["20-minute demo"],
  },
  {
    index: "06",
    title: "Rapid-Fire Demo",
    description:
      "Building something weird, wild, or half-finished? Perfect. Show it in 4 minutes. No polish required, that's the whole point.",
    meta: [
      "~4 minutes, rapid-fire format",
      "Work in progress, classwork and research",
      "If it might break on stage, even better",
    ],
  },
];
