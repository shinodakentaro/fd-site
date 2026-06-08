/**
 * vote-store.js
 * 投票データ管理モジュール
 * localStorage使用。Firebase等への差し替えは cast/get/subscribe を置き換えるだけでOK。
 */
const VOTE_KEY = 'gs-battle-v1';

const VoteStore = {
  /** 現在の投票データを取得 */
  get() {
    try {
      const raw = localStorage.getItem(VOTE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return { glow: 0, smooth: 0, recent: [], lastUpdate: 0 };
  },

  /** 投票を記録して更新後データを返す */
  cast(type) {
    const data = this.get();
    data[type] = (data[type] || 0) + 1;
    data.recent.unshift({ type, time: Date.now() });
    if (data.recent.length > 60) data.recent = data.recent.slice(0, 60);
    data.lastUpdate = Date.now();
    localStorage.setItem(VOTE_KEY, JSON.stringify(data));
    return data;
  },

  /** ポーリングで変更を監視。戻り値はintervalId（clearIntervalで停止可） */
  subscribe(callback, interval = 1500) {
    let last = this.get().lastUpdate;
    return setInterval(() => {
      const data = this.get();
      if (data.lastUpdate > last) {
        last = data.lastUpdate;
        callback(data);
      }
    }, interval);
  },

  /** データリセット（管理用） */
  reset() {
    localStorage.removeItem(VOTE_KEY);
  },
};
