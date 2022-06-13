import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

const changeData = (asset) => {
  asset.priceUsd = Number(asset.priceUsd);
  asset.changePercent24Hr = Number(asset.changePercent24Hr);

  if (!asset.price24hUsd) {
    const difference = (asset.changePercent24Hr * asset.priceUsd) / 100;
    asset.price24hUsd = asset.priceUsd - difference;
  }

  return asset;
};

export const processOneData = (asset) => {
  return changeData(asset);
};
