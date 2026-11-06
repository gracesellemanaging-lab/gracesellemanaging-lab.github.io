import projectKvibe from './assets/project-kvibe.jpg';
import projectHealth from './assets/project-health.png';
import projectPortfolio from './assets/project-portfolio.png';

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface WorkMenuItem {
  href: string;
  label: string;
  icon: string;
  external?: boolean;
}

export interface Stat {
  count?: number;
  text?: string;
  label: string;
  delay: number;
}

export interface Skill {
  icon: string;
  name: string;
  pct?: number;
  desc?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  type: 'grid' | 'soft';
  items: Skill[];
}

export interface ProjectFilter {
  id: string;
  label: string;
}

export interface Project {
  category: string;
  tag: string;
  title: string;
  image: string;
  alt: string;
  href: string;
  linkLabel: string;
  description: string;
  delay: number;
}

export interface TimelineItem {
  icon: string;
  num: string;
  date: string;
  title: string;
  description: string;
  delay: number;
}

export interface Service {
  num: string;
  icon: string;
  title: string;
  description: string;
}

export const typingPhrases: string[] = [
  'Designing Interfaces',
  'Prototyping Ideas',
  'Learning Every Day',
];

export const socials: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/gracesellemanaging-lab',
    icon: 'fa-brands fa-github',
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/graceselle.managing.9',
    icon: 'fa-brands fa-facebook-f',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/jselle19?igsh=anBqbjAzdDdiMjNm&igsi=anBqbjAzdDdiMjNm',
    icon: 'fa-brands fa-instagram',
  },
];

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
];

export const workMenu: WorkMenuItem[] = [
  { href: '#projects', label: 'Projects', icon: 'fa-solid fa-folder-open' },
  { href: '#services', label: 'Services', icon: 'fa-solid fa-wand-magic-sparkles' },
  { href: '#timeline', label: 'Experience', icon: 'fa-solid fa-timeline' },
  {
    href: 'assets/Resume.pdf',
    label: 'Resume',
    icon: 'fa-solid fa-file-arrow-down',
    external: true,
  },
];

