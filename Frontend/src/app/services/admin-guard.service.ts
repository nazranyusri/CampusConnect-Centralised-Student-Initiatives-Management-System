import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { JwtDecoderService } from './jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private jwtDecode: JwtDecoderService
  ) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecode.decodeToken(token);
      if (decodedToken) {
        if (decodedToken.role !== 'admin') {
          this.router.navigate(['/']);
          this.snackbarService.openSnackBar('You are not authorized to access this page');
          return false;
        }
      }
    }
    return true;
  }
}
