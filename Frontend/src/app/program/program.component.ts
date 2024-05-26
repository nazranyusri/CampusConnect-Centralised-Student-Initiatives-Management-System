import { Component } from '@angular/core';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  programs: Array<any> = [];
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

  constructor(private programService: ProgramService){}

  ngOnInit(){
    this.getAllProgram();
  }

  getAllProgram(){
    this.programService.getAllProgram().subscribe((result: any) => {
        this.programs = result;
        console.log(result);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
