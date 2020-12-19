const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

const createItem = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "ashton@gmail.com",
      sk: "profile",
      firstName: "Ashton",
      lastName: "Wellman",
      email: "ashton@gmail.com",
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
    const data = db.put(Params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Oops there was an err ", err);
  }
};

createItem();
