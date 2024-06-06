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
import { RouterGuardService } from './services/router-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { UpdateProgramComponent } from './update-program/update-program.component';
import { ProgramRegistrantComponent } from './program-registrant/program-registrant.component';
import { ClubGuardService } from './services/club-guard.service';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [RouterGuardService]
  },

  // PROGRAM ROUTES
  {path: 'program', component: ProgramComponent},
  {path: 'detailedprogram/:id', component: DetailedProgramComponent},
  {
    path: 'addprogram', component: AddProgramComponent,
    canActivate: [RouterGuardService, ClubGuardService]
  },
  {
    path: 'updateprogram/:id', component: UpdateProgramComponent,
    canActivate: [RouterGuardService, ClubGuardService]
  },
  {
    path: 'programregistrant/:programId', component: ProgramRegistrantComponent,
    canActivate: [RouterGuardService, ClubGuardService]
  },
  
  {path: 'business', component: BusinessComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'persaka', component: PersakaComponent},

  {path: '**', component: WildcardComponent} // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
