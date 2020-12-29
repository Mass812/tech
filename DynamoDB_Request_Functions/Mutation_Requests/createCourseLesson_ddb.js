const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let courseName = `Dance, Sweat and Love Yourself`;
  let instructor = "Richard Simmons";
  let lessonNumber = "1";

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `instructor#${instructor}`,
      sk: `courseName#${courseName}#lesson#${lessonNumber}`,
      id: uuidv4(),
      category: "Cardio",
      length: 23,
      contentUrl:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/ollie_workout_vid.mp4",
      courseImg:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/richard_simmons_course_img.png",

      category: "Cardio",
      courseName: `${courseName}`,
      created: new Date().toISOString(),
      description: `Now I said this would be fun, I did not say it would be easy!`,
      equipment: ["Yoga Mat"],
      instructor: `${instructor}`,
      intensity: 6,
      lessonNumber: `${lessonNumber}`,
      outfitTopId: uuidv4(),
      outfitTopName: "Urban Unique Tank Top",
      outfitTopImgUrl: "https://fabletics.com",
      outfitBottomId: uuidv4(),
      outfitBottomName: "Urban Unique Stretch Yoga's",
      outfitBottomImgUrl: "https://fabletics.com",
      selfGuidedLesson: false,
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
