import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { Environments } from "./environments/environment";
import { ConfigService } from "./modules/config/config.service";
import { QueueConst } from "./modules/shared/constant/queue.const";
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);
// Setup environments
Environments.setupConfig();
import * as fs from "fs";
import { join } from "path";
import express = require("express");
import https = require("https");
import http = require("http");
import { ExpressAdapter } from "@nestjs/platform-express";
import * as helmet from "helmet";
import * as filter from "content-filter";

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    ApplicationModule,
    new ExpressAdapter(server)
  );

  app.setGlobalPrefix("/api");
  app.use("/document", express.static(join(__dirname, "..", "documentation"))); // document
  app.enableCors();
  app.use(
    bodyParser({ limit: configService.get("LIMIT_REQUEST_BODY") || "50mb" })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(
    filter({
      urlBlackList: [
        ".htaccess",
        ".htaccess.bak",
        ".htaccess~",
        "~root",
        "weblogic",
        "iisadmin",
        "iispractices",
        "index.jsp",
        "manager",
        "index.html~",
        "/.htaccess.bak",
        "htaccess.txt",
        "/.htaccess~",
        "/~root",
        "/weblogic",
        "/iisadmin",
        "/iispractices",
        "/index.jsp",
        "/manager",
        "/index.html~",
        "/.bash_history",
        "/.bashrc",
        "htpasswd.bak",
        ".htpasswd",
        ".htpasswd.old",
        ".htpasswd~",
        ".profile",
        "/.history",
        "/.mysql_history",
        "/perl",
        "/index.php",
        "/index.html.bak",
        "/index.html.old",
      ],
    })
  );

  app.use(
    filter({ urlMessage: "A forbidden expression has been found in URL: " })
  );

  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [configService.get("RABBITMQ_URL")],
  //     queue: QueueConst.PRIMARY_CONTRACT_QUEUE,
  //     queueOptions: { durable: false },
  //   },
  // });

  // swagger
  const options = new DocumentBuilder()
    .setTitle("o2o swagger")
    .setDescription("The API description")
    .setVersion("1.0")
    .addBearerAuth()
    .setBasePath(configService.get("AGG_BASE_PATH"))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("agg", app, document);

  await app.startAllMicroservicesAsync();
  const port = parseInt(configService.get("PORT"), 10);

  await app.init();
  http
    .createServer(server)
    .listen(port, () =>
      console.log("Application is listening on port: ", port)
    );
}
bootstrap();
