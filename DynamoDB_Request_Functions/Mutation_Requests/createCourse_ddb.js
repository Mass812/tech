const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

const createCourse = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: "Adventure Aerobics",
      courseName: "Adventure Aerobics",
      category: "aerobics",
      courseFocus: "aerobics",
      instructor: "Cam Shelt",
      created: new Date().toISOString(),
      lectureCount: 16,
      description: `The key to life longevity is staying in shape. Weights and calisthetics go a long way in shaping your body with tones provided by additional muscle
      however, at the body's core, the heart, mind and lungs are strengthened by aerobics more profoundly. Join me in an adventure to bring your inner-self to its acme.`,
      cost: "34.00",
      saleCost: "23.99",
      onSale: false,
      length: "15 hours",
      currentStudentCount: 16,
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
