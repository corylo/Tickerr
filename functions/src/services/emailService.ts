import { auth, logger } from "firebase-functions";
import axios from "axios";

import { appConfig } from "../config/app";

import { EmailUtility } from "../utilities/emailUtility";

import { IEmailOptions } from "../../../tickerr-models/emailOptions";

interface IEmailService {
  getWelcomeTemplate: () => Promise<string>;
  sendEmail: (label: string, user: auth.UserRecord, options: IEmailOptions) => Promise<void>;
  sendGoodbye: (user: auth.UserRecord) => Promise<void>;
  sendWelcome: (user: auth.UserRecord) => Promise<void>;
}

export const EmailService: IEmailService = {
  getWelcomeTemplate: async (): Promise<string> => {
    try {
      const res: any = await axios.get("https://firebasestorage.googleapis.com/v0/b/tickerr-tv.appspot.com/o/emails%2Ftemplates%2Fwelcome.html?alt=media&token=42132f2b-b1fd-4497-a62a-a69bef00cc07");

      return res.data;
    } catch (err) {
      logger.error(err);

      logger.error("Unable to get welcome template.");
    }

    return "";
  },
  sendEmail: async (label: string, user: auth.UserRecord, options: IEmailOptions): Promise<void> => {
    try {
      const transport: any = EmailUtility.getTransport();

      await transport.verify();
      await transport.sendMail(options);

      logger.log(`[${label}] email sent to user: ${user.displayName} at: ${user.email}.`);
    } catch (err) {
      logger.error(err);

      logger.error(`Unable to send [${label}] email to user: ${user.displayName} at: ${user.email}.`);
    }

    return;
  },
  sendGoodbye: async (user: auth.UserRecord): Promise<void> => {
    const label: string = "Goodbye";

    const options: any = {
      from: `${appConfig.name} <no-reply@tickerr.tv>`,
      subject: "Come back again soon!",
      text: `Thanks for stopping by${user.displayName ? `, ${user.displayName}` : ""}! Hope to see you again soon.`,
      to: user.email,
    };

    return await EmailService.sendEmail(label, user, options);
  },
  sendWelcome: async (user: auth.UserRecord): Promise<void> => {
    const label: string = "Welcome";

    const template: string = await EmailService.getWelcomeTemplate();

    const options: any = {
      from: `${appConfig.name} <no-reply@tickerr.tv>`,      
      html: EmailUtility.getTemplate(template, { name: user.displayName }),
      subject: `Welcome to ${appConfig.name}!`,
      // text: `Hey ${user.displayName || "there"}! Welcome to ${appConfig.name}.`,
      to: user.email,
    };
  
    return await EmailService.sendEmail(label, user, options);
  }
}