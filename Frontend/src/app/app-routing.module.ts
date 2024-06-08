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
import { AddBusinessComponent } from './add-business/add-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';
import { ClubadminGuardService } from './services/clubadmin-guard.service';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { UpdateSurveyComponent } from './update-survey/update-survey.component';
import { DetailedSurveyComponent } from './detailed-survey/detailed-survey.component';
import { DetailedBusinessComponent } from './detailed-business/detailed-business.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},

  // USER ROUTES
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [RouterGuardService]
  },

  // PROGRAM ROUTES
  {path: 'program', component: ProgramComponent},
  {path: 'detailedprogram/:programId', component: DetailedProgramComponent},
  {
    path: 'addprogram', component: AddProgramComponent,
    canActivate: [RouterGuardService, ClubadminGuardService]
  },
  {
    path: 'updateprogram/:id', component: UpdateProgramComponent,
    canActivate: [RouterGuardService, ClubadminGuardService]
  },
  {
    path: 'programregistrant/:programId', component: ProgramRegistrantComponent,
    canActivate: [RouterGuardService, ClubadminGuardService]
  },
  
  // BUSINESS ROUTES
  {path: 'business', component: BusinessComponent},
  {path: 'detailedbusiness/:businessId', component: DetailedBusinessComponent},
  {path: 'addbusiness', component: AddBusinessComponent},
  {
    path: 'updatebusiness/:businessId', component: UpdateBusinessComponent,
    canActivate: [RouterGuardService]
  },

  //SURVEY ROUTES
  {path: 'survey', component: SurveyComponent},
  {path: 'detailedsurvey/:surveyId', component: DetailedSurveyComponent},
  {path: 'addsurvey', component: AddSurveyComponent},
  {
    path: 'updatesurvey/:surveyId', component: UpdateSurveyComponent,
    canActivate: [RouterGuardService]
  },

  //PERSAKA ROUTES
  {path: 'persaka', component: PersakaComponent},

  {path: '**', component: WildcardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
