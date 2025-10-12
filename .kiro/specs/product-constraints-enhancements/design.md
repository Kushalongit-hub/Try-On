# Design Document

## Overview

This design implements a robust unique seed value generation system for the Try-On Virtual Exhibition app. The current implementation already generates random seeds using `Math.random()`, but this design enhances it to ensure true uniqueness across all requests, proper logging for debugging, and cryptographically secure random generation when available.

The enhancement focuses on:
1. Upgrading the seed generation function to use cryptographically secure randomness
2. Adding seed tracking and logging for reproducibility
3. Ensuring each retry/regeneration gets a new unique seed
4. Maintaining backward compatibility with the existing Pollinations API integration

## Architecture

### Current State Analysis

The existing `generateRandomSeed()` function in `services/geminiService.ts`:
```typescript
const generateRandomSeed = (): number => {
    return Math.floor(Math.random() * 2147483647);
};
```

This function is already called in `generateWithPollinations()` and included in the Pollinations API URL. However, it lacks:
- Cryptographically secure randomness
- Logging for debugging
- Uniqueness guarantees across rapid successive calls

### Proposed Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    App Component                         │
│  - handleTryOn()                                         │
│  - handleRetry()                                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ calls generateTryOnImage()
                 ▼
┌─────────────────────────────────────────────────────────┐
│              geminiService.ts                            │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  generateTryOnImage()                          │    │
│  │    └─> generateWithPollinations()              │    │
│  │           └─> generateUniqueSeed()             │    │
│  │                  - Uses crypto.getRandomValues()│    │
│  │                  - Logs seed value              │    │
│  │                  - Returns int32 seed           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Seed included in Pollinations URL:                     │
│  https://image.pollinations.ai/...&seed={uniqueSeed}    │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Enhanced Seed Generation Function

**Function Signature:**
```typescript
const generateUniqueSeed = (): number
```

**Implementation Strategy:**
1. Use `crypto.getRandomValues()` for cryptographically secure randomness (available in modern browsers)
2. Fallback to `Math.random()` if crypto API is unavailable
3. Generate values in the range [0, 2147483647] (int32 max)
4. Log the generated seed with timestamp for debugging

**Example Implementation:**
```typescript
const generateUniqueSeed = (): number => {
    let seed: number;
    
    // Try cryptographically secure random generation
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        seed = array[0] % 2147483647; // Ensure within int32 range
    } else {
        // Fallback to Math.random()
        seed = Math.floor(Math.random() * 2147483647);
    }
    
    // Log for debugging and reproducibility
    console.log(`[Seed Generated] ${seed} at ${new Date().toISOString()}`);
    
    return seed;
};
```

### Integration Points

**1. Pollinations Image Generation**
- Replace `generateRandomSeed()` with `generateUniqueSeed()` in `generateWithPollinations()`
- Seed is already included in the URL query parameters
- No changes needed to the URL construction logic

**2. Retry Mechanism**
- The `handleRetry()` function in `App.tsx` already calls `generateTryOnImage()` again
- Each call will automatically generate a new unique seed
- No changes needed to the retry logic

**3. Multiple Requests**
- Each invocation of `generateUniqueSeed()` produces a new value
- Cryptographic randomness ensures statistical uniqueness
- Timestamp logging helps track seed usage across requests

## Data Models

### Seed Value Type
```typescript
type SeedValue = number; // Range: 0 to 2147483647 (int32)
```

### Seed Log Entry (Console Output)
```typescript
interface SeedLogEntry {
    seed: number;
    timestamp: string; // ISO 8601 format
    context: 'initial' | 'retry' | 'regeneration';
}
```

Example console output:
```
[Seed Generated] 1847293847 at 2025-10-12T14:23:45.123Z
[Seed Generated] 923847562 at 2025-10-12T14:24:12.456Z
```

## Error Handling

### Crypto API Unavailable
- **Scenario:** Browser doesn't support `crypto.getRandomValues()`
- **Handling:** Gracefully fallback to `Math.random()`
- **User Impact:** None (transparent fallback)
- **Logging:** Optional warning in console

