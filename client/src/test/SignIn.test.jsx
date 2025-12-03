import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignIn from '../pages/SignIn';
import { AuthProvider } from '../context/AuthContext';

// Mock the API
vi.mock('../api', () => ({
  signin: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { signin } from '../api';

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

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the sign in heading', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('renders email input field', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('renders password input field', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders link to sign up page', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  it('allows user to type email and password', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignIn />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('Your password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls signin API on form submission', async () => {
    const user = userEvent.setup();
    signin.mockResolvedValueOnce({
      token: 'test-token',
      user: { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
    });

    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Your password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays error message on failed sign in', async () => {
    const user = userEvent.setup();
    signin.mockResolvedValueOnce({ error: 'Invalid credentials' });

    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('you@example.com'), 'wrong@example.com');
    await user.type(screen.getByPlaceholderText('Your password'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('navigates to home page on successful sign in', async () => {
    const user = userEvent.setup();
    signin.mockResolvedValueOnce({
      token: 'test-token',
      user: { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
    });

    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Your password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
