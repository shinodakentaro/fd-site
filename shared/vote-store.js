/**
 * vote-store.js  — Firebase Realtime Database 版
 *
 * データ構造:
 *   votes: { glow: 0, smooth: 0, updatedAt: timestamp }
 *
 * API:
 *   VoteStore.cast(type)          — glow / smooth を +1（トランザクション）
 *   VoteStore.subscribe(callback) — リアルタイム購読（初回も即座に発火）
 *   VoteStore.set(glow, smooth)   — 任意の値に設定（管理用）
 *   VoteStore.reset()             — 0 にリセット（管理用）
 */

const VoteStore = (() => {
  const ref = () => firebase.database().ref('votes');

  return {
    /** glow または smooth を +1 する（アトミックなトランザクション） */
    cast(type) {
      ref().transaction(current => {
        if (current === null) {
          return {
            glow:      type === 'glow'   ? 1 : 0,
            smooth:    type === 'smooth' ? 1 : 0,
            updatedAt: Date.now(),
          };
        }
        return {
          glow:      (current.glow   || 0) + (type === 'glow'   ? 1 : 0),
          smooth:    (current.smooth || 0) + (type === 'smooth' ? 1 : 0),
          updatedAt: Date.now(),
        };
      });
    },

    /**
     * リアルタイム購読
     * 初回接続時・データ変更時に callback({ glow, smooth, updatedAt }) を呼ぶ
     * 戻り値: 購読解除関数
     */
    subscribe(callback) {
      const handler = snap => {
        const data = snap.val() || { glow: 0, smooth: 0, updatedAt: 0 };
        callback(data);
      };
      ref().on('value', handler);
      return () => ref().off('value', handler);
    },

    /** 任意の値に設定（管理・reset.html 用） */
    set(glow = 0, smooth = 0) {
      return ref().set({ glow, smooth, updatedAt: Date.now() });
    },

    /** 0にリセット（管理・reset.html 用） */
    reset() {
      return this.set(0, 0);
    },
  };
})();
