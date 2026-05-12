// Central event copy shared across the landing page sections.
export type Speaker = {
  name: string;
  role?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  location?: string;
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
  building: "Tata Innovation Center",
  address: "11 E Loop Rd, New York, NY 10044",
  email: "yc2699@cornell.edu",
  contactName: "Cecilia Chen",
};

export const schedule: ScheduleItem[] = [
  {
    time: "12:00 – 12:45 PM",
    title: "Creative Studio Networking",
    description:
      "Meet creatives and studios across fashion, design, and emerging tech — SavoirFaire, Code and Theory, ArtBound Initiative, Eric Forman Studio, ChanceAI, and more.",
    location: "Tata Lobby",
  },
  {
    time: "12:45 – 1:00 PM",
    title: "Opening Remarks",
    description:
      "Welcome to DIS:PLAY with a pillar overview and theme manifesto from the organizing team.",
    location: "Tata Room 141",
  },
  {
    time: "1:00 – 1:40 PM",
    title: "Synthetic Fashion: AI as Material",
    description:
      "Fashion × Tech — a hands-on intro to using AI as a new kind of fabric for fashion and self-expression. Powered by FLORA.",
    location: "Tata Room 141",
    speakers: [{ name: "Sasha Zabegalin", role: "FLORA" }],
  },
  {
    time: "1:00 – 1:40 PM",
    title: "Vibe Code Your Next Project",
    description:
      "Design × Tech — build real creative projects by vibing with code. No CS degree required, just curiosity and an idea.",
    location: "Tata Room 131",
    speakers: [{ name: "Mori Liu", role: "Content Creator" }],
  },
  {
    time: "1:45 – 2:30 PM",
    title: "Direct a Film With a Prompt",
    description:
      "Film × Tech — make a short AI film from prompt to final cut. Footage without a camera. Powered by KLING.",
    location: "Tata Room 141",
    speakers: [
      { name: "Tao Prompts", role: "Content Creator · @taoprompts" },
    ],
  },
  {
    time: "2:30 – 2:45 PM",
    title: "Startup Talks",
    description:
      "Lightning talks from founders and builders at the edge of creative tech.",
    location: "Tata Rooms 131 & 141",
    speakers: [
      { name: "Timothy Wang", role: "Co-founder, Ponder · Room 131" },
      { name: "Merida Hou", role: "Founding Member, Infron AI · Room 141" },
    ],
  },
  {
    time: "2:45 – 3:30 PM",
    title: "Fireside Chat: Creativity at Work and After Hours",
    description:
      "A conversation about staying restless inside structured environments. How do you push past “good enough,” when do side projects become real work, and what happens when your 9-to-5 output and your creative identity pull in different directions?",
    location: "Tata Room 141",
    speakers: [
      { name: "Yi Lu", role: "Moderator" },
      {
        name: "Nuoran Chen",
        role: "Product Designer, The New York Times",
      },
      {
        name: "Yi Chen",
        role: "Product Design Lead & Cross-Media Artist, Neon Commerce",
      },
      {
        name: "Izaac Crayton",
        role: "Senior Product Designer, M&T Bank",
      },
      {
        name: "Limber Zhang",
        role: "Group Design Supervisor, MINDS + ASSEMBLY",
      },
    ],
  },
  {
    time: "3:30 – 3:50 PM",
    title: "Keynote: A Studio That Refused to Wait",
    description:
      "On building a studio that doesn’t wait for permission to experiment.",
    location: "Tata Room 141",
    speakers: [{ name: "Louis Moncouyoux", role: "SavoirFaire" }],
  },
  {
    time: "4:00 – 4:45 PM",
    title: "Panel: Years in the Making",
    description:
      "Creative tools change every year. Taste takes a decade to build. Practitioners at the edge of creative × tech talk about what lasts, what doesn’t, what they had to unlearn, and how to build a point of view that survives the next platform shift.",
    location: "Tata Room 141",
    speakers: [
      {
        name: "Professor William Leon",
        role: "Moderator · Cornell Tech",
      },
      { name: "Eric Forman", role: "Founder, Eric Forman Studio" },
      { name: "Raj Muhar", role: "Founder, Fyuz Labs" },
      {
        name: "Christopher Brignola",
        role: "Co-Founder & CEO, Nuro Finance",
      },
    ],
  },
  {
    time: "4:45 – 5:05 PM",
    title: "Keynote: Sell Like You Mean It",
    description:
      "Building a business and sales techniques for creatives.",
    location: "Tata Room 141",
    speakers: [{ name: "Khurram Kalimi", role: "Author, CEO" }],
  },
  {
    time: "5:15 – 6:00 PM",
    title: "Panel: Nobody Asked You to Pick a Lane",
    description:
      "For anyone who’s been told they’re “too creative for engineering” or “too technical for art.” How do you get a hybrid skill set taken seriously? When do you stop explaining what you do and just show it?",
    location: "Tata Room 141",
    speakers: [
      { name: "Michelle Hui", role: "Moderator" },
      {
        name: "Koh Terai",
        role: "CEO & Co-Founder, Martini · YC W26",
      },
      {
        name: "Britney N.",
        role: "Film Producer, HBO & Netflix",
      },
      {
        name: "Gazi J.",
        role: "Software Engineer, Google · Content Creator",
      },
      {
        name: "Hanyong Yang",
        role: "Web Designer & Manager, NYCxDESIGN",
      },
    ],
  },
  {
    time: "6:00 – 6:45 PM",
    title: "Panel: Music × Tech — What’s Real Right Now?",
    description:
      "At the intersection of music and emerging tools — how AI is entering the creative process, reshaping workflows, and raising new questions around ownership, authorship, and sound.",
    location: "Tata Room 141",
    speakers: [
      { name: "Soumya Duriseti", role: "Moderator" },
      {
        name: "Juliette Rolnick",
        role: "Product & Deployment of Music, ElevenLabs",
      },
      {
        name: "Polina Ivko",
        role: "Entertainment Attorney & Partner, Adwar Ivko",
      },
      {
        name: "Jessica Gramuglia",
        role: "Music Supervisor, Gramuglia Music & Media",
      },
    ],
  },
  {
    time: "6:45 – 7:00 PM",
    title:
      "Closing Keynote: Entrepreneurship & Leadership in the Creative Industries",
    description:
      "Closing remarks and keynote to send everyone off.",
    location: "Tata Room 141",
    speakers: [{ name: "Professor Mukti Khaire" }],
  },
  {
    time: "7:00 – 9:00 PM",
    title: "After Party: Rapid-Fire Demos & Networking",
    description:
      "Hosted with Epic Connector. Mio Matcha pop-up. Rapid-fire student demos (4 minutes each, sign up in advance or at the event) plus open networking with speakers and founders.",
    location: "The House at Cornell Tech · River Room (26th floor)",
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
