import { auth, https, logger } from "firebase-functions";
import axios from "axios";

import { appConfig } from "../config/app";

import { EmailUtility } from "../utilities/emailUtility";

import { IEmailOptions } from "../../../tickerr-models/emailOptions";
import { EmailTemplate } from "../enums/emailTemplate";

interface IEmailService {
  fetchTemplate: (template: EmailTemplate) => Promise<string>;
  sendEmail: (label: string, user: auth.UserRecord, options: IEmailOptions) => Promise<void>;
  sendGoodbye: (user: auth.UserRecord) => Promise<void>;
  sendWelcome: (user: auth.UserRecord) => Promise<void>;
}

export const EmailService: IEmailService = {
  fetchTemplate: async (template: EmailTemplate): Promise<string> => {
    try {
      const res: any = await axios.get(template);

      return res.data;
    } catch (err) {
      logger.error(err);
    }

    throw new https.HttpsError("internal", `Unable to get [${EmailTemplate[template]}] template.`);
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

    const template: string = await EmailService.fetchTemplate(EmailTemplate.Goodbye);

    const options: any = {
      from: `${appConfig.name} <no-reply@tickerr.tv>`,
      html: EmailUtility.fillTemplate(template, { name: user.displayName }),
      subject: "Thanks for stopping by!",
      to: user.email,
    };

    return await EmailService.sendEmail(label, user, options);
  },
  sendWelcome: async (user: auth.UserRecord): Promise<void> => {
    const label: string = "Welcome";

    const template: string = await EmailService.fetchTemplate(EmailTemplate.Welcome);

    const options: any = {
      from: `${appConfig.name} <no-reply@tickerr.tv>`,      
      html: EmailUtility.fillTemplate(template, { name: user.displayName }),
      subject: `Welcome to ${appConfig.name}!`,      
      to: user.email,
    };
  
    return await EmailService.sendEmail(label, user, options);
  }
}