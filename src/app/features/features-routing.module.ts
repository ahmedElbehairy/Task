import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from '../shared/not-found-page/not-found-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    { path: 'Home',component:HomeComponent },
    { path: 'Edit-User/:id',component:EditUserComponent },
    { path: '**', component:NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
