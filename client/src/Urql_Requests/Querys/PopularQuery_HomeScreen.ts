



 const PopularQuery_HomeScreen = `
query {
  popularLessons{
    id
    category
    length
    contentUrl
    img
    courseName
    equipment
    instructor
    weekNumber
    lessonNumber
    title
  }
  popularSelfGuided{
    img
    id
    length
    equipment
    title
    contentUrl
    
  }
  popularMeditations{
    contentImg
   contentUrl
  length
  instructor
  description
  title
  id
  }
}
`;

export default PopularQuery_HomeScreen