import { Service } from 'egg';
import { IGetNewsListParams, IHttpGetParams, INewsData, IPageData } from '../../typings';
import { getPageData } from '../lib/utils';

export default class Api extends Service {

  public async getNewsList({ type, pageNum, count }: IGetNewsListParams): Promise<IPageData<INewsData>> {
    const { ctx } = this;
    // 默认值设置
    const pageNumber: number = pageNum || 0;
    const pageCount: number = count || 10;
    
    // 请求数据
    return ctx.httpGet(<IHttpGetParams>{
      url: ctx.app.config.API.GET_NEWS_LIST,
      data: {
        type: type || 'top'
      },
      success(data) {
        // data是返回30条数据，用getPageData按照pageNumber, pageCount来切换数据返回分页数据
        // INewsData 泛型，调用函数的时候传入函数内部的变量类型
        /*
          T就是INewsData
          function getPageData<T>(data: Array<T>, pageNum: number, count: number): IPageData<T> {
            const retInfo: IPageData<T> = {
              hasMore: true,
              data: []
            }

            if (data.length <= count) {
              retInfo.data?.concat(data);
              retInfo.hasMore = false;
            } else {
              const pageCount: number = Math.ceil(data.length / count);

              if (pageNum >= pageCount) {
                retInfo.data = null;
                retInfo.hasMore = false;
              } else {
                retInfo.data = data.splice(pageNum * count, count);
                retInfo.hasMore = true;
              }
            }

            return retInfo;
          }
        
        */
        return getPageData<INewsData>(data, pageNumber, pageCount);
      },
      fail (err) {
        throw new Error('Request failed' + err);
      }
    })

  }
}
