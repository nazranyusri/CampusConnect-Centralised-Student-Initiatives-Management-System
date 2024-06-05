import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProgramComponent } from './program/program.component';
import { BusinessComponent } from './business/business.component';
import { SurveyComponent } from './survey/survey.component';
import { PersakaComponent } from './persaka/persaka.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailedProgramComponent } from './detailed-program/detailed-program.component';
import { WildcardComponent } from './wildcard/wildcard.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { RouterGuardService } from './services/router-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'program', component: ProgramComponent},
  {path: 'detailedprogram/:id', component: DetailedProgramComponent},
  {
    path: 'addprogram', component: AddProgramComponent,
    canActivate: [RouterGuardService]
  },
  {path: 'business', component: BusinessComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'persaka', component: PersakaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile', component: ProfileComponent,
    // path: 'profile/:username', component: ProfileComponent,
    canActivate: [RouterGuardService]
  },
  {path: '**', component: WildcardComponent} // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
