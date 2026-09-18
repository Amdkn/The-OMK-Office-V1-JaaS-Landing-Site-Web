import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { Header } from '@/src/components/layout/Header';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { UserProvider } from '@/src/contexts/UserContext';
import { ThemeProvider } from '@/src/contexts/ThemeContext';

expect.extend(matchers);

// Remove the global vitest declare to avoid typeparameter mismatch.
// We will simply use @ts-expect-error if needed.

describe('Accessibility Gate', () => {
  it('Header should have no accessibility violations', async () => {
    const { container } = render(
      <LanguageProvider>
        <UserProvider>
          <ThemeProvider>
            <Header
              currentPage="home"
              onOpenModal={() => {}}
              isSidebarOpen={false}
              toggleSidebar={() => {}}
            />
          </ThemeProvider>
        </UserProvider>
      </LanguageProvider>
    );
    const results = await axe(container);
    // @ts-expect-error - vitest-axe adds this method at runtime
    expect(results).toHaveNoViolations();
  });
});
