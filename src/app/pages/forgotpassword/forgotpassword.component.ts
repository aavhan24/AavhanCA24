import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  isVisible: boolean = true;
  newPassword:string='';
  generatedotp:string ='';
  email: string = '';
  enteredOTP:string='';
  constructor(private http: HttpClient,private router: Router) {}

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const input = document.getElementById('password') as HTMLInputElement;
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
    }
  }

  sendotp() {
    console.log(this.email);
    
   // Send a request to your backend API to trigger the email sending process
    this.http.post('http://localhost:9992/sendotp', {email: this.email}).subscribe(
      (response: any) => {
        console.log(this.email);
        
        console.log('Email sent successfully', response);
        alert("OTP Sent");
        const { otp } = response;
        this.generatedotp = otp;
        // Handle success, e.g., show a success message in your frontend
      },
      (error) => {
        console.log(this.email)
        console.error('Email sending failed', error);
        alert("Some error occured")
        // Handle error, e.g., show an error message in your frontend
      }
    );
  }

  verifyOTP() {
    console.log(this.enteredOTP);
    console.log(this.generatedotp);
     
    if (this.enteredOTP === this.generatedotp){
      console.log("OTP verified successfully")
      alert("OTP verified successfully")
      this.togglechangepasswoord();

    }
    else{
      alert("wrong OTP");

    }

}
togglechangepasswoord(){
  this.isVisible = !this.isVisible;

}

changepassword(){
  console.log(this.newPassword);
  if(this.newPassword.trim()!==''){
  this.http.post('http://pukar.aavhan.org/changepassword', {email: this.email, newPassword:this.newPassword}).subscribe(
    (response: any)=>{
      console.log('Password changed successfully',response);
      alert("Password changed successfully")
      this.router.navigate(['/profile']);

      
    },
    (error)=>{
      console.log('Error changing password',error);
      alert("Error changing password");
    }
  
  );
}
else{
  console.log('New Password is empty');
}
}
}