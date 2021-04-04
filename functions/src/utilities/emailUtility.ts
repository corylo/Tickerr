import { config } from "firebase-functions";
import mailer from "nodemailer";
import Handlebars from "handlebars";

interface IEmailUtility {
  getTemplate: (html: string, data: any) => string;
  getTransport: () => any;
}

export const EmailUtility: IEmailUtility = {
  getTemplate: (html: string, data: any): string => {
    return Handlebars.compile(html)(data);
  },
  getTransport: (): any => {
    return mailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: config().gmail.user,
        serviceClient: config().service.client_id,
        privateKey: config().service.private_key.replace(/\\n/g, "\n"),
        accessToken: config().oauth.access_token
        // clientId: config().oauth.client_id,
        // clientSecret: config().oauth.client_secret,
        // refreshToken: config().oauth.refresh_token,    
      }
    })
  }
}