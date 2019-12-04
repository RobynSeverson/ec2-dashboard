import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ec2Service } from '../services/ec2.service'; 

export interface InstanceElement {
  name: string;
  type: string;
  state: string;
  id: string;
  publicIP: string;
  privateIP: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  length = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  pageEvent: PageEvent;
  dataSource: InstanceElement[];
  constructor(
    private ec2Service: Ec2Service
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    let pageSize = 10;
    let pageIndex = 0;

    if (this.pageEvent) {
      pageSize = this.pageEvent.pageSize;
      pageIndex = this.pageEvent.pageIndex;
    }

    this.ec2Service.getInstances(pageSize, pageIndex)
    .subscribe((data : any) => {
      this.dataSource = null;
      this.dataSource = data.page;
      this.length = data.total;
    });
  }

  switchPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getPage();
  }

  displayedColumns: string[] = ['name', 'id', 'privateIP', 'publicIP', 'type', 'state', 'availabilityZone'];
}
