import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
	//{ path: "", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignUpComponent },
	{ path: "admin", component: AdminComponent, canActivate: [ AuthGuard ]  },
	{ path: '**', pathMatch: 'full', redirectTo: 'signup'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	//imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
