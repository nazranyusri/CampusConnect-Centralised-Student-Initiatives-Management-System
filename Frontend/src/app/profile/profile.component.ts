import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from '../services/program.service';
import { BusinessService } from '../services/business.service';
import { SurveyService } from '../services/survey.service';
import { environment } from 'src/environments/environment';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userDetails: any = '';
  programs: Array<any> = [];
  businesses: Array<any> = [];
  surveys: Array<any> = [];
  username: string = '';

  constructor(
    private userService: UserService,
    private programService: ProgramService,
    private businessService: BusinessService,
    private surveyService: SurveyService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private jwtDecode: JwtDecoderService
  ) { }

  ngOnInit() {
    this.ngxService.start();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecode.decodeToken(token);
      const username = decodedToken?.username || '';
      const id = decodedToken?.id || 0;
      this.getUserDetails(id);
      this.getProgramHistory(username);
      this.getBusinessHistory(username);
      this.getSurveyHistory(username);
    }

    // this.route.params.subscribe(params => {
    //   this.username = params['username'];
    //   this.ngxService.start();
    //   this.getUserDetails();
    //   this.getProgramHistory(this.username);
    //   this.getBusinessHistory(this.username);
    //   this.getSurveyHistory(this.username);
    // });
  }

  getUserDetails(id: number) {
    this.userService.getUser(id).subscribe((result: any) => {
      this.ngxService.stop();
      this.userDetails = result;
      console.log("User details this.user:", this.userDetails);
      return result;
    },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  getProgramHistory(username: string) {
    this.programService.getProgramHistory(username).subscribe((result: any) => {
      this.ngxService.stop();
      this.programs = result.map((program: any) => {
        program.image = `${environment.apiUrl}/${program.image}`;
        return program;
      });
      console.log("Programs:", this.programs);
    },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  getBusinessHistory(username: string) {
    this.businessService.getBusinessHistory(username).subscribe((result: any) => {
      this.ngxService.stop();
      this.businesses = result;
      console.log("Businesses:", this.businesses);
      return result;
      // this.businesses = result.map((business: any) => {
      //   business.image = `${environment.apiUrl}/${business.image}`;
      //   console.log(this.businesses);
      //   return business;
      // });
    },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  getSurveyHistory(username: string) {
    this.surveyService.getSurveyHistory(username).subscribe((result: any) => {
      this.ngxService.stop();
      this.surveys = result;
      console.log("Surveys:", this.surveys);
      return result;
    },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}
