import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'egz38gjs',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: true,
  token:
    'skLW9drPcweNdnvT2TVeRxaixMsaWFu5YWAdoTbIDHHJkSoiQkTlakfMw84hoBAymGbvDYaOvhG5kh2UW9EG64LIXM5z0W7jSknaB46E2agvYJlWb8m0zh2msWQzToGQRCyEIL7ZM3b6P3VETDbPfO1AHqdMpVIEG1akZ1qmPk60ui3GsfbI',
});

const builder = imageUrlBuilder(client);

export const imageUrlFor = (source) => builder.image(source);
