const userDetails = ` 
query($email: String!){
  user(email: $email){
    userWatchTime
    lessonsCompleted
    selfGuidedCompleted
    streak
  }
}
`;


export default userDetails;