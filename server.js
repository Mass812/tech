require("dotenv").config()

const AWS = require("aws-sdk")
const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const isAuth = require("./server_isAuth")

AWS.config.update({
  region: "us-east-2",
  // endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  // accessKeyId: process.env.REACT_APP_DDB_ACCESS,
  // secretAccessKey: process.env.REACT_APP_DDB_SUPER,
})

const db = new AWS.DynamoDB.DocumentClient()

const QueryTemplateLiteral = require("./server_modules/Query")
const MuationTemplateLiteral = require("./server_modules/Mutation")

//ACCESS PATTERNS ,
//db query calls
const getUserProfile = require("./DynamoDB_Request_Functions/Query_Requests/getUserProfile_ddb")
const getCoursesByName = require("./DynamoDB_Request_Functions/Query_Requests/getCoursesByName_ddb")
const getAllCourses = require("./DynamoDB_Request_Functions/Query_Requests/getAllCourses_ddb")
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
const updateUserProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/updateUser_ddb")
const createCourseLesson = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseLesson_ddb")
const createInstructorProfile = require("./DynamoDB_Request_Functions/Mutation_Requests/createInstructorProfile_ddb")
const createCourseCompletionDoc_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createCourseCompletionDoc_ddb")
const createSelfGuidedLesson_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLesson_ddb")
const createMeditation_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createMeditation_ddb")
const createSelfGuidedLessonSection_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLessonVideoSection_ddb")
const updateLessonPopularity_ddb = require("./DynamoDB_Request_Functions/Mutation_Requests/updateLessonPopularity_ddb")
const updateUserDocValues = require("./DynamoDB_Request_Functions/Mutation_Requests/updateUserDocValues")
const UpdateSelfGuidedPoplarity = require("./DynamoDB_Request_Functions/Mutation_Requests/UpdateSelfGuidedPopularity")

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
            email: discoveredDoc.Item.email,
            membershipStatus: discoveredDoc.Item.membershipStatus,
          },
          `angerMewiththyWrathAchilles`
        )

        return {
          email: discoveredDoc.Item.email,
          membershipStatus: discoveredDoc.Item.membershipStatus,
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
    updateSelfGuidedPopularity: async (_, args) => {
      UpdateSelfGuidedPoplarity(args)
    },
  },
  Course: {
    courseRelation: (parent) => {
      return getLessonsOfCourses_ddb(parent)
    },
  },
  SelfGuided: {
    exerciseSections: (parent) => {
      return getVideoSectionsOfSelfGuidedLesson_ddb(parent)
    },
  },
}

const typeDefs = [QueryTemplateLiteral, MuationTemplateLiteral]

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
//   if (res.method === "OPTIONS") {
//     return res.sendStatus(200)
//   }
//   next()
// })

//app.use(isAuth)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  // context(request) {
  //   console.log("context graphql", request.req)
  //   return request.rawHeaders
  // },
})
const app = express()
server.applyMiddleware({ app })

const PORT = 4321
app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
)
