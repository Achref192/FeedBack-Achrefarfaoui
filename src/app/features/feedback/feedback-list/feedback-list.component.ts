import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { EventsService } from '../../../shared/data/events.service'; // ⬅️ AJOUTEZ cet import
import { Eventy } from '../../../models/eventy'; // ⬅️ AJOUTEZ cet import

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  isFormVisible = false;
  events: Eventy[] = []; // ⬅️ REMPLACEZ le tableau statique

  newFeedback: Omit<Feedback, 'id'> = {
    id_user: 0,
    id_event: 0,
    content: '',
    role: '',
    date: new Date().toISOString().split('T')[0]
  };

  constructor(
    private feedbackService: FeedbackService,
    private eventsService: EventsService // ⬅️ AJOUTEZ dans le constructor
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
    this.loadEvents(); // ⬅️ CHARGEZ les événements au démarrage
  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        console.log('Événements chargés:', data);
        this.events = data;
      },
      error: (error) => console.error('Erreur lors du chargement des événements:', error)
    });
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => this.feedbacks = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  showFeedbackForm(): void {
    this.isFormVisible = true;
  }

  cancelFeedback(): void {
    this.isFormVisible = false;
    this.resetForm();
  }

  submitFeedback(): void {
    // Validation
    if (this.newFeedback.id_user <= 0) {
      alert('L\'ID utilisateur doit être un nombre positif');
      return;
    }

    if (this.newFeedback.id_event <= 0) {
      alert('Veuillez sélectionner un événement');
      return;
    }

    this.feedbackService.addFeedback(this.newFeedback as any).subscribe({
      next: () => {
        this.loadFeedbacks();
        this.isFormVisible = false;
        this.resetForm();
        alert('Feedback ajouté avec succès!');
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout:', error);
        alert('Erreur lors de l\'ajout du feedback');
      }
    });
  }

  deleteFeedback(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.loadFeedbacks();
          alert('Feedback supprimé avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du feedback');
        }
      });
    }
  }

  private resetForm(): void {
    this.newFeedback = {
      id_user: 0,
      id_event: 0,
      content: '',
      role: '',
      date: new Date().toISOString().split('T')[0]
    };
  }
}
