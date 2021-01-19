const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })
const bcrypt = require("bcryptjs")
const db = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require("uuid")

//  TODO password creation salting JWT for Sign on, Context through app

let createThisUser = async () => {
  let userEmail = "matt@gmail.com"
  let hashedPassword = await bcrypt.hash("password", 12)
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: `userEmail#${userEmail}`,
      sk: "profile",
      id: uuidv4(),
      firstName: "Matthew",
      lastName: "Wellman",
      email: "matt@gmail.com",
      passowrd: hashedPassword,
      currentCourse: null,
      completedCourses: ["The Rock Formula"],
      completedMeditations: [""],
      completedLessons: [""],
      completedSelfGuided: [""],
      created: new Date().toISOString(),
      phone: "8123334444",
      weeklyInDependentWorkouts: 0,
      weeklyGuidedWorkouts: 0,
      streak: 0,
      coursesCompleted: 0,
      lessonsCompleted: 0,
      userWatchTime: 0,
      streak: 0,
    },
  }

  try {
    const data = await db.put(Params).promise()
    console.log(data)
    return data.Iten
  } catch (err) {
    console.log("Oops there was an err creating this user ", err)
  }
}
