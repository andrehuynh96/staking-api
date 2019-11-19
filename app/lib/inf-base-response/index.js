
function infBaseResponse(options = {}) {
  return function infBaseResponse(req, res, next) {
    // TODO: include extended data like paging, rate limit, ...
    function success(data, statusCode) {
      res.status(statusCode).json({
        data: data
      });
    }

    function failure(message, statusCode) {
      res.status(statusCode).json({
        message: message,
        error: "error"
      });
    }

    res.success = success;
    res.failure = failure;

    res.ok = data => {
      success(data, 200);
    };

    res.badRequest = (message = "Bad Request") => {
      failure(message, 400);
    };

    res.notFound = (message = "Not Found") => {
      failure(message, 404);
    };

    res.serverInternalError = (message = "Server Internal Error") => {
      if (message == "Server Internal Error") {
        message = res.__('SERVER_ERROR');
      }

      failure(message, 500);
    };

    res.forbidden = (message = "Forbidden") => {
      failure(message, 403);
    };

    res.unauthorized = (message = "Unauthorized") => {
      if (message == "Unauthorized") {
        message = res.__('UNAUTHORIZED');
      }
      failure(message, 401);
    };

    next();
  };
}

module.exports = infBaseResponse;
