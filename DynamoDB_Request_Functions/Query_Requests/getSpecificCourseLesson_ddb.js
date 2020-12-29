const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async (args) => {
  let { courseName, instructor, lessonNumber } = args;

  console.log(courseName, instructor, lessonNumber);

  let courseNameTrimmed = courseName.split(" ").join("");
  let instructorTrimmed = instructor.split(" ").join("");

  const Params = {
    TableName: "App_Table",
    Key: {
      pk: `instructor#${instructorTrimmed}`,
      sk: `courseName#${courseNameTrimmed}#lesson#${lessonNumber}`,
    },
  };

  try {
    const data = await db.get(Params).promise();
    console.log(data.Item);
    return data.Item;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};
