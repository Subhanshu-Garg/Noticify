const { 
    ALLOWED_CORS_ORIGIN, 
    PORT, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRE ,
    COOKIE_EXPIRE,
    REDIS_URL
} = process.env


const REQUIRED_CONFIGS = [
    'ALLOWED_CORS_ORIGIN', 
    'PORT', 
    'DB_URI', 
    'JWT_SECRET',
    'JWT_EXPIRE',
    'COOKIE_EXPIRE',
    'REDIS_URL'
]

REQUIRED_CONFIGS.map(configKey => {
    if(!process.env[configKey]) {
        console.error(`Missing config: ${configKey}`)
        process.exit(1)
    }
})

const configs = {
    ALLOWED_CORS_ORIGIN: ALLOWED_CORS_ORIGIN.split(','),
    PORT,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRE,
    COOKIE_EXPIRE,
    REDIS_URL
}

export default configs