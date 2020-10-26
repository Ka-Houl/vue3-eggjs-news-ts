import { IPageData } from '../../typings';

function typeOf(value: string): string {
  if (value === null) {
    return 'null';
  }

  return typeof(value) === 'object' ? {
    '[object Object]': 'Object',
    '[object Array]': 'Array'
  }[({}).toString.call(value)] : typeof(value);
}


// 对象 -> 定义接口  data参数不定
/**
 * 
 * interface IRequestData {
 *   [key: string]: any
 * }
 */
function formatParams(data: any, appkey: string): string {
  
  // data一定是一个对象才行
  if (typeOf(data) !== 'Object') {
    throw new Error('Option "data" must be a type Object');
  }
  
  // 拼接的参数是?type=top&key=APPKEY
  let paramStr: string = '?';
  
  // 遍历对象，拼接paramStr
  for (let key in data) {
    paramStr += `${key}=${data[key]}&`;
  }
  // 判断有没有appkey, 有就继续拼接，没有则把原来的&去掉
  return appkey ? paramStr + 'key=' + appkey : paramStr.slice(-1);
}

/**
 * a接口：新闻 [{ a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }]
 * b接口：图书[{ c: 3, b4 }, { c: 3, b4 }, { c: 3, b4 }]
 */

function getPageData<T>(data: Array<T>, pageNum: number, count: number): IPageData<T> {
  /**
   * 返回值
   * {
   *   hasMore 告诉前端还有没有更多数据了
   *   data 当前页的数据   hasMore -> false  data -> null
   * }
   */
  const retInfo: IPageData<T> = {
    hasMore: true,
    data: []
  }

  if (data.length <= count) {
    // data的长度是小于每页条数  证明只有一页
    retInfo.data?.concat(data);
    retInfo.hasMore = false;
  } else {
    // 获取页数
    const pageCount: number = Math.ceil(data.length / count);
    
    // 页码大于等于了页数 -> 证明不可能有数据了
    if (pageNum >= pageCount) {
      retInfo.data = null;
      retInfo.hasMore = false;
    } else {
      // 页码小于页数  多页 -> 切分数据 -> 返回对应页码 对应条数的数据
      retInfo.data = data.splice(pageNum * count, count);
      retInfo.hasMore = true;
    }
  }

  return retInfo;
}

export {
  typeOf,
  formatParams,
  getPageData
}