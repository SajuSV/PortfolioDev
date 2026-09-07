import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { WebdesignComponent } from './pages/webdesign/webdesign.component';
import { WebdevComponent } from './pages/webdev/webdev.component';
import { LogodesignComponent } from './pages/logodesign/logodesign.component';
import { PosterdesignComponent } from './pages/posterdesign/posterdesign.component';
import { MygallaryComponent } from './pages/mygallary/mygallary.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/webdesign',
    component: WebdesignComponent
  },
  {
    path: 'projects/webdev',
    component: WebdevComponent
  },
  {
    path: 'projects/webdesign',
    component: WebdesignComponent
  },
  {
    path: 'projects/logodesign',
    component: LogodesignComponent
  }
  ,
  {
    path: 'projects/posterdesign',
    component: PosterdesignComponent
  },
  {
    path: 'projects/mygallery',
    component: MygallaryComponent
  },
];
