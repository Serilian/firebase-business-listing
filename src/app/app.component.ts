import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Business, Category, FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appState: string;
  activeKey: string;

  businesses: Business[];

  categories: Category[];

  constructor(private fireService: FirebaseService) {
  }

  ngOnInit(): void {
    this.appState = 'default';
    this.fireService.getBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses;
      });

    this.fireService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      });
  }

  changeState(state, key = null) {
    if (key) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category) {
    this.fireService.getBusinesses(category).subscribe(
      businesses => {
        this.businesses = businesses;
      }
    );
  }

  addBusiness(company, category, years, description, phone, email, street, city, state, zip) {
    const created_at = new Date().toString();
    const newBusiness = {
      company: company,
      Description: description,
      category: category,
      years_in_business: years,
      street_sddres: street,
      city: city,
      state: state,
      zipcode: zip,
      phone: phone,
      email: email,
      created_at: created_at
    };
    console.log(newBusiness);
    this.fireService.addBusiness(newBusiness);
    this.changeState('default');

  }

}
