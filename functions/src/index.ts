import { pubsub } from "firebase-functions";
import { ScheduleService } from "./services/scheduleService";

exports.scheduledTickerUpdate = pubsub
  // .schedule("0 */4 * * *")
  .schedule("*/5 * * * *")
  .onRun(ScheduleService.scheduledTickerUpdate);
  