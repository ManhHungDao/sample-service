export class CommonConst {
  static DATABASE_SERVICE_READ_MODEL = "msx-ManagerCustomer-readmodel";
  static DATABASE_SERVICE_EVENTS_MODEL = "msx-ManagerCustomer-eventstore";
  static HEADER_PARTERN_STR = "pattern";
  static DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh";

  static DOMAIN_CONNECTION_TOKEN = "Domain-DbConnectionToken";
  static QUERY_CONNECTION_TOKEN = "Query-DbConnectionToken";
  static DOMAIN_MODEL_TOKEN = "Domain-ModelToken";
  static QUERY_MODEL_TOKEN = "Query-ModelToken";
  static CODE_COLLECTION = "code-generates";

  static SURVEY_QUERY_MODEL_TOKEN = "Survey-Query-ModelToken";
  static SURVEY_AGGREGATE_NAME = "Survey";
  static SURVEY_COLLECTION = "Surveys";

  static EMPLOYEE_QUERY_MODEL_TOKEN = "Employee-Query-ModelToken";
  static EMPLOYEE_AGGREGATE_NAME = "employee";
  static EMPLOYEE_COLLECTION = "employees";

  static CUSTOMER_QUERY_MODEL_TOKEN = "Customer-Query-ModelToken";
  static CUSTOMER_AGGREGATE_NAME = "customer";
  static CUSTOMER_COLLECTION = "customers";

  static PRACTICE_QUERY_MODEL_TOKEN = "Practice-Query-ModelToken";
  static PRACTICE_AGGREGATE_NAME = "practice";
  static PRACTICE_COLLECTION = "practices";

  static PROJECTLEAD_QUERY_MODEL_TOKEN = "Projectlead-Query-ModelToken";
  static PROJECTLEAD_AGGREGATE_NAME = "projectLead";
  static PROJECTLEAD_COLLECTION = "projectLeads";

  static AGGREGATE_NAMES(): Object[] {
    return Object.keys(this.AGGREGATES).map((key) => this.AGGREGATES[key].NAME);
  }

  static AGGREGATES = {
    EMPLOYEE: {
      NAME: CommonConst.EMPLOYEE_AGGREGATE_NAME,
      CREATED: CommonConst.EMPLOYEE_AGGREGATE_NAME + "Created",
      UPDATED: CommonConst.EMPLOYEE_AGGREGATE_NAME + "Updated",
      DELETED: CommonConst.EMPLOYEE_AGGREGATE_NAME + "Deleted",
      EVENTS: "events-" + CommonConst.EMPLOYEE_AGGREGATE_NAME,
      COLLECTION: CommonConst.EMPLOYEE_AGGREGATE_NAME,
    },
    SURVEY: {
      NAME: CommonConst.SURVEY_AGGREGATE_NAME,
      CREATED: CommonConst.SURVEY_AGGREGATE_NAME + "Created",
      UPDATED: CommonConst.SURVEY_AGGREGATE_NAME + "Updated",
      DELETED: CommonConst.SURVEY_AGGREGATE_NAME + "Deleted",
      EVENTS: "events-" + CommonConst.SURVEY_AGGREGATE_NAME,
      COLLECTION: CommonConst.SURVEY_AGGREGATE_NAME,
    },
    CUSTOMER: {
      NAME: CommonConst.CUSTOMER_AGGREGATE_NAME,
      CREATED: CommonConst.CUSTOMER_AGGREGATE_NAME + "Created",
      UPDATED: CommonConst.CUSTOMER_AGGREGATE_NAME + "Updated",
      DELETED: CommonConst.CUSTOMER_AGGREGATE_NAME + "Deleted",
      EVENTS: "events-" + CommonConst.CUSTOMER_AGGREGATE_NAME,
      COLLECTION: CommonConst.CUSTOMER_AGGREGATE_NAME,
    },
    PRACTICE: {
      NAME: CommonConst.PRACTICE_AGGREGATE_NAME,
      CREATED: CommonConst.PRACTICE_AGGREGATE_NAME + "Created",
      UPDATED: CommonConst.PRACTICE_AGGREGATE_NAME + "Updated",
      DELETED: CommonConst.PRACTICE_AGGREGATE_NAME + "Deleted",
      EVENTS: "events-" + CommonConst.PRACTICE_AGGREGATE_NAME,
      COLLECTION: CommonConst.PRACTICE_AGGREGATE_NAME,
    },
    PROJECTLEAD: {
      NAME: CommonConst.PROJECTLEAD_AGGREGATE_NAME,
      CREATED: CommonConst.PROJECTLEAD_AGGREGATE_NAME + "Created",
      UPDATED: CommonConst.PROJECTLEAD_AGGREGATE_NAME + "Updated",
      DELETED: CommonConst.PROJECTLEAD_AGGREGATE_NAME + "Deleted",
      EVENTS: "events-" + CommonConst.PROJECTLEAD_AGGREGATE_NAME,
      COLLECTION: CommonConst.PROJECTLEAD_AGGREGATE_NAME,
    },
  };
}
