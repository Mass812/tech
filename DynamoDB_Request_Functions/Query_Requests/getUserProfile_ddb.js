const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async (args) => {
  const { email } = args;
  const Params = {
    TableName: "App_Table",
    Key: {
      pk: email,
      sk: "profile",
    },
  };

  try {
    const data = await db.get(Params).promise();
    console.log(data);
    return data.Item;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
