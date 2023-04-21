import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { CartItem } from "./cart-item.model"

export type CartForm = {
  shipTo: FormGroup<{
    name: FormControl<string>,
    city: FormControl<string | null>,
    zipCode: FormControl<string | null>,
    address: FormControl<string | null>
  }>,
  items: FormArray<FormGroup<CartItem>>,
  cartValue: FormControl<number | null>,
}