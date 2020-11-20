import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { BarsService } from "./bars.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Progress Bar Demo';
  public responseData: any = [];
  
  public buttons: any = [];
  public bars: any = [];
  public limit: number = 0;
  public selectedBarIndex: number = 0;
  
  myForm: FormGroup;

  constructor(
    config: NgbProgressbarConfig,
    private formBuilder: FormBuilder,
    public api: BarsService
  ) {
    config.striped = true;
    config.animated = true;
    //config.type = 'success';
    config.height = '20px';
  }

  ngOnInit() {

   //this.getData();
   this.buttons = [10,40,-43,-42];
   this.bars = [82,36,10];
   this.limit = 50; 
   

   this.myForm = this.formBuilder.group({
	  barselect: [0, [Validators.required]],
    });

  }

  getData(){
  	let api_url = 'http://pb-api.herokuapp.com/bars';
  	this.api.getRequest(api_url, {}).then(
      (res) => {
      	console.log(res);
        if (res != undefined && (res.code == 200 || res.code == 202)) {
          this.responseData = res.data;
        } else {
          if (res) {
            // alert(res.message)
          }
        }
      },
      (err) => {

      }
    );
  }

  onOptionsSelected (seletedBar){
  	this.selectedBarIndex = seletedBar
  }
  changePerce (percentage){
  	var newBar = this.bars[this.selectedBarIndex] + percentage;
  	if(newBar <=0){
  		this.bars[this.selectedBarIndex] = 0;
  	}else{
  		this.bars[this.selectedBarIndex] += percentage;
  	}
  	
  }
}
