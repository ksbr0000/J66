import { Component, OnInit, OnDestroy, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
    id: number;
    title: string;
    description: string;
    features: [string, string, string];
    image: string;
    tag: string;
}

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
    services: Service[] = [
        {
            id: 1,
            title: 'Android App Development',
            description: 'Native and cross-platform Android apps engineered for performance, retention, and seamless UX across all device sizes.',
            features: ['Jetpack Compose & Kotlin', 'Offline-first architecture', 'Play Store optimization'],
            image: 'images/android.svg',
            tag: '01 — Mobile'
        },
        {
            id: 2,
            title: 'Web Development',
            description: 'High-performance web applications built with modern frameworks, optimized for Core Web Vitals and conversion.',
            features: ['Angular / React / Next.js', 'Sub-second load times', 'SEO & accessibility built-in'],
            image: 'images/web.svg',
            tag: '02 — Web'
        },
        {
            id: 3,
            title: 'Cloud Solutions',
            description: 'Scalable, resilient cloud infrastructure that grows with your product — zero downtime deployments, auto-scaling, cost-optimized.',
            features: ['AWS / GCP / Azure', 'CI/CD & DevOps pipelines', 'Infrastructure as Code'],
            image: 'images/cloud.svg',
            tag: '03 — Cloud'
        },
        {
            id: 4,
            title: 'AI & Automation',
            description: 'Integrate intelligent automation into your workflows — from LLM-powered features to custom ML models in production.',
            features: ['LLM integration & fine-tuning', 'Predictive analytics', 'Process automation pipelines'],
            image: 'images/ai.svg',
            tag: '04 — AI'
        }
    ];

    activeIndex = signal(0);
    phase = signal<'idle' | 'out' | 'pre-in' | 'in'>('idle');
    private lastIndex = 0;
    private sectionEl: HTMLElement | null = null;
    private ticking = false;

    constructor(private elRef: ElementRef) { }

    ngOnInit() {
        this.sectionEl = document.getElementById('services-section');
    }

    ngOnDestroy() { }

    isHovered = signal(false);

    @HostListener('mouseenter')
    onMouseEnter() { this.isHovered.set(true); }

    @HostListener('mouseleave')
    onMouseLeave() { this.isHovered.set(false); }
    @HostListener('window:scroll')
    onScroll() {
        if (this.ticking) return;
        this.ticking = true;
        requestAnimationFrame(() => {
            this.calculateIndex();
            this.ticking = false;
        });
    }

    private calculateIndex() {
        // if (!this.sectionEl || !this.isHovered()) return;
        if (!this.sectionEl) return;
        const rect = this.sectionEl.getBoundingClientRect();
        const scrollable = this.sectionEl.offsetHeight - window.innerHeight;
        if (rect.top > 0 || rect.bottom < window.innerHeight) return;

        const progress = Math.abs(rect.top) / scrollable;
        const index = Math.min(Math.floor(progress * this.services.length), this.services.length - 1);

        if (index !== this.lastIndex && this.phase() === 'idle') {
            this.lastIndex = index;
            this.phase.set('out');
            setTimeout(() => {
                this.activeIndex.set(index);
                this.phase.set('pre-in');         // ← positions new content below, no transition
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.phase.set('in');          // ← then transitions up to 0
                        setTimeout(() => this.phase.set('idle'), 650);
                    });
                });
            }, 350);
        }
    }

    get active(): Service {
        return this.services[this.activeIndex()];
    }
}