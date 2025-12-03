import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render with Router and Auth
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the navbar', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders sign in and sign up buttons when not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('navigation links have correct href attributes', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute('href', '/education');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('sign in link has correct href', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/signin');
  });

  it('sign up link has correct href', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: 'Sign Up' })).toHaveAttribute('href', '/signup');
  });
});

describe('Navbar Component - Authenticated User', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('displays user name when authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays sign out button when authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('does not display sign in/sign up links when authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.queryByRole('link', { name: 'Sign In' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Sign Up' })).not.toBeInTheDocument();
  });
});

describe('Navbar Component - Admin User', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify({
      _id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('displays admin badge for admin users', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('displays admin user name', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Admin User')).toBeInTheDocument();
  });
});
