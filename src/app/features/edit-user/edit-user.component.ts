import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserInput } from 'src/app/core/model/Users';
import { UserService } from 'src/app/core/service/User.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  successMessage!:string
  errorMessage!:string
  inputForm: UserInput[] = [
      {
        errorMessage: '',
        id: 'name',
        ng_model: '',
        placeHolder: 'User Name ...',
        label: 'User Name :',
      },
      {
        errorMessage: '',
        id: 'id',
        ng_model: '',
        placeHolder: 'User ID ...',
        label: 'User ID :',
      },
      {
        errorMessage: '',
        id: 'phone',
        ng_model: '',
        placeHolder: 'User Phone ...',
        label: 'User Phone :',
      },
      {
        errorMessage: '',
        id: 'email',
        ng_model: '',
        placeHolder: 'User Email ...',
        label: 'User Email :',
      },
    ]
  constructor(private _router:ActivatedRoute ,private _User:UserService , private _rout:Router , private spinner: NgxSpinnerService ){}
  ngOnInit() {
    this.getOneUser();
  }
  getOneUser(){
    this.spinner.show()
    this._User.getOneUser(this._router.snapshot.params["id"]).subscribe((user:any) => {
      console.log(user);
      this.inputForm.map(el => {
        el.ng_model = user[el.id]
      })
      this.spinner.hide()
    })
  }

numberOnly(event: any, id: string, index: number): boolean {
    if (id !== 'phone' && id !== 'id') {
      return true;
    }
    if (id == 'id') {
      return false;
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 43 || charCode == 36 || charCode == 46) {
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.inputForm[index].errorMessage =
        'You must enter a unique number and its language is English';
      return false;
    }
    this.inputForm[index].errorMessage = '';
    return true;
  }

  ngSubmit(UserForm:User){
    // prodForm = Object.assign(this.ProductForm, prodForm);
    this._User.editUser(this._router.snapshot.params["id"] , UserForm).then(res => {
      this.successMessage = ` <p class="m-0 d-flex flex-column">
          <span class="text-main font-Bold-s20"> Welcome ! </span> 
          <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
            edit your Product Success !!
          </span>
          </p>
        `
        setTimeout(() => {
          this.successMessage = '';
          this._rout.navigate(['/Home'])
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
}
