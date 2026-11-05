# Saffron & Sage Kitchen — Weekly Meal Box, Built with React

**Live site:** https://brittanynation.github.io/saffron-sage-kitchen/

A fully functional website for **Saffron & Sage Kitchen**, a fictional weekly meal-box service: browse 12 recipes, filter by diet, search by ingredient, choose 2 or 4 servings (every price on the page updates at once), build a box that persists between visits, and check out with full validation, a working promo code, and a real confirmation. Every interactive element works — no dead buttons, no placeholder links.

This is an original portfolio concept by Brittany Nation. No affiliation with any real business is claimed. Design workflow: Sketch / Webflow for layout thinking, built with React components, HTML and CSS.

## Course-track step 5: React

This is the **fifth and final course-track project**, built alongside Dr. Angela Yu's *Full-Stack Web Development Bootcamp* (Udemy). Step 1 was live APIs + async JavaScript ([Solstice Skies](https://github.com/BrittanyNation/solstice-skies)); step 2 was Node.js + Express ([Willow Bend Paddle Co.](https://github.com/BrittanyNation/willow-bend-paddle)); step 3 was databases + REST API design ([Tinker Commons](https://github.com/BrittanyNation/tinker-commons)); step 4 was authentication ([Haven Desk Collective](https://github.com/BrittanyNation/haven-desk-collective)). This step rebuilds the front end the React way, with the code commented as study material:

- **Components** — the page is a tree of small functions: `App`, `Header`, `FilterBar`, `RecipeCard`, `RecipeModal`, `BoxDrawer`, `CheckoutForm`, `FaqItem`, `NewsletterForm`. Each returns JSX and does one job.
- **Props** — data flows down (App → card: recipe, servings, callbacks). A card never reaches into global state; it receives what it needs.
- **State (`useState`)** — view, filters, box, favorites, form fields, accordion and modal open/closed all live as component state. Changing servings re-renders every price automatically.
- **Effects (`useEffect`)** — the box and favorites are saved to localStorage whenever they change, and restored on first render.
- **Memoized derivation (`useMemo`)** — the filtered/sorted menu recomputes only when diet, search or sort changes.
- **Controlled forms** — every checkout input is bound to state, validated on submit (including card number, future expiry date and ZIP), and ends in a confirmation with a generated `SS-XXXXXX` reference.
- **Static hosting, honestly** — GitHub Pages serves static files only, so the JSX in `app.js` is compiled in the browser by Babel standalone (the same source, split per component, is in `/src` for study). In a production React project the same components would be pre-built with Vite or Create React App; the component code itself is identical.

## What works on the site

- **Menu** — 12 recipes rendered from data by `RecipeCard` components; diet chips (Vegetarian / Vegan / Gluten-Free / Spicy), live search over names and ingredients, four sort orders, a live result count and an honest empty state; a detail modal with ingredients and method; favorite hearts persisted per browser.
- **Servings switch** — 2 or 4 servings held in App state; every card price, drawer line and checkout line updates from that one value.
- **Box** — slide-in drawer with quantity increase/decrease, remove, subtotal and delivery line; the box persists in localStorage across pages and reloads.
- **Checkout** — delivery and payment form with inline validation for name, email, address, city, ZIP, 16-digit card, future MM/YY expiry and CVC; promo code `SAGE10` takes 10% off; delivery is $6.95, free once the discounted box reaches $60; placing an order generates an `SS-XXXXXX` reference, saves the order, clears the box and shows the confirmation state.
- **How It Works** — working FAQ accordions and a validated Sunday Menu Letter signup that recognises repeat subscribers.

## Verified

Automated DOM checks against the real compiled React app (12+ checks passed): 12 cards render from data, Vegan filter narrows the menu to exactly 3, adding two recipes sets the box count to 2 and persists it to localStorage, checkout shows the correct summary math (Saffron Chicken & Rice $19.00 + Tomato Basil Shakshuka $15.00 = $34.00 subtotal; SAGE10 −$3.40; delivery $6.95; total $37.55), an invalid submit shows field errors, a valid submit shows the confirmation with an `SS-XXXXXX` reference, saves the order, and clears the box.

## Palette

Paprika `#B3402A`, saffron `#E9A426`, sage `#6B7F59`, cream `#FDF6E9`, clay `#EFE3D3`, ink `#22201B`.

## Files

- `index.html` — page shell, Open Graph tags, React + ReactDOM + Babel (CDN)
- `app.js` — the full React app in JSX, commented as study code
- `src/` — the same components split into per-file study copies, with a guide
- `styles.css` — the Saffron & Sage design system
- `images/` — real food photography downloaded from Pexels under the Pexels free license
- `og-image.png` — 1200×627 social preview image in the project palette

## Photography

The hero and recipe images are real photographs sourced from Pexels and stored locally in `images/` so the live site does not depend on hotlinks.
