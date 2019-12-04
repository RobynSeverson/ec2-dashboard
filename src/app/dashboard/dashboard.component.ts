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
  pageSize = 10;
  pageIndex = 0;
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
    if (this.pageEvent) {
      this.pageSize = this.pageEvent.pageSize;
      this.pageIndex = this.pageEvent.pageIndex;
    } else {
      this.pageSize = 10;
      this.pageIndex = 0;
    }

    this.ec2Service.getInstances(this.pageSize, this.pageIndex)
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
