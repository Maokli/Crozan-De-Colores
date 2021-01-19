import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "blog",
  outDir: './dist/static',
  routes: {
    '/category/:uid': {
      type: 'json',
      uid: {
        url:'https://api.storyblok.com/v1/cdn/stories/?version=published&token=VFoIGzBT8BoQlSFm1WUB9Qtt&starts_with=categories',
        resultsHandler: (response) => response.stories,
        property: 'content._uid',
      },
    },
      '/:uuid': {
        type: 'json',
        uuid: {
          url:'https://api.storyblok.com/v1/cdn/stories/?version=published&token=VFoIGzBT8BoQlSFm1WUB9Qtt&starts_with=posts',
          resultsHandler: (response) => response.stories,
          property: 'content._uid',
        }
    }
  }
}
