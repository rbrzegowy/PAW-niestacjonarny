import { FormControl } from "@angular/forms"

export type CartItem = {
  name: FormControl<string | null>,
  quantity: FormControl<number | null>,
  price: FormControl<number | null>,
}