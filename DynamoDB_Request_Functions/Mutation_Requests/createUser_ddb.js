const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

module.exports = createUser = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "User#tim@gmail.com",
      sk: "profile",
      firstName: "Tim",
      lastName: "Allen",
      email: "tim@gmail.com",
      courses: ["Extreme Chest Definition"],
      created: new Date().toISOString(),
      phone: 8123334444,
      settings: [
        {
          darkMode: false,
          billingPreferences: {
            paymentMethod: {
              bankName: "none",
              accountNumber: 0,
              routingNumber: 0,
            },
          },
          billingAddress: {
            street: "222 Cameo Way",
            city: "Jeffersonville",
            state: "IN",
            zipCode: 47129,
          },
        },
      ],
    },
  };

  try {
    const data = await db.put(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};

//createUser();
