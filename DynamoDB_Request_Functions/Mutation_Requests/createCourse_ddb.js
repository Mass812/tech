const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: "Bionic Body Design",
      courseName: "Bionic Body Design",
      category: "crossfit",
      courseFocus: "whole body",
      instructor: "Richard Simmons",
      created: new Date().toISOString(),
      keywords: [
        "cardio",
        "intense",
        "heart",
        "extreme",
        "intense",
        "crossfit",
      ],
      lectureCount: 15,
      description: `You have not experienced energy until you experience Richard Simmons.`,
      cost: "45.00",
      saleCost: "32.99",
      onSale: false,
      length: "16 hours",
      currentStudentCount: 351,
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
