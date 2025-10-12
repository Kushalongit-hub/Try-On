# Design Document

## Overview

This design implements a comprehensive product catalog enhancement with gender-specific categories, expanded product offerings (15+ items per subcategory), single-product-per-subcategory selection logic, and improved preview rendering. The goal is to create a more organized, conflict-free shopping experience with better visual feedback.

The enhancement focuses on:
1. Restructuring product categories with Male/Female top-level tabs
2. Expanding product catalog from 10 items to 15+ items per subcategory
3. Implementing smart selection logic to prevent conflicts (one lipstick, one glasses, etc.)
4. Fixing preview rendering issues for all product types
5. Maintaining backward compatibility with existing custom product system

## Architecture

### Current State Analysis

**Existing Structure:**
- `constants.tsx` defines `PRODUCT_CATEGORIES` with 3 main categories: Makeup, Accessories, Clothing
- Each category has subcategories with ~10 products each
- `ProductSelector.tsx` allows multi-select across all products
- Selection logic doesn't prevent conflicts (can select multiple lipsticks)
- Some image-based products may not render properly

**Issues to Address:**
1. No gender differentiation
2. Limited product variety (10 per subcategory)
3. No subcategory-level selection constraints
4. Preview rendering inconsistencies

### Proposed Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  ProductSelector Component               │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Gender Tabs: [Female] [Male]                  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Category Tabs: [Makeup] [Accessories] [Clothing]│  │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Subcategory: Lipstick (15 items)              │    │
│  │  [Product Grid with Previews]                  │    │
│  │  Selection Logic: Max 1 per subcategory        │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Enhanced Product Category Structure

**New Type Definition:**
```typescript
export interface GenderedProductCategories {
  female: Record<string, ProductCategory>;
  male: Record<string, ProductCategory>;
}
```

**Updated constants.tsx Structure:**
```typescript
export const PRODUCT_CATEGORIES: GenderedProductCategories = {
  female: {
    makeup: { /* Makeup products */ },
    accessories: { /* Female accessories */ },
    clothing: { /* Female clothing */ }
  },
  male: {
    accessories: { /* Male accessories */ },
    clothing: { /* Male clothing */ }
  }
};
```

### 2. Expanded Product Catalog

**Female Categories:**
- **Makeup**
  - Lipstick: 15 colors (add 5 new: Nude Beige, Wine Red, Peachy Coral, Rose Pink, Chocolate Brown)
  - Eyeliner: 15 styles (add 5 new: Green Shimmer, Purple Matte, White Liner, Gold Metallic, Silver Glitter)
  - Eye Shadow: 15 colors (add 5 new: Peach Glow, Lavender, Teal Blue, Burgundy, Champagne)
  - Foundation: 15 shades (add 5 new: Ivory Fair, Sand Beige, Caramel, Espresso, Ebony)

- **Accessories**
  - Sunglasses: 15 styles (add 5 new: Butterfly Frame, Geometric Black, Vintage Round, Sport Wrap, Gradient Pink)
  - Glasses: 15 styles (add 5 new: Thin Metal Gold, Bold Red Frame, Transparent Pink, Hexagonal, Oval Vintage)
  - Hair Accessories: 15 items (add 5 new: Scrunchie Silk, Claw Clip Tortoise, Bobby Pins Set, Tiara Silver, Bow Clip)
  - Earrings: 15 styles (NEW subcategory: Hoops Gold, Studs Diamond, Dangly Pearl, etc.)

- **Clothing**
  - Dresses: 15 items (add 5 new: Midi Wrap, Maxi Floral, Cocktail Black, Sundress Yellow, A-Line Navy)
  - Tops/Blouses: 15 items (add 5 new: Halter Top, Off-Shoulder, Peplum, Tunic, Camisole)
  - Jackets: 15 items (add 5 new: Trench Coat, Moto Jacket, Blazer White, Windbreaker, Fur Coat)

