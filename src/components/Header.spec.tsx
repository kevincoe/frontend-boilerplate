import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header component', () => {
  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  it('should render the logo', () => {
    renderHeader();
    const logo = screen.getByRole('link', { name: /pegue-e-monte/i });
    expect(logo).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger button is clicked', () => {
    renderHeader();
    
    // Initially the mobile menu should not be visible (only desktop links are visible in DOM)
    // We can identify desktop links by their container or by finding all links
    const mobileMenuButton = screen.getByLabelText(/menu principal/i);
    expect(mobileMenuButton).toBeInTheDocument();

    // Início should be present (desktop)
    const inicioLinksInitial = screen.getAllByRole('link', { name: /início/i });
    expect(inicioLinksInitial).toHaveLength(1); // Only desktop link

    // Click to open mobile menu
    fireEvent.click(mobileMenuButton);

    // Now there should be 2 Início links (1 desktop, 1 mobile)
    const inicioLinksOpened = screen.getAllByRole('link', { name: /início/i });
    expect(inicioLinksOpened).toHaveLength(2);

    // Click again to close
    fireEvent.click(mobileMenuButton);
    const inicioLinksClosed = screen.getAllByRole('link', { name: /início/i });
    expect(inicioLinksClosed).toHaveLength(1);
  });

  it('should close mobile menu when a link is clicked', () => {
    renderHeader();
    
    const mobileMenuButton = screen.getByLabelText(/menu principal/i);
    fireEvent.click(mobileMenuButton); // Open menu

    const inicioLinksOpened = screen.getAllByRole('link', { name: /início/i });
    expect(inicioLinksOpened).toHaveLength(2);

    // Click the mobile link (usually the second one)
    const mobileLink = inicioLinksOpened[1];
    fireEvent.click(mobileLink);

    // Menu should be closed
    const inicioLinksClosed = screen.getAllByRole('link', { name: /início/i });
    expect(inicioLinksClosed).toHaveLength(1);
  });
});
