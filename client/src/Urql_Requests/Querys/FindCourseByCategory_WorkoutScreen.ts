const FindCoursesByCategory = `
query($category: String!){
  categoryLessons(category: $category){
      instructor,
       length,
        weekNumber,
         lessonNumber,
          equipment,
           courseName,
            title
            
            img
    }
}
`;


export default FindCoursesByCategory