import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<any> = []

  allGenre : any[] = []

  term: string = ""

  sortBy: string = "0"

  constructor(private movieApiService: MovieApiService, private router: Router) { }

  ngOnInit(): void {
    this.getGenre()
    this.getAllMovies()
  }

  getAllMovies(){
    this.movieApiService.getAllMovies().subscribe(
      (res: any)=> this.clearRawMovieData(res.results),
      (err)=> console.log("error with api")
    )
  }

  getGenre(){
    this.movieApiService.getAllGenre().subscribe(
      (res: any)=>{
        this.allGenre = res.genres
      },
      (err)=> console.log("error with genre")
    )
  }

  clearRawMovieData(data: any){
    
    for(let i=0; i<data.length; i++){
      const movie: any = {}
      movie.backdrop_path = data[i].backdrop_path
      movie.original_title = data[i].original_title
      movie.popularity = data[i].popularity
      movie.vote_count = data[i].vote_count
      movie.release_date = data[i].release_date
      movie.vote_average = data[i].vote_average
      movie.genres = []

      for(let j=0; j<data[i].genre_ids.length; j++){
        for(let k=0; k<this.allGenre.length; k++){
          if(this.allGenre[k].id == data[i].genre_ids[j]){
            movie.genres.push(this.allGenre[k].name)
          }
        }
      }
      
      this.movies.push(movie)
    }

    this.sortMovies("0")
  }

  logout(){
    localStorage.removeItem("temp-token-movies")
    this.router.navigate(['/login'])
  }

  sortMovies(sortBy: string){
    if(sortBy == "0"){
      this.movies.sort(function(a, b){
        return b.popularity - a.popularity;
      })
    }else{
      this.movies.sort(function(a, b){
        a = a.release_date.split('-');
        b = b.release_date.split('-');
        return b[0] - a[0] || b[1] - a[1]  || b[2] - a[2];
      })
    }
  }

}
