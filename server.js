require("dotenv").config()

const AWS = require("aws-sdk")
const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const isAuth = require("./server_isAuth")

AWS.config.update({
  region: "us-east-2",
  // endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  // accessKeyId: process.env.REACT_APP_DDB_ACCESS,
  // secretAccessKey: process.env.REACT_APP_DDB_SUPER,
})

const db = new AWS.DynamoDB.DocumentClient()

const QueryTemplateLiteral = require("./server_graphQL_modules/Querys/QueryTemplateLiterals")
const QueryResolvers = require("./server_graphQL_modules/Querys/QueryResolvers")
const MuationTemplateLiteral = require("./server_graphQL_modules/Mutations/MutationTemplateLiteral")
const MutationResolvers = require("./server_graphQL_modules/Mutations/MutationResolvers")
const SelfGuidedRelationship = require("./server_graphQL_modules/RelationShips/SelfGuidedRelationship")
const CourseRelationship = require("./server_graphQL_modules/RelationShips/CourseRelationship")

let resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  Course: CourseRelationship,
  SelfGuided: SelfGuidedRelationship,
}

const typeDefs = [QueryTemplateLiteral, MuationTemplateLiteral]

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
//   if (res.method === "OPTIONS") {
//     return res.sendStatus(200)
//   }
//   next()
// })

//app.use(isAuth)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  // context(request) {
  //   console.log("context graphql", request.req)
  //   return request.rawHeaders
  // },
})
const app = express()
server.applyMiddleware({ app })

const PORT = 4321
app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
)
