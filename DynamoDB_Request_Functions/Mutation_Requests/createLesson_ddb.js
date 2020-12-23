const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: "Bionic Body Design_1",
      title: "Course Overview",
      subtitile: "Warm Up",
      lessonFocus: "Warm Up",
      video: "https://gettingWarmedUp.m44",
      img:
        "https://static01.nyt.com/images/2017/03/13/arts/13SIMMONSJP2/13SIMMONSJP2-superJumbo.jpg",
      course: "Bionic Body Design",
      lesson: 1,
      duration: "3 minutes, 20 seconds",
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
