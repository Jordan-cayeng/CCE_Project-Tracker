// src/pages/SettingsPage.jsx
import React from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-semibold text-cce-light">Settings</h1>

      <div className="bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card p-6">
        <p className="text-cce-dark mb-3 font-semibold">
          Appearance Mode
        </p>
        <p className="text-cce-dark/80">
          This application now uses a fixed dark theme with Cay Civil Engineering branding.
          The background color is <strong>#1C355E</strong> and headers use <strong>#B6DCE1</strong>.
        </p>

        <div className="mt-4 p-3 bg-cce-dark text-white rounded-lg">
          <p>
            You no longer need to toggle between light and dark modes — the
            interface will always use the company standard colors.
          </p>
        </div>
      </div>

      <div className="bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-cce-dark mb-3">Contact & Preferences</h2>
        <p className="text-cce-dark/80">
          For custom theme adjustments, reach out to your site administrator or project owner.
        </p>
      </div>
    </div>
  );
}
