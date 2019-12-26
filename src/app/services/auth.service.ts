
import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LoginModel } from "../models/loginModel";
import { SignupModel } from "../models/signup.model";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	url:String;
	

	//private apiKey = "window.location.origin";
	userToken: string;
	


	constructor(private http: HttpClient) {
		console.log();
		console.log(window.location.origin);
		if (isDevMode) {
			this.url = `http://localhost:${3000}/api/`;
		} else {
			this.url = "/api/";
		}
	}

	login(user: LoginModel) {
		Number(user.user);
		let userLogin = {
			...user
		};
		return this.http.post(`${this.url}login`, userLogin).pipe(
			map(resp => {
				this.tokeStorage(resp["token"])
				return resp;
			})
		);
	}

	signUp(user: SignupModel) {
		let newUser = {
			...user
		};

		return this.http.post(`${this.url}signup`, newUser).pipe(
			map(resp => {
				this.tokeStorage(resp["token"]);
				return resp;
			})
		);
	}

	private tokeStorage(token: string) {
		this.userToken = token;
		localStorage.setItem("token", token);
		let hoy = new Date();
		hoy.setSeconds( 3600 );

		localStorage.setItem('expira', hoy.getTime().toString() );
	}

	readToken() {
		if (localStorage.getItem("token")) {
			this.userToken = localStorage.getItem("token");
		} else {
			this.userToken = "";
		}
		return this.userToken;
	}

	isAuth():Boolean {
		if ( this.userToken.length < 2 ) {
			return false;
		  }
	  
		  const expira = Number(localStorage.getItem('expira'));
		  const expiraDate = new Date();
		  expiraDate.setTime(expira);
	  
		  if ( expiraDate > new Date() ) {
			return true;
		  } else {
			return false;
		  }
	}
}
