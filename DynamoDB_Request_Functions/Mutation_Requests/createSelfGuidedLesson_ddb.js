const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  let courseName = "Blitz Energy"
  let baseLink =
    "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com"
  let contentUrl = "focus_energy_1.mp4"
  let img = "richard_simmons_course_img.png"
  let id = uuidv4()

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `selfGuided`,
      sk: `selfGuided#${id}`,
      id: id,
      category: "Cardio",
      length: "3 min",
      contentUrl: `${baseLink}/${contentUrl}`,
      img: `${baseLink}/${img}`,
      created: new Date().toISOString(),
      title: courseName,
      equipment: ["Yoga Mat", "Light Dumbbells"],
      popularity: 10,
      selfGuidedLesson: true,
      selfGuided: "selfGuided",
      exerciseSections: "3",
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
