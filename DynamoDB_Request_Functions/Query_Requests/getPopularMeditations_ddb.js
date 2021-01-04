const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  const meditationParams = {
    TableName: "App_Table",
    IndexName: "Meditation_Popularity",
    KeyConditionExpression: "#pk = :v",
    ExpressionAttributeNames: {
      "#pk": "meditation",
    },
    ExpressionAttributeValues: {
      ":v": "meditation",
    },
    ScanIndexForward: false,
    Limit: 10,
  }
  try {
    const meditations = await db.query(meditationParams).promise()
    console.log("lesson from db: ", meditations)

    return meditations.Items
  } catch (err) {
    console.log(err)
  }
}
