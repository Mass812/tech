const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

const db = new AWS.DynamoDB.DocumentClient()

//  TODO password creation salting JWT for Sign on, Context through app

module.exports = async () => {
  let userEmail = "matt@gmail.com"

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `userEmail#${userEmail}`,
      sk: "profile",
      firstName: "Matthew",
      lastName: "Wellman",
      email: "matt@gmail.com",
      courses: ["The Rock Formula"],
      created: new Date().toISOString(),
      phone: 8123334444,
      weeklyInDependentWorkouts: 0,
      weeklyGuidedWorkouts: 0,
      streak: 0,
      coursesCompleted: 0,
      lessonsCompleted: 0,
    },
  }

  try {
    const data = await db.put(Params).promise()
    console.log(data)
    return data
  } catch (err) {
    console.log("Oops there was an err creating this user ", err)
  }
}
