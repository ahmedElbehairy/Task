import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';import { Paginater, User } from 'src/app/core/model/Users';
import { UserService } from 'src/app/core/service/User.service';
import { loadUserAction } from 'src/app/store/Actions/User.action';
import { UsersSelector } from 'src/app/store/Reducers/User.reducer';
;
import { StoreInterface } from 'src/app/store/store';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  errorMessage!: string;
  successMessage!: string;
  displayedColumns:string [] = ['id' , 'name' , 'email' , 'phone'] 
  Users!: User[];
  Pagination!:Paginater

  constructor(
    private _store: Store<StoreInterface>,
    private _User:UserService
  ) {}
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this._store.dispatch(new loadUserAction());
    this._store.select(UsersSelector).subscribe(
      ( res:any ) => {
        this.Users = res
        this.Pagination = {Users:res?.length , pages:Number.isInteger(res?.length/10) ? res?.length/10 :  Math.floor(res?.length/10)+1}
      },
      (erro) => {
        this.errorMessage = erro.message;
      }
    );
  }


  deleteUser(id:string){
    this._User.deleteUser(id).then(res => {
        this.successMessage = ` <p class="m-0 d-flex flex-column">
        <span class="text-main font-Bold-s20"> Welcome ! </span> 
        <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
          delete your User Success !!
        </span>
        </p>
      `
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);
      }
    ).catch(
      err => 
        {
         this.errorMessage = `<p class="m-0 d-flex flex-column">
        <span class="text-main font-Bold-s20"> Welcome ! </span> 
        <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
          Sorry we have a little problem
        </span>
        </p>
      `
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    })
  }
  deleteManyUsers(ids:any){
    ids.map((el:any) => {
      this._User.deleteUser(el).then(res => {
          this.successMessage = ` <p class="m-0 d-flex flex-column">
          <span class="text-main font-Bold-s20"> Welcome ! </span> 
          <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
            delete your Users Success !!
          </span>
          </p>
        `
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        }
      ).catch(
        err => 
          {
           this.errorMessage = `<p class="m-0 d-flex flex-column">
          <span class="text-main font-Bold-s20"> Welcome ! </span> 
          <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
            Sorry we have a little problem
          </span>
          </p>
        `
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      })
    })
  }
}
