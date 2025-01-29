import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { User, Phone, MapPin, Calendar, Stethoscope, Pill as Pills } from 'lucide-react';

const ViewProfiles = () => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const q = query(
          collection(db, "profiles"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const profilesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'
          };
        });
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error fetching profiles: ", error);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentUser.uid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600">No profiles found</h2>
          <p className="mt-2 text-gray-500">Create a new profile to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Saved Profiles ({profiles.length})</h2>
      <div className="grid grid-cols-1 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-500">Created on {profile.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>Age: {profile.age} years</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{profile.address}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.doctor && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Stethoscope className="h-5 w-5" />
                      <span>Dr. {profile.doctor}</span>
                    </div>
                  )}
                  {profile.hospital && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span>{profile.hospital}</span>
                    </div>
                  )}
                </div>

                {profile.medicines && profile.medicines.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Pills className="h-5 w-5" />
                      <span>Medicines ({profile.medicines.length})</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-600 pl-2">
                      {profile.medicines.map((medicine, index) => (
                        <li key={index}>{medicine}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((num) => (
                    profile[`emergencyContact${num}`]?.name && (
                      <div key={num} className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900">Contact {num}</h5>
                        <div className="mt-2 space-y-1 text-gray-600">
                          <p>{profile[`emergencyContact${num}`].name}</p>
                          <p className="text-sm">{profile[`emergencyContact${num}`].relation}</p>
                          <p className="text-sm">{profile[`emergencyContact${num}`].phone}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {profile.description && (
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                  <p className="text-gray-600">{profile.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProfiles;
