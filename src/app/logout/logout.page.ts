import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {


  		localStorage.removeItem('api_token');
 	 	localStorage.removeItem('tid');

 	 	this.router.navigate(['/home']);



  }

}
