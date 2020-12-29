const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

//  TODO password creation salting JWT for Sign on, Context through app

module.exports = async () => {
  let userEmail = "matt@gmail.com";

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `userEmail#${userEmail}`,
      sk: "currentCourse",
      completedLessonsArray: [1],
      completedCourseArray: [1],
      streak: 0,
      highestStreak: 2,
      weight: 172,
      height: 182.88,
      selfGuidedWorkouts: 0,
      courseGuided: 0,
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
