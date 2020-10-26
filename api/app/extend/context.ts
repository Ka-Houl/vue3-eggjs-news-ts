const nodeFetch = require('node-fetch');

import { IHttpGetParams } from '../../typings';
import { formatParams } from '../lib/utils';

module.exports = {
  httpGet(options: IHttpGetParams): Promise<void> {
    const { url, data, success, fail } = options;
    return nodeFetch(url + formatParams(data, this.app.config.APP_KEY))
      .then((res) => res.json())
      .then((data) => success(data.result.data))
      .catch((err) => fail(err));
  }
}