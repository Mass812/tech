const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = getUserWorkoutsByCategory = async (args) => {
  let { email, category } = args;
  const Params = {
    TableName: "App_Table",
    KeyConditionExpression: "pk = :pk and begins_with(sk,:sk)",
    ExpressionAttributeValues: {
      ":pk": `userEmail#${email}`,
      ":sk": `${category}`,
    },
  };

  try {
    const data = await db.query(Params).promise();
    console.log(data.Items);
    return data.Items;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
