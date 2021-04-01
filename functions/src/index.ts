import { auth } from "firebase-functions";

import { EmailService } from "./services/emailService";
import { UserService } from "./services/userService";

exports.sendWelcomeEmail = auth.user().onCreate((user: auth.UserRecord) => {
  return EmailService.sendWelcome(user);
});

exports.sendGoodbyeEmail = auth.user().onDelete(async (user: auth.UserRecord) => {
  await UserService.deleteProfile(user);
  
  return EmailService.sendGoodbye(user);
});