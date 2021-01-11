const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (args) => {
  let { id } = args

  let Params = {
    TableName: "App_Table",
    Key: {
      pk: "selfGuided",
      sk: `selfGuided#${id}`,
    },
  }

  try {
    let data = await db.get(Params).promise()
    return data.Item
  } catch (err) {
    console.log("error", err)
  }
}
