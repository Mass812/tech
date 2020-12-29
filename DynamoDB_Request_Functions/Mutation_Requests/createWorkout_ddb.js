const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let userEmail = "matt@gmail.com";
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `userEmail#${userEmail}`,
      sk: `category#${category}type#${type}`,
      email: "ashton@gmail.com",
      category: "aerobic",
      courseDirected: false,
      courseRelation: "none",
      exercise: "cycling",
      timestamp: new Date().toISOString(),
      duration: 54,
      intensity: 8,
      bodyWeight: 173,
    },
  };

  try {
    const data = db.put(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
