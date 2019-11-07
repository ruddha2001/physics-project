import { Component, OnInit } from '@angular/core';
import {SekureService} from '../sekure.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  time: number=10;

  records: Object;

  testFunc(){
    this.sekure.getRecord()
  }

  constructor(private sekure : SekureService) { }

  ngOnInit() {
    this.sekure.getRecord().subscribe(record=> {
      this.records=record;
      console.log(this.records)
    })

    setInterval(function(){
      window.location.assign("http://localhost:4200")
    },(this.time*1000))
  }

}
