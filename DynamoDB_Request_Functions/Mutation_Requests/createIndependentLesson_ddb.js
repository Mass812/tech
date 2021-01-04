const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  let instructor = "Ashley Wilkins"
  let courseName = "Pure Burn"
  let baseLink = process.env.REACT_APP_S3
  let contentUrl = "focus_energy_1.mp4"
  let img = "rosannagh_macLennan_workout.jpg"

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `instructor#${instructor}`,
      sk: `courseName#${courseName}`,
      courseName: courseName,
      id: uuidv4(),
      category: "HIIT",
      length: "20 min",
      contentUrl: `${baseLink}/${contentUrl}`,
      img: `${baseLink}/${img}`,
      created: new Date().toISOString(),
      title: courseName,
      description: "Teenty minutes of pure burn.",
      equipment: ["Yoga Mat", "Light Dumbbells"],
      instructor: `${instructor}`,
      intensity: 7,
      outfitTopId: uuidv4(),
      outfitTopName: "Basic Perfmance Top",
      outfitTopImgUrl:
        "https://fabletics-us-cdn.justfab.com/media/images/products/LS2146119-0001/LS2146119-0001-2_327x491.jpg",
      outfitBottomId: uuidv4(),
      outfitBottomName: "Panther Yogas",
      outfitBottomImgUrl:
        "https://fabletics-us-cdn.justfab.com/media/images/products/LG2040267-9765/LG2040267-9765-2_327x491.jpg",
      selfGuidedLesson: true,
      targetArmsValue: 9,
      targetBackValue: 3,
      targetAbstValues: 4,
      targetChestValue: 6,
      targetLegsValue: 2,
      courseRelation: [`changeThistoFirstClass`],
      popularity: 0,
      selfGuided: "selfGuided",
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
