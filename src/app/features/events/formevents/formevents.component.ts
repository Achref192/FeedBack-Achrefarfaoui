import { Component } from '@angular/core';
import {EventsService} from '../../../shared/data/events.service';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-formevents',
  templateUrl: './formevents.component.html',
  styleUrl: './formevents.component.css'
})
export class FormeventsComponent {
 eventy=new Eventy() ;

  today: string = new Date().toISOString().split('T')[0];

  constructor(private dataService:EventsService) {}

  save() {


  // Call your service here
    this.dataService.addEvent(this.eventy).subscribe({
      next: (res) => {
        console.log('Event added successfully', res);
        alert('Event added successfully!');
        this.eventy = new Eventy();
      },
      error: (err) => {
        console.error('Error', err);
        alert('Failed to add event!');
      }
    });
}

}
