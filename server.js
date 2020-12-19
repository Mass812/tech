const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
//const getSpecificUser = require("./getSpecificUser_ddb");
const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

// Construct a schema, using GraphQL schema language
const Query = gql`
  type Query {
    user(email: String!): User!
    course(course: String): Course
    courses: [Course]
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
    empty:String
}`;

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
      const Params = {
        TableName: "App_Table",
        Key: {
          pk: args.email,
          sk: "profile",
        },
      };

      try {
        const data = await db.get(Params).promise();
        console.log(data);
        return data.Item;
      } catch (err) {
        console.log("Oops there was an err ", err);
      }
    },
    course: async (_, args) => {
      const Params = {
        TableName: "App_Table",
        Key: {
          sk: args.course,
          pk: "course",
        },
      };

      try {
        const data = await db.get(Params).promise();
        console.log(data);
        return data.Item;
      } catch (err) {
        console.log("Oops there was an err ", err);
      }
    },
    courses: async () => {
      const Params = {
        TableName: "App_Table",
        KeyConditionExpression: "pk = :v",
        ExpressionAttributeValues: { ":v": "course" },
      };

      try {
        const data = await db.query(Params).promise();
        console.log(data);
        return data.Items;
      } catch (err) {
        console.log("Oops there was an err ", err);
      }
    },
    workouts: async (_, args) => {
      console.log("passed in", args);
      const Params = {
        TableName: "App_Table",
        KeyConditionExpression: "pk = :pk and begins_with(sk,:sk)",
        ExpressionAttributeValues: {
          ":pk": `${args.email}`,
          ":sk": `${args.category}`,
        },
      };

      try {
        const data = await db.query(Params).promise();
        console.log(data.Items);
        return data.Items;
      } catch (err) {
        console.log("Oops there was an err ", err);
      }
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

//     _get specific user
//     get all users
//     _get courses
//     _get specific courses
//     _get all user workouts
//     get all user specific type workouts
//     get user specific workout
//     get user courses
//
//
