const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    user(email: String!): User
    lessons(instructor: String!, courseName: String!): [Lesson]
    lesson(
      instructor: String!
      courseName: String!
      lessonNumber: String!
      weekNumber: String!
    ): Lesson

    course(courseName: String!): Course
    courses: [Course]
    coursesByCategory(category: String!): [Course]
    categoryLessons(category: String!): [CategoryLesson]
    categorySelfGuided(category: String!): [SelfGuided]
    meditations: [Meditation]
    popularCourses: [Course]
    popularLessons: [Lesson]
    popularMeditations: [Meditation]
    popularSelfGuided: [SelfGuided]
    allSelfGuided: [SelfGuided]
    selfGuided(id: String!): SelfGuided
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    passowrd: String
    currentCourse: String
    completedCourses: [String]
    completedMeditations: [String]
    completedLessons: [String]
    completedSelfGuided: [String]
    created: String
    phone: String
    coursesCompleted: Int
    lessonsCompleted: Int
    selfGuidedCompleted: Int
    userWatchTime: Int
    streak: Int
  }

  type WeekReport {
    weekodYear: Int
    streak: Int
    weeklySelfGuidedWorkouts: Int
    weeklyGuidedWorkouts: Int
    height: Int
    weight: Int
    duration: Int
  }
  type MonthReport {
    monthNumber: Int
    highestStreak: Int
    weeklySelfGuidedWorkouts: Int
    weeklyGuidedWorkouts: Int
    height: Int
    weight: Int
    duration: Int
  }

  type CourseCompletionDoc {
    completedLessonsArray: [String]
    completedCourseArray: [String]
    streak: Int
    highestStreak: Int
    weight: Int
    height: Int
  }

  input UserInput {
    user: String
    password: String
  }

  type Course {
    id: String
    category: String
    courseName: String
    description: String
    equipment: [String]
    img: String
    courseImg: String
    targets: [String]
    instructor: String
    intensity: String
    keywords: [String]
    lectureCount: Int
    length: String
    targetArmsValue: Int
    targetBackValue: Int
    targetAbsValue: Int
    trgetChestValue: Int
    targetLegsValue: Int
    courseRelation: [Lesson]
  }

  type Lesson {
    id: String
    category: String
    length: String
    contentUrl: String
    img: String
    courseName: String
    title: String
    targets: [String]
    description: String
    equipment: [String]
    instructor: String
    intensity: Int
    lessonNumber: String
    weekNumber: String
    outfitTopId: String
    outfitTopName: String
    outfitTopImgUrl: String
    outfitBottomId: String
    outfitBottomName: String
    outfitBottomImgUrl: String
    selfGuidedLesson: Boolean
    courseRelation: Course
    targetChestValue: Int
    targetLegsValue: Int
    targetArmsValue: Int
    targetAbsValue: Int
    targetBackValue: Int
    lesson: String
    popularity: Int
  }

  type CategoryLesson {
    length: String
    instructor: String
    courseName: String
    title: String
    equipment: [String]
    weekNumber: String
    lessonNumber: String
    img: String
    id: String
  }

  type SelfGuided {
    id: String
    category: String
    length: String
    contentUrl: String
    img: String
    created: String
    title: String
    equipment: [String]
    popularity: Int
    selfGuidedLesson: Boolean
    selfGuided: String
    exerciseSections: [SelfGuidedVideoSection]
  }

  type SelfGuidedVideoSection {
    title: String
    id: String
    length: Int
    contentUrl: String
    sectionNumber: Int
    courseRelations: SelfGuided
  }

  type Meditation {
    category: String
    instructor: String
    contentImg: String
    contentUrl: String
    id: String
    length: String
    subTitle: String
    title: String
    description: String
    meditation: String
    popularity: String
  }

  type InstructorProfile {
    courses: [String]
    category: String
    courseFocus: String
    instructor: String
    description: String
    img: String
    id: String
  }

  input CourseInput {
    courseName: String!
    category: String!
    courseFocus: String!
    instructor: String!
    created: String!
    lectureCount: Int!
    description: String!
    length: String!
  }
`
