## Fabletics Fit Mimic

### Site Purpose

- [App Overview]
  1] Home Screen: displays lesseons (classes) and meditations by popularity.
  2] LessonVideoScreen: can take in any child component that will be rendered under the video player.
  4a] Lessons **_(many)_** are related **_(to)_** Courses **_(one)_**
  4b] Marking a Lesson as complete or quiting a lesson while paused update lesson popularity.
  4c] Upon Lesson completion user documents update userWatchTime and the count of Lessons the user has completed.

  3] Workouts Screen displays lessons by categories, a tab navigation allows for a division of self guided and class based lessons
  4]
  4] Profile Screen displays user acheivements

### Context

Context is utilized for Auth token and email values @ the root level.
Context is utilized in Each of the video players.
1] The SelfGuidedVideoScreen plays each segment of its lesson. each segment can be selected, skipped, or replayed

### useReducer

Reducers are used to manage all of the functionality in the Self Guided and Lesson video players.

### Tech Stack

- [DynamoDB] - Database
- [AWS S3 Bucket] - photo / video storage
- [Node] - Node Package Manager
- [Apollo Server] - server instance for graphQl
- [GraphQL] - querying interface
- [React Native] - Library
- [React Navigation v5] - navigation
- [Typescript] - javascript more strictly typed
- [URQL] - client side graphql interface

![Single Table Design] (Dynamo_Schema.png)

# Installation

Clone Repo

```sh
$ npm install
$ cd client
$ npm install
$ cd ..

- after install completes
You will need to unSilence lines 9-14 in the server.js file
and paste in your aws secret and ddb access keys into their
respective values


$ npm run server
$ cd client
$ npm run start
$ npm run ios





```

#Personal Bio

- personl bio site can be found at:
  https://mattwellman.dev
