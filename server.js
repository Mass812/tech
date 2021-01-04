const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const db = new AWS.DynamoDB.DocumentClient();
require('dotenv').config();
//spread resolvers later if needed
const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");

//db query calls
const getUserWorkoutsByCategory = require("./DynamoDB_Request_Functions/Query_Requests/getUserWorkoutsByCategory_ddb");
const getUserProfile = require("./DynamoDB_Request_Functions/Query_Requests/getUserProfile_ddb");
const getCoursesByName = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesByName_ddb");
const getAllCourses = require("./DynamoDB_Request_Functions/Query_Requests/getAllCourses_ddb");
const getCoursesForCategory = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesForCategory_ddb");
const getAllLessonsOfACourse_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllLessonsOfACourse_ddb");
const getAllMeditations_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllMeditations_ddb");
const getPopularLessons_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularLessons_ddb");
const getPopularMeditations_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularMeditations_ddb");
const getPopularSelfGuided_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularSelfGuided_ddb");
const getPopularCourses_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularCourses_ddb");


//db mutation calls
const createUser = require("./DynamoDB_Request_Functions/Mutation_Requests/createUser_ddb");
const createCourse = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourse_ddb");
const createWorkout = require("./DynamoDB_Request_Functions/Mutation_Requests/createWorkout_ddb");
const updateUserProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/updateUser_ddb");
const createLesson = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseLesson_ddb");
const createInstructorProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/createInstructorProfile_ddb");
const createCourseCompletionDoc_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseCompletionDoc_ddb");
const createIndependentLesson_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createIndependentLesson_ddb");
const createMeditation_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createMeditation_ddb");
const getSpecificCourseLesson_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getSpecificCourseLesson_ddb");


const Query = gql`
  type Query {
    user(email: String!): User
    lessons(instructor: String!, courseName: String!): [Lesson]
    lesson(instructor: String! courseName: String! lessonNumber: String! weekNumber: String!): Lesson
    course(courseName: String!): Course
    courses: [Course]
    coursesByCategory(category: String!): [Course]
    meditations: [Meditation]
    userWorkoutsByCategory(email: String!, category: String!): [Workout]
    workouts(category: String!, email: String!): [Workout]!
    popularCourses: [Course]
    popularLessons:[Lesson]
    popularMeditations:[Meditation]
    popularSelfGuided:[Lesson]
  }

  type User {
    firstName: String
    lastName: String
    email: String
    courses: [Course]
    created: String
    phone: String
  }

  type WeekReport {
    weekodYear: Int
    streak: Int
    weeklyInDependentWorkouts: Int
    weeklyGuidedWorkouts: Int
    height: Int
    weight: Int
    duration: Int
  }
  type MonthReport {
    monthNumber: Int
    highestStreak: Int
    weeklyInDependentWorkouts: Int
    weeklyGuidedWorkouts: Int
    height: Int
    weight: Int
    duration: Int
  }

  type CourseCompletionDoc {
    completedLessonsArray: [String]
    completedCourseArray: [String]
    streak: Int
    highestStreak: Int
    weight: Int
    height: Int
  }

  input UserInput {
    email: String
    attribute: String
    value: String
  }

  type Workout {
    email: String
    category: String
    courseDirected: Boolean
    exercise: String
    timestamp: String
    duration: Int
    intensity: Int
    bodyWeight: Int
  }

  input WorkoutInput {
    email: String
  }

  type Course {
    id: String
    category: String
    courseName: String
    created: String
    description: String
    equipment: [String]
    img: String
    courseImg: String
    targets: String
    instructor: String
    intensity: String
    keywords: [String]
    lectureCount: Int
    length: String
    targetArmsValue: Int
    targetBackValue: Int
    targetAbstValues: Int
    trgetChestValue: Int
    targetLegsValue: Int
    courseRelation: [Lesson]
  }

  type Lesson {
    id: String
    category: String
    length: String
    contentUrl: String
    img: String
    courseName: String
    created: String
    title: String
    description: String
    equipment: [String]
    instructor: String
    intensity: Int
    lessonNumber: String
    weekNumber: String
    outfitTopId: String
    outfitTopName: String
    outfitTopImgUrl: String
    outfitBottomId: String
    outfitBottomName: String
    outfitBottomImgUrl: String
    selfGuidedLesson: Boolean
    courseRelation: Course
    lesson: String
    popularity: String
  }

  type Meditation {
    category: String
    instructor: String
    contentImg: String
    contentUrl: String
    id: String
    length: String
    subTitle: String
    title: String
    description: String
    meditation: String
    popularity: String
  }

  type InstructorProfile {
    courses: [String]
    category: String
    courseFocus: String
    instructor: String
    description: String
    img: String
    id: String
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

const Mutation = gql`
  type Mutation {
    createUser: User!
    updateUser(email: String!, attribute: String!, value: String!): User
    createCourse: Course!
    createLesson: Lesson!
    createIndependentLesson: Lesson!
    createInstructorProfile: InstructorProfile
    createWorkout: Workout!
    createCourseCompletionDoc: CourseCompletionDoc
    createMeditation: Meditation
  }
  input UserUpdateInput {
    email: String!
    attribute: String!
    value: String!
  }
`;

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
    lesson: async (_, args) => {
   
      let data = await getSpecificCourseLesson_ddb(args);

      return data;
    },
    lessons: async (_, args) => {
      let data = await getAllLessonsOfACourse_ddb(args);
      return data;
    },
    meditations: async ()=>{
      let data = getAllMeditations_ddb()
      return data
    },
    popularCourses: async ()=>{
      let data = getPopularCourses_ddb()
      return data
    },
    popularLessons: async ()=>{
      let data = getPopularLessons_ddb()
      return data
    },
    popularMeditations: async ()=>{
      let data = getPopularMeditations_ddb()
      return data
    },
    popularSelfGuided: async ()=>{
      let data = getPopularSelfGuided_ddb()
      return data
    },
  },

  Mutation: {
    createUser: async () => {
      let data = await createUser();
      return data;
    },
    createCourseCompletionDoc: async () => {
      let data = await createCourseCompletionDoc_ddb();
      return data;
    },
    createInstructorProfile: async () => {
      let data = await createInstructorProfile();
      return data;
    },
    updateUser: async (_, args) => {
      let data = await updateUserProfile(args);

      return data;
    },
    createCourse: async () => {
      let data = await createCourse();
      return data;
    },

    createLesson: async () => {
      let data = await createLesson();
      return data;
    },
    createIndependentLesson: async () => {
      let data = createIndependentLesson_ddb();
      return data;
    },
    createWorkout: async () => {
      let data = await createWorkout();
      return data;
    },
    createMeditation: async ()=>{
      let data = await createMeditation_ddb()
      return data
    }
  },

  Course: {
    courseRelation: async (parent, args) => {
      let { instructor, courseName } = parent;
      console.log("", instructor);
      let Params = {
        TableName: "App_Table",
        KeyConditionExpression: `pk = :pk and begins_with(sk, :sk)`,
        ExpressionAttributeValues: {
          ":pk": `instructor#${instructor}`,
          ":sk": `courseName#${courseName}#weekNumber`,
        },
      };

      try {
        let data = await db.query(Params).promise();
        console.log(data.Items);

        return data.Items;
      } catch (err) {
        console.log("error", err);
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
