## Fabletics Fit Mimic

This app was intended to display the same UI and give some of the basic functionalities of the FIT app.

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

### Notes on Completion & Funcionality

- All tabs and navigation with the exception of Self Guided Lesson Card being displayed prior to video launch
- Home Tab displays lessons and meditations by popularity
- Workouts gives the user teh ability to select lesson by category-- Lesson complete / Self Guided incomplete
- Upon completion of a video lesson updates are made to user acheivement stats (userWatchTime, lessonsCompleted)
- Lesson popularity is updated by any of the following conditions: video is exited via mark completed, quit or completion.
- Sign on was generic and used only to provide a user token -- app never had a chance to be developed further; to a point where it could be utilized for securing db requests, spotify or anything else that may require credentials.

### Context

- Context is utilized for Auth token and email values @ the root App level.
- Context is utilized in Each of the video players.

### useReducer

Reducers are used in accompaniment to context in order to manage state where I felt it was too complext to manage with useState hooks. this was especially true in the Self Guided and Lesson video players.

### DynamoDb Table Design

<img src = "./Dynamo_Schema.png" width="900">

# Installation

Clone Repo

```sh
$ npm install
$ cd client
$ npm install
$ cd ..

- after install completes
#### You will need to unSilence lines 9-14 in the server.js file
#### and paste in your aws secret and ddb access keys into their
#### respective values


$ npm run server
$ cd client
$ npm run start
$ npm run ios





```

#Personal Bio

- personl bio site can be found at:
  https://mattwellman.dev
