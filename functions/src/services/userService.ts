import { auth, logger } from "firebase-functions";

import { db } from "../../firebase";

interface IUserService {
  deleteProfile: (user: auth.UserRecord) => Promise<void>;
}

export const UserService: IUserService = {
  deleteProfile: async (user: auth.UserRecord): Promise<void> => {
    try {
      await db.collection("users")
        .doc(user.uid)
        .delete();
      
      logger.log(`User: ${user.displayName} has been deleted.`);
    } catch (err) {
      logger.error(err);

      logger.error(`Unable to delete user: ${user.displayName}.`);
    }

    return;
  }
}