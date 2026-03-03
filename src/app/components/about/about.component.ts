import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  values = [
    {
      icon: '⚡',
      title: 'Speed Without Shortcuts',
      desc: 'We move fast without cutting corners. Every decision is deliberate, every line of code intentional.'
    },
    {
      icon: '🎯',
      title: 'Outcome Obsessed',
      desc: 'We measure success by the results we drive for your business — not hours logged or features shipped.'
    },
    {
      icon: '🔍',
      title: 'Radical Transparency',
      desc: 'No black boxes. You see exactly what we build, why we build it, and how it performs.'
    },
    {
      icon: '♾️',
      title: 'Built to Scale',
      desc: 'Every system we build is designed for where you\'re going, not just where you are today.'
    }
  ];

  stack = [
    'Angular', 'React', 'Next.js', 'Node.js',
    'Python', 'Kotlin', 'TypeScript', 'PostgreSQL',
    'AWS', 'GCP', 'Docker', 'Kubernetes',
    'Terraform', 'Firebase', 'OpenAI', 'FastAPI'
  ];

  stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '12+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '40+', label: 'Technologies' }
  ];
}
