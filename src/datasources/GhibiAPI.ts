import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models.js";

export class GhibiAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev";

  getFilms() {
    return this.get<FilmModel[]>('/films')
  }

  getPeoples() {
    return this.get<PeopleModel[]>('/people')
  }

    getFilmsById(ids: string[]) {
        return Promise.all(ids.map(id => this.get<FilmModel>(`/films/${id}`)))
    }

    getPeopleById(ids: string[]) {
        return Promise.all(ids.map(id => this.get<PeopleModel>(`/people/${id}`)))
    }
}