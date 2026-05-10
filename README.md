# Odyssey-Site-Maps
Odyssey Site Maps

Having used Odyssey Map Guide by CMDR Quizengine https://github.com/Quizengine/OMG I've felt that there are a few things that I would like to see added to the maps of sites in Elite Dangerous Horizons.
Sadly CMDR Quizengine passed away and the code that remains is very hard to follow.  It was created in Adobe Animate CC and uses a very flat structure that although efficient doesn't lend itself to easy extension.
This project is very much about building on what CMDR Quizengine created and I'm using the same map and thubnail images as the basis.  The hope is that this can be open and others can help to flesh out the maps in a way that is easier to contribute to.

Additional elements that I plan to add to maps
- Data ports.
- Powerplay containers.
- ?


Much of the code used here is coming from various AI tools and I am using this as an opportunity to learn some new skills and hopefully add back to the Elite Dangerous player community.

## Build and test workflow
This project now includes a lightweight Node.js workflow that validates map/data integrity and creates a distributable static build.

### Requirements
- Node.js 20+ installed locally.

### Commands
- `npm run test` validates JavaScript syntax and JSON data in `maps/`.
- `npm run build` creates a `dist/` folder containing the static site files.
- `npm run verify` runs both test and build in sequence.

### CI
A GitHub Actions workflow at `.github/workflows/ci.yml` automatically runs test and build on pushes and pull requests to `main`.
