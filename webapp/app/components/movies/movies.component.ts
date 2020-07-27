import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'calvin-forth-coming-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit  {
  Movies:any[];
  currentRoute:String;
  searchVal:any[];
  isMyRecommended:boolean;
  latestMovie:{};
  recommendedList:any[];

  constructor(private movieService:MovieService, private router: Router) {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute=event.url.slice(1,event.url.length);
      }
    });
  }

  ngOnInit() {
    let list=JSON.parse(window.sessionStorage.getItem('recommendedList'));
    if(list==null)
    {window.sessionStorage.setItem("recommendedList",JSON.stringify([]));this.recommendedList=[];}
    else
    {this.recommendedList=JSON.parse(window.sessionStorage.getItem('recommendedList'));}
    switch(this.currentRoute){
      case 'forthcoming':
        this.movieService.getUpcomingMovies().subscribe((upcomingMovies)=>{
          this.Movies=upcomingMovies.results;
          this.isMyRecommended=false;
        });
      break;

      case 'trending':
        this.movieService.getTrendingMovies().subscribe((trendingMovies)=>{
         this.Movies=trendingMovies.results;
         this.isMyRecommended=false;
        });
      break;

      case 'recommended':
        this.latestMovie=JSON.parse(window.sessionStorage.getItem("latestMovieSearched"));//since localvar not retained
        this.movieService.getRecommendedMovies(this.latestMovie["id"]).subscribe((recommendedMovies)=>{
         this.Movies=recommendedMovies.results;
         if(this.latestMovie) this.isMyRecommended=true;
        });
      break;

      case 'my-recommendations':
        this.movieService.getMyRecommendations().subscribe((myrecommendations)=>{
          this.Movies=myrecommendations;
          this.isMyRecommended=false;
        });
        window.setTimeout(this.switchToggleText,50);
        break;

      default:
      break;
    }
  }

switchToggleText(){
    let elems=document.getElementsByClassName("toggle");
    for(let i=0;i<elems.length;i++){
      elems[i].classList.remove("unrecommend");elems[i].classList.add("recommend");
    }
}

 toggleRecommend(event,movie){
  	let id=event.target.id;
    let sessionList=JSON.parse(window.sessionStorage.recommendedList);
    let CurrentValue= (document.getElementById(id).classList.contains("recommend"))?"UnRecommend":"Recommend";
    if(CurrentValue=="Recommend"){
        document.getElementById(id).classList.remove("unrecommend");
        document.getElementById(id).classList.add("recommend");
        if(!(sessionList.includes(movie.id))){//to not post a duplicate
            this.movieService.postMyRecommendation(movie).subscribe(()=>{ 
              sessionList.push(movie.id);
              window.sessionStorage.setItem("recommendedList",JSON.stringify(sessionList));   
          });
        }
    }
    else{
        document.getElementById(id).classList.remove("recommend");
        document.getElementById(id).classList.add("unrecommend");
        this.movieService.deleteMyRecommendation(id).subscribe(()=>{
        sessionList.splice(sessionList.indexOf(id),1);
        window.sessionStorage.setItem("recommendedList",JSON.stringify(sessionList));     
        if(this.currentRoute=="my-recommendations"){
            this.movieService.getMyRecommendations().subscribe((myrecommendations)=>{
              this.Movies=myrecommendations;
              window.setTimeout(this.switchToggleText,50);
            });
          }  
        });
    } 
  }

  findAMovie(value){
       return this.Movies.filter(item =>
        {if(item["title"].toLowerCase().includes(value.toLowerCase()))
              {
                return item;
              }});
  }

  searchValue(event){
    let value=event.target.value;
    this.searchVal=this.findAMovie(value);
    window.sessionStorage.setItem("latestMovieSearched",JSON.stringify({"id":this.searchVal[0].id,"title":this.searchVal[0].title}));
  }
}
