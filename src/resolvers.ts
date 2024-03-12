import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers, Speciality } from "./types.js";

 
const doctorsData = [
  {
    id: '1',
    name: 'Samia Mekame',
    speciality: Speciality.Ophtalmologist,
  },
  {
    id: '2',
    name: 'Catherine Bedoy',
    speciality: Speciality.Psychologist,
  },
  {
    id: '3',
    name: 'John Doe',
    speciality: Speciality.Ophtalmologist,
  },
];
export const resolvers: Resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      const {specialities} = args
      return doctorsData.filter(doctor => specialities.includes(doctor.speciality))
    },
    doctor: (parent, args, context, info) => {
      const id = args.id
      return doctorsData.find(d => d.id === id)
    },
    divide: (parent, args, context, info) => {
      const {number1, number2} = args
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },
    closestColor: (parent, args, context, info) => {
      const {color} = args
      if (!(color.match(/^#[0-9a-fA-F]{6}/))) {
        throw new GraphQLError('color pattern does not match')
      }
      return getClosestColor(color, ["#FF5733", "#33FF57", "#3357FF"])
    },
    getTracks: (parent, args, context, info) => {
      return context.dataSources.trackApi.getTracks()
    },
    getPeople: (parent, args, context, info) => {
      return context.dataSources.ghibiaApi.getPeoples()
    },
    getFilms: (parent, args, context, info) => {
      return context.dataSources.ghibiaApi.getFilms()
    }
  },

  Track: {
    author: ({authorId}, args, context, info) => {
      return context.dataSources.trackApi.getAuthorBy(authorId)
    }
  },

  People: {
   films: ({films}, args, context, info) => { 
    const ids = films.map(f => f.split('/').pop())
      return context.dataSources.ghibiaApi.getFilmsById(ids)
    }
  },

  Film: {
    people: ({people}, args, context, info) => {
      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      const ids = people.map(f => {
        const match = f.match(uuidRegex);
        return match ? match[0] : null;
      }).filter(Boolean);
      
      return context.dataSources.ghibiaApi.getPeopleById(ids)
    }
  },

  Doctor: {
    addresses: (parent, args, context, info) => {
      return [{
        zipCode: `${parent.id}000`
      }]
    }
  }
 };
