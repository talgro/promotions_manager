## Description
This repository includes both backend and frontend of a bi-directinal infinate-scrollable list.
Technologies involved:
1. MongoDB - document database
2. Express(TS) - Node.js web framework
3. React(TS) - a client-side JavaScript framework
4. Node(TS) - the premier JavaScript web server

## Leftovers
There are a few things I didn't implement:
1. Edit or duplicate a record (delete action was implemented).
2. Semantics - parsing the dates, styling the action buttons a little prettier.

## Known Bugs
There a few known bugs:
1. Inifinate loader after clicking on "generate mock data" button - it works, just need to refresh the page.
2. After deleting a record, the list does not being updated - need to refresh.

## Run instructions
1. Clone the repo.
2. run "npm install" and then "npm start" in both promotions_manager/backend and promotions_manager/frontend folders.
3. NOTE: the backend should run on port 3001.
