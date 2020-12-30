const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let courseName = `The Rock Formula`;
  let instructor = "Dwayne Johnson";
  let lessonNumber = "1";

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `instructor#${instructor}`,
      sk: `courseName#${courseName}#lesson#${lessonNumber}`,
      id: uuidv4(),
      category: "Strength",
      length: "16 min",
      contentUrl:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/ollie_workout_vid.mp4",
      contentImg:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/dwayne_johnson_course_img.jpg",
      courseName: `${courseName}`,
      created: new Date().toISOString(),
      title: "The Smackdown",
      description: `Bringing things down to reality. Pain is real --but gains are better`,
      equipment: ["Heavy Dumbbells", "Heavy Wieghts"],
      instructor: `${instructor}`,
      intensity: 6,
      lessonNumber: `${lessonNumber}`,
      outfitTopId: uuidv4(),
      outfitTopName: "XXXXXL StretchFit T",
      outfitTopImgUrl: "https://fabletics.com",
      outfitBottomId: uuidv4(),
      outfitBottomName: "Green Hulk Pants",
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
