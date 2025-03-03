import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.repairservicesindia.partner',
  appName: 'LC Partner',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    webContentsDebuggingEnabled: true,
    allowMixedContent: true, // Allow HTTP content in HTTPS app
  },
  "server": {
    "hostname": "localhost",    
   "iosScheme": "ionic",
   "androidScheme": "https",  
   "allowNavigation": [
     "legendcompany.in",
     "dashboard.legendcompany.in"
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
