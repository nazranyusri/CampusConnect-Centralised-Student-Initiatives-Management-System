import { Component } from '@angular/core';
import { ProgramService } from '../services/program.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  programs: Array<any> = [];
  
  constructor(
    private programService: ProgramService,
    private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(){
    this.ngxService.start();
    this.getAllProgram();
  }

  getAllProgram(){
    this.programService.getAllProgram().subscribe((result: any) => {
        this.ngxService.stop();
        this.programs = result.map((program: any) => {
          program.image = `${environment.apiUrl}/${program.image}`;
          return program;
        });
        console.log(this.programs);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}
