import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from '@/components/Projects'

describe('Projects Component', () => {
  it('renders the projects section title', () => {
    render(<Projects />)
    // Simplified matcher that just looks for the combined text in the header
    const heading = screen.getByRole('heading', { level: 2, name: /SELECTED WORKS/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders a specific project title', () => {
    render(<Projects />)
    expect(screen.getByText(/Global Brand Identity/i)).toBeInTheDocument()
  })
})
