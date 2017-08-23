import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import './../../services/rxjs-extensions';

import { User } from './../../models/user';

@Injectable()
export class UserObservableService {
  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(this.handleData)
      .catch(this.handleError);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
      .map(this.handleData)
      .catch(this.handleError);

  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`,
      body = JSON.stringify(user),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http.put(url, body, options)
            .map( this.handleData )
            .catch(this.handleError);
  }


  createUser(user: User): Observable<User> {
    const url = this.usersUrl,
      body = JSON.stringify(user),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http.post(url, body, options)
            .map( this.handleData )
            .catch( this.handleError );
  }


  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url)
      .map( this.handleData )
      .catch(this.handleError);
  }

  private handleData(response: HttpResponse<User>) {
    const body = response;
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = (error.message)
                    ? error.message
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
