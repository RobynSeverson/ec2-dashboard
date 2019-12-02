import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  length = SampleData.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  dataSource: InstanceElement[];
  constructor() { }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    if (this.pageEvent) {
      this.dataSource = SampleData.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);
    } else {
      this.dataSource = SampleData.slice(0, this.pageSize);
    }
  }

  switchPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getPage();
  }

  displayedColumns: string[] = ['name', 'id', 'privateIP', 'publicIP', 'type', 'state', 'availabilityZone'];
}
