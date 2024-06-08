import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  businesses: Array<any> = [];
  searchKey: string = '';
  isFilter: boolean = false;
  filterCategory: string = '';
  
  constructor(
    private businessService: BusinessService,
    private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(){
    this.ngxService.start();
    this.getAllBusiness();
  }

  toggleFilterContainer(){
    this.isFilter = !this.isFilter;
  }

  toggleButton(buttonName: string) {
    if (this.filterCategory === buttonName) {
      this.filterCategory = ''; 
    } else {
      this.filterCategory = buttonName;
    }
  }

  getAllBusiness(){
    this.businessService.getAllBusiness().subscribe((result: any) => {
        this.ngxService.stop();
        this.businesses = result.map((business: any) => {
          business.image = `${environment.apiUrl}/${business.image}`;
          return business;
        });
        // console.log(this.businesses);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}
