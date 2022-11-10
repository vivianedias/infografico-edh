export const IS_IN_MAINTENANCE: boolean = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1"

export const env: string = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development';

export const AIRTABLE_PROD_VIEW_ID = 'app828vzD9bQ4PNrN'
export const AIRTABLE_STG_VIEW_ID = 'appr381bOTFO44bQX'