import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/api/news_list', controller.api.getNewsList);
};
