import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-detailed-program',
  templateUrl: './detailed-program.component.html',
  styleUrls: ['./detailed-program.component.scss']
})

export class DetailedProgramComponent implements OnInit {
  isAuthorized: boolean = false;
  id: number = 0;
  program: any;
  token: any;
  userId: number = 0;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private jwtDecode: JwtDecoderService,
    private router: Router
  ) { }

  ngOnInit() {
    //Accessing the id parameter from route parameters
    this.route.params.subscribe(params => {
      this.id = +params['id']; // '+' is used to convert string to number
      this.ngxService.start();
      this.getProgramById(this.id);
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtDecode.decodeToken(token);
        const userId = decodedToken?.userId || 0;
        const username = decodedToken?.username || '';
        const role = decodedToken?.role || '';
        if (role === 'club') {
          this.isAuthorized = true;
        } else if (role === 'admin') {
          this.isAuthorized = true;
        }
      }
    });
    
    // Get user id
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.jwtDecode.decodeToken(this.token);
      this.userId = decodedToken?.userId || 0;
    }
  }

  getProgramById(id: number) {
    this.programService.getProgramById(id).subscribe((result: any) => {
        this.ngxService.stop();
        this.program = result;
        this.program.image = `${environment.apiUrl}/${this.program.image}`;
        // console.log(this.program.image);
        // console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  registerProgram(programId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'register'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    const response = dialogRef.componentInstance.onEmitStatusChange.subscribe((response: any) => {
      dialogRef.close();
      var data = {
        programId: programId,
        userId: this.userId
      }
      this.programService.registerProgram(data).subscribe((result: any) => {
        this.snackbarService.openSnackBar(result.message);
          return result;
      },
      (error: any) => {
        console.error(error);
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      response.unsubscribe();
    });
  }
}