export const stats: Stat[] = [
  { count: 20, label: 'Years Old', delay: 0 },
  { text: 'UI/UX', label: 'Designer', delay: 200 },
  { text: 'Purple', label: 'Favorite Color', delay: 300 },
  { count: 2, label: 'Featured Projects', delay: 400 },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'design',
    title: 'Design & UX',
    type: 'grid',
    items: [
      { icon: 'fa-solid fa-pen-ruler', name: 'UI Design', pct: 92, desc: 'Visual systems, layout, color & type.' },
      { icon: 'fa-solid fa-magnifying-glass', name: 'UX Research', pct: 85, desc: 'User flows, personas, usability testing.' },
      { icon: 'fa-brands fa-figma', name: 'Figma', pct: 90, desc: 'Wireframes, prototypes, design systems.' },
      { icon: 'fa-solid fa-crop-simple', name: 'Prototyping', pct: 88, desc: 'Interactive, clickable, believable flows.' },
      { icon: 'fa-brands fa-html5', name: 'HTML & CSS', pct: 80, desc: 'Bringing my own designs to the browser.' },
      { icon: 'fa-solid fa-mobile-screen', name: 'Responsive Design', pct: 84, desc: 'Designing for every screen, mobile-first.' },
    ],
  },
  {
    id: 'langs',
    title: 'Programming Languages',
    type: 'grid',
    items: [
      { icon: 'fa-brands fa-html5', name: 'HTML', pct: 90 },
      { icon: 'fa-brands fa-css3-alt', name: 'CSS', pct: 85 },
      { icon: 'fa-brands fa-js', name: 'JavaScript', pct: 70 },
      { icon: 'fa-brands fa-java', name: 'Java', pct: 60 },
      { icon: 'fa-brands fa-python', name: 'Python', pct: 60 },
      { icon: 'fa-solid fa-hashtag', name: 'C#', pct: 60 },
      { icon: 'fa-solid fa-terminal', name: 'Dart', pct: 55 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    type: 'grid',
    items: [
      { icon: 'fa-solid fa-mobile-screen', name: 'Flutter', pct: 65 },
      { icon: 'fa-brands fa-bootstrap', name: 'Bootstrap', pct: 60 },
      { icon: 'fa-solid fa-grid-2', name: 'Material Design', pct: 60 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    type: 'grid',
    items: [
      { icon: 'fa-brands fa-github', name: 'GitHub', pct: 65 },
      { icon: 'fa-solid fa-code', name: 'VS Code', pct: 90 },
      { icon: 'fa-solid fa-pen-nib', name: 'Canva', pct: 75 },
      { icon: 'fa-solid fa-server', name: 'XAMPP', pct: 60 },
      { icon: 'fa-solid fa-database', name: 'MySQL / HeidiSQL', pct: 65 },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    type: 'soft',
    items: [
      { icon: 'fa-solid fa-comments', name: 'Communication' },
      { icon: 'fa-solid fa-magnifying-glass', name: 'Attention to Detail' },
      { icon: 'fa-solid fa-puzzle-piece', name: 'Problem Solving' },
      { icon: 'fa-solid fa-handshake', name: 'Teamwork' },
      { icon: 'fa-solid fa-clock', name: 'Time Management' },
      { icon: 'fa-solid fa-heart', name: 'Empathy' },
    ],
  },
];

export const projectFilters: ProjectFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Apps' },
  { id: 'website', label: 'Websites' },
  { id: 'design', label: 'Design' },
];

export const projects: Project[] = [
  {
    category: 'design',
    tag: 'UI/UX Design',
    title: 'Kvibe Music Player',
    image: projectKvibe,
    alt: 'Kvibe Music Player app screenshot',
    href: 'https://gracesellemanaging-lab.github.io/kvibe-website/',
    linkLabel: 'view Website',
    description:
      'My first project is K-Vibes, an application focused on K-Pop music. I created this project because, as I mentioned in my About Me, I really enjoy K-Pop and music. So, I decided to turn one of my hobbies into a project by creating an application related to K-Pop. Through this project, I was able to combine my interest in K-Pop with my skills in designing and developing an application. It also gave me an opportunity to explore how I can create something based on my personal interests.',
    delay: 0,
  },
  {
    category: 'web',
    tag: 'Web App',
    title: 'Health Monitoring System',
    image: projectHealth,
    alt: 'Health Monitoring System dashboard screenshot',
    href: 'https://gracesellemanaging-lab.github.io/HEALTH-MONITOR/',
    linkLabel: 'Live Demo',
    description:
      'My second project is the Health Monitor System. I developed this system as part of our Software Engineering subject. The main purpose of this system is to help monitor the health information of children at Maloro Integrated School. The system focuses on organizing and monitoring health-related records, making it easier to manage and access important information. This project also helped me understand how technology can be used to create systems that can be useful in real-life situations, especially in schools and communities.',
    delay: 100,
  },
  {
    category: 'website',
    tag: 'Website',
    title: 'This Portfolio',
    image: projectPortfolio,
    alt: 'This Portfolio homepage screenshot',
    href: 'https://gracesellemanaging-lab.github.io/website/',
    linkLabel: 'Live Demo',
    description:
      'And my third project is this portfolio website. This website is one of our current projects, where I can showcase my skills, projects, interests, and experiences as a Computer Science student. I created this portfolio to introduce myself and present the projects that I have worked on in a more organized and creative way. Overall, these three projects represent different sides of mefrom my personal interest, to developing a system for a real-world purpose, and finally, creating a portfolio that represents me as a Computer Science student and aspiring developer.',
    delay: 200,
  },
];

export const timeline: TimelineItem[] = [
  {
    icon: 'fa-solid fa-graduation-cap',
    num: '01',
    date: 'Ongoing',
    title: 'BSCS Tangub City Global College',
    description:
      'Coursework spanning software development, design fundamentals, research methods, and frontend technologies; refining UI/UX skills through real school projects.',
    delay: 0,
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    num: '02',
    date: 'Featured Project',
    title: 'Health Monitoring System Maloro Elementary School',
    description:
      'Designed and built a health monitoring system that organizes student health records and simplifies daily monitoring for school staff.',
    delay: 100,
  },
  {
    icon: 'fa-solid fa-music',
    num: '03',
    date: 'Case Study',
    title: 'Kvibe Music Player Redesign',
    description:
      'A full UI pass on a music app problem analysis, before/after redesign, a consistent UI kit, and a clickable prototype.',
    delay: 0,
  },
  {
    icon: 'fa-solid fa-pen-ruler',
    num: '04',
    date: 'Learning',
    title: 'Design Systems & Frontend Foundations',
    description:
      'Studying typography, color, responsive layout, and micro-interactions then applying them to portfolio and coursework interfaces.',
    delay: 100,
  },
];

export const services: Service[] = [
  {
    num: '01',
    icon: 'fa-solid fa-pen-ruler',
    title: 'UI/UX Design',
    description:
      "Wireframes, user flows, and interfaces in Figma that put the user's task first.",
  },
  {
    num: '02',
    icon: 'fa-solid fa-globe',
    title: 'Web Design',
    description: 'Responsive, accessible websites built with clean HTML, CSS, and JavaScript.',
  },
  {
    num: '03',
    icon: 'fa-solid fa-mobile-screen-button',
    title: 'Mobile Interfaces',
    description: 'Cross-platform app interfaces and prototypes designed with Flutter.',
  },
  {
    num: '04',
    icon: 'fa-solid fa-crop-simple',
    title: 'Prototyping',
    description:
      'Clickable prototypes that let you feel the interface before a single line of code.',
  },
  {
    num: '05',
    icon: 'fa-solid fa-palette',
    title: 'Design Systems',
    description:
      'Consistent color, typography, and component systems that keep products cohesive.',
  },
  {
    num: '06',
    icon: 'fa-solid fa-code',
    title: 'Frontend Development',
    description: 'Bringing designs closer to working products with clean frontend code.',
  },
];
