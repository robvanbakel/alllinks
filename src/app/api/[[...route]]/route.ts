import { linkRouter } from "@/app/api/[[...route]]/routers/link";
import { profileRouter } from "@/app/api/[[...route]]/routers/profile";
import { userRouter } from "@/app/api/[[...route]]/routers/user";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono()
  .basePath("/api")
  .route("/link", linkRouter)
  .route("/user", userRouter)
  .route("/profile", profileRouter);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
