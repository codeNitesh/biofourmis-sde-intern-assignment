import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  public baseUrl = 'https://api.themoviedb.org/3/'

  constructor(private http: HttpClient) { }

  getAllMovies(){
    return this.http.get(this.baseUrl + 'movie/popular?api_key=68b4fe2a513155a58dd0af4adacb281b')
  }

  getAllGenre(){
    return this.http.get(this.baseUrl + 'genre/movie/list?api_key=68b4fe2a513155a58dd0af4adacb281b&language=en-US')
  }

}
