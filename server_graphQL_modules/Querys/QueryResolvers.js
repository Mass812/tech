//ACCESS PATTERNS ,
const getUserProfile = require("../../DynamoDB_Request_Functions/Query_Requests/getUserProfile_ddb")
const getCoursesByName = require("../../DynamoDB_Request_Functions/Query_Requests/getCoursesByName_ddb")
const getAllCourses = require("../../DynamoDB_Request_Functions/Query_Requests/getAllCourses_ddb")
const getAllLessonsOfACourse_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getAllLessonsOfACourse_ddb")
const getAllMeditations_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getAllMeditations_ddb")
const getPopularLessons_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getPopularLessons_ddb")
const getPopularMeditations_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getPopularMeditations_ddb")
const getPopularSelfGuided_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getPopularSelfGuided_ddb")
const getSpecificCourseLesson_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getSpecificCourseLesson_ddb")
const getSpecificSelfGuidedLesson_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getSpecificSelfGuidedLesson_ddb")
const getAllLessonsOfACategory_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getAllLessonsOfACategory_ddb")
const getAllSelfGuidedOfACategory_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getAllSelfGuidedOfACategory_ddb")
//const getPopularCourses_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getPopularCourses_ddb")
const getCoursesForCategory_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getCoursesForCategory_ddb")
const getAllSelfGuided_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getAllSelfGuided_ddb")

module.exports = {
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
}
