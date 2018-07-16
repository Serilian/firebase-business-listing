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
  activeCompany: string;
  businesses: Business[];

  categories: Category[];
  editedKey: any;
  editedCompany: string;
  editedCategory: string;
  editedYearsInBusiness: number;
  editedDescription: string;
  editedPhone: string;
  editedEmail: string;
  editedStreet: string;
  editedCity: string;
  editedState: string;
  editedZipcode: string;

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

  changeState(state, retail = null) {
    if (retail !== null) {
      this.activeCompany = retail;
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

  showEdit(business: Business) {
    this.changeState('edit', business.company);
    this.editedCompany = business.company;
    this.editedCategory = business.category;
    this.editedYearsInBusiness = business.years_in_business;
    this.editedDescription = business.Description;
    this.editedPhone = business.phone;
    this.editedEmail = business.email;
    this.editedCity = business.city;
    this.editedState = business.state;
    this.editedZipcode = business.zipcode;
    this.editedStreet = business.street_sddres;
    this.editedKey = business.$key;
  }

  updateBusiness() {
    const updBusiness = {
      company: this.editedCompany,
      Description: this.editedDescription,
      category: this.editedCategory,
      years_in_business: this.editedYearsInBusiness,
      street_sddres: this.editedStreet,
      city: this.editedCity,
      state: this.editedState,
      zipcode: this.editedZipcode,
      phone: this.editedPhone,
      email: this.editedEmail,
    };
    this.fireService.updateBusiness(this.editedKey, updBusiness);

    this.changeState('default');
  }

  deleteBusiness(key) {
    this.fireService.deleteBusiness(key);
    this.changeState('default');
  }

}
