import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path:'welcome', component: WelcomeComponent},
  {path: '', component: CallbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
