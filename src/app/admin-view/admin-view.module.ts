import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHeaderComponent} from './components/admin-header/admin-header.component';
import {AdminViewComponent} from './admin-view.component';
import {AdminProjectsGalleryComponent} from './components/admin-projects-gallery/admin-projects-gallery.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuardService} from '../auth/services/auth-guard.service';
import {SearchHeaderModule} from '../components/search-header/search-header.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigurationService} from '../configuration/services/configuration-service';
import {AdminFormsModule} from './admin-forms/admin-forms.module';
import {CreateProjectComponent} from './admin-forms/create-project/create-project.component';

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'individualne-projekty',
        component: AdminProjectsGalleryComponent,
        data: {projectsTitle: 'Individuálne projekty', projectsCategoryId: 'INDIVIDUAL'},
        children: [
          {
            path: 'vytvor',
            component: CreateProjectComponent
          }
        ]
      },
      {
        path: 'katalogove-projekty',
        component: AdminProjectsGalleryComponent,
        data: {projectsTitle: 'Katalógové projekty', projectsCategoryId: 'COMMON'}
      },
      {
        path: 'interierovy-dizajn',
        component: AdminProjectsGalleryComponent,
        data: {projectsTitle: 'Interiérový dizajn', projectsCategoryId: 'INTERIOR_DESIGN'}
      },
      {
        path: 'vytvor',
        component: CreateProjectComponent
      },
    ]
  },
]

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminViewComponent,
    AdminProjectsGalleryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    AdminFormsModule,
    NgbPaginationModule,
    SearchHeaderModule
  ],
  providers: [
    ConfigurationService
  ]
})
export class AdminViewModule {
}
