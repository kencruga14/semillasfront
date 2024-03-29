import { environment } from './../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
const API_URL_FORM = environment.baseUrl;
const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  /**
   *  "enctype": "multipart/form-data",
    "Content-Type":"application/json",
    "X-Requested-With": "XMLHttpRequest",
   */
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) { }

add(objeto, url: String): Observable<any> {
  return this.http.post(API_URL_FORM + url, objeto).map((res) => res);
}
/*
addImage(image:FormData){
  
  return this.httpi.formdata(API_URL_FORM, image)

}*/

updateData(objeto, add: String) {
  console.log(objeto, "URL " + add);
  return this.http.put(API_URL_FORM + add, objeto, http).pipe(
    map(
      (res: any) => {
        return res;
      },
      error => {
        console.log('error: ', error);
      }
    ));
}

delete(url: String): Observable<any> {
  return this.http.delete(API_URL_FORM + url).map((res) => res);
}

get(url: string): Observable<any> {
  return this.http.get(API_URL_FORM + url).map((res) => res);
}
saveFile(file: File,objeto, url: String): Observable<any> {
  let formData = new FormData();
  let json = JSON.stringify(objeto);
  console.log("json: ", json)
  let objetoJson = new Blob([json], {
    type: 'application/json'
  });
  console.log("obejtojspn: ",objetoJson )
  formData.append('image', file);
  formData.append('data', json);
  // formData.append('data', json);
  return this.http.post("https://backendfundation.herokuapp.com/child", formData).map((res) => res);
}
/** 
  public selectedField: Person = {
    name: '',
    id: null,
    image: '', 
    surname: '', 
    dateBirth: '',
    ci: '',
    motherName:'',
    fatherName: '',
    study: '',
    houseAddress: '',
    schoolName: '',
    age: null 
    
  };

  constructor(private http: HttpService) { }

  public async eliminarPerson(idPerson) {
    return await this.http.delete("/child?id=".concat(idPerson));
  }

  public async agregarPerson(person: Person) {
    return await this.http.post("/child", person);
  }

  public async obtenerPerson() {
    return await this.http.get("/child");
  }

  public async obtenerPorId(idPerson){
    return await this.http.get("/child/?id=".concat(idPerson));
  }

  public async modificarPerson(person: Person) {
    return await this.http.update("/child",person);
  }*/
  //TODO
  //AGREGAR  EL UPDATE
}
