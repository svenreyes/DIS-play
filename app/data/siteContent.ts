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
      "Meet creatives and creative studios — SavoirFaire, Code and Theory, ArtBoundInitiative, People Inc, The Lab, NYCxDESIGN — and sit for in-event portfolio reviews with creative directors.",
    speakers: [
      { name: "Bart Baker-Jaillet", role: "Creative Director, SavoirFaire" },
    ],
  },
  {
    time: "1:00 – 1:15 PM",
    title: "Opening Remarks",
    description: "Welcome, pillar intro, theme manifesto.",
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Workshop: Fashion × Tech",
    description:
      "45-minute hands-on workshop at the intersection of fashion and technology, powered by FLORA.",
    speakers: [{ name: "Sasha Zabegali", role: "FLORA" }],
  },
  {
    time: "1:15 – 2:00 PM",
    title: "Workshop: Design × Tech",
    description:
      "Parallel 45-minute workshop exploring how design practice is being reshaped by new tools.",
    speakers: [{ name: "Mori Liu", role: "Content Creator" }],
  },
  {
    time: "2:00 – 2:45 PM",
    title: "Workshop: Film × Tech",
    description:
      "45-minute hands-on workshop at the intersection of film and technology, powered by KLING.",
    speakers: [{ name: "Tao Prompts", role: "Content Creator · @taoprompts" }],
  },
  {
    time: "2:00 – 2:45 PM",
    title: "Workshop: Music × Tech",
    description:
      "Parallel 45-minute workshop on building, performing, and engineering sound with new tools.",
    speakers: [
      { name: "Kailey Kielle", role: "Sound Designer / Audio Engineer" },
    ],
  },
  {
    time: "2:45 – 3:30 PM",
    title: "Fireside Chat: What Does It Take to Be a Creative?",
    description:
      "An interactive Q&A with creative professionals from all walks of life — their authentic career journeys, unfiltered.",
    speakers: [
      { name: "Yi Lu", role: "Moderator" },
      { name: "Limber Zhang", role: "Art Director, MINDS + ASSEMBLY" },
      { name: "Nuran Chen", role: "Product Designer, The New York Times" },
      {
        name: "Izaac Crayton",
        role: "PD @ M&T Bank · Founder · prev. Morgan Stanley, Ogilvy",
      },
    ],
  },
  {
    time: "3:30 – 4:15 PM",
    title: "Panel: The Future of Creative × Tech",
    description:
      "Creative and technology leaders debate where the industry is heading.",
    speakers: [
      { name: "Michelle Hui", role: "Moderator" },
      { name: "Koh Marini", role: "Startup Founder, YC W26" },
      { name: "Karyn Nakamura", role: "Creative Technologist" },
      { name: "Michael Byrne", role: "Dancer" },
      { name: "Britney", role: "Production · HBO / Netflix" },
    ],
  },
  {
    time: "4:15 – 4:30 PM",
    title: "Break",
    description: "Refreshments.",
  },
  {
    time: "4:30 – 4:45 PM",
    title: "Startup Talk",
    description: "A 15-minute polished demo from a creative startup.",
    speakers: [{ name: "Timothy Wang", role: "Co-founder, Ponder" }],
  },
  {
    time: "4:45 – 5:00 PM",
    title: "Startup Talk",
    description: "A 15-minute polished demo from a creative startup.",
    speakers: [{ name: "Louis Moncouyoux", role: "SavoirFaire" }],
  },
  {
    time: "5:00 – 5:15 PM",
    title: "Startup Talk",
    description: "A 15-minute polished demo from a creative startup.",
    speakers: [{ name: "Infron AI" }],
  },
  {
    time: "5:15 – 6:00 PM",
    title: "Music × Tech Panel: The Future of Music Tech",
    description:
      "A conversation at the intersection of music and tech — how AI and new tools are changing how music is made, performed, and experienced.",
    speakers: [
      { name: "Soumya", role: "Moderator" },
      { name: "Juliette Rolnick", role: "Eleven Labs" },
      { name: "Polina Ivko", role: "Lawyer" },
      { name: "Jessica Gramuglia", role: "Songwriter" },
    ],
  },
  {
    time: "6:00 – 6:15 PM",
    title: "Keynote: Branding for Creative",
    description:
      "Tangible business-skill lessons to make it in the industry.",
    speakers: [
      { name: "Rei Inamoto", role: "Author, Professor, Founding Member" },
    ],
  },
  {
    time: "6:15 – 6:30 PM",
    title: "Keynote: Sales as a Creative",
    description: "Building a business and sales techniques for creatives.",
    speakers: [{ name: "Khurram Kalimi", role: "Author, CEO" }],
  },
  {
    time: "7:00 – 8:00 PM",
    title: "After Party",
    description:
      "Transit up to the House Rooftop and keep the energy going.",
  },
  {
    time: "7:30 – 8:30 PM",
    title: "Rapid-Fire Demo",
    description:
      "4 minutes to showcase a project — anything goes. Open sign-up for students; in-event sign-ups welcome.",
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
