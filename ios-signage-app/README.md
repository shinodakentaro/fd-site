# FDSignage — iPad 外部ディスプレイ サイネージアプリ

## 概要

iPad を HDMI 接続した際、外部ディスプレイ側にサイネージ URL を WKWebView で全画面表示するアプリです。

## ファイル構成

```
FDSignage/
├── AppDelegate.swift           # アプリエントリ・横向き固定
├── ExternalDisplayManager.swift # 外部画面の Window 管理
├── SignageViewController.swift  # 外部画面: WKWebView 全画面
└── MainViewController.swift     # iPad 本体: 管理画面
```

## Xcode プロジェクト作成手順

### 1. プロジェクト作成

- Xcode → File → New → Project
- **App** テンプレートを選択
- Product Name: `FDSignage`
- Interface: **Storyboard**（後で削除）
- Language: **Swift**
- iPad のみ: Supported Destinations から iPhone を削除

### 2. ファイルを追加

プロジェクトに以下の Swift ファイルをドラッグ＆ドロップ：
- `AppDelegate.swift`（既存と置き換え）
- `ExternalDisplayManager.swift`
- `SignageViewController.swift`
- `MainViewController.swift`

自動生成された `SceneDelegate.swift` / `ViewController.swift` / `Main.storyboard` は削除する。

### 3. Info.plist の設定

| Key | Value |
|-----|-------|
| `UIApplicationSceneManifest` | **キーごと削除**（Scene ライフサイクルを使わない） |
| `UIRequiresFullScreen` | YES |
| `UIStatusBarHidden` | YES |
| `UIViewControllerBasedStatusBarAppearance` | NO |
| `UISupportedInterfaceOrientations~ipad` | `UIInterfaceOrientationLandscapeLeft` `UIInterfaceOrientationLandscapeRight` のみ |
| `NSAppTransportSecurity` → `NSAllowsArbitraryLoads` | NO（GitHub Pages は HTTPS なので不要） |

### 4. Build Settings

| 設定 | 値 |
|------|-----|
| Deployment Target | iOS 15.0 |
| Supported Devices | iPad のみ |
| Requires Full Screen | YES（Split View 無効化） |

### 5. ビルド・実行

実機 iPad にビルドして HDMI ケーブルを接続すると：
- **外部ディスプレイ**: サイネージが全画面表示
- **iPad 本体**: 管理画面（接続状態 + 再読み込みボタン）

## 動作フロー

```
アプリ起動
  └─ MainViewController を iPad 本体に表示
  └─ ExternalDisplayManager.start() で画面監視開始
       ├─ HDMI 接続 → UIWindow 生成 → SignageViewController (WKWebView) 表示
       └─ HDMI 切断 → UIWindow 破棄 → 管理画面が「未接続」に更新
```

## 注意事項

- `UIScreen.didConnectNotification` は iOS 16+ で deprecated ですが、非 App Store 用途では引き続き動作します
- App Store への提出は想定していません（イベント用インハウス配布）
- 開発用証明書でサイドロード、または Apple Configurator 2 での配布が可能です
