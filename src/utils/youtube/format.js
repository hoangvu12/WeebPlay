/* eslint-disable no-extend-native */
const returnData = {};

const defaultProperties = [
  "id",
  "snippet.title",
  "snippet.channelId",
  "snippet.channelTitle",
  "snippet.videoOwnerChannelId",
  "snippet.videoOwnerChannelTitle",
  "snippet.publishedAt",
  "snippet.thumbnails",
  "snippet.playlistId",
  "snippet.position",
  "snippet.resourceId",
];

export default class Format {
  static channelSections(data) {
    return data.items.map((item) => ({
      ...item.snippet,
      ...item.contentDetails,
    }));
  }

  static video(data) {
    const properties = [
      "id",
      "statistics",
      "snippet.publishedAt",
      "snippet.channelId",
      "snippet.title",
      "snippet.description",
      "snippet.channelTitle",
    ];

    return parseData(data.items, properties)[0];
  }

  static search(data) {
    const { nextPageToken, items, pageInfo, regionCode } = data;

    let properties = [
      "id.videoId",
      "snippet.publishTime",
      "snippet.publishedAt",
      "snippet.title",
      "snippet.description",
      "snippet.thumbnails",
      "snippet.channelTitle",
    ];

    return objMerge(returnData, {
      nextPageToken,
      pageInfo,
      regionCode,
      items: parseData(items, properties),
    });
  }

  static playlists(data) {
    const properties = [
      "snippet.title",
      "snippet.description",
      "contentDetails.itemCount",
    ];

    return objMerge(
      returnData,
      {
        nextPageToken: data.nextPageToken,
        // pageInfo: data.pageInfo,
        items: this.playlistItem(data, properties),
      },
      { clean: true }
    );
  }

  static playlistItem(data, properties = []) {
    const { items } = data;

    properties = [...defaultProperties, ...properties];

    return parseData(
      items.filter((item) =>
        item.status ? item.status.privacyStatus === "public" : true
      ),
      properties
    );
  }
}

function parseData(data, properties = []) {
  return data.map((item) => {
    const returnData = {};

    for (let property of properties) {
      const split = property.split(".");
      const key = split[split.length - 1];

      // eslint-disable-next-line no-eval
      const value = eval(`item.${property}`);

      if (typeof value === undefined || value === null) continue;

      returnData[key] = value;
    }

    return returnData;
  });
}

export const objClean = function (object) {
  const obj = { ...object };

  for (let key in obj) {
    if (typeof obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  }

  return obj;
};

export const objMerge = function (obj, data, options = {}) {
  let object;
  if (Array.isArray(data)) {
    object = [...obj, ...data];
  } else {
    object = { ...obj, ...data };
  }

  if (options.clean) {
    if (!Array.isArray(data)) {
      object = { ...objClean(object) };
    }
  }

  return object;
};
