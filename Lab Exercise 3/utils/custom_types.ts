type Day = "M" | "T" | "W" | "Th" | "F" | "S";
type AmOrPm = "AM" | "PM";
type Time = { hour: number, minute: number, amOrPm: AmOrPm };

export { Day, AmOrPm, Time };