### Seed Generation Failure
- **Scenario:** Both crypto and Math.random fail (extremely unlikely)
- **Handling:** Use timestamp-based seed as last resort
- **Implementation:**
```typescript
const fallbackSeed = Date.now() % 2147483647;
console.warn('[Seed Fallback] Using timestamp-based seed:', fallbackSeed);
```

### Rapid Successive Calls
- **Scenario:** Multiple requests within milliseconds
- **Handling:** Cryptographic randomness ensures uniqueness
- **Guarantee:** Statistical uniqueness (collision probability < 1 in 2 billion)

## Testing Strategy

### Unit Tests
1. **Test: Seed Range Validation**
   - Verify all generated seeds are between 0 and 2147483647
   - Run 1000 iterations to ensure consistency

2. **Test: Uniqueness Across Calls**
   - Generate 100 seeds in rapid succession
   - Verify no duplicates (statistical test)

3. **Test: Crypto Fallback**
   - Mock `crypto.getRandomValues()` to throw error
   - Verify fallback to `Math.random()` works

4. **Test: Logging Output**
   - Verify console.log is called with correct format
   - Check timestamp is valid ISO 8601 string

### Integration Tests
1. **Test: Seed in Pollinations URL**
   - Call `generateWithPollinations()`
   - Parse returned URL and extract seed parameter
   - Verify seed is present and valid

2. **Test: Retry Generates New Seed**
   - Generate image with seed A
   - Call retry
   - Verify new seed B ≠ seed A

3. **Test: Multiple Requests**
   - Simulate 10 concurrent generation requests
   - Verify each has a unique seed value

### Manual Testing
1. Open browser console
2. Upload image and select product
3. Click "Try On" - observe seed log
4. Click "Retry" - observe new seed log
5. Verify seeds are different
6. Check Pollinations URL includes seed parameter

## Performance Considerations

### Seed Generation Performance
- `crypto.getRandomValues()`: ~0.001ms (negligible)
- `Math.random()`: ~0.0001ms (negligible)
- **Impact:** None - seed generation is not a bottleneck

### Logging Performance
- Console.log: ~0.1ms per call
- **Impact:** Minimal - only called once per generation request
- **Optimization:** Can be disabled in production via environment variable if needed

### Memory Usage
- Seed value: 4 bytes (int32)
- Log string: ~80 bytes
- **Impact:** Negligible - no memory concerns

## Security Considerations

### Cryptographic Randomness
- **Why:** Ensures unpredictability and uniqueness
- **Benefit:** Prevents seed prediction or collision attacks
- **Fallback:** Math.random() is acceptable for non-security-critical use case

### Seed Logging
- **Privacy:** Seeds are not personally identifiable information
- **Security:** Logging seeds doesn't expose sensitive data
- **Production:** Can be conditionally disabled if needed

## Migration Plan

### Phase 1: Update Seed Generation Function
1. Rename `generateRandomSeed()` to `generateUniqueSeed()`
2. Implement crypto API with fallback
3. Add logging

### Phase 2: Update Function Calls
1. Update `generateWithPollinations()` to call `generateUniqueSeed()`
2. Verify URL construction still works

### Phase 3: Testing
1. Run unit tests
2. Run integration tests
3. Manual testing in browser

### Phase 4: Deployment
1. Deploy to Vercel
2. Monitor console logs for seed generation
3. Verify retry functionality works correctly

## Backward Compatibility

- **API Compatibility:** No changes to function signatures
- **URL Format:** Pollinations URL format remains unchanged
- **Existing Code:** No breaking changes to App.tsx or other components
- **Fallback:** Math.random() ensures compatibility with older browsers

## Future Enhancements

### Optional: Seed History Tracking
- Store last N seeds in memory to guarantee uniqueness
- Useful for debugging and analytics

### Optional: Seed Display in UI
- Show seed value in debug panel or result view
- Allow users to manually input seed for reproducibility

### Optional: Seed-based Image Regeneration
- Add "Regenerate with same seed" option
- Useful for testing and comparison

## Summary

This design enhances the existing seed generation system with:
- ✅ Cryptographically secure randomness
- ✅ Proper logging for debugging
- ✅ Guaranteed uniqueness across retries
- ✅ Backward compatibility
- ✅ Minimal performance impact
- ✅ Simple implementation (single function update)

The implementation is straightforward, non-breaking, and provides immediate value for reproducibility and debugging.
