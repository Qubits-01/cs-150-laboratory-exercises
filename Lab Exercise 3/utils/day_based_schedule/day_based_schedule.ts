import { Day, Time, AmOrPm } from "../custom_types";

export default class DayBasedSchedule {
    // Should not be modifiable outside this class. Use getters instead.
    private readonly _days: Day[];
    private readonly _startTime: Time;
    private readonly _endTime: Time;

    constructor(
        private readonly _rawDays: string,
        private readonly _rawTime: string,
    ) {
        // [ Days[]. ]
        this._days = this.extractDays(this._rawDays);

        let [start, end]: [string, string] =
            this._rawTime.split("-") as [string, string];

        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm: AmOrPm = this.extractAmOrPm(end) as AmOrPm;
        this._endTime = this.buildTimeObj(end, () => endAmOrPm);

        // [ startTime. ]
        this._startTime = this.buildTimeObj(
            start,
            () => endAmOrPm === "AM" ? "AM" : this.extractAmOrPm(start) ?? "PM"
        );
    }

    // GETTERS.
    get days(): Day[] {
        // Return a copy of the days array (not by reference).
        return [...this._days];
    }

    get startTime(): Time {
        // Return a copy of the startTime object (not by "reference-like").
        return { ...this._startTime };
    }

    get endTime(): Time {
        // Return a copy of the endTime object (not by "reference-like").
        return { ...this._endTime };
    }

    // UTILITY METHODS.
    hasConflict(other: DayBasedSchedule): boolean {
        for (let day of this.days) {
            if (other.days.includes(day)) {

            }
        }

        return false;
    }

    /**
     * Intelligently split the days string into an array of Day.
     * Take not that thursday is represented by "Th" (not a two letter string).
     * 
     * @param {string} rawDays The raw days input string.
     * @returns {Days[]} An array of Day objects.
     */
    private extractDays(rawDays: string): Day[] {
        let days: Day[] = [];
        for (let i = 0; i < rawDays.length; i++) {
            if (rawDays[i] === "T" && rawDays[i + 1] === "h") {
                days.push("Th");
                i++;
            } else {
                days.push(rawDays[i] as Day);
            }
        }

        return days;
    }

    private extractAmOrPm(time: string): AmOrPm | null {
        let amOrPm: string | undefined =
            time.match(/([AP]M)?/g)?.filter(str => str.length > 0)[0];

        return amOrPm === undefined ? null : amOrPm as AmOrPm;
    }

    private extractHourMinute(time: string): [number, number] {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute]: [string, string | undefined] =
            time.match(hourMinuteRegex) as [string, string | undefined];

        return [parseInt(hour), minute === undefined ? 0 : parseInt(minute)];
    }

    private buildTimeObj(time: string, amOrPmCB: () => AmOrPm): Time {
        let [hour, minute]: [number, number] = this.extractHourMinute(time);

        return {
            hour: hour,
            minute: minute,
            amOrPm: amOrPmCB()
        };
    }

    private getMinutesSinceMidnight(time: Time): number {
        let minutes: number = time.hour * 60 + time.minute;

        if (time.amOrPm === "PM" && time.hour !== 12) { minutes += 12 * 60; }
        if (time.amOrPm === "AM" && time.hour === 12) { minutes -= 12 * 60; }

        return minutes;
    }
}
