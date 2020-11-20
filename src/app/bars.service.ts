import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
  private http: HttpClient,
  private spinner: NgxSpinnerService
  ) { }

  public getRequest(apiPath: string, getData: any): any {

    var promise = new Promise((resolve, reject) => {
      this.spinner.show();

      this.http.get(apiPath, getData)
        .subscribe(

          (val) => {

            this.spinner.hide();
            resolve(val);
            
          },
          response => {
            this.spinner.hide();
		  },
          () => {
          });
    });

    return promise;
  }
}
