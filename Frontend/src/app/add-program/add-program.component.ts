import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit{
  programForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router) { }

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
        image: [null]
      });
    }
}