**Male Categories:**
- **Accessories**
  - Sunglasses: 15 styles (add 5 new: Sport Polarized, Classic Aviator Gold, Square Black, Wraparound, Mirrored)
  - Glasses: 15 styles (add 5 new: Thick Black Frame, Thin Wire, Browline, Rectangular, Sporty)
  - Watches: 15 styles (NEW subcategory: Chronograph, Diver, Dress Watch, Smart Watch, etc.)
  - Caps/Hats: 15 items (NEW subcategory: Baseball Cap, Beanie, Fedora, Snapback, etc.)

- **Clothing**
  - Shirts: 15 items (add 5 new: Oxford Button-Down, Flannel, Henley, Polo Navy, Graphic Tee)
  - T-Shirts: 15 items (NEW subcategory: V-Neck, Crew Neck, Long Sleeve, Tank Top, etc.)
  - Jackets: 15 items (add 5 new: Varsity Jacket, Windbreaker, Hoodie, Track Jacket, Peacoat)
  - Pants: 15 items (NEW subcategory: Jeans, Chinos, Joggers, Cargo, Dress Pants)

### 3. Single Product Per Subcategory Selection Logic

**Selection Constraint Algorithm:**
```typescript
const handleProductToggle = (newSelection: SelectedProductInfo) => {
  // Find if there's already a product from the same subcategory
  const existingFromSameSubcategory = selectedProducts.find(
    p => p.subCategory === newSelection.subCategory && 
         p.category === newSelection.category
  );
  
  if (existingFromSameSubcategory) {
    // Replace the existing product with the new one
    const updated = selectedProducts.filter(
      p => !(p.subCategory === newSelection.subCategory && 
             p.category === newSelection.category)
    );
    
    // If clicking the same product, deselect it
    if (existingFromSameSubcategory.product.name === newSelection.product.name) {
      setSelectedProducts(updated);
    } else {
      // Otherwise, replace with new selection
      setSelectedProducts([...updated, newSelection]);
    }
  } else {
    // No conflict, add to selection
    setSelectedProducts([...selectedProducts, newSelection]);
  }
};
```

**Special Conflict Rules:**
- Sunglasses and Glasses are mutually exclusive (both eyewear)
- Dresses and Tops/Shirts are mutually exclusive (both upper body)
- Only one item per subcategory allowed

### 4. Fixed Product Preview Rendering

**Current Issues:**
- Some image URLs may be broken or not loading
- Color swatches for 'style' type products show text instead of visual
- Inconsistent sizing and aspect ratios

**Enhanced Preview Component:**
```typescript
const renderProductPreview = (product: Product) => {
  // Color type: Show color swatch
  if (product.type === 'color') {
    return (
      <div 
        className="w-full h-full rounded-full" 
        style={{ backgroundColor: product.value }}
      />
    );
  }
  
  // Image type with URL: Show image with fallback
  if (product.type === 'image' && product.imageUrl) {
    return (
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          // Fallback to placeholder on error
          e.currentTarget.src = 'data:image/svg+xml,...'; // Placeholder SVG
        }}
      />
    );
  }
  
  // Style type or image without URL: Show styled text badge
  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-2">
      <span className="text-[10px] font-bold text-center leading-tight text-gray-700 dark:text-gray-200">
        {product.name.split(' ').slice(0, 2).join(' ')}
      </span>
    </div>
  );
};
```

**Image Optimization:**
- Use consistent image hosting (imgbb or similar)
- Ensure all images are 200x200px minimum
- Use WebP format for better compression
- Add loading="lazy" for performance

## Data Models

### Updated Product Type
```typescript
export interface Product {
  name: string;
  type: 'color' | 'style' | 'image';
  value: string;
  imageUrl?: string;
  isCustom?: boolean;
  gender?: 'male' | 'female' | 'unisex'; // NEW: Gender association
}
```

### Gender Tab State
```typescript
type GenderTab = 'female' | 'male';

// In ProductSelector component
const [activeGender, setActiveGender] = useState<GenderTab>('female');
const [activeCategory, setActiveCategory] = useState<string>('makeup');
```

### Selection Tracking
```typescript
interface SelectionMap {
  [subcategory: string]: Product; // Only one product per subcategory
}
```

## Error Handling

### Image Loading Failures
- **Scenario:** Product image URL fails to load
- **Handling:** Display fallback placeholder with product name
- **Implementation:** Use `onError` handler on `<img>` tags

