import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../services/program.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit{
  programForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private programService: ProgramService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router,
    private jwtDecode: JwtDecoderService) { }

    ngOnInit() {
      this.programForm = this.formBuilder.group({
        programTitle: ['', Validators.required],
        location: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        telName: ['', Validators.required],
        telNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        image: ['', Validators.required],
        registrationLink: ['', Validators.required],
        description: ['', Validators.required],
        tag: ['', Validators.required]
      });
    }

    addProgram() {
      this.ngxService.start();
      const token = localStorage.getItem('token');
      const decodedToken = token ? this.jwtDecode.decodeToken(token) : null;
      const username = decodedToken?.username;
      var formData = this.programForm.value;
      var data = {
        createdBy: username,
        programTitle: formData.programTitle,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        telName: formData.telName,
        telNo: formData.telNo,
        image: formData.image,
        registrationLink: formData.registrationLink,
        description: formData.description,
        tag: formData.tag,
        datePublished: new Date().toISOString()
      }
      console.log(data.createdBy);
  
      this.programService.addProgram(data).subscribe(() => {
        this.ngxService.stop();
        this.router.navigate(['/program']);
      }, (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      })
    }
}
