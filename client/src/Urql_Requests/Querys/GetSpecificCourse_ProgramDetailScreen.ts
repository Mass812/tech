const GetSpecificCourse = `
query ($courseName: String!) {
    course(courseName: $courseName){
      courseName
      instructor
      id
      description
      lectureCount
      length
      category
      courseImg
      equipment
      targets
      targetArmsValue
      targetBackValue
      targetLegsValue
      targetAbsValue
      courseRelation {
        contentUrl
        title
        id
        length
        img
        equipment
        weekNumber
        lessonNumber
        courseName
        instructor
      }
    }
  }
`;

export default GetSpecificCourse;