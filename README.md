# URL Shortener

A simple URL shortener

# Requirements

- Node.js v10.x & NPM v6.2
- Mongo 2.2.3

# Run

- Clone this repo
- Run `npm install` to install dependencies
- Run `npm run dep` to run dependencies like mongo and don't forget to enter root password
  after running command for mongo.
- Open new terminal leaving previous one running
- Copy file `.env.example` to `.env` and change env details if needed
- Run command `npm run dev`
- Then visit http://localhost:{port} to access app


## List of any security issues in your solution, and how you would fix them.

A malicous user can enter same url to fill database with same url so to prevent this i have worked on both
frontend and backend.

## Dependencies

- `cors` Helps us protect from any cors related issue
- `helmet` Sends security related headers
- `winston` Simple logger transport layer for logging
- `next` For server side rendering, static pages and routing
- `react` UI library
- `yup` Object schema validator used for request/form validation
- `axios` Simple isomorphic http client

### Backend

- We have rate limited our API so a malicous user can't request multiple times in certain window
- We have added some security related headers which will prevent us from common problems
- If a requested url for shortening is already available then we provide available short url to provide duplication as currently we don't have user account we won't have any problem.

### Frontend

- Once a user submits url and new short url is created it is stored in memory and whenever on next request if the requested url is found in cache then we return back previously created short url. This will prevent unnecessary request.

## List of any scalability issues in your solution, and with how you would fix them.

Currently our app can handle some amount of users but if in future if usage grows then we can do following things.

- Clustering application
- Load Balance and distrbute equally on nodes
- Instead of direct insert to database we can introduce some queuing technology (redis).
- We can maintain session to track url and avoid duplication of urls.
