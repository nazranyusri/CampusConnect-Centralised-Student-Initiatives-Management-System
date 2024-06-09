import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../services/program.service';
import { BusinessService } from '../services/business.service';
import { SurveyService } from '../services/survey.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  programCount: any;
  businessCount: any;
  surveyCount: any;

  constructor(
    private programService: ProgramService,
    private businessService: BusinessService,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.getTotalProgram();
    this.getTotalBusiness();
    this.getTotalSurvey();
  }

  getTotalProgram() {
    this.programService.getTotalProgram().subscribe((result: any) => {
        this.programCount = result.totalProgram;
        console.log('Program count:', this.programCount);
      },
      (error) => {
        console.error('Error fetching total programs:', error);
      }
    );
  }

  getTotalBusiness() {
    this.businessService.getTotalBusiness().subscribe((result: any) => {
      this.businessCount = result.totalBusiness;
      console.log('Business count:', this.businessCount);
    },
      (error) => {
        console.error('Error fetching total businesses:', error);
      }
    );
  }

  getTotalSurvey() {
    this.surveyService.getTotalSurvey().subscribe((result: any) => {
      this.surveyCount = result.totalSurvey;
      console.log('Survey count:', this.surveyCount);
    },
      (error) => {
        console.error('Error fetching total surveys:', error);
      }
    );
  }
}
