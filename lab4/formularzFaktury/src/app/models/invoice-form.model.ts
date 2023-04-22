import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { InvoiceIssuerForm } from "./invoice-issuer-form.model"
import { InvoiceRecipientForm } from "./invoice-recipient-form.model"
import { PaymentMethods } from "./payment-methods.model"
import { InvoiceItemForm } from "./invoice-item-form.model"

export type InvoiceForm = FormGroup<{
  issuer: InvoiceIssuerForm,
  recipient: InvoiceRecipientForm,
  number: FormControl<string>,
  createdDate: FormControl<string>,
  saleDate: FormControl<string>,
  paymentDate: FormControl<string>,
  paymentMethod: FormControl<PaymentMethods>,
  items: FormArray<InvoiceItemForm>,
}>