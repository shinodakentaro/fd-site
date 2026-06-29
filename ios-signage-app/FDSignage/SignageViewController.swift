import UIKit
import WebKit

/// 外部ディスプレイに表示する WKWebView 全画面コントローラ
final class SignageViewController: UIViewController {

    private var webView: WKWebView!
    private let signageURL = URL(string: "https://shinodakentaro.github.io/fd-site/signage/")!

    // ステータスバー・ホームインジケーター非表示
    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black
        setupWebView()
        load()
    }

    // MARK: - Setup

    private func setupWebView() {
        let config = WKWebViewConfiguration()
        // メディア自動再生を許可（サイネージのアニメーション用）
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        webView = WKWebView(frame: .zero, configuration: config)
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        // セーフエリア無視（外部ディスプレイにセーフエリアは不要）
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.backgroundColor = .black
        webView.isOpaque = true

        view.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
    }

    // MARK: - Load

    private func load() {
        let req = URLRequest(url: signageURL, cachePolicy: .reloadIgnoringLocalCacheData)
        webView.load(req)
    }

    func reload() {
        webView.reload()
    }
}
