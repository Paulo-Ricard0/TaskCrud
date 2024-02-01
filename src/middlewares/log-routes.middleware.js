export const logRoutes = (req, res, next) => {
  const requestStart = Date.now();
  res.on("finish", () => {
    console.log("Log routes:", {
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - requestStart,
      rawHeaders: req.rawHeaders,
      httpVersion: req.httpVersion,
      method: req.method,
      remoteAddress: req.connection.remoteAddress,
      remoteFamily: req.connection.remoteFamily,
      url: req.url,
    });
  });
  next();
};
