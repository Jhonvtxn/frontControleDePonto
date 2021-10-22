import {DatesDashboard} from 'src/app/models/DatesDashboard'
export class Schedules{
  entryDate?: Date;
  lunchTimeDate?: Date;
  returnLunchTimeDate?: Date;
  departureTimeDate?: Date;
  workedHours?: number;
  collaboratorId?: number;
  entryHours?: number;

  entry?: string;
  lunchTime?: string;
  returnLunchTime?: string;
  departureTime?: string;
  dashboardDates?: DatesDashboard;
  dayOfTheWeek?: any;

}
