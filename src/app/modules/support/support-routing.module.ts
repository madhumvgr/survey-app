import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from 'src/app/welcome/welcome.component';

import { TechsupportComponent } from './techsupport/techsupport.component';
import { FaqsComponent } from './faqs/faqs/faqs.component';
import { ConnectComponent } from './connect/connect.component';
import { ContactComponent } from './contact/contact.component';
import { ExitComponent } from './exit/exit.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [  
  {
  path: '',
  children: [
  { path:'techsupport', component:TechsupportComponent},
  { path:'welcome', component:WelcomeComponent},
  { path: 'faqs', component:FaqsComponent},
  { path: 'connect', component: ConnectComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'thankyou', component: ExitComponent}
],
component: HomeComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
