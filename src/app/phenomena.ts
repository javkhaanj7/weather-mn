export class Phenomena {
  constructor(
    public date: string,
    public phenoIdDay: number,
    public phenoIdNight: number,
    public phenoDay: string,
    public phenoNight: string,
    public temperatureDay: number,
    public temperatureNight: number,
    public windDay: number,
    public windNight: number
  ) {}
}
