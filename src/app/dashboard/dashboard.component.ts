import { Component, OnInit } from '@angular/core';
import { default as SampleData } from '../sampleData.json';
export interface InstanceElement {
  name: string;
  type: string;
  state: string;
  id: string;
  publicIP: string;
  privateIP: string;
}



const INSTANCE_DATA: InstanceElement[] = [
  {
    name: 'marketing-web-01',
    type: 'medium',
    state: 'running',
    id: '1899302-b',
    publicIP: '54.68.12.146',
    privateIP: '10.0.0.108'
  },
  {
    name: 'marketing-web-02',
    type: 'medium',
    state: 'running',
    id: '1899302-c',
    publicIP: '54.68.12.147',
    privateIP: '10.0.0.109'
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(SampleData);
  }

  getRandomFromList(arr: String[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  displayedColumns: string[] = ['name', 'id', 'privateIP', 'publicIP', 'type', 'state', 'availabilityZone'];
  dataSource = SampleData;
}
