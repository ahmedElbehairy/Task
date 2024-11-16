import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/Users';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private FS:AngularFirestore) { }
  deleteUser(id:string){
    return this.FS.collection('User').doc(id.toString()).delete()
  }
  getOneUser(id:string){
    return this.FS.collection('User').doc(id).valueChanges()
  }
  editUser(id:string ,UserForm:User){
    return this.FS.collection('User').doc(id).update(UserForm)
  }
}
