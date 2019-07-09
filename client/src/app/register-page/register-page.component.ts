import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup;

  subscription: Subscription;

  constructor(private authService: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params['register']) {
    //     //Now you can login
    //   } else if (params['accessDenied']) {
    //     //Для начала авторизуйтесь в системе
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.subscription = this.authService.register(this.form.value).subscribe(() => {
      this.route.navigate(["/login"], {
        queryParams: {
          registered: true
        }
      });
    }, error1 => {
      MaterialService.toast(error1.error.message);
      this.form.enable();
    })
  }


}
