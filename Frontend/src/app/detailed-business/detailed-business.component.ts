import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-detailed-business',
  templateUrl: './detailed-business.component.html',
  styleUrls: ['./detailed-business.component.scss']
})
export class DetailedBusinessComponent {
  id: number = 0;
  business: any;
  token: any;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    //Accessing the id parameter from route parameters
    this.route.params.subscribe(params => {
      this.id = +params['businessId'];
      this.ngxService.start();
      console.log(this.id);
      this.getBusinessById(this.id);
    });
  }

  getBusinessById(id: number) {
    this.businessService.getBusinessById(id).subscribe((result: any) => {
        this.ngxService.stop();
        this.business = result;
        this.business.image = `${environment.apiUrl}/${this.business.image}`;
        // console.log(this.business.image);
        // console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}