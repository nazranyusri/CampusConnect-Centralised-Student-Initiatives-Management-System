import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  surveys: Array<any> = [];
  searchKey: string = '';
  
  constructor(
    private surveyService: SurveyService,
    private ngxService: NgxUiLoaderService,
    private jwtDecode: JwtDecoderService
  ){}

  ngOnInit(){
    this.ngxService.start();
    this.getAllSurvey();
    const token = localStorage.getItem('token');
  }

  getAllSurvey(){
    this.surveyService.getAllSurvey().subscribe((result: any) => {
        this.ngxService.stop();
        this.surveys = result;
        return result;
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}
