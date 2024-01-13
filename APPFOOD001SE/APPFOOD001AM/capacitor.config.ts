import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ciipdetec.FoodDeliveryApp',
  appName: 'food-delivery-app',
  webDir: 'dist/food-delivery-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
