import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrapServer() {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context) => {
    if (!server) {
        server = await bootstrapServer();
    }
    return server(event, context);
};
