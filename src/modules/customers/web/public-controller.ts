import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { CustomerService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import {
  CreateCustomerRequestDto,
  InsertCustomerRequestDto,
  UpdateCustomerRequestDto,
} from "./dto/request.dto";

@ApiUseTags("[Public] Customer - API public")
@Controller("v1/public/customer")
@UseInterceptors(LoggingInterceptor)
export class CustomerPublicController {
  constructor(private readonly service: CustomerService) {}

  @ApiOperation({ title: "Find all public" })
  @ApiImplicitQuery({
    name: "page",
    required: true,
    description: "[Paging] page",
  })
  @ApiImplicitQuery({
    name: "pageSize",
    required: true,
    description: "[Paging] pageSize",
  })
  @ApiImplicitQuery({
    name: "sort",
    required: false,
    isArray: true,
    description: "[Sort] sort",
  })
  @ApiImplicitQuery({
    name: "q",
    required: false,
    description: "[Filter] Search text",
  })
  @ApiOperation({ title: "Find customer belong to employee by id" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/:id")
  findById(@Param("takeCareBy") takeCareBy: string) {
    console.log("Find customer belong to employee by id");
    return this.service.findById(takeCareBy);
  }

  @ApiOperation({ title: "Create" })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateCustomerRequestDto) {
    console.log("Create Customer Completed!");
    return await this.service.create(null, dto);
  }

  @ApiOperation({ title: "Insert" })
  @Post("/insert")
  async insertMany(@Body(new ValidationPipe()) dto: InsertCustomerRequestDto) {
    console.log("Insert Customer Completed!");
    return await this.service.insertMany(null, dto);
  }

  @ApiOperation({ title: "Update TakecareBy" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @ApiImplicitParam({
    name: "isBusinessTraining",
    description: "isBusinessTraining",
  })
  @Put(":id/:isBusinessTraining")
  updateMany(
    @Param("id") id: string,
    @Param("isBusinessTraining") isBusinessTraining: boolean
  ) {
    console.log("updated customer TakecareBy Completed");
    console.log({id},{isBusinessTraining});
    return this.service.updateMany(null, id, isBusinessTraining);
  }

  @ApiOperation({ title: "Update" })
  @Put()
  async update(@Body(new ValidationPipe()) dto: UpdateCustomerRequestDto) {
    console.log("update Customer Completed!");
    return await this.service.update(null, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    console.log({id})
    console.log("delete customer Completed");
    return await this.service.delete(null, id);
  }
}
