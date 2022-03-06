/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('venues', 'VenuesController')
    .apiOnly()
    .middleware({
      '*': ['auth', 'verify'],
      'update': 'role:venue_owner',
      'index': 'role:user,venue_owner',
      'show': 'role:user,venue_owner',
      'store': 'role:venue_owner',
      'destroy': 'role:venue_owner'
    });

  Route.resource('venues.fields', 'FieldsController')
    .apiOnly()
    .middleware({
      '*': ['auth', 'verify'],
      'index': 'role:user,venue_owner',
      'show': 'role:user,venue_owner',
      'store': 'role:venue_owner',
      'update': 'role:venue_owner',
      'destroy': 'role:venue_owner'
    });

  Route.resource('venues.bookings', 'BookingsController')
    .apiOnly()
    .middleware({
      '*': ['auth', 'verify'],
      'store': 'role:user',
      'index': 'role:user,venue_owner',
      'update': 'role:user',
      'destroy': 'role:user',
      'show': 'role:user,venue_owner'
    })
  Route.post('/bookings/:id/join', 'BookingsController.joinBooking').middleware(['auth', 'verify', 'role:user']);
  Route.post('/bookings/:id/unjoin', 'BookingsController.unjoinBooking').middleware(['auth', 'verify', 'role:user']);
  Route.get('/bookings/schedules', 'BookingsController.schedules').middleware(['auth', 'verify', 'role:user']);

  Route.post('/register', 'AuthController.register');
  Route.post('/login', 'AuthController.login').middleware('verify');
  Route.post('/logout', 'AuthController.logout').middleware('auth');
  Route.post('/verification', 'AuthController.verification');
  Route.post('/regenerate-otp', 'AuthController.regenerateOtp');

}).prefix('/api/v1');
