const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (parent) => {
  let { id } = parent

  let Params = {
    TableName: "App_Table",
    KeyConditionExpression: `pk = :pk and begins_with(sk, :sk)`,
    ExpressionAttributeValues: {
      ":pk": `selfGuided#${id}`,
      ":sk": `sectionNumber`,
    },
  }

  try {
    let data = await db.query(Params).promise()
    return data.Items
  } catch (err) {
    console.log("error", err)
  }
}
