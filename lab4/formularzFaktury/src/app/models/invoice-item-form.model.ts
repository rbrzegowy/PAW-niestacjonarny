import { Form, FormControl, FormGroup } from "@angular/forms"
import { VatRates } from "./vat-rates.enum"

export type InvoiceItemForm = FormGroup<{
  name: FormControl<string>,
  unit: FormControl<string>,
  quantity: FormControl<number>,
  netPrice: FormControl<number>,
  netValue: FormControl<number>,
  vatRate: FormControl<number>,
  grossValue: FormControl<number>,
}>