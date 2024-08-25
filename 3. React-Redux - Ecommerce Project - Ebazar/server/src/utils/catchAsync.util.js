/**
 * Return a function that catches and forwards any error a function throws to the next middleware, globally
 * @param {Function} fn - input function that catchAsync wraps around
 */
function catchAsync(fn) {
  return function (req, res, next) {

     // Promise wrapper Ensures the function returns a promise, even if it's synchronous
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // console.error('Error in catchAsync:', err); 
      next(err); 
    });
  }
}

module.exports = {catchAsync};