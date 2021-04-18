interface IDateUtility {
  formatTime: (time: number) => string;
  getTime: (timestamp: number) => string;
}

export const DateUtility: IDateUtility = {
  formatTime: (time: number): string => {
    return time < 10 ? `0${time}` : time.toString();
  },
  getTime: (timestamp: number): string => {
    const date: Date = new Date(timestamp);

    const hours: number = date.getHours(),    
      minutes = DateUtility.formatTime(date.getMinutes()),    
      seconds = DateUtility.formatTime(date.getSeconds()),
      period: string = hours >= 12 ? "PM" : "AM";

    return `${hours % 12}:${minutes}:${seconds}${period}`;
  }
}