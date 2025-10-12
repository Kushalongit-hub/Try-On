# Implementation Plan

- [ ] 1. Restructure product categories with gender-based organization
  - Update `constants.tsx` to use `GenderedProductCategories` structure with `female` and `male` top-level keys
  - Move existing Makeup category to `female.makeup`
  - Split Accessories into `female.accessories` and `male.accessories`
  - Split Clothing into `female.clothing` and `male.clothing`
  - Update type definitions in `types.ts` to support gendered structure
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.7_

- [ ] 2. Expand product catalog to 15+ items per subcategory
  - Add 5 new lipstick colors (Nude Beige, Wine Red, Peachy Coral, Rose Pink, Chocolate Brown)
  - Add 5 new eyeliner styles (Green Shimmer, Purple Matte, White Liner, Gold Metallic, Silver Glitter)
  - Add 5 new eye shadow colors (Peach Glow, Lavender, Teal Blue, Burgundy, Champagne)
  - Add 5 new foundation shades (Ivory Fair, Sand Beige, Caramel, Espresso, Ebony)
  - Add 5 new female sunglasses (Butterfly Frame, Geometric Black, Vintage Round, Sport Wrap, Gradient Pink)
  - Add 5 new female glasses (Thin Metal Gold, Bold Red Frame, Transparent Pink, Hexagonal, Oval Vintage)
  - Add 5 new hair accessories (Scrunchie Silk, Claw Clip Tortoise, Bobby Pins Set, Tiara Silver, Bow Clip)
  - Add 5 new dresses (Midi Wrap, Maxi Floral, Cocktail Black, Sundress Yellow, A-Line Navy)
  - Add 5 new female tops (Halter Top, Off-Shoulder, Peplum, Tunic, Camisole)
  - Add 5 new female jackets (Trench Coat, Moto Jacket, Blazer White, Windbreaker, Fur Coat)
  - Add 15 male sunglasses (including Sport Polarized, Classic Aviator Gold, Square Black, Wraparound, Mirrored)
  - Add 15 male glasses (including Thick Black Frame, Thin Wire, Browline, Rectangular, Sporty)
  - Add 15 male shirts (including Oxford Button-Down, Flannel, Henley, Polo Navy, Graphic Tee)
  - Add 15 male jackets (including Varsity Jacket, Windbreaker, Hoodie, Track Jacket, Peacoat)
  - Create new subcategories: Earrings (female), Watches (male), Caps/Hats (male), T-Shirts (male), Pants (male)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15_

- [ ] 3. Add gender tab UI to ProductSelector component
  - Create gender tab buttons (Female/Male) above category tabs
  - Add state management for `activeGender` (default: 'female')
  - Style gender tabs with distinct colors (pink for female, blue for male)
  - Update category tabs to display based on selected gender
  - Clear selected products when switching gender tabs
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

- [ ] 4. Implement single-product-per-subcategory selection logic
  - Update `handleProductToggle` in App.tsx to check for existing products from same subcategory
  - Replace existing product when selecting another from same subcategory
  - Allow deselection by clicking the same product again
  - Allow multiple products from different subcategories
  - Add special conflict rules for mutually exclusive items (sunglasses/glasses, dresses/tops)
  - Update selected products display to show subcategory grouping
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

- [ ] 5. Fix product preview rendering for all product types
  - Update `renderProductItem` to handle color type with proper color swatches
  - Add image error fallback handler with placeholder SVG
  - Improve style type rendering with gradient background and truncated text
  - Ensure consistent sizing (w-16 h-16) for all preview types
  - Add loading="lazy" to image elements for performance
  - Test all product types render correctly (color, style, image)
  - Add hover effects and selection indicators
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10_

- [ ] 6. Update AI prompt generation for gender-specific products
  - Modify `generateWithPollinations` to include gender context in prompts if needed
  - Ensure male products use appropriate descriptive terms
  - Ensure female products use appropriate descriptive terms
  - Test prompt generation with products from both genders
  - _Requirements: 1.7_

- [ ]* 7. Write unit tests for selection logic
  - Test single product per subcategory constraint
  - Test gender tab switching clears selections
  - Test mutually exclusive product conflicts
  - Test multi-subcategory selection
  - _Requirements: 3.1, 3.2, 3.3, 3.7_

- [ ]* 8. Write integration tests for complete catalog
  - Test all 300+ products load correctly
  - Test preview rendering for each product type
  - Test gender switching updates available categories
  - Test custom products work with new structure
  - _Requirements: 2.14, 2.15, 4.1, 4.2, 4.3_
