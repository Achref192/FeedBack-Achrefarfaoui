import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // AJOUTEZ ces imports

import { FeedbackComponent } from './feedback.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FeedbackRoutingModule } from './feedback-routing.module'; // AJOUTEZ le routing

@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackListComponent,
    FeedbackFormComponent,
    FeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // ⬅️ POUR ngModel et Template-Driven Forms
    ReactiveFormsModule, // ⬅️ POUR formGroup et Reactive Forms
    FeedbackRoutingModule // ⬅️ POUR le routing
  ]
})
export class FeedbackModule { }
