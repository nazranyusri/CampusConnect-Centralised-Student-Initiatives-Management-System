import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private router:Router, private snackbarService: SnackbarService) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('Guard activated');
    console.log(token);
    if (!token) {
      this.router.navigate(['/login']);
      this.snackbarService.openSnackBar('Please login to access this page');
      return false;
    }
    else {
      return true;
    }
  }
}
