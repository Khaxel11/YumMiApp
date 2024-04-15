import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardsCatalogComponent } from './cards-catalog/cards-catalog.component';
import { CardsCaptureComponent } from './cards-capture/cards-capture.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';
const routes: Routes = [
  {path: '', component : UserProfileComponent, pathMatch: 'full'},
  {path: 'editprofile', component : EditProfileComponent, pathMatch: 'full'},
  {path: 'cards', component : CardsCatalogComponent},
  {path: 'cards/capture', component : CardsCaptureComponent},
  {path: 'changepassword', component : ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
