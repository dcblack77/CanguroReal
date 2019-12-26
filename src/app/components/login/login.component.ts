import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { LoginModel } from "src/app/models/loginModel";
import { AuthService } from "src/app/services/auth.service";
import { SignupModel } from "src/app/models/signup.model";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	user: LoginModel;
	sign: SignupModel;

	constructor(private auth: AuthService) {
		this.user = new LoginModel();
		this.sign = new SignupModel();
	}

	ngOnInit() {}

	login(form: NgForm) {
		if (form.invalid) {
			return;
		}

		Swal.fire({
			allowOutsideClick: false,
			type: "info",
			text: "Espere un momento por favor..."
		});
		Swal.showLoading();

		this.auth.login(this.user).subscribe(
			resp => {
				Swal.fire({
					allowOutsideClick: false,
					type: "success",
					text: "¡Listo!",
					timer: 1750
				});
			},
			e => {
				let err;
				switch (e.error.err.message) {
					case "User no found":
						err = "Usuario invalido";
						break;
					case "Password no found":
						err = "La contraseña es incorrecta";
						break;
					case "USER_DISABLED":
						err =
							"El usuario ha sido deshabilitado por el Administrador";
						break;
					default:
						break;
				}
				Swal.fire({
					type: "error",
					title: "Error en la autentificación",
					text: err
				});
			}
		);
	}

	
}
