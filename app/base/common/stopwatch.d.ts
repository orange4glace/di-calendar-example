export declare class StopWatch {
    private _highResolution;
    private _startTime;
    private _stopTime;
    static create(highResolution?: boolean): StopWatch;
    constructor(highResolution: boolean);
    stop(): void;
    elapsed(): number;
    private _now;
}
