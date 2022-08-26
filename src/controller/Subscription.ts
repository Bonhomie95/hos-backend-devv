import { Request, Response } from "express";
import webpush from "web-push";
import { ResponseHandler } from "../../lib/src/helpers";


export const Subscription = async (req: Request, res: Response) => {
      //get push subscription object from the request
      const subscription = req.body;

      //send status 201 for the request
      ResponseHandler.created(res);
  
      //create paylod: specified the detals of the push notification
      const payload = JSON.stringify({title: 'Those Push Notification' });
  
      //pass the object into sendNotification fucntion and catch any error
      webpush.sendNotification(subscription, payload).catch(err=> console.error(err));

  
  };