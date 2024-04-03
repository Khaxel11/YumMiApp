import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yummipart.app',
  appName: 'yummi-partner',
  webDir: 'dist/Yummi-Partner',
  server: {
    androidScheme: 'https'
  }
};

export default config;
