import UIKit

/// 外部ディスプレイへの UIWindow 生成・破棄を管理する
final class ExternalDisplayManager {

    static let shared = ExternalDisplayManager()
    private var externalWindow: UIWindow?

    private init() {}

    // MARK: - Public

    func start() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(screenDidConnect(_:)),
            name: UIScreen.didConnectNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(screenDidDisconnect(_:)),
            name: UIScreen.didDisconnectNotification,
            object: nil
        )
        // 起動時点ですでに接続されている画面に対応
        UIScreen.screens.dropFirst().forEach { attach(to: $0) }
    }

    func reload() {
        (externalWindow?.rootViewController as? SignageViewController)?.reload()
    }

    var isConnected: Bool { externalWindow != nil }

    // MARK: - Screen notifications

    @objc private func screenDidConnect(_ note: Notification) {
        guard let screen = note.object as? UIScreen else { return }
        attach(to: screen)
    }

    @objc private func screenDidDisconnect(_ note: Notification) {
        detach()
    }

    // MARK: - Window lifecycle

    private func attach(to screen: UIScreen) {
        guard externalWindow == nil else { return }

        let w = UIWindow(frame: screen.bounds)
        w.screen = screen
        w.rootViewController = SignageViewController()
        w.isHidden = false
        externalWindow = w

        NotificationCenter.default.post(name: .externalScreenDidAttach, object: nil)
    }

    private func detach() {
        externalWindow?.isHidden = true
        externalWindow?.rootViewController = nil
        externalWindow = nil

        NotificationCenter.default.post(name: .externalScreenDidDetach, object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

// MARK: - Notification names

extension Notification.Name {
    static let externalScreenDidAttach = Notification.Name("externalScreenDidAttach")
    static let externalScreenDidDetach = Notification.Name("externalScreenDidDetach")
}
