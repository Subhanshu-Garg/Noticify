const HealthCheckController = {
    HealthCheck
}
export default HealthCheckController

function HealthCheck(req, res, next) {
    console.info('Health Check Successful.')
    res.status(200).json({
        success: true,
        message: 'Health Check Successful.'
    })
}