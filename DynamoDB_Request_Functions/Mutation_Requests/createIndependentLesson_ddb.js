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
      pk: `selfGuided`,
      sk: `bodyPartFocus`,
      id: uuidv4(),
      category: "HIIT",
      length: "20 min",
      contentUrl: `${baseLink}/${contentUrl}`,
      img: `${baseLink}/${img}`,
      created: new Date().toISOString(),
      title: courseName,
      equipment: ["Yoga Mat", "Light Dumbbells"],
      instructor: `${instructor}`,
      popularity: 3,
      selfGuidedLesson: true,
      selfGuided: "selfGuided",
    },
  }

  try {
    const data = await db.put(Params).promise()
    console.log(data)
    return data
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
