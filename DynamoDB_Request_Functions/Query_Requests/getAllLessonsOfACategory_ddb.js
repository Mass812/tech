const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (args) => {
  const { category } = args
  const Params = {
    TableName: "App_Table",
    IndexName: "Lesson_Category",
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": `lesson`,
      "#sk": "category",
    },
    ExpressionAttributeValues: {
      ":pk": `lesson`,
      ":sk": category,
    },
  }

  try {
    const data = await db.query(Params).promise()
    console.log(data)
    return data.Items
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
