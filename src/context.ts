import { TrackAPI } from "./datasources/TrackAPI"
import { GhibiAPI } from "./datasources/GhibiAPI"

export type DataSourceContext = {
  dataSources: {
    trackApi: TrackAPI
    ghibiaApi: GhibiAPI 
  }
}