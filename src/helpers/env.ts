import process from 'node:process'

export const IS_DEV = process.env.NODE_ENV === 'development'
