import React from "react";

export default function ContactsSection({ contacts = {} }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Contacts</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-1">
            Internal Contacts
          </h3>
          {contacts.internal?.map((c, i) => (
            <p key={i} className="text-sm text-gray-600">
              {c.role}: {c.name} — {c.email}
            </p>
          ))}
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-1">
            External Contacts
          </h3>
          {contacts.external?.map((c, i) => (
            <p key={i} className="text-sm text-gray-600">
              {c.category}: {c.name} — {c.phone || c.email}
            </p>
          ))}
        </div>
      </div>

      <button className="text-blue-600 text-sm hover:underline mt-3">
        + Add Contact
      </button>
    </div>
  );
}
