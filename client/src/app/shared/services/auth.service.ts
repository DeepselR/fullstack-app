import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  private _token = null;

  constructor(private http: HttpClient) {

  }

  register(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/register", user);
  }


  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(tap(
      ({token}) => {
        localStorage.setItem('authToken', token);
        this.setToken(token);
      }));
  }

  setToken(token: string) {
    this._token = token;
  }


  getToken(): string {
    return this._token;
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
