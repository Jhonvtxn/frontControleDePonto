import { Component, OnInit } from '@angular/core';
import { SchedulesService } from 'src/app/services/schedules-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedules } from 'src/app/models/schedules' ;
import { DatesDashboard } from 'src/app/models/DatesDashboard';

@Component({
  selector: 'app-allschedules',
  templateUrl: './allschedules.component.html',
  styleUrls: ['./allschedules.component.scss']
})
export class AllschedulesComponent implements OnInit {

  schedules: Schedules[];
  id: string;

  year:number;
  month:number;

  dashboardDates: DatesDashboard;
  schedulesMonth: Schedules;
  schedulesMonthAux: Schedules[];
  array : any;
  teste : Schedules;
  days: any;

  constructor( private schedulesService: SchedulesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;

    this.dashboardDates = new DatesDashboard();
    this.teste = new Schedules();
    var date = new Date();

    this.getAllSchendulesMothYear(this.id,date.getFullYear(),date.getMonth());
  }

  getAllSchedules(id: string)  {
    this.schedulesService.getall(id)
      .subscribe(
        data => {

          this.teste.dashboardDates = data;
          this.array = data;
          this.schedules = this.array.slice();
          this.dashboardDates = this.teste.dashboardDates;

        },
        error => {
          console.log(error);
        });
  }

  getAllSchendulesMothYear(id:string, year:number, month:number){
    this.schedulesService.getallMonthYear(id,year,month)
    .subscribe(data =>{
      this.schedules = []
      this.schedules = data;
      this.transformArrayInMonth(year,month);


    },  error => {
      console.log(error);
    });

    return this.days;
  }

  transformArrayInMonth(year:any,month:any){
    var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    this.schedules.forEach(element => {
      element.entryDate = new Date(element.entry);
      element.dayOfTheWeek =semana[element.entryDate.getDay()]
    });
    this.schedulesMonthAux = [];
    var date =new Date(year,month,1);
    this.days = [];
    let count = 0;
    console.log(date.getMonth());
    console.log(month);
    while (date.getMonth() === parseInt(month)) {
      count++
      this.days.push(new Date(date));
      date.setDate(date.getDate() + 1);
      let index = this.schedules.findIndex((val) => val.entryDate.getDate() == date.getDate());
      if(index != -1){
        this.schedulesMonthAux.push(this.schedules[index]);
      }else{
        let schedule = new Schedules();
        schedule.entryDate = date;
        schedule.lunchTimeDate = date;
        schedule.lunchTimeDate = date;
        schedule.departureTimeDate = date;

        schedule.entry = date.toString();
        schedule.lunchTime = date.toString();
        schedule.returnLunchTime = date.toString();
        schedule.departureTime = date.toString();
        schedule.dayOfTheWeek = semana[date.getDay()];

        this.schedulesMonthAux.push(schedule);

      }
    }
    console.log(this.schedulesMonthAux);
  }
}
