const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })
const { v4: uuidv4 } = require("uuid")

const db = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  let courseName = "Cardio Tactics"

  let baseLink =
    "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com"
  let courseImg = "martha_hunt.jpg"
  let img = "martha_hunt.jpg"

  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "course",
      sk: `${courseName}`,
      id: uuidv4(),
      courseName: `${courseName}`,
      category: "HIIT",
      instructor: "Myranny Gupta",
      created: new Date().toISOString(),
      keywords: ["weights", "chest", "arms", "back"],
      equipment: ["Light Dumbbells", "Yoga Mat"],
      lectureCount: 3,
      description:
        "This is an cardio intense workout centered around aerobics. We will use high velocity movement to shred excesses from every part of out bodies.",
      length: "3 Weeks",
      intensity: "8",
      targets: "Whole Body",
      img: `${baseLink}/${img}`,
      courseImg: `${baseLink}/${courseImg}`,
      targetArmsValue: 6,
      targetBackValue: 8,
      targetAbstValues: 8,
      targetChestValue: 4,
      targetLegsValue: 8,
      courseRelation: [`changeThistoFirstClass`],
      workoutDayPattern: ["_"],
    },
  }

  try {
    const data = db.put(Params).promise()
    console.log(data)
    return data
  } catch (err) {
    console.log("Oops there was an err ", err)
  }
}
