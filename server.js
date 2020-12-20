const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const db = new AWS.DynamoDB.DocumentClient();

//spread resolvers later if needed
const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");

//db query calls
const getUserWorkoutsByCategory = require("./DynamoDB_Request_Functions/Query_Requests/getUserWorkoutsByCategory_ddb");
const getUserProfile = require("./DynamoDB_Request_Functions/Query_Requests/getUserProfile_ddb");
const getCoursesByName = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesByName_ddb");
const getAllCourses = require("./DynamoDB_Request_Functions/Query_Requests/getAllCourses_ddb");

//db mutation calls
const createUser = require("./DynamoDB_Request_Functions/Mutation_Requests/createUser_ddb");
const createCourse = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourse_ddb");
const createWorkout = require("./DynamoDB_Request_Functions/Mutation_Requests/createWorkout_ddb");
const getCoursesForCategory = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesForCategory_ddb");

// Construct a schema, using GraphQL schema language
const Query = gql`
  type Query {
    user(email: String!): User

    course(course: String): Course
    courses: [Course]
    coursesByCategory(category: String!): [Course]

    userWorkoutsByCategory(email: String!, category: String!): [Workout]
    workouts(category: String!, email: String!): [Workout]!
  }

  type User {
    firstName: String
    lastName: String
    email: String
    courses: [String]
    created: String
    phone: String
  }

  input UserInput {
    email: String
  }

  type Workout {
    email: String
    category: String
    courseDirected: Boolean
    courseRelation: String
    exercise: String
    timestamp: String
    duration: Int
    sets: Int
    reps: Int
    weightLbValue: Int
  }

  input WorkoutInput {
    email: String
  }

  type Course {
    courseName: String
    category: String
    courseFocus: String
    instructor: String
    created: String
    lectureCount: Int
    description: String
    cost: String
    saleCost: String
    onSale: Boolean
    length: String
    currentStudentCount: Int
  }

  input CourseInput {
    courseName: String!
    category: String!
    courseFocus: String!
    instructor: String!
    created: String!
    lectureCount: Int!
    description: String!
    cost: String!
    saleCost: String!
    onSale: Boolean!
    length: String!
    currentStudentCount: Int!
  }
`;

const Mutation = `type Mutation {
    createUser: User!
    createCourse: Course!
    createWorkout: Workout!
}`;
//add later
//read the current directory and load types and resolvers automatically
//  fs.readdirSync(_dirname)
//  .filter(dir => (dir.indexOf( ' . ' )< 0))
//  .forEach((dir)=>{
//     const temp = require(path.join(_dirname, dir)).default; //eslint-disable-line
//     resolvers = merge(resolvers, temp.resolvers);
//     typeDefs.push(temp.types);
// })

// Provide resolver functions for your schema fields
let resolvers = {
  Query: {
    user: async (_, args) => {
      let data = await getUserProfile(args);
      return data;
    },

    course: async (_, args) => {
      let data = await getCoursesByName(args);
      return data;
    },
    courses: async () => {
      let data = await getAllCourses();
      return data;
    },

    coursesByCategory: async (_, args) => {
      let data = await getCoursesForCategory(args);
      return data;
    },
    userWorkoutsByCategory: async (_, args) => {
      let data = await getUserWorkoutsByCategory(args);
      return data;
    },

    workouts: async (_, args) => {
      let data = await getUserWorkoutsByCategory(args);
      return data;
    },
  },

  Mutation: {
    createUser: async () => {
      let data = await createUser();
      return data;
    },
    createCourse: async () => {
      let data = await createCourse();
      return data;
    },
    createWorkout: async () => {
      let data = await createWorkout();
      return data;
    },
  },
};

const typeDefs = [Query, Mutation];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
});

const app = express();
server.applyMiddleware({ app });

const PORT = 4321;
app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

//      Access Points
//     _get specific user
//     _get courses
//     _get course by category
//     _get courses by instructor
//     _get all user workouts
//     get all user specific type workouts
