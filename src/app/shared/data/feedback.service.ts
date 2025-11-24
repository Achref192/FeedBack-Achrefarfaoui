import { Injectable } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  urlBackend = "http://localhost:3000/feedback/";

  constructor(private http: HttpClient) { }

  public getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlBackend);
  }

  public getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(this.urlBackend + id);
  }

  public addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.urlBackend, feedback);
  }

  public deleteFeedback(id: number): Observable<Feedback> {
    return this.http.delete<Feedback>(this.urlBackend + id);
  }

  public updateFeedback(feedback: Feedback, id: number): Observable<Feedback> {
    return this.http.put<Feedback>(this.urlBackend + id, feedback);
  }

  // Méthodes supplémentaires spécifiques aux feedbacks
  public getFeedbacksByEvent(eventId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlBackend + '?id_event=' + eventId);
  }

  public getFeedbacksByUser(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlBackend + '?id_user=' + userId);
  }
}
