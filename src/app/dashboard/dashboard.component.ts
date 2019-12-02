import { Component, OnInit } from '@angular/core';

export interface InstanceElement {
  name: string;
  id: string;
  ip: string;
}

const INSTANCE_DATA: InstanceElement[] = [
  {
    name: 'marketing-web-01',
    id: '1899302-b',
    ip: '10.0.0.108'
  },
  {
    name: 'marketing-web-02',
    id: '1899302-c',
    ip: '10.0.0.109'
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
  }

  displayedColumns: string[] = ['name', 'id', 'ip'];
  dataSource = INSTANCE_DATA;
}
