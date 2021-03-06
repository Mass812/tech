const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async (args) => {
  console.log("passed fx args updateUSerDocValues_ddb =>", args)

  const Params = {
    TableName: "App_Table",
    Key: {
      pk: `userEmail#${args.email}`,
      sk: "profile",
    },
    UpdateExpression: `set #attr = #attr + :value`,
    ExpressionAttributeNames: { "#attr": `${args.attr}` },
    ExpressionAttributeValues: { ":value": args.value },
    ReturnValues: "UPDATED_NEW",
  }

  try {
    const data = await db.update(Params).promise()
    console.log("updateUserDocValueFx after db call => ", data.Item)
    return data.Item
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
