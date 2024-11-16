import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LOAD, SuccessAction, erorrAction } from '../Actions/User.action';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()

export class UserEffect {
  errorMessage!: string;
  todo$ = createEffect(() =>
    this._actions.pipe(
      ofType(LOAD),
      tap(() => this.spinner.show()),
      mergeMap(() =>
        this.FS.collection('User').valueChanges()
          .pipe(
            map((data) =>  new SuccessAction(data)),
            catchError((err) => of(new erorrAction(err))),
            tap((e) => {
              this.spinner.hide();
              if (e.type == '[User] failed') {
                this.errorMessage = `<p class="m-0 d-flex flex-column">
              <span class="text-main font-Bold-s20"> Oops ! </span> 
              <span class="text-white font-SemiBold-s20 d-flex align-items-center gap-2"> 
              Looks like something went wrong 
              </span>
              </p>`;
              }
            })
          )
      )
    )
  );
  
  constructor(
    private _actions: Actions,
    private spinner: NgxSpinnerService,
    private FS: AngularFirestore
  ) {}
}
