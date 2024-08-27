import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  constructor() { }

  ngOnInit(): void {
  }
  showBasicInfo = false;
  showContactInfo = false;
  showPreferences = false;

  toggleSection(section: string) {
    if (section === 'basic-info') {
      this.showBasicInfo = !this.showBasicInfo;
    } else if (section === 'contact-info') {
      this.showContactInfo = !this.showContactInfo;
    } else if (section === 'preferences') {
      this.showPreferences = !this.showPreferences;
    }
  }
}
