import { Component } from '@angular/core';
import { ProgramService } from '../services/program.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  programs: Array<any> = [];
  // isLoggedIn: boolean = false;
  
  // program: any = {
  //   createdBy: '',
  //   description: '',
  //   endDate: new Date(),
  //   endTime: '',
  //   location: '',
  //   programTitle: '',
  //   registrationLink: '',
  //   startDate: new Date(),
  //   startTime: '',
  //   tag: '',
  //   telNo: '',
  //   telName: '',
  //   image: '',
  //   datePublished: new Date()
  // };

  constructor(
    private programService: ProgramService,
    private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(){
    this.ngxService.start();
    // this.checkToken();
    this.getAllProgram();
  }

  getAllProgram(){
    this.programService.getAllProgram().subscribe((result: any) => {
        this.ngxService.stop();
        this.programs = result;
        console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }

  // checkToken(){
  //   this.isLoggedIn = !!localStorage.getItem('token');
  // }
}
