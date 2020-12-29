const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async (args) => {
  const instructor = args.instructor;
  const courseName = args.courseName;
  console.log(courseName, instructor);
  let Params = {
    TableName: "App_Table",
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": `instructor#${instructor}`,
      ":sk": `courseName#${courseName}#lesson#`,
    },
  };

  try {
    let data = await db.query(Params).promise();
    return data.Items;
  } catch (err) {
    console.log(err);
  }
};
