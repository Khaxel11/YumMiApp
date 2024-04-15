import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardsCatalogComponent } from './cards-catalog/cards-catalog.component';
import { CardsCaptureComponent } from './cards-capture/cards-capture.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';

@NgModule({
  declarations: [UserProfileComponent, CardsCatalogComponent, CardsCaptureComponent, EditProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
  ]
})
export class ProfileModule { }
