const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

const getAllUserTypeWorkouts = async (email, type) => {
  let params = {
    TableName: "App_Table",
    Key: {
      pk: email,
      sk: `begins with ${type}`,
    },
  };

  try {
    let data = await db.get(params).promise();
    return data;
  } catch (err) {
    console.log("Oops, ", err);
  }
};

getAllUserTypeWorkouts("williamwellman98@gmail.com", "core");
