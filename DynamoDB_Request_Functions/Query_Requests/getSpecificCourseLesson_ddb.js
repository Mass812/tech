const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (args) => {
  let { courseName, instructor, lessonNumber, weekNumber } = args

  console.log("inside _ddb: ", courseName, instructor, lessonNumber)

  let pk = `instructor#${instructor}`
  let sk = `courseName#${courseName}#weekNumber#${weekNumber}#lesson#${lessonNumber}`
  console.log("pk: ", pk, "sk: ", sk)

  const Params = {
    TableName: "App_Table",
    Key: {
      pk: pk,
      sk: sk,
    },
  }
  try {
    const data = await db.get(Params).promise()

    console.log(data)
    return data.Item
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
