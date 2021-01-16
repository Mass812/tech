const updateLessonPopularity = `
  mutation ($instructor: String!, $courseName: String!, $weekNumber: String!, $lessonNumber: String!){
    updateLessonPopularity( instructor: $instructor, courseName: $courseName, weekNumber: $weekNumber, lessonNumber: $lessonNumber){
popularity
    }
    }
`;


export default updateLessonPopularity