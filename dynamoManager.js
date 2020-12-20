const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const dotEnv = require("dotenv");

module.exports.addUserDetailsToDb = async (item) => {
  console.log("hit");
  const params = {
    TableName: "UserTable",
    Item: item,
  };

  const data = await db.put(params).promise();
  return data;
};
