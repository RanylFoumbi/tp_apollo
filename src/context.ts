import { TrackAPI } from "./datasources/TrackAPI"
import { GhibiAPI } from "./datasources/ghibiAPI"

export type DataSourceContext = {
  dataSources: {
    trackApi: TrackAPI
    ghibiaApi: GhibiAPI 
  }
}