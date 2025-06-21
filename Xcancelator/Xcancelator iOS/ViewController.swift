import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var enableExtensionButton: UIButton!
    @IBOutlet weak var statusLabel: UILabel!
    @IBOutlet weak var instructionsLabel: UILabel!
    
    // The correct bundle identifier for your extension
    private let extensionBundleIdentifier = "com.albertopaz.Xcancelator-Extension-iOS"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set up UI
        title = "X Cancelator"
        setupUI()
        
        // Load extension in simulator (this helps with testing)
        // SFSafariExtensionManager is only available on macOS, not iOS.
        // #if targetEnvironment(simulator)
        // SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
        //     guard state != nil else {
        //         print("Failed to get extension state: \(String(describing: error))")
        //         return
        //     }
        //     print("Extension state: \(state?.isEnabled == true ? \"Enabled\" : \"Disabled\")")
        // }
        // #endif
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        updateExtensionStatus()
    }
    
    // Configure UI elements
    private func setupUI() {
        view.backgroundColor = UIColor(red: 0.95, green: 0.95, blue: 0.97, alpha: 1.0)
        
        // Configure labels and buttons with proper styling
        statusLabel.textColor = .darkGray
        instructionsLabel.textColor = .darkGray
        instructionsLabel.numberOfLines = 0
        instructionsLabel.textAlignment = .left
        
        enableExtensionButton.backgroundColor = UIColor(red: 0, green: 0.48, blue: 1.0, alpha: 1.0)
        enableExtensionButton.setTitleColor(.white, for: .normal)
        enableExtensionButton.layer.cornerRadius = 10
        
        // Configure the enable extension button
        enableExtensionButton.addTarget(self, action: #selector(openSafariExtensionPreferences), for: .touchUpInside)
    }
    
    // Open Safari Extension preferences
    @objc func openSafariExtensionPreferences() {
        // SFSafariApplication is only available on macOS, not iOS.
        // SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
        //     if let error = error {
        //         print("Error showing extension preferences: \(error)")
        //         // If there's an error, show instructions for manual activation
        //         DispatchQueue.main.async {
        //             self.statusLabel.text = "Error showing preferences"
        //             self.instructionsLabel.text = "Please open Safari Settings manually:\n1. Open Safari\n2. Tap on 'Aa' in the address bar\n3. Select 'Manage Extensions'\n4. Enable X Cancelator"
        //         }
        //     }
        // }
        // On iOS, show manual instructions:
        self.statusLabel.text = "Enable extension manually"
        self.instructionsLabel.text = "Open Settings > Safari > Extensions and enable X Cancelator."
    }
    
    // Check and update extension status
    private func updateExtensionStatus() {
        // SFSafariExtensionManager is only available on macOS, not iOS.
        // SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
        //     DispatchQueue.main.async {
        //         if let state = state {
        //             self.statusLabel.text = state.isEnabled ? "Extension is enabled" : "Extension is disabled"
        //             self.instructionsLabel.text = state.isEnabled ?
        //                 "The extension is active. Visit X.com or Twitter.com to see it in action!" :
        //                 "Please enable the extension in Safari settings to redirect X.com and Twitter.com links."
        //         } else {
        //             self.statusLabel.text = "Unable to determine extension status"
        //             self.instructionsLabel.text = "Please check Safari extension settings manually."
        //         }
        //     }
        // }
        // On iOS, show static instructions:
        self.statusLabel.text = "Check extension status manually"
        self.instructionsLabel.text = "Go to Settings > Safari > Extensions to verify X Cancelator is enabled."
    }
    
    @IBAction func openExtensionSettings(_ sender: Any) {
        // SFSafariApplication is only available on macOS, not iOS.
        // SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
        //     guard error == nil else {
        //         // Handle error
        //         print("Error opening extension settings: \(error!)")
        //         return
        //     }
        // }
        // On iOS, show manual instructions:
        self.statusLabel.text = "Enable extension manually"
        self.instructionsLabel.text = "Open Settings > Safari > Extensions and enable X Cancelator."
    }
}
