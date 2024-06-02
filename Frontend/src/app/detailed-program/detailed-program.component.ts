import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../services/program.service';
import { ActivatedRoute, Data } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailed-program',
  templateUrl: './detailed-program.component.html',
  styleUrls: ['./detailed-program.component.scss']
})

export class DetailedProgramComponent implements OnInit {
  program: any;
  id: number = 0;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    //Accessing the id parameter from route parameters
    this.route.params.subscribe(params => {
      this.id = +params['id']; // '+' is used to convert string to number
      this.ngxService.start();
      this.getProgramById(this.id);
    });
  }

  getProgramById(id: number) {
    this.programService.getProgramById(id).subscribe((result: any) => {
        this.ngxService.stop();
        this.program = result;
        this.program.image = `${environment.apiUrl}/${this.program.image}`;
        console.log(this.program.image);
        console.log(result);
      },
      (error: any) => {
        this.ngxService.stop();
        console.error(error);
      }
    );
  }
}
