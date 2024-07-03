import express from 'express';
import serverless from 'serverless-http';


import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appInstance = app.getHttpAdapter().getInstance()
    const handler = serverless(appInstance);
    return handler
}

export const handler = bootstrap();

