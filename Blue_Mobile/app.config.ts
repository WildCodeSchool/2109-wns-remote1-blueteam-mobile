import 'dotenv/config';

import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,

    extra: {
        apiUrl: process.env.API_URL ?? '/graphql',
    },
});