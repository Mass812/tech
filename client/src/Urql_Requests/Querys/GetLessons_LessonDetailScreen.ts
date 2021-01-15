const GetLesson_LessonDetailScreen = `
query ($courseName: String!, $instructor: String!, $lessonNumber: String!, $weekNumber: String!) {
    lesson(courseName: $courseName, instructor: $instructor, lessonNumber: $lessonNumber, weekNumber: $weekNumber){
      courseName
      instructor
      id
      description
      lessonNumber
      length
      category
      img
      equipment
      weekNumber
      title
      contentUrl
      targets
      targetChestValue
      targetLegsValue
      targetArmsValue
      targetAbsValue
      targetBackValue
      outfitTopName
    outfitTopImgUrl
    outfitBottomName
    outfitBottomImgUrl
    }
  }
`;
export default GetLesson_LessonDetailScreen