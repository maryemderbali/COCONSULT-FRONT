import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <span class="star" *ngFor="let _ of stars"></span>
  `,
  styles: [`
    .star {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url('/assets/star.svg');
      background-size: cover;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number;

  get stars(): number[] {
    const numberOfStars = Math.round(this.rating);
    return Array(numberOfStars).fill(0);
  }
}
