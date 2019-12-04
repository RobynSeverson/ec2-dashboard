import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ec2Service } from '../services/ec2.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
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
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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
      this.dataSource = data.page;
      this.length = data.total;

      this.options = [];
      this.dataSource.forEach((instance) => {
        this.options.push(instance.name);
        this.options.push(instance.id);
        this.options.push(instance.privateIP);
        this.options.push(instance.publicIP);
      });
    });
  }

  switchPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getPage();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['name', 'id', 'privateIP', 'publicIP', 'type', 'state', 'availabilityZone'];
}
