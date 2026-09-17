import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useServiceLauncher } from '../../src/hooks/useServiceLauncher';
import * as UserContext from '../../src/contexts/UserContext';
import { useWorkspaceStore } from '../../src/store/workspaceStore';

// Mock dependencies
vi.mock('../../src/contexts/UserContext', () => ({
  useUser: vi.fn(),
}));

vi.mock('../../src/store/workspaceStore', () => {
  const openWorkspaceMock = vi.fn();
  return {
    useWorkspaceStore: () => ({
      openWorkspace: openWorkspaceMock,
    }),
  };
});

describe('useServiceLauncher Router', () => {
  let openWorkspaceMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    openWorkspaceMock = useWorkspaceStore().openWorkspace;
  });

  it('devrait ouvrir la modal pour un visiteur', () => {
    (UserContext.useUser as any).mockReturnValue({ currentRole: 'visiteur' });

    const { result } = renderHook(() => useServiceLauncher());

    act(() => {
      result.current.launchService('service-123');
    });

    expect(result.current.modalServiceId).toBe('service-123');
    expect(openWorkspaceMock).not.toHaveBeenCalled();
  });

  it('devrait ouvrir le workspace pour un client', () => {
    (UserContext.useUser as any).mockReturnValue({ currentRole: 'client' });

    const { result } = renderHook(() => useServiceLauncher());

    act(() => {
      result.current.launchService('service-456');
    });

    expect(result.current.modalServiceId).toBeNull();
    expect(openWorkspaceMock).toHaveBeenCalledWith('service-456');
  });

  it('devrait suivre la politique fail-safe et ouvrir la modal pour un rôle inconnu', () => {
    (UserContext.useUser as any).mockReturnValue({ currentRole: 'unknown_role' });

    const { result } = renderHook(() => useServiceLauncher());

    act(() => {
      result.current.launchService('service-789');
    });

    expect(result.current.modalServiceId).toBe('service-789');
    expect(openWorkspaceMock).not.toHaveBeenCalled();
  });

  it('devrait fermer la modal proprement', () => {
    (UserContext.useUser as any).mockReturnValue({ currentRole: 'visiteur' });

    const { result } = renderHook(() => useServiceLauncher());

    act(() => {
      result.current.launchService('service-123');
    });

    expect(result.current.modalServiceId).toBe('service-123');

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.modalServiceId).toBeNull();
  });
});
