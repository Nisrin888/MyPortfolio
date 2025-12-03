import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../pages/Contact';

// Mock the API
vi.mock('../api', () => ({
  createContact: vi.fn(),
}));

import { createContact } from '../api';

// Helper to render with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the contact page heading', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your message')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });

  it('allows user to type in form fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const messageInput = screen.getByPlaceholderText('Your message');

    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message');

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message');
  });

  it('submits the form successfully', async () => {
    const user = userEvent.setup();
    createContact.mockResolvedValueOnce({ message: 'Contact created successfully!' });

    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('you@example.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Your message'), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createContact).toHaveBeenCalledWith({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      });
    });
  });

  it('displays success message after successful submission', async () => {
    const user = userEvent.setup();
    createContact.mockResolvedValueOnce({ message: 'Contact created successfully!' });

    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('you@example.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Your message'), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('displays error message on submission failure', async () => {
    const user = userEvent.setup();
    createContact.mockResolvedValueOnce({ error: 'Failed to send message' });

    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('you@example.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Your message'), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument();
    });
  });
});
