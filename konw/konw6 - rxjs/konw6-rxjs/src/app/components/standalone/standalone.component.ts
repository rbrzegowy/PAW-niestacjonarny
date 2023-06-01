import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BlurDirective } from 'src/app/directives/blur.directive';
import { MaterialModule } from 'src/app/material/material.module';
import { SwApiPerson } from 'src/app/models/sw-api-person.model';
import { SwApiService } from 'src/app/services/sw-api/sw-api.service';

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss'],
  // tu definiujemy standalone
  standalone: true,
  // jak w module:
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [],
  // nowość w Ang 15
  // można przypinać jednocześnie kilka dyrektyw do hosta
  hostDirectives: [
    {
      // tylko statycznie, nie można dodawać dynamicznie host directives
      directive: BlurDirective,
      // inputy i outputy eksponowane jako input/output komponentu
      // <app-standalone [amount]="20" (uncover)=""></app-standalone>
      inputs: ['amount'],
      outputs: ['uncover']
      // outputs: ['uncover: externalUncoverAlias']
    }]
})
export class StandaloneComponent implements OnInit {

  protected data$!: Observable<Object>
  protected id!: number

  constructor(private readonly swApi: SwApiService) {
  }

  ngOnInit(): void {
  }
  protected getData(type: 'planeta' | 'osoba' | 'statek') {
    this.id = Math.ceil(Math.random() * 10)
    switch (type) {
      case 'planeta':
        this.data$ = this.swApi.getPlanet(this.id)
        break
      case 'osoba':
        this.data$ = this.swApi.getPerson(this.id)
        break
      case 'statek':
        this.data$ = this.swApi.getStarship(this.id)
        break
    }
  }

}
