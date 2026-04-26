// Central event copy shared across the landing page sections.
export type Speaker = {
  name: string;
  role?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  speakers?: Speaker[];
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
  time: "12PM – 7PM",
  venue: "Cornell Tech",
  address: "2 West Loop Rd, New York, NY 10044",
  email: "yc2699@cornell.edu",
  contactName: "Cecilia Chen",
};

export const schedule: ScheduleItem[] = [
  {
    time: "12:00 – 12:45 PM",
    title: "Creative Studio Networking",
    description:
      "Meet creatives in the industry and creative studios across New York. Studios join for in-event portfolio reviews.",
    speakers: [{ name: "Bart Baker-Jaillet", role: "SavoirFaire" }],
  },
  {
    time: "1:00 – 1:15 PM",
    title: "Opening Remarks",
    description: "Welcome, pillar intro, theme manifesto.",
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Fashion × Tech",
    description: "45-minute workshop led by an invited guest from the pillar.",
    speakers: [
      { name: "Sasha Zabegalin", role: "Deployed Creative, FLORA" },
    ],
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Design × Tech",
    description: "45-minute workshop led by an invited guest from the pillar.",
    speakers: [
      { name: "Louis Moncouyoux", role: "Co-founder, SavoirFaire" },
    ],
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Music × Tech",
    description: "45-minute workshop led by an invited guest from the pillar.",
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Film × Tech",
    description: "45-minute workshop led by an invited guest from the pillar.",
  },
  {
    time: "2:15 – 3:00 PM",
    title: "Fireside Chat: Creative Careers, Unfiltered",
    description:
      "An interactive Q&A with creative professionals across disciplines. Listen to their authentic career journeys.",
    speakers: [
      { name: "Limber Zhang", role: "Art Director, MINDS + ASSEMBLY" },
      { name: "Nuran Chen", role: "Product Designer, The New York Times" },
      { name: "Day Chase", role: "Brand Designer" },
      { name: "Jinu Kang", role: "Product Designer, PayPal" },
      { name: "Kailey Kielle", role: "Audio Engineer" },
      { name: "Yi Chen" },
    ],
  },
  {
    time: "3:15 – 3:45 PM",
    title: "Panel Talk: The Future of Creative × Tech",
    description: "Cross-discipline artists argue about where this is all going.",
    speakers: [
      { name: "William Leon", role: "Moderator / Panelist" },
      { name: "Britney", role: "Panelist" },
    ],
  },
  {
    time: "3:45 – 4:15 PM",
    title: "Rapid Fire Demo",
    description:
      "4 minutes to showcase a project — anything goes. Open sign-up, plus walk-up slots day-of.",
  },
  {
    time: "4:25 – 4:45 PM",
    title: "Creative Startup Demo",
    description: "A more polished 20-minute demo from a newly launched startup.",
    speakers: [{ name: "Timothy Wang", role: "Co-founder, Ponder" }],
  },
  {
    time: "4:45 – 5:00 PM",
    title: "Break",
    description: "Stretch, snack, swap notes.",
  },
  {
    time: "5:00 – 5:40 PM",
    title: "Music × Tech Panel: The Future of Music Tech",
    description:
      "A conversation at the intersection of music and tech — how AI and new tools are changing how music is made, performed, and experienced.",
    speakers: [
      { name: "Soumya", role: "Moderator" },
      { name: "Juliette Rolnick", role: "Eleven Labs" },
      { name: "Polina Ivko", role: "Product Marketing Manager, Spotify" },
    ],
  },
  {
    time: "5:45 – 6:05 PM",
    title: "Keynote 1: Branding for Creative",
    description: "Tangible business skills for making it in the industry.",
    speakers: [
      { name: "Rei Inamoto", role: "Author, Professor, Founding Member" },
    ],
  },
  {
    time: "6:05 – 6:25 PM",
    title: "Keynote 2: It Looks Good… But We Have to Sell",
    description: "Building a business and sales techniques for creatives.",
    speakers: [{ name: "Khurram Kalimi", role: "Author, CEO" }],
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
