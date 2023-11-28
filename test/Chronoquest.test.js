import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Root from "../src/client/layout/Root"

describe('<Root>', () => {
  test('renders App component', () => {
    render(<Root />)
  })
})
