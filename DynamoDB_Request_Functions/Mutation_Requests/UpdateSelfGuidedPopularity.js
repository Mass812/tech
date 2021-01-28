const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (args) => {
  console.log("mutation UpdateSelfGuidedPopularity passed => ", args)

  const { id } = args

  const Params = {
    TableName: "App_Table",
    Key: {
      pk: `selfGuided`,
      sk: `selfGuided#${id}`,
    },
    UpdateExpression: `set popularity = popularity + :val`,
    ExpressionAttributeValues: { ":val": 1 },
    ReturnValues: "UPDATED_NEW",
  }

  try {
    const data = await db.update(Params).promise()
    return data.Item
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
