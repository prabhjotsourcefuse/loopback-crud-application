import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import * as dotenv from 'dotenv';
export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext) {
    dotenv.config();
    console.log('Start %s', new Date().toLocaleTimeString());
    const referer = context.request.headers.referer;
    await super.handle(context);
    console.log('Referer %s', referer);
    console.log('User agent %s', context.request.headers['user-agent']);
    console.log('Request IP %s', context.request.ip);
    if (!referer?.includes('http://localhost:3000/explorer/')) {
      throw new Error('This refferer not allowed, to make request.');
    }
    console.log('Completion %s', new Date().toLocaleTimeString());
  }
}
