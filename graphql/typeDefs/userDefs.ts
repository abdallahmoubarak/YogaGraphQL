import { gql } from "graphql-request";

export const userDefs = gql`
  type User {
    id: ID! @id
    name: String!
    email: String!
    password: String! @authentication
    phone: String
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
  }

  type AuthRes {
    user: User
    token: String!
  }

  type Mutation {
    signUp(
      name: String!
      phone: String!
      email: String!
      password: String!
    ): AuthRes!
    logIn(email: String!, password: String!): AuthRes!
  }
`;
