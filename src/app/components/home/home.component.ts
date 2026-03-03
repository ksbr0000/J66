import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    { icon: '📱', label: 'Android', desc: 'Native & cross-platform apps' },
    { icon: '🌐', label: 'Web', desc: 'High-performance web apps' },
    { icon: '☁️', label: 'Cloud', desc: 'Scalable infrastructure' },
    { icon: '🤖', label: 'AI', desc: 'Intelligent automation' },
  ];

  stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '12+', label: 'Years Experience' },
    { value: '40+', label: 'Tech Stack' },
  ];

  scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
}
