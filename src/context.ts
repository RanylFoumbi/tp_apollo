import { TrackAPI } from "./datasources/TrackAPI"
import { GhibiAPI } from "./datasources/GhibiAPI"
import { JWTUser } from "./modules/auth"
import { PrismaClient } from "@prisma/client"

export type Context = {
  dataSources: {
    trackApi: TrackAPI
    ghibiaApi: GhibiAPI
    db: PrismaClient 
  },
  user: JWTUser | null
}