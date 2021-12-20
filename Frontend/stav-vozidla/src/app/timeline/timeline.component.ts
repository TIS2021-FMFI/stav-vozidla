import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input("services") services: Service[];
  // services: Service[] = [
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  //   {name: "test", dateOfCompletion: new Date(), state: 1},
  // ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.services)
  }

}
