const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

const createItem = async () => {
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "ashton@gmail.com",
      sk: "private",

      email: "ashton@gmail.com",

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
