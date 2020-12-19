const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

const getAllUserWorkouts = async () => {
  const Params = {
    TableName: "App_Table",
    KeyConditionExpression: "#id = :v",
    ExpressionAttributeNames: {
      "#id": "pk",
    },
    ExpressionAttributeValues: {
      ":v": "williamwellman98@gmail.com",
    },
  };

  try {
    const data = await db.query(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};

getAllUserWorkouts();
