import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'hotelApp',
    component: ContainerComponent,
      children: [
        {
          path: '', redirectTo: 'home', pathMatch: 'full'
        }, 
        {
          path: 'dashboard',
          component: DashboardComponent,
        }, 
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'book',
          component: BookComponent,
        },
        {
          path: 'bookings',
          component: BookingsComponent,
        },
        {
          path: 'profile',
          component: ProfileComponent,
        },
        {
          path: 'wishlist',
          component: WishlistComponent,
        },
        {
          path: 'reviews',
          component: ReviewsComponent,
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
