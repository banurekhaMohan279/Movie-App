import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  apikey:String="3b7e17aa88c5a9a682337580ba167eab";

  constructor(public http:Http) { 
  }

  getUpcomingMovies(){
  		return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apikey)
  		.map(res=> res.json());
  }

  getTrendingMovies(){
      return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key='+this.apikey)
      .map(res=> res.json());
  }

  postMyRecommendation(movie){
      console.log("movie",movie)
      return this.http.post('http://localhost:8080/PostRecommendation',movie)
      .map(res=> res.json());
  }

  deleteMyRecommendation(movieid){
      return this.http.delete('http://localhost:8080/DeleteRecommendation/'+movieid)
      .map(res=> res.json());
  }

  getRecommendedMovies(movieid){
      return this.http.get('https://api.themoviedb.org/3/movie/'+movieid+'/recommendations?api_key='+this.apikey)
      .map(res=> res.json());
  }

  getMyRecommendations(){
      return this.http.get('http://localhost:8080/GetRecommendations')
      .map(res=> res.json());
  }

}
