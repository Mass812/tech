const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  //trim instructor name later when passed in
  let instructor = "RichardSimmons";

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `instructor#${instructor}`,
      sk: "profile",
      courses: ["Bionic Body Design"],
      category: "aerobics",
      courseFocus: "whole body",
      instructor: "Richard Simmons",
      description: `For 50 years Richard has brought excercie aerobics into the homes of millions of americans. We carry on this tradition With Him!`,
      img:
        "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/richard_simmons_course_img.png",
    },
  };

  try {
    const data = db.put(Params).promise();
    console.log(data);
    return data.Item;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
