import { describe, it, expect } from 'vitest';
import { createTRPCContext } from '../src/internals/Context';

describe('createTRPCContext', () => {
  it('should create TRPCService and provideTRPC', () => {
    const result = createTRPCContext();
    
    expect(result).toBeDefined();
    expect(result.TRPCService).toBeDefined();
    expect(result.provideTRPC).toBeDefined();
    expect(typeof result.provideTRPC).toBe('function');
  });
});