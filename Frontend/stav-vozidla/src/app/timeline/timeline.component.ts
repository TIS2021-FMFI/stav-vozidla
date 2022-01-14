import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input("services") services: Service[];


  constructor() { }

  ngOnInit(): void {
  }

}
