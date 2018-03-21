import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  { path: 'details/:id',component: DetailsComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: 'home',component: HomeComponent },
  { path: 'new',component: NewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
