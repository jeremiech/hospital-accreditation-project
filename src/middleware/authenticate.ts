import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function guestMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) next();
  else res.redirect("/");
}

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_TOKEN_SECRET || "", (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user);
        next();
      });
    } else res.sendStatus(401);
  } else res.redirect("/auth/login");
}

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_TOKEN_SECRET || "", (err, user) => {
        if (err) return res.sendStatus(403);
        if (user === "admin") next(); // TODO: check user role
      });
    } else res.sendStatus(401);
  } else res.redirect("/");
}

export { guestMiddleware, userMiddleware, adminMiddleware };
