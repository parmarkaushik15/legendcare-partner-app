import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.repairservicesindia.partner',
  appName: 'LC Partner',
  webDir: 'www',
  bundledWebRuntime: false,

  "server": {
    "hostname": "localhost",    
   "iosScheme": "ionic",
   "androidScheme": "https",  
   "allowNavigation": [
     "legendcompany.in"  
   ]
 }

  // cordova: {
  //   preferences: {
  //     ScrollEnabled: 'false',
  //     BackupWebStorage: 'none',
  //     SplashMaintainAspectRatio: 'true',
  //     FadeSplashScreenDuration: '300',
  //     SplashShowOnlyFirstTime: 'false',
  //     SplashScreen: 'splash',
  //     SplashScreenDelay: '3000'
  //   }
  // }
};

export default config;
