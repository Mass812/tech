require("dotenv").config()
const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.REACT_APP_DDB_ACCESS,
    secretAccessKey: process.env.REACT_APP_DDB_SUPER,
  },
})

const db = new AWS.DynamoDB.DocumentClient()

//spread resolvers later if needed
const fs = require("fs")
const path = require("path")
const { merge } = require("lodash")

//ACCESS PATTERNS
//db query calls
const getUserWorkoutsByCategory = require("./DynamoDB_Request_Functions/Query_Requests/getUserWorkoutsByCategory_ddb")
const getUserProfile = require("./DynamoDB_Request_Functions/Query_Requests/getUserProfile_ddb")
const getCoursesByName = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesByName_ddb")
const getAllCourses = require("./DynamoDB_Request_Functions/Query_Requests/getAllCourses_ddb")
const getCoursesForCategory = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesForCategory_ddb")
const getAllLessonsOfACourse_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllLessonsOfACourse_ddb")
const getAllMeditations_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllMeditations_ddb")
const getPopularLessons_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularLessons_ddb")
const getPopularMeditations_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularMeditations_ddb")
const getPopularSelfGuided_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularSelfGuided_ddb")
const getSpecificCourseLesson_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getSpecificCourseLesson_ddb")
const getLessonsOfCourses_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getLessonsOfCourses_ddb")
const getSpecificSelfGuidedLesson_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getSpecificSelfGuidedLesson_ddb")
const getVideoSectionsOfSelfGuidedLesson_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getVideoSectionsOfSelfGuidedLesson_ddb")
//const getPopularCourses_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularCourses_ddb")

//db mutation calls
const createUser = require("./DynamoDB_Request_Functions/Mutation_Requests/createUser_ddb")
const createCourse = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourse_ddb")
const createWorkout = require("./DynamoDB_Request_Functions/Mutation_Requests/createWorkout_ddb")
const updateUserProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/updateUser_ddb")
const createCourseLesson = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseLesson_ddb")
const createInstructorProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/createInstructorProfile_ddb")
const createCourseCompletionDoc_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseCompletionDoc_ddb")
const createSelfGuidedLesson_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLesson_ddb")
const createMeditation_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createMeditation_ddb")
const createSelfGuidedLessonSection_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLessonVideoSection_ddb")

const Query = gql`
  type Query {
    user(email: String!): User
    lessons(instructor: String!, courseName: String!): [Lesson]
    lesson(
      instructor: String!
      courseName: String!
      lessonNumber: String!
      weekNumber: String!
    ): Lesson
    course(courseName: String!): Course
    courses: [Course]
    coursesByCategory(category: String!): [Course]
    meditations: [Meditation]
    userWorkoutsByCategory(email: String!, category: String!): [Workout]
    workouts(category: String!, email: String!): [Workout]!
    popularCourses: [Course]
    popularLessons: [Lesson]
    popularMeditations: [Meditation]
    popularSelfGuided: [SelfGuided]
    selfGuided(id: String!): SelfGuided
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
    weeklySelfGuidedWorkouts: Int
    weeklyGuidedWorkouts: Int
    height: Int
    weight: Int
    duration: Int
  }
  type MonthReport {
    monthNumber: Int
    highestStreak: Int
    weeklySelfGuidedWorkouts: Int
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
    targetChestValue: Int
    targetLegsValue: Int
    targetArmsValue: Int
    targetAbstValues: Int
    targetBackValue: Int
  }

  type SelfGuided {
    id: String
    category: String
    length: String
    contentUrl: String
    img: String
    created: String
    title: String
    equipment: [String]
    popularity: Int

    selfGuidedLesson: Boolean
    selfGuided: String
    exerciseSections: [SelfGuidedVideoSection]
  }

  type SelfGuidedVideoSection {
    title: String
    id: String
    length: Int
    contentUrl: String
    sectionNumber: Int
    courseRelations: SelfGuided
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
    length: String!
  }
`

const Mutation = gql`
  type Mutation {
    createUser: User!
    updateUser(email: String!, attribute: String!, value: String!): User
    createCourse: Course!
    createCourseLesson: Lesson!
    createSelfGuidedLesson: SelfGuided
    createSelfGuidedLessonSection: SelfGuidedVideoSection
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
`

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
      return getUserProfile(args)
    },

    course: async (_, args) => {
      return getCoursesByName(args)
    },
    courses: async () => {
      return getAllCourses()
    },

    coursesByCategory: async (_, args) => {
      return getCoursesForCategory(args)
    },
    userWorkoutsByCategory: async (_, args) => {
      return getUserWorkoutsByCategory(args)
    },

    workouts: async (_, args) => {
      return getUserWorkoutsByCategory(args)
    },
    lesson: async (_, args) => {
      return getSpecificCourseLesson_ddb(args)
    },
    lessons: async (_, args) => {
      return getAllLessonsOfACourse_ddb(args)
    },
    meditations: async () => {
      return getAllMeditations_ddb()
    },
    popularCourses: async () => {
      //  return getPopularCourses_ddb()
    },
    popularLessons: async () => {
      return getPopularLessons_ddb()
    },
    popularMeditations: async () => {
      return getPopularMeditations_ddb()
    },
    popularSelfGuided: async () => {
      return getPopularSelfGuided_ddb()
    },
    selfGuided: async (parent, args) => {
      return getSpecificSelfGuidedLesson_ddb(args)
    },
  },

  Mutation: {
    createUser: async () => {
      return createUser()
    },
    createCourseCompletionDoc: async () => {
      return createCourseCompletionDoc_ddb()
    },
    createInstructorProfile: async () => {
      return createInstructorProfile()
    },
    updateUser: async (_, args) => {
      return updateUserProfile(args)
    },
    createCourse: async () => {
      return createCourse()
    },
    createCourseLesson: async () => {
      return createCourseLesson()
    },
    createSelfGuidedLesson: async () => {
      return createSelfGuidedLesson_ddb()
    },
    createSelfGuidedLessonSection: async () => {
      return createSelfGuidedLessonSection_ddb()
    },
    createWorkout: async () => {
      return createWorkout()
    },
    createMeditation: async () => {
      return createMeditation_ddb()
    },
  },
  Course: {
    courseRelation: (parent, args) => {
      return getLessonsOfCourses_ddb(parent)
    },
  },
  SelfGuided: {
    exerciseSections: (parent, args) => {
      return getVideoSectionsOfSelfGuidedLesson_ddb(parent)
    },
  },
}

const typeDefs = [Query, Mutation]

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
})

const app = express()
server.applyMiddleware({ app })

const PORT = 4321
app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
)
