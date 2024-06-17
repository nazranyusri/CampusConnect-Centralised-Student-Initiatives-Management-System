import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  businessId: number = 0;
  menuItems: Array<any> = [];
  totalPrice: number = 0;
  checkoutForm: any = FormGroup;

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.businessId = +params['businessId'];
      console.log(this.businessId); 
    });

    this.getMenuItems(this.businessId);

    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      items: this.formBuilder.array([])
    });
  }

  getMenuItems(businessId: number) {
    this.businessService.getMenuItems(businessId).subscribe((result: any) => {
      this.menuItems = result;
      console.log(this.menuItems);

      const itemsFormArray = this.checkoutForm.get('items') as FormArray;
      this.menuItems.forEach(item => {
        const itemFormGroup = this.formBuilder.group({
          quantity: [0, Validators.required]
        });
        itemsFormArray.push(itemFormGroup);
      });
    });
  }

  getAvailableQuantities(quantity: number){
    const availableQuantities = [];
    availableQuantities.push(0);
    for(let i = 1; i <= quantity; i++) {
      availableQuantities.push(i);
    }
    return availableQuantities;
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    const itemsFormArray = this.checkoutForm.get('items') as FormArray;
    itemsFormArray.controls.forEach((itemFormGroup, index) => {
      const quantity = itemFormGroup.get('quantity')?.value;
      const price = this.menuItems[index].price;
      totalPrice += quantity * price;
    });
    this.totalPrice = totalPrice;
  }
}
