import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('displays exact text in h2 tag', () => {
    render(<App />);
    expect(screen.getByText(/Group 3 Jenkins Project/i)).toBeInTheDocument();
  });
  it("displays exact text in h4 tag", () => {
    render(<App />);
    expect(screen.getByText(/TECH 2102 - Enterprise Computing/i)).toBeInTheDocument();
  });
  it("displays exact text in marquee", () => {
    render(<App />);
    expect(screen.getByText(/By: Ethan Pelletier, Eilidh Macsymin/i)).toBeInTheDocument();
  });
});
