export const isProd = () => process.env.STAGE === 'prod' || process.env.NODE_ENV === 'production';
