const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async (args) => {
  const { category } = args;
  const Params = {
    TableName: "App_Table",
    IndexName: "course_category",
    KeyConditionExpression: "pk = :v and category = :sk",
    ExpressionAttributeValues: {
      ":v": "course",
      ":sk": `${category}`,
    },
  };

  try {
    const data = await db.query(Params).promise();
    console.log(data);
    return data.Items;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
