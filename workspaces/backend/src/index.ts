import app from '@shared/infra/http/app';

app().then(app => {
  app.listen(3333, () => {
    console.log('Server is running');
  });
});
