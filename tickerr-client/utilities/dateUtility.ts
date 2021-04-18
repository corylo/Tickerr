interface IDateUtility {
  formatRelative: (seconds: number) => string;
  formatTime: (time: number) => string;
  getTime: (timestamp: number) => string;
}

export const DateUtility: IDateUtility = {
  formatRelative: (seconds: number): string => {
    const relativeMillis: number = Math.abs(
        seconds * 1000 - new Date().getTime()
      ),
      relativeSeconds: number = Math.round(relativeMillis / 1000);

    if (relativeSeconds < 60) {
      return `${relativeSeconds}s`;
    }

    const relativeMinutes: number = Math.floor(relativeSeconds / 60);

    if (relativeMinutes < 60) {
      return `${relativeMinutes}m`;
    }

    const relativeHours: number = Math.floor(relativeMinutes / 60);

    if (relativeHours < 24) {
      return `${relativeHours}h`;
    }

    const relativeDays: number = Math.floor(relativeHours / 24);

    if (relativeDays < 7) {
      return `${relativeDays}d`;
    }

    const relativeWeeks: number = Math.floor(relativeDays / 7);

    if (relativeWeeks < 4) {
      return `${relativeWeeks}w`;
    }

    const relativeMonths: number = Math.floor(relativeDays / 30.41666);

    if (relativeMonths < 12) {
      return `${relativeMonths}M`;
    }

    const relativeYears: number = Math.floor(relativeDays / 365);

    return `${relativeYears}y`;
  },
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