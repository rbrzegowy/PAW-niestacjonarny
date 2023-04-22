import { Form, FormControl, FormGroup } from "@angular/forms"

export type InvoiceIssuerForm = FormGroup<{
  name: FormControl<string>,
  address: FormControl<string>,
  city: FormControl<string>,
  zipCode: FormControl<string>,
  vatNumber: FormControl<string>,
  accountNumber: FormControl<string>
}>