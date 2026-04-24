import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Framer Motion since it doesn't work well in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock Lucide React
vi.mock('lucide-react', () => ({
  Rocket: () => <div data-testid="rocket-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Play: () => <div data-testid="play-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Github: () => <div data-testid="github-icon" />,
  Linkedin: () => <div data-testid="linkedin-icon" />,
  Send: () => <div data-testid="send-icon" />,
  ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  Mic2: () => <div data-testid="mic2-icon" />,
  GraduationCap: () => <div data-testid="graduation-cap-icon" />,
  Code: () => <div data-testid="code-icon" />,
  Palette: () => <div data-testid="palette-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Video: () => <div data-testid="video-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
  MessageSquare: () => <div data-testid="message-square-icon" />,
  Link: () => <div data-testid="link-icon" />,
}))
