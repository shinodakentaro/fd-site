import UIKit

/// iPad 本体側に表示するシンプルな管理画面
final class MainViewController: UIViewController {

    // MARK: - UI
    private let card         = UIView()
    private let dot          = UIView()
    private let titleLabel   = UILabel()
    private let statusLabel  = UILabel()
    private let urlLabel     = UILabel()
    private let reloadButton = UIButton(type: .system)

    // ブランドカラー #ab886a
    private let brandColor = UIColor(red: 0.67, green: 0.53, blue: 0.42, alpha: 1)

    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        observe()
        refresh()
    }

    // MARK: - Setup

    private func setupUI() {
        view.backgroundColor = UIColor(red: 0.97, green: 0.95, blue: 0.93, alpha: 1)

        // ── カード ──
        card.translatesAutoresizingMaskIntoConstraints = false
        card.backgroundColor = .white
        card.layer.cornerRadius = 24
        card.layer.shadowColor = UIColor.black.cgColor
        card.layer.shadowOpacity = 0.08
        card.layer.shadowRadius = 20
        card.layer.shadowOffset = CGSize(width: 0, height: 4)
        view.addSubview(card)

        // ── ステータスドット ──
        dot.translatesAutoresizingMaskIntoConstraints = false
        dot.layer.cornerRadius = 10
        card.addSubview(dot)

        // ── タイトル ──
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.text = "@cosme FD EVENT  サイネージ管理"
        titleLabel.font = .systemFont(ofSize: 20, weight: .semibold)
        titleLabel.textColor = UIColor(red: 0.29, green: 0.18, blue: 0.06, alpha: 1)
        titleLabel.textAlignment = .center
        card.addSubview(titleLabel)

        // ── ステータス ──
        statusLabel.translatesAutoresizingMaskIntoConstraints = false
        statusLabel.font = .systemFont(ofSize: 17, weight: .medium)
        statusLabel.textAlignment = .center
        statusLabel.numberOfLines = 0
        card.addSubview(statusLabel)

        // ── URL ──
        urlLabel.translatesAutoresizingMaskIntoConstraints = false
        urlLabel.text = "shinodakentaro.github.io/fd-site/signage/"
        urlLabel.font = .monospacedSystemFont(ofSize: 13, weight: .regular)
        urlLabel.textColor = .secondaryLabel
        urlLabel.textAlignment = .center
        urlLabel.numberOfLines = 0
        card.addSubview(urlLabel)

        // ── 再読み込みボタン ──
        reloadButton.translatesAutoresizingMaskIntoConstraints = false
        reloadButton.setTitle("サイネージを再読み込み", for: .normal)
        reloadButton.titleLabel?.font = .systemFont(ofSize: 16, weight: .semibold)
        reloadButton.backgroundColor = brandColor
        reloadButton.setTitleColor(.white, for: .normal)
        reloadButton.layer.cornerRadius = 14
        reloadButton.contentEdgeInsets = UIEdgeInsets(top: 14, left: 36, bottom: 14, right: 36)
        reloadButton.addTarget(self, action: #selector(reloadTapped), for: .touchUpInside)
        card.addSubview(reloadButton)

        NSLayoutConstraint.activate([
            // カードを画面中央に固定幅で配置
            card.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            card.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            card.widthAnchor.constraint(equalToConstant: 540),

            dot.topAnchor.constraint(equalTo: card.topAnchor, constant: 40),
            dot.centerXAnchor.constraint(equalTo: card.centerXAnchor),
            dot.widthAnchor.constraint(equalToConstant: 20),
            dot.heightAnchor.constraint(equalToConstant: 20),

            titleLabel.topAnchor.constraint(equalTo: dot.bottomAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 32),
            titleLabel.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -32),

            statusLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 24),
            statusLabel.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 32),
            statusLabel.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -32),

            urlLabel.topAnchor.constraint(equalTo: statusLabel.bottomAnchor, constant: 12),
            urlLabel.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 32),
            urlLabel.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -32),

            reloadButton.topAnchor.constraint(equalTo: urlLabel.bottomAnchor, constant: 32),
            reloadButton.centerXAnchor.constraint(equalTo: card.centerXAnchor),
            reloadButton.bottomAnchor.constraint(equalTo: card.bottomAnchor, constant: -40),
        ])
    }

    // MARK: - Notifications

    private func observe() {
        [Notification.Name.externalScreenDidAttach, .externalScreenDidDetach].forEach {
            NotificationCenter.default.addObserver(
                self, selector: #selector(refresh), name: $0, object: nil
            )
        }
    }

    @objc private func refresh() {
        let connected = UIScreen.screens.count > 1
        DispatchQueue.main.async { [weak self] in self?.apply(connected: connected) }
    }

    private func apply(connected: Bool) {
        if connected {
            dot.backgroundColor   = .systemGreen
            statusLabel.text      = "外部ディスプレイ接続中\nサイネージを表示しています ✓"
            statusLabel.textColor = UIColor(red: 0.13, green: 0.50, blue: 0.13, alpha: 1)
            reloadButton.isEnabled = true
            reloadButton.alpha     = 1.0
        } else {
            dot.backgroundColor   = .systemGray3
            statusLabel.text      = "外部ディスプレイ未接続\nHDMI ケーブルを接続してください"
            statusLabel.textColor = .secondaryLabel
            reloadButton.isEnabled = false
            reloadButton.alpha     = 0.4
        }
    }

    // MARK: - Actions

    @objc private func reloadTapped() {
        ExternalDisplayManager.shared.reload()
    }

    deinit { NotificationCenter.default.removeObserver(self) }
}
