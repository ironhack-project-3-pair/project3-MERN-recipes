module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    if (err.name === "UnauthorizedError") {
      // console.log(err.code) // invalid_token
      // console.log(err.status) // 401
      res.status(401).json({UnauthorizedError: err.inner});
    }

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      // console.log(err)
      console.log(err.message) // Unexpected token } in JSON at position 49
      console.log(err.name) // SyntaxError
      // console.log(err.statusCode) // 400 (Bad Request)
      // console.log(err.status) // idem
      // console.log(err.body) // json body data
      // console.log(err.type) // "entity.parse.failed"
      // console.log(err.stack)
      // res.status(500).json(err) // stack, message and name properties are somehow removed from received error in client... 
      // res.status(500).json({
      //   message: "Internal server error. Check the server console",
      // });
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      res.status(err.statusCode).json({
        message: err.name + ": " + err.message,
        error: err,
      });
    }
  });
};
