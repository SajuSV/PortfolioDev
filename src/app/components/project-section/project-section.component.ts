// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-project-section',
//   imports: [],
//   templateUrl: './project-section.component.html',
//   styleUrl: './project-section.component.css'
// })
// export class ProjectSectionComponent {

// }

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectSectionComponent {
  // Signal input accepts [currentProjectId]="'webdesign'" cleanly
  currentProjectId = input<string>('');

  allProjects = [
    {
      id: 'webdev',
      tag: 'Frontend',
      title: 'Web Development',
      role: 'UI/UX Developer',
      link: '/projects/webdev',
      image: 'https://myportfolio-eosin-delta-45.vercel.app/assets/img/assets/sectionPortfolio/Web.webp',
      imageAlt: 'Web Development preview'
    },
    {
      id: 'webdesign',
      tag: 'Figma | Photoshop',
      title: 'Web Design',
      role: 'UI/UX Designer',
      link: '/projects/webdesign',
      image: 'https://myportfolio-eosin-delta-45.vercel.app/assets/img/assets/sectionPortfolio/webdesign.webp',
      imageAlt: 'Web Design preview'
    },
    {
      id: 'logodesign',
      tag: 'Photoshop | Figma',
      title: 'Logo Design',
      role: 'Visual Designer',
      link: '/projects/logodesign',
      image: 'https://myportfolio-eosin-delta-45.vercel.app/assets/img/assets/sectionPortfolio/logo.webp',
      imageAlt: 'Logo Design preview'
    },
    {
      id: 'posterdesign',
      tag: 'Photoshop',
      title: 'Poster Design',
      role: 'Visual Designer',
      link: '/projects/posterdesign',
      image: 'https://myportfolio-eosin-delta-45.vercel.app/assets/img/assets/sectionPortfolio/posters.webp',
      imageAlt: 'Poster Design preview'
    }
  ];

  displayedProjects = computed(() =>
    this.allProjects
      .filter((project) => project.id !== this.currentProjectId())
      .slice(0, 3)
  );
}