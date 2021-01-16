const GetAllCourses = `
query {
    courses {
        courseName
        instructor
        description
        lectureCount
        length
        equipment
        id
        courseImg
    }
}
`;

export default GetAllCourses