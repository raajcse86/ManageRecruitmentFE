import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FormUploadComponent } from './upload/form-upload';
import { AuthGuard } from './_guards';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'upload', component: FormUploadComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: HomeComponent },
    { path: 'profile/:slug', component: ProfileComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);