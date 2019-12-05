import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { Ec2Service } from '../services/ec2.service';
import { of } from 'rxjs';

class MockEc2Service extends Ec2Service {

  getInstances(pageSize: number, pageIndex: number) {
      let instances = [
        {
          "name": "XSS",
          "publicIP": "53.6.252.195",
          "privateIP": "236.72.193.17",
          "type": "small",
          "state": "unknown",
          "id": "8537fd7-5481-4665-",
          "availabilityZone": "us-east-2b"
        },
        {
          "name": "Clothing",
          "publicIP": "7.228.222.160",
          "privateIP": "27.36.73.239",
          "type": "micro",
          "state": "stopped",
          "id": "7489c28-7fe3-437d-",
          "availabilityZone": "us-east-2b"
        },
        {
          "name": "Sleek",
          "publicIP": "250.110.2.147",
          "privateIP": "209.158.110.146",
          "type": "large",
          "state": "terminated",
          "id": "4c8bf17-64b0-4fa3-",
          "availabilityZone": "us-east-2b"
        },
      ];

      return of({
        pageIndex: 0,
        pageSize: 10,
        page: instances,
        total: 3
      });
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  
  beforeEach(async(() => {
    TestBed.overrideComponent(
      DashboardComponent,
      { set: { providers: [{ provide: Ec2Service, useClass: MockEc2Service }] } }
    );

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three instance details', () => {
    expect(component.dataSource.length).toBe(3);
  });
});
