import { auth, logger } from "firebase-functions";

import { appConfig } from "../config/app";
import { transport } from "../config/email";

import { IEmailOptions } from "../../../tickerr-models/emailOptions";

interface IEmailService {
  sendEmail: (label: string, user: auth.UserRecord, options: IEmailOptions) => Promise<void>;
  sendGoodbye: (user: auth.UserRecord) => Promise<void>;
  sendWelcome: (user: auth.UserRecord) => Promise<void>;
}

export const EmailService: IEmailService = {
  sendEmail: async (label: string, user: auth.UserRecord, options: IEmailOptions): Promise<void> => {
    try {
      await transport.verify();
      await transport.sendMail(options);

      logger.log(`[${label}] email sent to user: ${user.displayName} at: ${user.email}`);
    } catch (err) {
      logger.error(err);

      logger.error(`Unable to send [${label}] email to user: ${user.displayName} at: ${user.email}`);
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

    const options: any = {
      from: `${appConfig.name} <no-reply@tickerr.tv>`,
      subject: `Welcome to ${appConfig.name}!`,
      text: `Hey ${user.displayName || "there"}! Welcome to ${appConfig.name}.`,
      to: user.email,
    };
  
    return await EmailService.sendEmail(label, user, options);
  }
}