import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServicesCatalog } from '../../src/components/ServicesCatalog';
import { useServiceLauncher } from '../../src/hooks/useServiceLauncher';
import { useLanguage } from '../../src/contexts/LanguageContext';

// Mock dependencies
vi.mock('../../src/hooks/useServiceLauncher', () => ({
  useServiceLauncher: vi.fn(),
}));
vi.mock('../../src/contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

describe('ServicesCatalog', () => {
  const mockLaunchService = vi.fn();
  const mockCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({ lang: 'en', toggleLang: vi.fn() });
    (useServiceLauncher as any).mockReturnValue({
      launchService: mockLaunchService,
      modalServiceId: null,
      closeModal: mockCloseModal,
    });
  });

  it('renders successfully', () => {
    render(<ServicesCatalog />);
    expect(screen.getByPlaceholderText(/Search an act/i)).toBeDefined();
  });

  it('triggers launchService when clicking an act book button', () => {
    render(<ServicesCatalog />);

    // Switch to cards mode to easily find a button
    const cardsBtn = screen.getByTitle(/Card Grid View/i);
    fireEvent.click(cardsBtn);

    // Open the modal by clicking a specific card title directly
    const specificTitle = screen.getAllByText(/Master Profile/i)[0]; // 3.2-1
    if(specificTitle) {
        fireEvent.click(specificTitle);
        const bookBtn = screen.getByText(/Launch \/ Book/i);
        fireEvent.click(bookBtn);
    }

    expect(mockLaunchService).toHaveBeenCalled();
  });
});
