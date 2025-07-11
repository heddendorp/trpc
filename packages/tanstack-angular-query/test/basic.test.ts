import { describe, expect, it } from 'vitest';
import { createTRPCOptionsProxy } from '../src/internals/createOptionsProxy';

describe('createTRPCOptionsProxy', () => {
  it('should export createTRPCOptionsProxy', () => {
    expect(createTRPCOptionsProxy).toBeDefined();
    expect(typeof createTRPCOptionsProxy).toBe('function');
  });
});

describe('package exports', () => {
  it('should be able to import from main entry', async () => {
    const module = await import('../src/index');
    expect(module.createTRPCOptionsProxy).toBeDefined();
    expect(module.provideTRPC).toBeDefined();
  });
});