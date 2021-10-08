import { pubsub } from "firebase-functions";
import { ScheduleService } from "./services/scheduleService";

exports.scheduledTickerUpdate = pubsub
  .schedule("0 */4 * * *")  
  .onRun(ScheduleService.scheduledTickerUpdate);
  