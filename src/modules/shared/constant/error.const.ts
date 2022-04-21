import { isNullOrUndefined } from "util";

export class ErrorConst {
  static Error(
    type,
    object?: string,
    property?: string,
    value?: string,
    pushError?
  ) {
    let error = {};
    let key = type.key;
    let text = type.text;
    if (!object) object = "";

    key = key.replace("{object}", object);
    text = text.replace("{object}", object);

    if (!property) property = "";
    // if (property && property.length > 0) {
    key = key.replace("{property}", property);
    text = text.replace("{property}", property);
    // }
    if (!value) value = "";
    // if (value && value.length > 0) {
    key = key.replace("{value}", value);
    text = text.replace("{value}", value);
    // }
    error[key] = text;
    if (!isNullOrUndefined(pushError)) error = Object.assign(pushError, error);
    return error;
  }

  // common error
  static INVALID = {
    key: `{object}.invalid.field.{property}`,
    text: `{object} {property} nhập thông tin bị sai. {value}`,
  };
  static CANT_MODIFY = {
    key: `{object}.invalid.field.{property}`,
    text: `{object} {property} không thể sửa. {value}`,
  };
  static CANT_APPROVE = {
    key: `{object}.invalid.field`,
    text: `{object} không thể duyệt`,
  };
  static NOT_FOUND = {
    key: `{object}.not.found`,
    text: `{object} không tìm thấy bởi {property}: {value}`,
  };
  static EXISTED = {
    key: `{object}.existed`,
    text: `{object} đã tồn tại. Vui lòng kiểm tra lại.`,
  };
  static DUPLICATED = {
    key: `{object}.duplicated.{property}`,
    text: `{object} bị trùng lặp {property} : {value}. Vui lòng kiểm tra lại.`,
  };
  static CHANGED = {
    key: `{object}.{property}.changed`,
    text: `{object} {property} đã bị thay đổi. Vui lòng kiểm tra lại.`,
  };
  static UNAUTHORIZED = {
    key: `unauthorized.error`,
    text: `Bạn không có quyền truy cập chức năng này.`,
  };
  static INTEGRATE = {
    key: `{object}.integrate.{property}.error`,
    text: `Tích hợp {object} bị lỗi tại {property}: {value}. Vui lòng kiểm tra lại.`,
  };
  static INVALID_INPUT = {
    key: `{object}.invalid.input.error`,
    text: `{object} nhập sai kiểu dữ liệu. Xin vui lòng thử lại`,
  };
}