### Gender Tab Switching
- **Scenario:** User switches from Female to Male tab
- **Handling:** Clear all selected products to avoid gender mixing
- **User Feedback:** Show toast notification "Selection cleared when switching gender"

### Invalid Product Data
- **Scenario:** Product missing required fields
- **Handling:** Skip rendering, log warning to console
- **Fallback:** Show "Product unavailable" placeholder

## Testing Strategy

### Unit Tests
1. **Test: Selection Constraint Logic**
   - Select lipstick A, then lipstick B → Only B should be selected
   - Select sunglasses, then glasses → Only glasses should be selected
   - Select products from different subcategories → All should remain selected

2. **Test: Gender Tab Switching**
   - Select female products, switch to male tab → Selection should clear
   - Verify category tabs update based on gender

3. **Test: Preview Rendering**
   - Test color type renders swatch
   - Test image type renders image
   - Test style type renders text badge
   - Test image error fallback

### Integration Tests
1. **Test: Complete Selection Flow**
   - Select gender → Select category → Select product → Verify selection
   - Try on → Verify correct products sent to AI

2. **Test: Custom Products**
   - Add custom product to female category
   - Verify it appears in correct subcategory
   - Verify selection constraints apply

### Manual Testing
1. Switch between gender tabs, verify products update
2. Select multiple products from same subcategory, verify only one remains
3. Check all product previews render correctly
4. Test on mobile and desktop viewports

## Performance Considerations

### Product Catalog Size
- **Before:** ~100 products
- **After:** ~300+ products
- **Impact:** Minimal - products lazy-loaded per subcategory
- **Optimization:** Only render active gender/category products

### Image Loading
- Use lazy loading for images
- Implement image caching
- Compress images to <50KB each
- Use CDN for image hosting

### Selection Logic
- O(n) complexity for conflict checking (n = selected products, typically <10)
- Negligible performance impact

## Migration Plan

### Phase 1: Update Data Structure
1. Restructure `constants.tsx` with gender-based categories
2. Add 5+ new products to each subcategory
3. Add new subcategories (Earrings, Watches, Caps, T-Shirts, Pants)

### Phase 2: Update ProductSelector Component
1. Add gender tab UI
2. Update category tab logic to work with gender
3. Implement selection constraint logic
4. Fix preview rendering

### Phase 3: Update App.tsx
1. Handle gender tab state
2. Clear selections on gender switch
3. Update product toggle handler

### Phase 4: Testing & Refinement
1. Test all selection scenarios
2. Verify preview rendering
3. Test on multiple devices
4. Fix any edge cases

## Backward Compatibility

- **Custom Products:** Still work, need gender association
- **Existing Selection Logic:** Replaced with new constraint logic
- **API Calls:** No changes needed to geminiService
- **Theme System:** No changes needed

## UI/UX Enhancements

### Gender Tab Design
```tsx
<div className="flex gap-2 mb-4">
  <button 
    onClick={() => setActiveGender('female')}
    className={`flex-1 py-2 rounded-lg ${activeGender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
  >
    👩 Female
  </button>
  <button 
    onClick={() => setActiveGender('male')}
    className={`flex-1 py-2 rounded-lg ${activeGender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  >
    👨 Male
  </button>
</div>
```

### Selection Indicator
- Show badge count per subcategory: "Lipstick (1/1)"
- Highlight selected product with accent color border
- Show checkmark overlay on selected products

### Preview Grid
- Consistent 4-5 columns on desktop
- 3 columns on tablet
- 2-3 columns on mobile
- Equal spacing and sizing

## Summary

This design enhances the product catalog with:
- ✅ Gender-specific categories (Male/Female)
- ✅ Expanded catalog (15+ items per subcategory, 300+ total products)
- ✅ Smart selection constraints (one per subcategory)
- ✅ Fixed preview rendering for all product types
- ✅ Better UX with clear visual feedback
- ✅ Backward compatible with custom products
- ✅ Scalable architecture for future additions

The implementation requires updates to `constants.tsx`, `ProductSelector.tsx`, and `App.tsx`, with no breaking changes to the AI generation pipeline.
