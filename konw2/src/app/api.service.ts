import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}
  get(url: string) {
    return 'data from api'
  }
}

