export class CmdPatternConst {
  static USER_EXISTENCE_CMD = "spx-adsg.user.existence";
  static SETUP_FEATURE = "spx-adsg.feature.setup";
  static VERIFY_USER = "spx-adsm.sts.findUserByMsx";
  static SEND_REGISTER_AUTO_USER = "spx-adsg-mailer-pwdUser";
  static SEND_LOG = "spx-adsg.logger.log";
  static SEND_ERROR = "spx-adsg.logger.error";

  static SERVICE_NAME = "communication";
  static CMD_PATTERN = "spx-adsg";

  static REALTIME_EVENT_USER = {};

  static NOTIFY = {
    INFO: CmdPatternConst.CMD_PATTERN + ".notification.info",
    ERROR: CmdPatternConst.CMD_PATTERN + ".notification.error",
    EVENT_TO_USER: CmdPatternConst.CMD_PATTERN + ".notifier.to.user",
  };

  static USER = {
    SIGNED: CmdPatternConst.CMD_PATTERN + ".user.signed",
    RESET_ROLE: CmdPatternConst.CMD_PATTERN + ".user.role.reset",
    CREATE_USER_WITH_PASSWORD:
      CmdPatternConst.CMD_PATTERN + ".user.create.with.password",
    GET_ROLE: CmdPatternConst.CMD_PATTERN + ".user.get.role",
    GET_MASTER_DATA: CmdPatternConst.CMD_PATTERN + ".get.master.data",
  };

  static NOTIFICATION = {
    MESSAGE: CmdPatternConst.CMD_PATTERN + ".notification.message",
  };
  static LISTENER = {
    EMPLOYEE: CmdPatternConst.CMD_PATTERN + ".employee.listener",
  };
}
