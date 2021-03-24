import { auth, logger } from "firebase-functions";

import { appConfig } from "../config/app";
import { transport } from "../config/email";

interface IEmailService {
  sendWelcome: (user: auth.UserRecord) => Promise<void>;
}

export const EmailService: IEmailService = {
  sendWelcome: async (user: auth.UserRecord): Promise<void> => {
    try {
      const options: any = {
        from: `${appConfig.name} <no-reply@tickerr.tv>`,
        subject: `Welcome to ${appConfig.name}!`,
        text: `Hey ${user.displayName || "there"}! Welcome to ${appConfig.name}.`,
        to: user.email,
      };
    
      await transport.verify();
      await transport.sendMail(options);

      logger.log(`Welcome email sent to user: ${user.displayName} at: ${user.email}`);
    } catch (err) {
      logger.error(err);

      logger.error(`Unable to send welcome email to user: ${user.displayName} at: ${user.email}`);
    }

    return;
  }
}