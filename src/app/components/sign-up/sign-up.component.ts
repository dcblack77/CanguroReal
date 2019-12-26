import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { AuthService } from 'src/app/services/auth.service';
import { SignupModel } from 'src/app/models/signup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  sign: SignupModel;

  constructor(private auth: AuthService) {
      this.sign = new SignupModel();
  }

  ngOnInit() {
    console.log('object in signup');
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      console.log('form invalid');
			return;
		}

		Swal.fire({
			allowOutsideClick: false,
			type: "info",
			text: "Espere un momento por favor..."
		});
		Swal.showLoading();

		Number(this.sign.phone);

		this.auth.signUp(this.sign).subscribe(
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
				/* switch (e.error.err.message) {
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
				} */
				Swal.fire({
					type: "error",
					title: "Error en el registro",
					text: e
				});
				console.log(err)
			}
		);

		this.sign = new SignupModel();
  }

  login(form: NgForm) {
		
	}

}
