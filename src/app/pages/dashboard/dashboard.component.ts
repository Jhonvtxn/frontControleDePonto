import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard';
import { DatesDashboard } from 'src/app/models/DatesDashboard';

import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard
  dateToday: Date;
  datesDashboard : DatesDashboard;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  id: string;

  constructor( private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;
    this.dateToday = new Date();
    this.dashboard = new Dashboard();
    this.getHoursForDashboard(this.id);
    this.datesDashboard = new DatesDashboard();
  }

  convertResponseToEntity(data: any): Dashboard {
    let dashboard = new Dashboard();

    dashboard.Balance = data.balance;
    dashboard.Workload = data.workload;
    this.datesDashboard = data.lasthours7Days;
    this.dashboard = dashboard;

    return dashboard;
  }

  getHoursForDashboard(id: string): void {
    this.dashboardService.get(id)
      .subscribe(
        data => {
          this.convertResponseToEntity(data);
          console.log(this.dashboard);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
