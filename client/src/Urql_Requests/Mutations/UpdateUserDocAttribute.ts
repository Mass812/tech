 const UpdateUserDocAttribute = `
mutation($email: String! $attr: String!, $value: Int!){
  updateProgressValue( email: $email, attr: $attr, value: $value){
    attr
    value
    email
  }
}

`;

export default UpdateUserDocAttribute;