import { auth } from "firebase-functions";

import { EmailService } from "./services/emailService";
import { UserService } from "./services/userService";

exports.sendWelcomeEmail = auth.user().onCreate(async (user: auth.UserRecord) => {
  return await EmailService.sendWelcome(user);
});

exports.sendGoodbyeEmail = auth.user().onDelete(async (user: auth.UserRecord) => {
  await UserService.deleteProfile(user);
  
  return await EmailService.sendGoodbye(user);
});