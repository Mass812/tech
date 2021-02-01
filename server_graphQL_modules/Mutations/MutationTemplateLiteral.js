const { gql } = require("apollo-server-express")

module.exports = gql`
  type Mutation {
    createUser: User!
    updateUser(email: String!, attribute: String!, value: String!): User
    createCourse: Course!
    createCourseLesson: Lesson!
    createSelfGuidedLesson: SelfGuided
    createSelfGuidedLessonSection: SelfGuidedVideoSection
    createInstructorProfile: InstructorProfile
    createCourseCompletionDoc: CourseCompletionDoc
    createMeditation: Meditation
    updateLessonPopularity(
      instructor: String!
      courseName: String!
      weekNumber: String!
      lessonNumber: String!
    ): Lesson
    updateSelfGuidedPopularity(id: String): SelfGuided
    login(email: String!, password: String!): Login
    updateProgressValue(email: String!, attr: String!, value: Int!): Progress
  }

  type Login {
    email: String
    password: String
    token: String
    membershipStatus: Boolean
  }

  type Progress {
    attr: String
    value: Int
    email: String
  }
`
