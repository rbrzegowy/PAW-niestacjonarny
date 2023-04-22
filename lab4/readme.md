# Lab4 - Reactive forms

Utwórz formularz faktury. Formularz powinien zawierać:
1. Dane wystawcy (nazwa, miasto, adres, kod pocztowy, nip, nr konta bankowego)
1. Dane zamawiającego (nazwa, miasto, adres, kod pocztowy, nip - nieobowiązkowy)
1. Nr faktury
1. Datę wystawienia
1. Datę sprzedaży
1. Termin płatności
1. Sposób płatności (gotówka, przelew, karta)
1. Pozycje faktury. Pozycje to tablica. Każda pozycja składa się z nazwy, ilości, jednostki miary, ceny netto, stawki vat (zw, 0%, 5%, 8%, 23%), wartości netto i brutto
1. Obok/poniżej formularza wyświetlaj podsumowanie zamówienia (suma kwot netto/vat/brutto). Podsumowanie powinno zmieniać się dynamicznie wraz z danymi formularza.


Wykorzystaj moduł ReactiveFormsModule, dyrektywy formGroup, formControlName, formGroupName.  
Do utworzenia formularza wykorzytaj klasy FormGroup, FormControl, FormArray, FormRecord i/lub serwis FormBuilder  
Do walidacji skorzystaj z klasy Validators.