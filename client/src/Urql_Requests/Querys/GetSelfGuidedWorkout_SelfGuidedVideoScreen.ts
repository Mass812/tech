const getSelfGuidedWorkout = `
  query($id: String!){
    selfGuided(id: $id){
      title
      length
      exerciseSections{
        title
        length
        sectionNumber
        contentUrl
        id

      }
    }
    }


`;

export default getSelfGuidedWorkout