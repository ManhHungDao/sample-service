import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { acRoles } from "../../modules/auth/app.roles";

import _ = require("lodash");

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = acRoles.getRoles();
    // console.log(' acRoles.getRoles() =>', roles);

    if (!roles) return false;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) return false;

    if (!user.roles) return false;

    // import _ = require('lodash');
    user.roles = _.intersectionWith(roles, user.roles, _.isEqual);

    const hasRole = () =>
      user.roles.some((role) => !!roles.find((item) => item === role));
    // console.log('user =>', user);
    // console.log('user.roles =>', user.roles);
    console.log("hasRole =>", hasRole());

    return hasRole();
  }
}
