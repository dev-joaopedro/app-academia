import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.joaopedro.appacademia',
    appName: 'App Academia',
    webDir: 'public',
    server: {
        // Substitua pela URL onde o seu app está publicado (ex: Vercel)
        url: 'https://seu-app-publicado.vercel.app',
        cleartext: true
    }
};

export default config;
