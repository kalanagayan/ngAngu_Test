import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { Po } from 'app/_models/Po'
import { poError } from 'app/_models/poError'
import { Modals } from '../../../ui/components/modals/modals.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../ui/components/modals/default-modal/default-modal.component';


@Injectable()
export class SmartTablesService {

  private poUrl = 'http://localhost:8000/po/local/list';
  errorStatus: string ="Connection Refused";
  smartTableData: Po[] = [];
  errordata: poError[] = [];

  constructor(private http: Http) {
    console.log("post");
  }


  getPosts() {
    return this.http.get(this.poUrl)
      .map(res => res.json());
  }


  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.getPosts().subscribe(i => {
        this.smartTableData = i;
        resolve(this.smartTableData);
      }, error => {
        if(error.status==0){
          reject(this.errorStatus);
        }else{
          reject(error.json().message);
          console.log(error);
        }
      });
    });
  }
}
