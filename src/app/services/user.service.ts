import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[]=[];

  constructor() { 
    this.users.push({
      email: "abcd@gmail.com",
      password: "123"
    }),
    this.users.push({
      email: "user2@gmail.com",
      password: "123"
    })
  }

  public addUser(u: User):User[]{
    this.users.push(u);
    return this.users;
  }

  public getUsers():User[]{
    return this.users;
  }

}
