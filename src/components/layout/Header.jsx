import React from "react";

export default function Header({ title }) {
  return (
    <header className="bg-white border-b border-cce-gray px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-subtle">
      <h2 className="text-lg font-semibold text-cce-dark">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-cce-dark/70">Local Mode</span>
        <img
          src="https://i.pravatar.cc/32"
          alt="User avatar"
          className="w-8 h-8 rounded-full border border-cce-gray"
        />
      </div>
    </header>
  );
}
