const UpdateSelfGuidedPopularity = `
mutation($id: String! ){
  updateSelfGuidedPopularity( id: $id){
    id
    popularity
  }
}

`;

export default UpdateSelfGuidedPopularity;