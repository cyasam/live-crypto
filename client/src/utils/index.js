import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

const changeData = (asset, changes) => {
  asset.priceUsd = Number(asset.priceUsd);
  asset.changePercent24Hr = Number(asset.changePercent24Hr);

  if (!asset.price24hUsd || !changes) {
    const difference = (asset.changePercent24Hr * asset.priceUsd) / 100;
    asset.price24hUsd = asset.priceUsd - difference;
  }

  if (changes) {
    let newPrice = changes[asset.id];

    if (newPrice) {
      newPrice = Number(newPrice);

      if (newPrice > asset.priceUsd) {
        asset.changed = 'up';
      } else if (newPrice < asset.priceUsd) {
        asset.changed = 'down';
      }

      asset.priceUsd = newPrice;
      asset.changePercent24Hr =
        ((asset.priceUsd - asset.price24hUsd) / asset.price24hUsd) * 100;
    }
  }

  return asset;
};

export const processAllData = (assets, changes) => {
  return assets.map((asset) => {
    return changeData(asset, changes);
  });
};

export const processOneData = (asset, changes) => {
  return changeData(asset, changes);
};
