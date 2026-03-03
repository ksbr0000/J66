import { Component, signal, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CaseStudy {
  id: number;
  client: string;
  industry: string;
  category: 'web' | 'mobile' | 'ai' | 'cloud';
  problem: string;
  solution: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  accentColor: string;
  accentSecondary: string;
  featured: boolean;
  mockupType: 'browser' | 'phone';
  imageUrl: string | null;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent implements OnInit {
  @ViewChildren('caseCard') cards!: QueryList<ElementRef>;

  filters = ['All', 'Web', 'Mobile', 'AI', 'Cloud'];
  activeFilter = signal('All');
  visibleCards = signal<Set<number>>(new Set());

  cases: CaseStudy[] = [
    {
      id: 1,
      client: 'Groww',
      industry: 'Fintech',
      category: 'web',
      problem: 'Legacy banking portal losing users to modern competitors',
      solution: 'Rebuilt entire platform with real-time analytics dashboard',
      metrics: [
        { value: '3×', label: 'Revenue Growth' },
        { value: '0.4s', label: 'Load Time' },
        { value: '+89%', label: 'User Retention' }
      ],
      stack: ['Angular', 'Node.js', 'PostgreSQL', 'AWS'],
      accentColor: '#00aeef',
      accentSecondary: '#0060b0',
      featured: true,
      mockupType: 'browser',
      imageUrl: 'images/case-studies/vaultex.png'
    },
    {
      id: 2,
      client: 'Trackify',
      industry: 'Logistics',
      category: 'mobile',
      problem: 'Field drivers had no real-time route or delivery visibility',
      solution: 'Built native Android app with offline-first GPS tracking',
      metrics: [
        { value: '40%', label: 'Faster Delivery' },
        { value: '98%', label: 'Uptime' },
        { value: '12k+', label: 'Daily Users' }
      ],
      stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'GCP'],
      accentColor: '#7c3aed',
      accentSecondary: '#4f1fbf',
      featured: false,
      mockupType: 'phone',
      imageUrl: null
    },
    {
      id: 3,
      client: 'Nexaflow',
      industry: 'HR Tech',
      category: 'ai',
      problem: 'Manual resume screening took 3 weeks per hiring cycle',
      solution: 'Deployed LLM pipeline that screens, ranks and shortlists candidates',
      metrics: [
        { value: '90%', label: 'Time Saved' },
        { value: '4 hrs', label: 'Hiring Cycle' },
        { value: '2.4×', label: 'Quality Hires' }
      ],
      stack: ['Python', 'OpenAI', 'FastAPI', 'React'],
      accentColor: '#f59e0b',
      accentSecondary: '#b45309',
      featured: false,
      mockupType: 'browser',
      imageUrl: null
    },
    {
      id: 4,
      client: 'Lumora',
      industry: 'Retail',
      category: 'cloud',
      problem: 'Black Friday crashes costing $200k in lost sales annually',
      solution: 'Migrated monolith to microservices on auto-scaling cloud infra',
      metrics: [
        { value: '0', label: 'Downtime Events' },
        { value: '60%', label: 'Infra Cost Cut' },
        { value: '10×', label: 'Scale Capacity' }
      ],
      stack: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
      accentColor: '#10b981',
      accentSecondary: '#047857',
      featured: false,
      mockupType: 'browser',
      imageUrl: null
    }
  ];
  mobileExpanded = signal(false);

  get mobileVisible(): CaseStudy[] {
    return this.mobileExpanded() ? this.filtered : this.filtered.slice(0, 1);
  }
  get filtered(): CaseStudy[] {
    const f = this.activeFilter().toLowerCase();
    if (f === 'all') return this.cases;
    return this.cases.filter(c => c.category === f);
  }

  ngOnInit() {
    setTimeout(() => this.observeCards(), 100);
  }

  setFilter(f: string) {
    this.activeFilter.set(f);
    setTimeout(() => this.observeCards(), 50);
  }

  private observeCards() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = Number((e.target as HTMLElement).dataset['id']);
            this.visibleCards.update(s => new Set([...s, id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    this.cards?.forEach(r => observer.observe(r.nativeElement));
  }

  isVisible(id: number): boolean {
    return this.visibleCards().has(id);
  }
  toggleMobile() {
  this.mobileExpanded.update(v => !v);
}
}
