import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    HomeComponent,
    EditUserComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FeaturesRoutingModule,
    CommonModule,
]
})
export class FeaturesModule { }
