import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardContent: string = '';
  @Input() cardTitle: string = '';
  constructor() { }

  ngOnInit(): void {
  }
 determineCardClass(): string {
    if (this.cardTitle === 'HR') {
      return '1';
    } else if (this.cardTitle === 'PM') {
      return '2';
    } else if (this.cardTitle === 'Employee') {
      return '3';
    } else if (this.cardTitle === 'Manager') {
      return '1';
    }
    else if (this.cardTitle === 'Consult') {
      return '2';
    }
  }
}