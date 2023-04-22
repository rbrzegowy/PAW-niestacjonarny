import { Component, OnInit } from '@angular/core'
import { InvoiceForm } from '../models/invoice-form.model'
import { FormBuilder, Validators } from '@angular/forms'
import { InvoiceIssuerForm } from '../models/invoice-issuer-form.model'
import { InvoiceRecipientForm } from '../models/invoice-recipient-form.model'
import { InvoiceItemForm } from '../models/invoice-item-form.model'
import { PaymentMethods } from '../models/payment-methods.model'
import { VatRates } from '../models/vat-rates.enum'

const DEFAULT_VAT = VatRates['23%']

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {

  protected invoiceForm!: InvoiceForm
  protected paymentMethods = PaymentMethods
  protected vatRates = VatRates

  protected invoiceValues: { net: number, vat: number, gross: number } | undefined

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.createInvoiceForm()
    this.watchInvoiceValues()
  }
  private createInvoiceForm() {
    const issuerForm = this.createIssuerForm()
    const recipientForm = this.createRecipientForm()

    this.invoiceForm = this.fb.nonNullable.group({
      issuer: issuerForm,
      recipient: recipientForm,
      number: [''],
      createdDate: [''],
      saleDate: [''],
      paymentDate: [''],
      paymentMethod: this.fb.nonNullable.control<PaymentMethods>(PaymentMethods.gotowka),
      items: this.fb.nonNullable.array<InvoiceItemForm>([])
    })

  }

  private watchInvoiceValues() {
    this.invoiceForm.valueChanges.subscribe(() => {
      const invoiceItems = this.invoiceForm.getRawValue().items
      this.invoiceValues = invoiceItems.reduce((values, item) => {
        values.net += item.netValue
        values.gross += item.grossValue
        values.vat += item.grossValue - item.netValue
        return values
      }, { net: 0, vat: 0, gross: 0 })
    })
  }

  private createIssuerForm(): InvoiceIssuerForm {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      vatNumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
    })
  }

  private createRecipientForm(): InvoiceRecipientForm {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      vatNumber: this.fb.control(''),
    })
  }

  protected onNewItem() {
    const newItem: InvoiceItemForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      unit: [''],
      quantity: [1, Validators.required],
      netPrice: [0, Validators.required],
      vatRate: this.fb.nonNullable.control<number>(DEFAULT_VAT, Validators.required),
      netValue: [0],
      grossValue: [0],
    })
    this.invoiceForm.controls.items.push(newItem)
  }
  protected onRemoveItem(index: number) {
    this.invoiceForm.controls.items.removeAt(index)
  }
  protected onQuantityChange(item: InvoiceItemForm) {
    this.calculateItemValues(item)
  }
  protected onNetPriceChange(item: InvoiceItemForm) {
    this.calculateItemValues(item)
  }
  protected onNetValueChange(item: InvoiceItemForm) {
    this.calculateGrossValueFromNetValue(item)
    this.calculateNetPriceFromNetValue(item)
  }
  protected onGrossValueChange(item: InvoiceItemForm) {
    this.calculateNetValueFromGrossValue(item)
    this.calculateNetPriceFromNetValue(item)
  }
  protected onVatRateChange(item: InvoiceItemForm) {
    this.calculateItemValues(item)
  }
  private calculateItemValues(item: InvoiceItemForm) {
    const vatRate = item.controls.vatRate.value
    const netPrice = item.controls.netPrice.value
    const quantity = item.controls.quantity.value
    const netValue = quantity * netPrice
    const grossValue = netValue * (1 + vatRate)

    item.controls.netValue.setValue(netValue)
    item.controls.grossValue.setValue(grossValue)
  }
  private calculateNetPriceFromNetValue(item: InvoiceItemForm) {
    const quantity = item.controls.quantity.value
    const netValue = item.controls.netValue.value
    const netPrice = netValue / quantity
    item.controls.netPrice.setValue(netPrice)
  }
  private calculateNetValueFromGrossValue(item: InvoiceItemForm) {
    const vatRate = item.controls.vatRate.value
    const grossValue = item.controls.grossValue.value
    const netValue = grossValue / (1 + vatRate)
    item.controls.netValue.setValue(netValue)
  }
  private calculateGrossValueFromNetValue(item: InvoiceItemForm) {
    const vatRate = item.controls.vatRate.value
    const netValue = item.controls.netValue.value
    const grossValue = netValue * (1 + vatRate)
    item.controls.grossValue.setValue(grossValue)
  }
}
