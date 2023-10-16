import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  isLoggedIn:boolean = false;

  constructor(
    // private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService,
    public authService: AuthService
  ){
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  register(){
    this.isLoggedIn=true;
  }
  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);


  }


  registrationData:any;
  UserDataService: any;
  ngOninit(){
    console.log(localStorage.getItem("token"))
    this.isLoggedIn = localStorage.getItem("isLoggedIn") ==='true';
    console.log(this.isLoggedIn)
    this.registrationData = this.UserDataService.registrationData;
  }
  isMenuOpen: boolean = false; // Flag to track if the menu is open

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu flag
  }

  closeMenu() {
    this.isMenuOpen = false; // Close the menu
  }
}
