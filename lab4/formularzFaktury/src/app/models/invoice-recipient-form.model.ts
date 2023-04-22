import { Form, FormControl, FormGroup } from "@angular/forms"

export type InvoiceRecipientForm = FormGroup<{
  name: FormControl<string>,
  address: FormControl<string>,
  city: FormControl<string>,
  zipCode: FormControl<string>,
  vatNumber: FormControl<string | null>,
}>