import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from '../services/business.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { GlobalConstants } from '../shared/global-constants';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-update-business',
  templateUrl: './update-business.component.html',
  styleUrls: ['./update-business.component.scss']
})
export class UpdateBusinessComponent {
  userIdOfBusiness: number = 0;
  businessForm: any = FormGroup;
  responseMessage: any;
  businessId: number = 0;
  image: any;
  imagePath: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtDecode: JwtDecoderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.businessId = +params['businessId'];
      this.ngxService.start();
      this.getBusinessById(this.businessId);
    });

    this.businessForm = this.formBuilder.group({
      businessTitle: ['', Validators.required],
      telName: ['', Validators.required],
      telNo: ['', [Validators.required, Validators.pattern(GlobalConstants.phoneRegex)]],
      location: ['', Validators.required],
      othersLocation: ['', Validators.required],
      businessLink: ['', Validators.required],
      image: [''],
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

  getBusinessById(businessId: number): void {
    this.ngxService.start();
    this.businessService.getBusinessById(businessId).subscribe((business: any) => {
        this.businessForm.patchValue({
          businessTitle: business.businessTitle,
          telName: business.telName,
          telNo: business.telNo,
          location: business.location,
          othersLocation: business.othersLocation,
          businessLink: business.businessLink,
          description: business.description
        });
        this.image = business.image;
        this.imagePath = `${environment.apiUrl}/${this.image}`;
        // console.log("Image Path:", this.imagePath);

        this.userIdOfBusiness = business.userId;
        const token = localStorage.getItem('token');
        const decodedToken = token ? this.jwtDecode.decodeToken(token) : null;
        const userIdLoggedIn = decodedToken?.userId;
        if (this.userIdOfBusiness && this.userIdOfBusiness !== userIdLoggedIn) {
          // console.log("Created by in if:", this.userId);
          this.router.navigate(['/forbidden']);
        }
        this.ngxService.stop();
      },
      error => {
        console.error('Error loading business details:', error);
        this.ngxService.stop();
      }
    );
  }

  updateBusiness() {
    this.ngxService.start();
    const businessId = this.businessId.toString();
    if (this.userIdOfBusiness) {
      const formData = new FormData();
      formData.append('id', businessId);
      formData.append('userId', this.userIdOfBusiness.toString());
      formData.append('businessTitle', this.businessForm.get('businessTitle').value);
      formData.append('location', this.businessForm.get('location').value);
      formData.append('othersLocation', this.businessForm.get('othersLocation').value);
      formData.append('businessLink', this.businessForm.get('businessLink').value);
      formData.append('telName', this.businessForm.get('telName').value);
      formData.append('telNo', this.businessForm.get('telNo').value);
      formData.append('image', this.image);
      formData.append('description', this.businessForm.get('description').value);
      formData.append('datePublished', new Date().toISOString());

      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      this.businessService.updateBusiness(formData).subscribe(() => {
        this.ngxService.stop();
        this.router.navigate(['/profile']);
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
