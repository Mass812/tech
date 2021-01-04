const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  const lessonParams = {
    TableName: "App_Table",
    IndexName: "Lesson_Popularity",
    KeyConditionExpression: "#pk = :v",
    ExpressionAttributeNames: {
      "#pk": "lesson",
    },
    ExpressionAttributeValues: {
      ":v": "lesson",
    },
    ScanIndexForward: false,
    Limit: 10,
  }

  try {
    const lessons = await db.query(lessonParams).promise()
    console.log("lesson from db: ", lessons.Items)
    return lessons.Items
  } catch (err) {
    console.log(err)
  }
}
