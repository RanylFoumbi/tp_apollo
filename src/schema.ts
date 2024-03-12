import gql from "graphql-tag";

export const typeDefs = gql`
  type Doctor {
    id: ID!
    name: String
    speciality: Speciality
    addresses: [Address]
  }

  type Address {
    zipCode: String
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Film {
    id: ID,
    title: String,
    people: [People]
  }

  type People {
    id: ID,
    name: String,
    eye_color: String,
    films: [Film]
  }
 
  type Query {
    doctors(specialities: [Speciality!]): [Doctor]
    doctor(id: ID!): Doctor
    divide(number1: Int!, number2: Int!): Float!
    multiply(number1: Int!, number2: Int!): Float!
    closestColor(color: String!): String!
    getTracks: [Track!]!
    getFilms: [Film!]!
    getPeople: [People!]!
  }
 
  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;