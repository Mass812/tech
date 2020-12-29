const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const { v4: uuidv4 } = require("uuid");

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let courseName = "Dance, Sweat and Love Yourself";
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: `${courseName}`,
      id: uuidv4(),
      courseName: "Dance, Sweat and Love Yourself",
      category: "Cardio",
      instructor: "Richard Simmons",
      created: new Date().toISOString(),
      keywords: ["cardio"],
      equipment: ["Yoga Mat", "Light Dumbbells"],
      lectureCount: 24,
      description: `Who else but The King of home exercise dance to show us all how it is done.`,
      length: "6 weeks",
      intensity: "8",
      targets: "Full Body",
      img:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/richard_simmons_headshot.jpg",
      courseImg:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/richard_simmons_course_img.png",
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
