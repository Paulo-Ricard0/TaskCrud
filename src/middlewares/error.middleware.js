export const erroMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Erro interno do servidor.";
  return res.status(statusCode).json({ message });
};

