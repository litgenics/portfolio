import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'

describe('Hero Component', () => {
  it('renders correctly with M.Hamza Shaikh name', () => {
    render(<Hero />)
    expect(screen.getByText(/M.Hamza Shaikh/i)).toBeInTheDocument()
  })

  it('renders the litgenics brand name', () => {
    render(<Hero />)
    expect(screen.getByText(/litgenics/i)).toBeInTheDocument()
  })

  it('contains the CTA button', () => {
    render(<Hero />)
    expect(screen.getByText(/Work with me/i)).toBeInTheDocument()
  })
})
