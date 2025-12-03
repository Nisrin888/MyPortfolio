import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from '../pages/Home';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the main heading with name', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Hi, I'm Nischal/i)).toBeInTheDocument();
  });

  it('renders the subtitle description', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/React Developer/i)).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    renderWithRouter(<Home />);
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toBeInTheDocument();
  });

  it('renders View My Work button', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('View My Work')).toBeInTheDocument();
  });

  it('renders Contact Me button', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('navigates to projects page when View My Work is clicked', () => {
    renderWithRouter(<Home />);
    const viewWorkButton = screen.getByText('View My Work');
    fireEvent.click(viewWorkButton);
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('navigates to contact page when Contact Me is clicked', () => {
    renderWithRouter(<Home />);
    const contactButton = screen.getByText('Contact Me');
    fireEvent.click(contactButton);
    expect(mockNavigate).toHaveBeenCalledWith('/contact');
  });
});
