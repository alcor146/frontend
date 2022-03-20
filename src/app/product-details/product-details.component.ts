import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  

  productId: string = "";

  constructor(private route: ActivatedRoute){}
  
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null)
      this.productId = this.route.snapshot.paramMap.get('id') || ""
    console.log(this.productId)
  }

}
