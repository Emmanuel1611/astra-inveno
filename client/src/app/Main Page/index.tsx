import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Inventory Management</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/sign-in" className="btn-primary">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Manage Your Inventory With Ease
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your business operations with our powerful inventory management system
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Real-time Tracking"
            description="Monitor stock levels and movements in real-time"
          />
          <FeatureCard
            title="Sales Analytics"
            description="Generate detailed reports and insights"
          />
          <FeatureCard
            title="User Management"
            description="Control access and permissions for your team"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}