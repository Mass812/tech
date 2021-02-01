const getLessonsOfCourses_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getLessonsOfCourses_ddb")

module.exports = {
  courseRelation: (parent) => {
    return getLessonsOfCourses_ddb(parent)
  },
}
