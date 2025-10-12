# Requirements Document

## Introduction

This feature enhances the Try-On Virtual Exhibition app's product catalog with gender-specific categories, expanded product offerings, single-product-per-category selection constraints, and improved product preview rendering. The goal is to provide a more organized shopping experience with gender-appropriate products, prevent conflicting product selections, and ensure all products display correctly with visible previews.

## Requirements

### Requirement 1: Gender-Specific Product Categories

**User Story:** As a user, I want to see products organized by gender (Male/Female), so that I can quickly find products appropriate for my needs.

#### Acceptance Criteria

1. WHEN the product selector loads THEN the system SHALL display two main category tabs: "Male" and "Female"
2. WHEN a user selects the "Male" tab THEN the system SHALL display male-specific product categories (e.g., Men's Shirts, Men's Accessories)
3. WHEN a user selects the "Female" tab THEN the system SHALL display female-specific product categories (e.g., Women's Makeup, Women's Dresses)
4. WHEN products are displayed THEN each gender category SHALL have appropriate subcategories
5. WHEN the app initializes THEN the system SHALL default to showing the "Female" category
6. WHEN switching between gender tabs THEN previously selected products SHALL be cleared to avoid gender-mixing conflicts
7. WHEN a product is selected THEN it SHALL be associated with its gender category for proper AI prompt generation

### Requirement 2: Expanded Product Catalog

**User Story:** As a user, I want access to a wider variety of products in each category, so that I have more options to try on.

#### Acceptance Criteria

1. WHEN the Female Makeup category is displayed THEN it SHALL include at least 15 lipstick colors
2. WHEN the Female Makeup category is displayed THEN it SHALL include at least 15 eyeliner styles
3. WHEN the Female Makeup category is displayed THEN it SHALL include at least 15 eye shadow colors
4. WHEN the Female Makeup category is displayed THEN it SHALL include at least 15 foundation shades
5. WHEN the Female Accessories category is displayed THEN it SHALL include at least 15 sunglasses styles
6. WHEN the Female Accessories category is displayed THEN it SHALL include at least 15 glasses styles
7. WHEN the Female Accessories category is displayed THEN it SHALL include at least 15 hair accessories
8. WHEN the Female Clothing category is displayed THEN it SHALL include at least 15 dresses
9. WHEN the Female Clothing category is displayed THEN it SHALL include at least 15 tops/blouses
10. WHEN the Male Clothing category is displayed THEN it SHALL include at least 15 shirts
11. WHEN the Male Clothing category is displayed THEN it SHALL include at least 15 jackets
12. WHEN the Male Accessories category is displayed THEN it SHALL include at least 15 sunglasses styles
13. WHEN the Male Accessories category is displayed THEN it SHALL include at least 15 watches
14. WHEN products are added THEN each SHALL have a unique name, type, and value
15. WHEN products are added THEN each SHALL have appropriate preview images or color swatches

### Requirement 3: Single Product Per Subcategory Selection

**User Story:** As a user, I want to select only one product per subcategory (e.g., one lipstick, one pair of glasses), so that products don't conflict with each other during try-on.

#### Acceptance Criteria

1. WHEN a user selects a product from a subcategory THEN any previously selected product from the same subcategory SHALL be automatically deselected
2. WHEN a user selects a lipstick THEN any previously selected lipstick SHALL be removed from selection
3. WHEN a user selects sunglasses THEN any previously selected sunglasses or glasses SHALL be removed from selection
4. WHEN a user selects a dress THEN any previously selected dress, shirt, or top SHALL be removed from selection
5. WHEN the selected products view displays THEN it SHALL show at most one product per subcategory
6. WHEN a user attempts to select a second product from the same subcategory THEN the first SHALL be automatically replaced
7. WHEN products are selected from different subcategories THEN all SHALL remain selected (e.g., lipstick + sunglasses + dress)
8. WHEN the "Try On" button is displayed THEN it SHALL be enabled when at least one product is selected
9. WHEN generating an image THEN the system SHALL process all selected products from different subcategories

### Requirement 4: Fixed Product Preview Rendering

**User Story:** As a user, I want to see clear visual previews for all products, so that I know what I'm selecting before trying it on.

#### Acceptance Criteria

1. WHEN a color-based product is displayed THEN it SHALL show a color swatch with the hex color value
2. WHEN an image-based product is displayed THEN it SHALL show a thumbnail preview of the product image
3. WHEN a product preview fails to load THEN it SHALL display a placeholder image or fallback color
4. WHEN products are displayed in a grid THEN all previews SHALL be visible and properly sized
5. WHEN a product has no imageUrl THEN it SHALL display a color swatch if type is 'color'
6. WHEN a product has an imageUrl THEN it SHALL display the image with proper aspect ratio
7. WHEN product images are loaded THEN they SHALL be optimized for fast rendering
8. WHEN a product is selected THEN its preview SHALL have a visual indicator (border, checkmark, etc.)
9. WHEN hovering over a product THEN it SHALL show a hover effect for better interactivity
10. WHEN product previews render THEN they SHALL maintain consistent sizing across all products in the grid
