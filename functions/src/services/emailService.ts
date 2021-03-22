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
        to: user.email,
      };
    
      options.subject = `Welcome to ${appConfig.name}!`;
      options.text = `Hey ${user.displayName || "there"}! Welcome to ${appConfig.name}.`;

      await transport.sendMail(options);

      logger.log(`Welcome email sent to user: ${user.displayName} at: ${user.email}`);
      return null;
    } catch (err) {
      logger.error(`Unable to send welcome email to user: ${user.displayName} at: ${user.email}`);
    }

    return;
  }
}