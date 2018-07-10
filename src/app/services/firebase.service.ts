import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable()
export class FirebaseService {

  private businessesCollection: AngularFirestoreCollection<Business>;
  businesses: Observable<Business[]>;

  private categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(private asf: AngularFirestore) {
    this.businessesCollection = asf.collection<Business>('businesses');
    this.categoriesCollection = asf.collection<Category>('categories');

  }

  getBusinesses() {
    this.businesses = this.businessesCollection.valueChanges();
    return this.businesses;
  }

  getCategories() {
    this.categories = this.categoriesCollection.valueChanges();
    return this.categories;
  }


}


export interface Business {
  $key?: string;
  company?: string;
  Description?: string;
  category: string;
  years_in_business?: number;
  street_sddres?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  email: string;
  created_at: string;
}

export interface Category {
  $key?: string;
  name: string;
}
