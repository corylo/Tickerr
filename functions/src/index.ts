import { auth } from "firebase-functions";

import { EmailService } from "./services/emailService";

exports.sendWelcomeEmail = auth.user().onCreate((user: auth.UserRecord) => {
  return EmailService.sendWelcome(user);
});