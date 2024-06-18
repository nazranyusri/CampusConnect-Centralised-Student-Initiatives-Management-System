import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { BusinessService } from '../services/business.service';
import { loadStripe } from '@stripe/stripe-js';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-detailed-business',
  templateUrl: './detailed-business.component.html',
  styleUrls: ['./detailed-business.component.scss']
})
export class DetailedBusinessComponent {
  isLoggedIn: boolean = false;
  userId: number = 0;
  id: number = 0;
  business: any;
  menuItems: any;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private jwtDecode: JwtDecoderService
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
      this.isLoggedIn = true;
      const decodedToken = this.jwtDecode.decodeToken(token);
      this.userId = decodedToken?.userId || 0;
    }
  }

  getBusinessById(id: number) {
    this.businessService.getBusinessById(id).subscribe((result: any) => {
      this.ngxService.stop();
      this.business = result;
      this.business.image = `${environment.apiUrl}/${this.business.image}`;
    },
    (error: any) => {
      this.ngxService.stop();
      console.error(error);
    });
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
    });
  }
}