const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "ashton@gmail.com",
      sk: "aerobic" + "_" + new Date().toISOString(),
      email: "ashton@gmail.com",
      category: "aerobic",
      courseDirected: false,
      courseRelation: "none",
      exercise: "Cycling",
      timestamp: new Date().toISOString(),
      duration: 54,
      sets: 0,
      reps: 0,
      weightLbValue: 0,
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
