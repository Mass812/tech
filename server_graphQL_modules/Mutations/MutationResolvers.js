const AWS = require("aws-sdk")
const db = new AWS.DynamoDB.DocumentClient()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const createUser = require("../../DynamoDB_Request_Functions/Mutation_Requests/createUser_ddb")
const createCourse = require("../../DynamoDB_Request_Functions/Mutation_Requests/createCourse_ddb")
const updateUserProfile = require("../../DynamoDB_Request_Functions/Mutation_Requests/updateUser_ddb")
const createCourseLesson = require("../../DynamoDB_Request_Functions/Mutation_Requests/createCourseLesson_ddb")
const createInstructorProfile = require("../../DynamoDB_Request_Functions/Mutation_Requests/createInstructorProfile_ddb")
const createCourseCompletionDoc_ddb = require("../../DynamoDB_Request_Functions/Mutation_Requests/createCourseCompletionDoc_ddb")
const createSelfGuidedLesson_ddb = require("../../DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLesson_ddb")
const createMeditation_ddb = require("../../DynamoDB_Request_Functions/Mutation_Requests/createMeditation_ddb")
const createSelfGuidedLessonSection_ddb = require("../../DynamoDB_Request_Functions/Mutation_Requests/createSelfGuidedLessonVideoSection_ddb")
const updateLessonPopularity_ddb = require("../../DynamoDB_Request_Functions/Mutation_Requests/updateLessonPopularity_ddb")
const updateUserDocValues = require("../../DynamoDB_Request_Functions/Mutation_Requests/updateUserDocValues")
const UpdateSelfGuidedPoplarity = require("../../DynamoDB_Request_Functions/Mutation_Requests/UpdateSelfGuidedPopularity")

module.exports = {
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
}
