import { Application } from "express";
import Route from "./AuthRoute";

//Type Application ERROR TO EXPRESS
export default function appRoutes(app: Application) {
  //Config WebAdmin ROUTE HERE
  app.use(Route);
  // app.use(`/admin/${Route}`);
}
