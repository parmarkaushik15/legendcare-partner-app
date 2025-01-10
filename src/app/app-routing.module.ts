import { AuthGuard } from './guards/auth.guard';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard] 
   },
  {
    path: 'primary-business',
    loadChildren: () => import('./primary-business/primary-business.module').then( m => m.PrimaryBusinessPageModule),
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    pathMatch: 'full',
    canActivate: [AuthGuard] 
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'lead-details/:tl_id',
    loadChildren: () => import('./lead-details/lead-details.module').then( m => m.LeadDetailsPageModule),
     canActivate: [AuthGuard] 
  },
   {
    path: 'bill-now/:tl_id',
    loadChildren: () => import('./bill-now/bill-now.module').then( m => m.BillNowPageModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'identity-verification',
    loadChildren: () => import('./documents/identity-verification/identity-verification.module').then( m => m.IdentityVerificationPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'documents-index',
    loadChildren: () => import('./documents/documents-index/documents-index.module').then( m => m.DocumentsIndexPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'recharge-history',
    loadChildren: () => import('./recharge-history/recharge-history.module').then( m => m.RechargeHistoryPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'training-videos',
    loadChildren: () => import('./training-videos/training-videos.module').then( m => m.TrainingVideosPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'training-video-details/:tv_id',
    loadChildren: () => import('./training-video-details/training-video-details.module').then( m => m.TrainingVideoDetailsPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'new-leads',
    loadChildren: () => import('./new-leads/new-leads.module').then( m => m.NewLeadsPageModule),
     canActivate: [AuthGuard] 
  },
  {
    path: 'id-card',
    loadChildren: () => import('./documents/id-card/id-card.module').then( m => m.IdCardPageModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'personal-details',
    loadChildren: () => import('./documents/personal-details/personal-details.module').then( m => m.PersonalDetailsPageModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'current-address',
    loadChildren: () => import('./documents/current-address/current-address.module').then( m => m.CurrentAddressPageModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'declaration',
    loadChildren: () => import('./documents/declaration/declaration.module').then( m => m.DeclarationPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'basic-pages/:page_name',
    loadChildren: () => import('./basic-pages/basic-pages.module').then( m => m.BasicPagesPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule),
    pathMatch: 'full',
  },
  {
    path: 'leads-search',
    loadChildren: () => import('./leads-search/leads-search.module').then( m => m.LeadsSearchPageModule),
    canActivate: [AuthGuard] 

  },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
