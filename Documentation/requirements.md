# overview
We are building a tool that will allow users to try out different formatting on a D2C website to preview changes in a webapp before they are implemented. Users will be able to change the fonts, font sizes, colors, and layout of products in the D2C store. An example D2C store that they could edit is http://merch.dojacat.com

The user should be able to change these formatting options in a panel, with dropdown selectors for each editable field. Next to this panel should be a window with the resulting web design that updates as the user makes changes. When a user is satisfied with the changes they made, they should be able to click a button to generate the HTML and CSS files of the design.

The store should have a simple CSS template to be edited. The template should contain these pieces:
-Fonts
--The fonts should be applied uniformly across the D2C Store
-Colors: There should be 3 main colors that a user chooses, Primary, Secondary, and Accent. Where the colors are applied are listed below.
* Primary color: main color in text
    * Main page:
        * Product titles
        * footer text
    * Product Detail Page
        * Title
        * Description
        * Price
        * In-stock/return policy text
        * Button text
            * Unselected variation text and outline
            * Quantity
            * Add to Cart
    * Cart
        * Headers
        * Product Titals
        * Product selection details
        * Delivery promise
        * Text on Quantity buttons
        * Subtotal
        * Checkout with Amazon text
    * Order page
        * All text except what’s listed below for Secondary Color
    * Order Confirmation
        * All text except listed below for accent color


* Secondary color: used for links and subtexts
    * Product Detail Page
        * Delivery Promise
    * Cart
        * Taxes and shipping message
    * Order page
        * Default payment message
        * Privacy policy message
* Accent color: used for prices on main page and highlighting button selections
    * Main page:
        * Price
    * Product Detail Page:
        * Selected variation button text and outline
        * “Added to Cart” text in interstitial when added to cart
    * Cart
        * Prices
    * Order Confirmation
        * “Take me to my orders page.”
* Button Background color: used for buttons

# user stories

## As a D2C store owner, I want to:
- Preview different formatting options for my store before implementing changes, so I can see how modifications will look without affecting the live site
- Access a user-friendly editing panel with dropdown selectors for fonts, font sizes, colors, and layout options, so I can easily customize my store's appearance
- See real-time updates in a preview window as I make changes, so I can immediately evaluate the visual impact of my modifications
- Generate HTML and CSS files of my finalized design, so I can implement the changes on my actual website

## As a designer working on D2C stores, I want to:
- Experiment with different visual combinations quickly, so I can explore multiple design options efficiently
- Have access to a variety of formatting options (fonts, colors, layouts), so I can create diverse and appealing store designs
- Export clean, implementable code, so developers can easily apply the designs to the live store

## As a developer implementing D2C store changes, I want to:
- Receive properly formatted HTML and CSS files from the design tool, so I can integrate changes without additional formatting work
- Have confidence that the preview accurately represents how the final implementation will look, so there are no surprises during deployment

# acceptance criteria

## Preview Functionality
- **Given** a user loads the D2C editor tool
- **When** they view the preview window
- **Then** it should display a sample D2C store (like merch.dojacat.com) that can be edited

## Editing Panel
- **Given** a user accesses the editing panel
- **When** they interact with the controls
- **Then** dropdown selectors must be available for:
  - Font family selection
  - Font size options
  - Color picker/selector for text and background colors
  - Layout options for product arrangement

## Real-time Updates
- **Given** a user makes changes in the editing panel
- **When** they select a new option from any dropdown
- **Then** the preview window must update immediately without requiring a refresh or save action

## Code Generation
- **Given** a user has made their desired changes
- **When** they click the "Generate Code" button
- **Then** the system must:
  - Generate clean, valid HTML markup
  - Generate corresponding CSS styles
  - Provide both files for download or copy
  - Ensure generated code matches the preview exactly

## User Experience
- **Given** any user interaction with the tool
- **When** they perform actions
- **Then** the interface must:
  - Respond within 2 seconds for all interactions
  - Maintain visual consistency between preview and generated code
  - Provide clear visual feedback for all user actions
  - Handle errors gracefully with user-friendly messages