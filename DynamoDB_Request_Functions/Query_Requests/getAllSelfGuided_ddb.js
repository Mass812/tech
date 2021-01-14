const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  const Params = {
    TableName: "App_Table",
    KeyConditionExpression: "pk = :v",
    ExpressionAttributeValues: { ":v": "selfGuided" },
  }

  try {
    const data = await db.query(Params).promise()
    console.log(data)
    return data.Items
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
