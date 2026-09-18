import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MSG2MatrixExplorer } from '../../src/components/matrix/MSG2MatrixExplorer';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { MSG2_ALL_SERVICES } from '../../src/data/msg2MatrixData';

// Mock language context
vi.mock('../../src/contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

describe('MSG2MatrixExplorer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({ lang: 'en', toggleLang: vi.fn() });

    // Clear URL query parameters
    window.history.pushState({}, '', '/');
  });

  it('renders correctly with all services by default', () => {
    render(<MSG2MatrixExplorer />);

    // Check if the title/search input is present
    expect(screen.getByPlaceholderText(/Search an act/i)).toBeDefined();

    // Assuming some poles are present
    expect(screen.getByText(/All 3 Poles/i)).toBeDefined();
  });

  it('filters services based on search query', () => {
    render(<MSG2MatrixExplorer />);

    const searchInput = screen.getByPlaceholderText(/Search an act/i);
    fireEvent.change(searchInput, { target: { value: 'ITIN' } });

    // Wait for the URL to update or state to filter, verify via the empty state
    // We expect some services to match "ITIN"
    const emptyState = screen.queryByText(/No services found/i);
    expect(emptyState).toBeNull();
  });

  it('shows empty state when no services match', () => {
    render(<MSG2MatrixExplorer />);

    const searchInput = screen.getByPlaceholderText(/Search an act/i);
    fireEvent.change(searchInput, { target: { value: 'ThisWillNotMatchAnything12345' } });

    expect(screen.getByText(/No services found/i)).toBeDefined();
  });

  it('parses URL query parameters for deep linking', () => {
    // Set up deep link URL
    window.history.pushState({}, '', '/?search=Immigration&pole=1');

    render(<MSG2MatrixExplorer />);

    const searchInput = screen.getByPlaceholderText(/Search an act/i) as HTMLInputElement;
    expect(searchInput.value).toBe('Immigration');

    // The empty state should not trigger if there's a match, but here we just verify state parsed
    expect(searchInput.value).toBe('Immigration');
  });

  it('updates URL when filters change', () => {
    render(<MSG2MatrixExplorer />);

    const searchInput = screen.getByPlaceholderText(/Search an act/i);
    fireEvent.change(searchInput, { target: { value: 'Tax' } });

    expect(window.location.search).toContain('search=Tax');
  });

  it('triggers onOpenBooking when clicking the launch/book button on an act', () => {
    const mockOnOpenBooking = vi.fn();
    render(<MSG2MatrixExplorer onOpenBooking={mockOnOpenBooking} />);

    // Make sure we are in card view by finding and clicking the "Cards" button
    const cardsBtn = screen.getByTitle(/Card Grid View/i);
    fireEvent.click(cardsBtn);

    // Find the first service card by looking for a generic selector or text
    // Usually cards have role="button" or specific classes, let's grab the first title
    const firstService = MSG2_ALL_SERVICES[0];
    const cardTitle = screen.getAllByText(firstService.titleEn)[0];

    fireEvent.click(cardTitle);

    // Modal should be open, verify "Launch / Book" button
    const bookBtn = screen.getByText(/Launch \/ Book/i);
    fireEvent.click(bookBtn);

    expect(mockOnOpenBooking).toHaveBeenCalledWith(firstService.id);
  });
});
