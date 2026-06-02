"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EnvelopeIcon, UserCircleIcon, ShieldCheckIcon, PhoneIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleUpdatePassword = () => {
    router.push("/profile/update-password");
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="mt-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircleIcon className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="mt-2 text-blue-100 flex items-center justify-center md:justify-start">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Account Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-600" />
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email address</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Account type</p>
                    <p className="font-medium text-gray-900">
                      {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Phone number</p>
                    <p className="font-medium text-gray-900">
                      {user.phone ? user.phone : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-green-600" />
                Security Settings
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Two-factor authentication</h3>
                  <p className="mt-1 text-sm text-blue-700">Add extra security to your account</p>
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-100">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-sm font-medium text-yellow-800">Recent devices</h3>
                  <p className="mt-1 text-sm text-yellow-700">View and manage your active sessions</p>
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-white hover:bg-yellow-100">
                    Manage Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
            <div className="flex justify-end space-x-4">
              <button 
                onClick={handleEditProfile}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Edit Profile
              </button>
              <button 
                onClick={handleUpdatePassword}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}