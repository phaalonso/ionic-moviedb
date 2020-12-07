import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private baseURI = '';

  constructor(private http: HttpClient) { }
}
