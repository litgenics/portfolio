import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Services from '@/components/Services'

describe('Services Component', () => {
  it('renders the services section title', () => {
    render(<Services />)
    // Simplified matcher that just looks for the combined text in the header
    const heading = screen.getByRole('heading', { level: 2, name: /EXPERT CAPABILITIES/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders key service titles', () => {
    render(<Services />)
    expect(screen.getByText(/English Coaching/i)).toBeInTheDocument()
    expect(screen.getByText(/Software Solutions/i)).toBeInTheDocument()
  })
})
