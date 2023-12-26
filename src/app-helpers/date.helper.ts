import { OrderHelper } from "../app-helpers/Order.hepler";

function addMinutesToDate(date: any, minutes: any) {
  const startDate = new Date(new Date(date).toUTCString());
  return startDate.setMinutes(startDate.getMinutes() + minutes);
}

export default { addMinutesToDate };

export function GetExpiredTime(
  startingTime: string,
  blocks: number,
  minute = 0
) {
  let endTime = null;
  if (startingTime) {
    endTime = new Date(startingTime);
    //endTime.setHours(endTime.getHours() + hour);
    if (blocks > 0) {
      endTime.setHours(endTime.getHours() + blocks * OrderHelper.BLOCK);
    }

    if (minute > 0) {
      endTime.setMinutes(endTime.getMinutes() + minute);
    }
  }
  return endTime;
}

export function getRemainingTimeFromExpired(endTime: string) {
  const now = new Date().getTime();
  let remainingTime = null;
  if (endTime) {
    const endTimeDate = new Date(endTime);
    const expireTime = endTimeDate.getTime();
    remainingTime = (expireTime - now) / (3600 * 1000);
  } else {
    remainingTime = 0;
  }
  return remainingTime;
}
