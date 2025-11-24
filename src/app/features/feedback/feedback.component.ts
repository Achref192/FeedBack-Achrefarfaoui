import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../../shared/data/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  isFormVisible = false;

  newFeedback: Omit<Feedback, 'id'> = {
    id_user: 0,
    id_event: 0,
    content: '',
    role: '',
    date: new Date().toISOString().split('T')[0]
  };

  // Exemple d'événements - à remplacer par vos données réelles
  events = [
    { id: 1, title: 'Angular Training' },
    { id: 2, title: 'Conference Web' },
    { id: 3, title: 'Workshop React' }
  ];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
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
