const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  let baseLink = process.env.REACT_APP_S3
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
        `${baseLink}richard_simmons_course_img.png`,
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
