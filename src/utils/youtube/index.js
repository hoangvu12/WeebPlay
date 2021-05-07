import axios from "axios";
import Format, { objMerge } from "./format";

const API_URL_BASE = "https://nguyenvu-stuff.glitch.me/youtube";

export default class API {
  constructor(config = {}) {
    this.config = config;

    const defaultParams = {
      maxResults: this.config.maxResults || 200,
    };

    this.params = objMerge(
      defaultParams,
      {
        part: "snippet,contentDetails",
      },
      { clean: true }
    );

    this.channelParams = objMerge(
      defaultParams,
      {
        part: "snippet,statistics",
      },
      { clean: true }
    );
  }

  async videoInfo(videoId) {
    let params = objMerge(
      this.channelParams,
      {
        id: videoId,
      },

      { clean: true }
    );

    const axiosOpts = {
      url: `${API_URL_BASE}/videos`,
      method: "get",
      params,
    };

    let { data } = await axios(axiosOpts);

    return Format.video(data);
  }

  async latestVideos(channelId, options = {}) {
    let params = objMerge(
      this.params,
      {
        channelId,
        part: "snippet",
        order: "date",
        ...options,
      },
      { clean: true }
    );

    const axiosOpts = {
      url: `${API_URL_BASE}/search`,
      method: "get",
      params,
    };

    let { data } = await axios(axiosOpts);

    if (options.filter) {
      data.items = data.items.filter(options.filter);
    }

    return Format.search(data);
  }

  async channelSections(channelId, options = {}) {
    let params = objMerge(this.params, { channelId }, { clean: true });

    const axiosOpts = {
      url: `${API_URL_BASE}/channelSections`,
      method: "get",
      params,
    };

    let { data } = await axios(axiosOpts);

    let format = Format.channelSections(data);

    if (options.type) {
      format = format.filter((item) => item.type === options.type);
    }

    if (options.fetchItems) {
      const promises = format.map(async (section) => {
        section.playlists = await this.playlistById(section.playlists);
        return section;
      });

      format = await Promise.all(promises);
    }

    return format;
  }

  async channel(channelId) {
    let params = objMerge(
      this.channelParams,
      { id: channelId },
      { clean: true }
    );
    const options = { url: `${API_URL_BASE}/channels`, method: "get", params };
    let { data } = await axios(options);
    return data;
  }

  async playlistById(playlistId, pageToken) {
    let items = [];

    let id = Array.isArray(playlistId)
      ? playlistId.slice(0, 50).join(",")
      : playlistId;

    let params = objMerge(
      this.params,
      {
        id,
        pageToken,
      },
      { clean: true }
    );

    if (Array.isArray(playlistId) && playlistId.length > 50) {
      const data = await this.playlistById(playlistId.slice(50).join(","));

      items = objMerge(items, data.items);
    }

    const options = { url: `${API_URL_BASE}/playlists`, method: "get", params };
    const { data } = await axios(options);

    items = objMerge(items, Format.playlists(data).items);

    return objMerge(Format.playlists(data), { items });
  }

  // async playlistByChannelId(channelId) {
  //   let params = this.params.objMerge({ channelId }, { clean: true });

  //   const options = { url: `${API_URL_BASE}/playlists`, method: "get", params };
  //   let { data } = await axios(options);
  //   return Format.playlists(data);
  // }

  async playlistItems(playlistId, pageToken) {
    let params = objMerge(
      this.params,
      { playlistId, pageToken, part: "status, snippet" },
      { clean: true }
    );

    const options = {
      url: `${API_URL_BASE}/playlistItems`,
      method: "get",
      params,
    };

    let { data } = await axios(options);

    return Format.playlistItem(data);
  }
}
