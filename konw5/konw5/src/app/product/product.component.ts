import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  protected id!: string

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params)
    // this.id = this.route.snapshot.params['id']
    this.route.params.subscribe(data => {
      this.id = data['id']
    })
    // get params
    // this.route.queryParams
    // fragment
    // this.route.fragment
    // data z route
    console.log(this.route.snapshot.data)
  }
  protected onBack() {
    this.router.navigate(['/products', 'list'])
  }
}
