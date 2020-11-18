import { Controller } from 'egg';
import { IGetNewsListParams } from '../../typings';

/**
 * 
 * 请求参数列表 { type, pageNum, count }

 */

export default class ApiController extends Controller {
  public async getNewsList (): Promise<void> {
    const { ctx } = this;
    // 请求体内拿到请求参数
    const { type, pageNum, count }: IGetNewsListParams = ctx.request.body;
    
    // 执行service内的getNewsList方法，请求数据
    ctx.body = await ctx.service.api.getNewsList({ type, pageNum, count });
  }
  public async test (): Promise<void> {
    const { ctx } = this;
    // 请求体内拿到请求参数
    
    // 执行service内的getNewsList方法，请求数据
    ctx.body = await 11111111111111;
  }
}


