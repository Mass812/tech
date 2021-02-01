const getVideoSectionsOfSelfGuidedLesson_ddb = require("../../DynamoDB_Request_Functions/Query_Requests/getVideoSectionsOfSelfGuidedLesson_ddb")

module.exports = {
  exerciseSections: (parent) => {
    return getVideoSectionsOfSelfGuidedLesson_ddb(parent)
  },
}
