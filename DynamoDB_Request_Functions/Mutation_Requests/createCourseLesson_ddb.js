const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  let instructor = "Myranny Gupta"
  let lessonNumber = "2"
  let weekNumber = "1"
  let courseName = "Cardio Tactics"

  let baseLink = process.env.REACT_APP_S3
  let contentUrl = "group_women_jumping_onto_step.mp4"
  let img = "form_focus.jpg"

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `instructor#${instructor}`,
      sk: `courseName#${courseName}#weekNumber#${weekNumber}#lesson#${lessonNumber}`,
      id: uuidv4(),
      category: "Cardio",
      length: "11 min",
      contentUrl: `${baseLink}/${contentUrl}`,
      img: `${baseLink}/${img}`,
      courseName: `${courseName}`,
      created: new Date().toISOString(),
      title: "Team Effort",
      description:
        "We will use a step up stair to increase our leg stamina and strength..",
      equipment: ["Yoga Mat", "Light Dumbbells"],
      instructor: `${instructor}`,
      intensity: 7,
      lessonNumber: `${lessonNumber}`,
      outfitTopId: uuidv4(),
      outfitTopName: "Basic Perfmance Top",
      outfitTopImgUrl:
        "https://fabletics-us-cdn.justfab.com/media/images/products/LS2146119-0001/LS2146119-0001-2_327x491.jpg",
      outfitBottomId: uuidv4(),
      outfitBottomName: "Panther Yogas",
      outfitBottomImgUrl:
        "https://fabletics-us-cdn.justfab.com/media/images/products/LG2040267-9765/LG2040267-9765-2_327x491.jpg",
      selfGuidedLesson: false,
      targets: ["arms", "legs", "heart"],
      targetArmsValue: 9,
      targetBackValue: 6,
      targetAbsValue: 2,
      targetChestValue: 6,
      targetLegsValue: 2,
      courseRelation: [`changeThistoFirstClass`],
      weekNumber: weekNumber,
      popularity: 0,
      lesson: "lesson",
    },
  }

  try {
    const data = db.put(Params).promise()
    console.log(data)
    return data
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
