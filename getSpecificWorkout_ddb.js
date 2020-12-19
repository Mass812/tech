const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

const getSpecificWorkout = async ({ pk, sk }) => {
  const Params = {
    TableName: "App_Table",
    Key: {
      pk,
      sk,
    },
  };

  try {
    const data = await db.get(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};

getSpecificWorkout();
