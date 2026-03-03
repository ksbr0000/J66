import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    budget: '',
    message: ''
  };

  budgets = [
    'Under $5k',
    '$5k – $15k',
    '$15k – $50k',
    '$50k+'
  ];

  socials = [
    { label: 'Twitter / X', handle: '@julius66io', href: '#' },
    { label: 'LinkedIn', handle: 'julius66', href: '#' },
    { label: 'GitHub', handle: 'julius66', href: '#' }
  ];

  focused = signal<string | null>(null);

  setFocus(field: string | null) {
    this.focused.set(field);
  }
}
