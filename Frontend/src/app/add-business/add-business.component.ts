import { Component } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss']
})
export class AddBusinessComponent {
  businessForm: any = FormGroup;
  responseMessage: any;
  image: any;
  imagePath: string = '';

  constructor(private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router,
    private jwtDecode: JwtDecoderService) { }

  ngOnInit() {
    this.businessForm = this.formBuilder.group({
      businessTitle: ['', Validators.required],
      telName: ['', Validators.required],
      telNo: ['', [Validators.required, Validators.pattern(GlobalConstants.phoneRegex)]],
      location: ['', Validators.required],
      othersLocation: ['', Validators.required],
      businessLink: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

     // Dynamically set validation for othersLocation field based on location field value
     this.businessForm.get('location').valueChanges.subscribe((value: string) => {
      const othersLocationControl = this.businessForm.get('othersLocation');
      if (value === 'Others') {
        othersLocationControl.setValidators(Validators.required);
      } else {
        othersLocationControl.clearValidators();
      }
      othersLocationControl.setValue(''); // Clear othersLocation value
      othersLocationControl.updateValueAndValidity();
    });
  }

  onImageSelected(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.image = file;
        this.imagePath = `${environment.apiUrl}/${this.image}`;

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.imagePath = event.target.result;
      }
    }
  }

  addBusiness() {
    this.ngxService.start();
    const token = localStorage.getItem('token');
    const decodedToken = token ? this.jwtDecode.decodeToken(token) : null;
    const userId = decodedToken?.userId;

    if (userId) {
      const formData = new FormData();
      formData.append('userId', userId?.toString());
      formData.append('businessTitle', this.businessForm.get('businessTitle').value);
      formData.append('location', this.businessForm.get('location').value);
      formData.append('othersLocation', this.businessForm.get('othersLocation').value);
      formData.append('businessLink', this.businessForm.get('businessLink').value);
      formData.append('telName', this.businessForm.get('telName').value);
      formData.append('telNo', this.businessForm.get('telNo').value);
      formData.append('image', this.image);
      formData.append('description', this.businessForm.get('description').value);
      formData.append('datePublished', new Date().toISOString());

      formData.forEach((value, key) => {
        // console.log(`${key}:`, value);
      });

      this.businessService.addBusiness(formData).subscribe(() => {
        this.ngxService.stop();
        this.router.navigate(['/business']);
      }, (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      });
    }
  }
}