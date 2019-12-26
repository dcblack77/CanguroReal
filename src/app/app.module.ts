import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { SigninComponent } from './components/signin/signin.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
	declarations: [AppComponent, LoginComponent, SigninComponent, NavbarComponent, HomeComponent, AdminComponent, SignUpComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
