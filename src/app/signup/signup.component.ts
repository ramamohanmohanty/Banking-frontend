import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { AccountService } from '../services/services.component';

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    imports: [RouterLink, FormsModule, ToastComponent]
})
export class SignupComponent {
toastVisible = false
toastHeading = "";
toastDescription = "";
  accountService = inject(AccountService);
onSubmit(form: NgForm) {
  if (form.valid) {
    this.accountService.createAccount(form.value)
      .subscribe({
        next: res => {
          this.generateToast("Sucess", "Account created successfully");
         
          form.reset(); // clear the form after successful submission
        },
        error: err => {
          console.log(err);
          
          const error = err.error;
          this.generateToast(error['error'], error['message'])
        }
      });
  }
}

generateToast(heading: string, description: string) {
  this.toastHeading = heading;
  this.toastDescription = description;
  this.toastVisible = true;

  setTimeout(() => {
    this.toastVisible = false;
  }, 3000);
}
}

