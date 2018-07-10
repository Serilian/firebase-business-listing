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


  businesses: Business[];

  categories: Category[];

  constructor(private fireService: FirebaseService) {
  }

  ngOnInit(): void {
    this.fireService.getBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses;
      });

    this.fireService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      });
  }

}
