import { ZodError, ZodObject } from 'zod/v4';
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const schemaValidation =
  (schema: ZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        res.status(400).json(
          error.issues.map(issue => ({
            path: issue.path,
            message: issue.message,
          }))
        );
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  };
