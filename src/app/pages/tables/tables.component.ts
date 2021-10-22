import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HappyFriday } from 'src/app/models/happyfriday';
import { HappyFridayService } from 'src/app/services/happyfriday-service';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  datesMonth: any;
  days: any;
  happyfriday: HappyFriday;
  Idcollaborator: string;
  Idcompany: string;
  fridaySelect: Date;
  happyfridaydashboard : HappyFriday;
  toastrHappyFriday : any;


  constructor(private happyfridayService: HappyFridayService,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit() {
   //let date = new Date();
    //date.getMonth();
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.Idcollaborator = user.user.id;
    this.Idcompany = user.user.companyId;
    var date = new Date(2021,10,1);
    this.days = [];
    while (date.getMonth() === 10) {
      this.days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    //this.returnFridayMonth();
    this.getHappyfriday()
    this.sundayFriday()
    return this.days;

  }

  returnFridayMonth(){
    this.days.forEach(element => {
      var day = element.getDay();
        var day2 = element.getDate();
        if(day == 5 && day2 <= 7){
          this.datesMonth.push(element);
        }
    });
    console.log(this.datesMonth);
  }

  sundayFriday(){
    this.datesMonth = [];
    var days = new Date( 2021,10,0 ).getDate();
    var sundays = [ 6 - (new Date( 10 +'/01/'+ 2021 ).getDay()) ];
    for ( var i = sundays[0] + 7; i < days; i += 7 ) {
      sundays.push( i );
      this.datesMonth.push(new Date(2021,10,i))
    }
    return sundays;
  }

  createHappyFriday(id: string) {
    var date = this.datepipe.transform(this.fridaySelect, 'yyyy-MM-dd');
      this.happyfridayService.create(date, this.Idcompany, this.Idcollaborator)
      .subscribe(
        data => {
          console.log(data);
          this.toastrHappyFriday = data;
          if(this.toastrHappyFriday.collaboratorId == 0){
            this.toastr.error("Erro ao registrar Happy Friday.")

          }
          else{
            this.toastr.success('Happy Friday Registrada!');
          }
          this.getHappyfriday();
      }
      );
    }

    getHappyfriday(): void {
      this.happyfridayService.getAll()
        .subscribe(
          data => {
            this.happyfriday = data;
            this.happyfriday.CollaboratorId = this.happyfriday.CollaboratorId;
            this.happyfriday.Collaborator = this.happyfriday.Collaborator;
            this.happyfriday.CompanyId =this.happyfriday.CompanyId
            this.happyfriday.Company = this.happyfriday.Company;
            this.happyfriday.HappyFridayDate = this.happyfriday.HappyFridayDate;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

}

