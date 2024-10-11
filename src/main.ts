import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const port = process.env.PORT || 3900;
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
}

bootstrap();
