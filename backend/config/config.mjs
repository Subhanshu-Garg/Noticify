const { 
    ALLOWED_CORS_ORIGIN, 
    PORT, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRE ,
    COOKIE_EXPIRE
} = process.env


const REQUIRED_CONFIGS = [
    'ALLOWED_CORS_ORIGIN', 
    'PORT', 
    'DB_URI', 
    'JWT_SECRET',
    'JWT_EXPIRE',
    'COOKIE_EXPIRE'
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
    COOKIE_EXPIRE
}

export default configs