import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(private dialog: MatDialog, private router: Router) { }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'log out'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    const response = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) => {
      dialogRef.close();
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }
}
