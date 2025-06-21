//
//  ContentView.swift
//  Xcancelator iOS
//
//  Created by Alberto Paz on 21/06/2025.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "safari")
                .resizable()
                .scaledToFit()
                .frame(width: 64, height: 64)
                .foregroundColor(.blue)
            Text("Enable Xcancelator in Safari")
                .font(.title2)
                .fontWeight(.bold)
            Text("To enable the extension:")
                .font(.headline)
            VStack(alignment: .leading, spacing: 8) {
                Text("1. Open the Settings app")
                Text("2. Tap Safari > Extensions")
                Text("3. Enable Xcancelator")
            }
            .font(.body)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal)
            Text("You can now use Xcancelator in Safari on your device!")
                .font(.subheadline)
                .foregroundColor(.secondary)
            if let url = URL(string: UIApplication.openSettingsURLString) {
                Button(action: {
                    UIApplication.shared.open(url)
                }) {
                    Text("Open Settings")
                        .fontWeight(.semibold)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                .padding(.horizontal)
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
