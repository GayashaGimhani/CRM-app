export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-white text-xl font-bold">CRM System</h2>
            <p className="text-sm text-gray-400 mt-2">
              Simple Lead Management System for sales teams with pipeline tracking and notes.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard" className="hover:text-white transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/leads" className="hover:text-white transition">
                  Manage Leads
                </a>
              </li>
              <li>
                <a href="/leads/new" className="hover:text-white transition">
                  Add Lead
                </a>
              </li>
            </ul>
          </div>

          {/* INFO */}
          <div>
            <h3 className="text-white font-semibold mb-3">System Info</h3>
            <p className="text-sm text-gray-400">
              Built using React, Node.js, Express, and MongoDB.
            </p>

            <div className="mt-4 text-xs text-gray-500">
              Version 1.0 • CRM Internship Project
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} CRM App. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>

        </div>

      </div>

    </footer>
  );
}