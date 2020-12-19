const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async (email) => {
  const Params = {
    TableName: "App_Table",
    Key: {
      pk: email,
      sk: "profile",
    },
  };

  try {
    const data = await db.getItem(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
