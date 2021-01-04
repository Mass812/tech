const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const db = new AWS.DynamoDB.DocumentClient();

 module.exports = async () => {
 
  
  
  const courseParams = {
    TableName: "App_Table",
    IndexName: "Course_Popularity",
    KeyConditionExpression: "#pk = :v",
    ExpressionAttributeNames: {
     "#pk": "course"
    },
    ExpressionAttributeValues: {
      ":v": "course"
    },
    ScanIndexForward: false,
    Limit: 4
  };

     try {   
         const courses = await db.query(courseParams).promise();
         console.log('lesson from db: ', courses.Items)
           return courses.Items
    
     } catch(err) {
         console.log(err)
     }

};

