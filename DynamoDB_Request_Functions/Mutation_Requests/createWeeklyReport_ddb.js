const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

//  This will be a cloud driven operation Lambda or Strapi ? ?
module.exports = async () => {
  let userEmail = "matt@gmail.com";
  let weekNumber = 52;
  let year = 2020;

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `userEmail#${userEmail}`,
      sk: `year#${year}weekNumber${weekNumber}`,
      weekNumber: 51,
      streak: 4,
      weeklyInDependentWorkouts: 4,
      weeklyGuidedWorkouts: 4,
      height: 52,
      weight: 167,
    },
  };

  try {
    const data = await db.put(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err creating this user ", err);
  }
};
