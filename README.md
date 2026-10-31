# Greenwood Public Library

A responsive, single-page public library website concept for Greenwood Public Library. It introduces the library's collections, spaces, values, memberships, and events.

## Features

- Responsive navigation with a mobile menu
- Library sections with category filters
- Catalog search across a small sample list of books by title, author, and category
- Membership application and event reservation dialogs
- Event listings, location information, and a patron bulletin signup
- Toast notifications for form submissions

## Run locally

No build step or package installation is required.

1. Download or clone this project.
2. Open `index.html` in a browser.

The page loads Tailwind CSS and Google Fonts from external CDNs, so an internet connection is needed for those assets.

## Project files

- `index.html` — page structure, content, and styles
- `script.js` — menu, catalog search, section filters, dialogs, and form interactions

## Demo behavior

The catalog is populated from a small sample dataset in `script.js`. Membership, event reservation, and bulletin forms currently show client-side confirmation messages; they do not send data to a server or persist submissions.
