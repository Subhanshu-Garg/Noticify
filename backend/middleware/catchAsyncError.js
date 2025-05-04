export default function catchAsyncError(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            next(error)
        });
    }
}