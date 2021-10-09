import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ChannelChats } from './src/entities/ChannelChats';
import { Mentions } from './src/entities/Mentions';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Users } from './src/entities/Users';
import { DMs } from './src/entities/DMs';
import { Channels } from './src/entities/Channels';
import { Workspaces } from './src/entities/Workspaces';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
  keepConnectionAlive: true, // 이거 안켜두면 핫리로딩때마다 db연결 끊김
};

export = config;