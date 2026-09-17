import { describe, it, expect } from 'vitest';
import { isAuthorized } from '../src/lib/security/authz';
import { UserRole } from '../src/contexts/UserContext';

describe('Security - Authorization', () => {
  it('allows access if role is sufficient', () => {
    expect(isAuthorized('admin', 'employer')).toBe(true);
    expect(isAuthorized('employer', 'client')).toBe(true);
    expect(isAuthorized('client', 'visiteur')).toBe(true);
  });

  it('denies access if role is insufficient', () => {
    expect(isAuthorized('visiteur', 'client')).toBe(false);
    expect(isAuthorized('client', 'employer')).toBe(false);
    expect(isAuthorized('employer', 'admin')).toBe(false);
  });
});

import { EchoRequestSchema } from '../src/schemas/api';

describe('Security - API Validation', () => {
  it('accepts valid payloads for EchoRequest', () => {
    const result = EchoRequestSchema.safeParse({ message: 'Hello', data: { foo: 'bar' } });
    expect(result.success).toBe(true);
  });

  it('rejects invalid payloads for EchoRequest', () => {
    const result = EchoRequestSchema.safeParse({ message: 123 }); // message should be string
    expect(result.success).toBe(false);
  });
});
