import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'  },
  {
    path: "Home",
    loadChildren: () =>
      import("./features/features.module").then(
        (m: any) => m.FacilitiesModule
      )
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
