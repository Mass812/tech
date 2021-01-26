const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })
const { v4: uuidv4 } = require("uuid")

const db = new AWS.DynamoDB.DocumentClient()
//  TODO password creation salting JWT for Sign on, Context through app

module.exports = async () => {
  let title = "The Wisdom of Sitting"
  let subTitle = "Calm can be created."
  let Link =
    "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com"

  let url = `${Link}/meditation_wisdom_sitting.mp3`
  let img = `${Link}/meditation_beach.jpg`

  let contentLength = "8 min"
  const Params = {
    TableName: "App_Table",
    Item: {
      pk: "meditation",
      sk: `meditation#${title}`,
      id: uuidv4(),
      title: `${title}`,
      subTitle: `${subTitle}`,
      length: "3:23",
      contentUrl: `${url}`,
      contentImg: `${img}`,
      popularity: 5,
      meditation: "meditation",
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
