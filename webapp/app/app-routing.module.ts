import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';


const routes: Routes = [
  {
    path: '',component:HomeComponent
  },
  {
    path: 'forthcoming',component:MoviesComponent
  },
  {
    path: 'trending',component:MoviesComponent
  },
  {
    path: 'recommended',component:MoviesComponent
  },
  {
    path: 'my-recommendations',component:MoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
