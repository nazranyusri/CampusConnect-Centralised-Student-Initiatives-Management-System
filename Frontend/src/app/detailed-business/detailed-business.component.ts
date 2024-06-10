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
  userId: number = 0;
  id: number = 0;
  business: any;
  menuItems: any;
  token: any;
  buttonHref: string = '';

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private jwtDecode: JwtDecoderService,
  ) { }

  ngOnInit() {
    //Accessing the id parameter from route parameters
    this.route.params.subscribe(params => {
      this.id = +params['businessId'];
      this.ngxService.start();
      // console.log(this.id);
      this.getBusinessById(this.id);
      this.getMenuItems(this.id);
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecode.decodeToken(token);
      this.userId = decodedToken?.userId || 0;
    }
  }

  conditionalButton() {
    // console.log(this.business.businessLink);
    if (this.business && this.business.businessLink == 'null') {
      this.buttonHref = "https://wa.me/6" + this.business.telNo; // Ensure to include 'https://' in the URL
    } else {
      this.buttonHref = this.business.businessLink;
    }
    // console.log("ButtonHref: ", this.buttonHref);
  }  

  getBusinessById(id: number) {
    this.businessService.getBusinessById(id).subscribe((result: any) => {
        this.ngxService.stop();
        this.business = result;
        this.business.image = `${environment.apiUrl}/${this.business.image}`;
        this.conditionalButton();
        // console.log(this.business);
        // console.log(this.business.image);
        // console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  getMenuItems(id: number) {
    this.businessService.getMenuItems(id).subscribe((result: any) => {
        this.ngxService.stop();
        this.menuItems = result;
        // console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}