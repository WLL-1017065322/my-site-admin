import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { HashPasswordMiddleware } from "src/middlewares/hash-password.middleware";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/guards/auth.guard";


// 在使用的控制器对应的Module中配置Model

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('user/register')
  }
}
