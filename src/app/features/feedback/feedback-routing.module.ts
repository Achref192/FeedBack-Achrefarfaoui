import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';

const routes: Routes = [
  { path: '', component: FeedbackListComponent },
  { path: 'new', component: FeedbackFormComponent },
  { path: 'edit/:id', component: FeedbackFormComponent },
  { path: ':id', component: FeedbackDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
