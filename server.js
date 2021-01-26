require("dotenv").config()

const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: process.env.REACT_APP_DDB_ACCESS,
  secretAccessKey: process.env.REACT_APP_DDB_SUPER,
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
const getAllLessonsOfACategory_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllLessonsOfACategory_ddb")
const getAllSelfGuidedOfACategory_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllSelfGuidedOfACategory_ddb")
//const getPopularCourses_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getPopularCourses_ddb")
const getCoursesForCategory_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesForCategory_ddb")
const getAllSelfGuided_ddb = require("./DynamoDB_Request_Functions/Query_Requests/getAllSelfGuided_ddb")

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
const updateLessonPopularity_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/updateLessonPopularity_ddb")
const updateUserDocValues = require("./DynamoDB_Request_Functions/Mutation_Requests/updateUserDocValues")

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
    categoryLessons(category: String!): [CategoryLesson]
    categorySelfGuided(category: String!): [SelfGuided]
    meditations: [Meditation]
    popularCourses: [Course]
    popularLessons: [Lesson]
    popularMeditations: [Meditation]
    popularSelfGuided: [SelfGuided]
    allSelfGuided: [SelfGuided]
    selfGuided(id: String!): SelfGuided
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    passowrd: String
    currentCourse: String
    completedCourses: [String]
    completedMeditations: [String]
    completedLessons: [String]
    completedSelfGuided: [String]
    created: String
    phone: String
    weeklyInDependentWorkouts: Int
    weeklyGuidedWorkouts: Int
    coursesCompleted: Int
    lessonsCompleted: Int
    selfGuidedCompleted: Int
    userWatchTime: Int
    streak: Int
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
    user: String
    password: String
  }

  type Course {
    id: String
    category: String
    courseName: String
    description: String
    equipment: [String]
    img: String
    courseImg: String
    targets: [String]
    instructor: String
    intensity: String
    keywords: [String]
    lectureCount: Int
    length: String
    targetArmsValue: Int
    targetBackValue: Int
    targetAbsValue: Int
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
    targets: [String]
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
    targetAbsValue: Int
    targetBackValue: Int
    lesson: String
    popularity: Int
  }

  type CategoryLesson {
    length: String
    instructor: String
    courseName: String
    title: String
    equipment: [String]
    weekNumber: String
    lessonNumber: String
    img: String
    id: String
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
    createCourseCompletionDoc: CourseCompletionDoc
    createMeditation: Meditation
    updateLessonPopularity(
      instructor: String!
      courseName: String!
      weekNumber: String!
      lessonNumber: String!
    ): Lesson
    login(email: String!, password: String!): Login
    updateProgressValue(email: String!, attr: String!, value: Int!): Progress
  }

  type Login {
    email: String
    password: String
    token: String
  }

  type Progress {
    attr: String
    value: Int
    email: String
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
      return getCoursesForCategory_ddb(args)
    },
    categoryLessons: async (_, args) => {
      return getAllLessonsOfACategory_ddb(args)
    },
    categorySelfGuided: async (_, args) => {
      return getAllSelfGuidedOfACategory_ddb(args)
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
    allSelfGuided: async () => {
      return getAllSelfGuided_ddb()
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
    login: async (_, args) => {
      const { email, password } = args

      let Params = {
        TableName: "App_Table",
        Key: {
          pk: `userEmail#${email}`,
          sk: "profile",
        },
      }

      try {
        const discoveredDoc = await db.get(Params).promise()

        if (!discoveredDoc) throw new Error({ message: "No user found" })

        const comparePasswords = await bcrypt.compare(
          password,
          discoveredDoc.Item.password
        )

        if (!comparePasswords) {
          throw new Error("Password incorrect")
        }

        const token = jwt.sign(
          {
            userId: discoveredDoc.Item.id,
          },
          `${process.env.REACT_APP_DDB_SUPER}`
        )

        return {
          email: discoveredDoc.Item.email,
          token: token,
        }
      } catch (err) {
        console.log(err)
      }
    },
    updateProgressValue: async (_, args) => {
      return updateUserDocValues(args)
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
    createMeditation: async () => {
      return createMeditation_ddb()
    },
    updateLessonPopularity: async (_, args) => {
      return updateLessonPopularity_ddb(args)
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
