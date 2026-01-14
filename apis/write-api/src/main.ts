import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common'; 
import { config as dotenvConfig } from 'dotenv';
import fastifyCors from '@fastify/cors';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ResponseInterceptor } from '@app/common';
import { AllExceptionsFilter } from './configs/exceptions/allExceptionsFilter';

dotenvConfig();

async function bootstrap() {
  // 1. Inicializa o contexto para suportar @Transactional() no Repository/Service
  initializeTransactionalContext();

  // 2. Cria a aplicação usando o FastifyAdapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter({ 
      logger: true // O Logger do Fastify é excelente para debug
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 3. Configuração de CORS (Essencial para o front ou mobile acessar)
  await app.register(fastifyCors, {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] 
  });  

  // 4. Versionamento de API (Ex: /v1/users) - Boa prática para redes sociais
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 5. Filtro Global de Exceções
  //app.useGlobalFilters(new AllExceptionsFilter());

  // 6. Pipes de Validação com suporte a variáveis de ambiente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: process.env.TRANSFORM === 'true', 
      whitelist: process.env.WHITELIST === 'true', 
      forbidNonWhitelisted: process.env.FORBIDNONWHITELISTED === 'true', 
    }),
  );

  // 7. Configuração do Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Social Network - Write API')
    .setDescription('API de escrita para a rede social (CQRS - Command Side)')
    .setVersion('1.0')
    .addBearerAuth() 
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document); // Acessível em http://localhost:PORT/api/docs

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0'); // 0.0.0.0 é importante para Docker/Cloud
  
  console.log(`🚀 Write-API is running on: http://localhost:${port}/v1`);
  console.log(`📑 Swagger Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();