import GetSpecificCourse from "./GetSpecificCourse_ProgramDetailScreen";

const GetAllSelfGuided = `
query {
allSelfGuided {
contentUrl
id
length
title
img
category
}
}
`;

export default GetAllSelfGuided