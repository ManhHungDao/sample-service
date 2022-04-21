import _ = require("lodash");
export class CommonUtils {
  static objectNotEmpty(value: any) {
    if (!value) return false;
    return Object.keys(value).length > 0;
  }
  static transformSort(paramSort?: String) {
    let sort: any = paramSort;
    if (_.isString(sort)) {
      sort = sort.split(",");
    }
    if (Array.isArray(sort)) {
      let sortObj = {};
      sort.forEach((s) => {
        if (s.startsWith("-")) sortObj[s.slice(1)] = -1;
        else sortObj[s] = 1;
      });
      return sortObj;
    }
    return sort;
  }
  static getCustomerAge(customer) {
    if (_.get(customer, "onlyYear") && _.get(customer, "birthdayYear")) {
      return new Date().getFullYear() - parseInt(customer.birthdayYear);
    }
    if (!_.get(customer, "onlyYear") && _.get(customer, "birthday")) {
      return (
        new Date().getFullYear() - new Date(customer.birthday).getFullYear()
      );
    }
    return null;
  }
  static getCustomerMapping(customer, employee?) {
    const age = this.getCustomerAge(customer);
    return {
      code: customer.code,
      info: {
        gender: customer.gender,
        onlyYear: customer.onlyYear,
        birthday: customer.onlyYear !== true ? customer.birthday : null,
        birthdayYear: customer.onlyYear === true ? customer.birthdayYear : null,
        address: customer.address,
        rootAddress: customer.rootAddress,
        taxCode: customer.taxCode,
        age: age,
      },
      bankInfo: customer.bankInfo,
      personalInfo: {
        email: customer.email,
        phone: customer.phone,
        name: customer.name,
        identities: [
          {
            value: customer.identityNumber,
            date: customer.identityIssueDate,
            place: customer.identityIssueLocation,
          },
        ],
      },
      employee: customer.employeeTakeCare
        ? customer.employeeTakeCare
        : employee || null,
      identities: [
        {
          value: customer.identityNumber,
          date: customer.identityIssueDate,
          place: customer.identityIssueLocation,
        },
      ],
      identityNumber: customer.identityNumber,
      identityDate: customer.identityIssueDate,
      identityPlace: customer.identityIssueLocation,
      email: customer.email,
      phone: customer.phone,
      name: customer.name,
      taxCode: customer.taxCode,
    };
  }
}
