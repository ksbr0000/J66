import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent, ServicesComponent, CaseStudiesComponent, AboutComponent, FooterComponent, ContactComponent],
  template: `
    <app-navbar />
    <main>
      <app-home />
      <app-services />
      <app-case-studies />
      <app-about />
      <app-contact />
      <app-footer />
    </main>
  `,
  styles: [`
    main { display: block; }
  `]
})
export class AppComponent {}
