const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  let baseLink =
    "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com"

  // let title = "Speed Sweat"
  let title = "Rapid Reps"
  // let title = "Jump Ups"
  //let contentUrl = "aerobics_woman_group.mp4"
  let contentUrl = "focus_energy_3.mp4"
  // let contentUrl = "man_jumping_on_box_exercise.mp4"
  let id = "e70e4632-0590-477b-b359-518f23b26161"
  // change this
  let sectionNumber = 3

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `selfGuided#${id}`,
      sk: `sectionNumber#${sectionNumber}`,
      id: uuidv4(),
      sectionNumber: sectionNumber,
      category: "HIIT",
      length: 1100,
      contentUrl: `${baseLink}/${contentUrl}`,
      title: title,
    },
  }

  try {
    const data = await db.put(Params).promise()
    console.log(data)
    return data.Item
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
