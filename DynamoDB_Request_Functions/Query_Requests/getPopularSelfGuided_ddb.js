const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  const selfGuidedParams = {
    TableName: "App_Table",
    IndexName: "Self_Guided_Popularity",
    KeyConditionExpression: "#pk = :v",
    ExpressionAttributeNames: {
      "#pk": "selfGuided",
    },
    ExpressionAttributeValues: {
      ":v": "selfGuided",
    },
    ScanIndexForward: false,
    Limit: 10,
  }

  try {
    const selfGuided = await db.query(selfGuidedParams).promise()
    console.log("lesson from db: ", selfGuided)

    return selfGuided.Items
  } catch (err) {
    console.log(err)
  }
}
