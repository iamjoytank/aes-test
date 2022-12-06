import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'employee',
        canLoad: [AuthGuard],
        data: {
          breadcrumb: 'Employee',
        },
        loadChildren: () => import('./pages/employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'product',
        canLoad: [AuthGuard],
        data: {
          breadcrumb: 'Product',
        },
        loadChildren: () => import('./pages/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'profile',
        canLoad: [AuthGuard],
        data: {
          breadcrumb: 'Profile',
        },
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
