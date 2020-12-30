const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const { v4: uuidv4 } = require("uuid");

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let courseName = "The Rock Formula";
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: `${courseName}`,
      id: uuidv4(),
      courseName: `${courseName}`,
      category: "Strength",
      instructor: "Dwayne Johnson",
      created: new Date().toISOString(),
      keywords: ["weights", "chest", "arms", "back"],
      equipment: ["Light Dumbbells", "Heavy Dumbbells", "Yoga Mat"],
      lectureCount: 16,
      description:
        "Behind the cinematic marvel is a man of machine like discipline who's great personality and personal training strategies sure to redefine your upper body.",
      length: "5 weeks",
      intensity: "9",
      targets: "Upper Body",
      img:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/dwayne_johnson_course_img.jpg",
      courseImg:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/dwayne_johnson_course_img.jpg",
      targetArmsValue: 4,
      targetBackValue: 5,
      targetAbstValues: 5,
      targetChestValue: 5,
      targetLegsValue: 10,
      courseRelation: [`changeThistoFirstClass`],
      workoutDayPattern: ["_"],
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
