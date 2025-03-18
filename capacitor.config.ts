import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.repairservicesindia.partner',
  appName: 'LC Partner',
  webDir: 'www',
  bundledWebRuntime: false,
  "backgroundColor": "#ffffff",
  android: {
    webContentsDebuggingEnabled: true,
    allowMixedContent: true, // Allow HTTP content in HTTPS app
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "CapacitorWebView": {
      "iosScheme": "https"
    }
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
