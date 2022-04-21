import { CmdPatternConst } from "../constant/index";

export interface IMessagingPattern {
  queue: string;
  data: any;
}

export class InfoMessagePattern implements IMessagingPattern {
  queue: string;
  data: any;

  constructor(queue: string, data: any) {
    this.queue = `${CmdPatternConst.CMD_PATTERN}.info.${queue}`;
    this.data = data;
  }
}

export class ErrorMessagePattern implements IMessagingPattern {
  queue: string;
  data: any;

  constructor(queue: string, data: any) {
    this.queue = `${CmdPatternConst.CMD_PATTERN}.error.${queue}`;
    this.data = data;
  }
}

export class DataMessagePattern {
  data: any;

  constructor(data: any) {
    this.data = data;
  }
}
