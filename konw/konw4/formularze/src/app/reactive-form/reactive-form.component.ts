import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CartForm } from './cart-form.model'
import { CartItem } from './cart-item.model'

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  cart!: FormGroup<CartForm>

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    // city, adress, zipCode, name
    const userDeliveryAddress = {
      name: 'janek',
      city: 'krakow',
      zipCode: '',
      address: 'Kwiatowa 12'
    }
    // this.cart = new FormGroup({
    //   shipTo: new FormGroup({
    //     name: new FormControl(userDeliveryAddress.name, { nonNullable: true }),
    //     city: new FormControl(userDeliveryAddress.city, Validators.required),
    //     zipCode: new FormControl(userDeliveryAddress.zipCode),
    //     address: new FormControl(userDeliveryAddress.address),
    //   }),
    //   cartValue: new FormControl(0)
    // })
    this.cart = this.fb.group({
      shipTo: this.fb.group({
        name: this.fb.nonNullable.control(userDeliveryAddress.name),
        city: [userDeliveryAddress.city],
        zipCode: [userDeliveryAddress.zipCode, [Validators.required, Validators.minLength(5)]],
        address: [userDeliveryAddress.address],
      }),
      items: this.fb.array<FormGroup<CartItem>>([]),
      cartValue: [0]
    })


    // const name = this.cart.get('shipTo.name')
    const name = this.cart.controls.shipTo.controls.name

    // dodatki
    // name.dirty //.pristine
    // name.touched //.untouched
    // name.errors

    // reset kontrolki
    this.cart.controls.shipTo

    // wyłączenie kontrolki
    name.disable()

    // pobranie adhoc
    const cartFormValue = this.cart.value
    const cartFormValueRaw = this.cart.getRawValue()

    // strumień
    this.cart.valueChanges.subscribe(cart => {
      console.log(cart)
    })

  }

  onAddItem() {
    const itemName = 'Item ' + this.cart.controls.items.length
    const itemPrice = Math.floor(Math.random() * 100)
    const itemQuantity = 1

    const itemFG: FormGroup<CartItem> = new FormGroup({
      name: new FormControl(itemName),
      price: new FormControl(itemPrice),
      quantity: new FormControl(itemQuantity),
    })
    this.cart.controls.items.push(itemFG)
  }
}
