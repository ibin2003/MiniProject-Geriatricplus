import React, { useState } from 'react';
import { User, Phone, MapPin, AlertCircle, Calendar, Guitar as Hospital, Stethoscope, Pill as Pills, Save, Edit2 } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    dateOfBirth: '1945-05-15',
    age: '78',
    address: '123 Maple Street, Springfield, IL 62701',
    phone: '(555) 123-4567',
    emergencyContact1: {
      name: 'Mary Smith',
      relation: 'Daughter',
      phone: '(555) 987-6543'
    },
    emergencyContact2: {
      name: 'Robert Smith',
      relation: 'Son',
      phone: '(555) 456-7890'
    },
    description: 'Active senior with a history of hypertension and arthritis. Enjoys gardening and reading.',
    doctor: 'Dr. Sarah Johnson',
    hospital: 'Springfield Memorial Hospital',
    medicines: [
      'Lisinopril 10mg - Once daily',
      'Metformin 500mg - Twice daily',
      'Vitamin D3 - Once daily'
    ]
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (contactNum, field, value) => {
    setProfile(prev => ({
      ...prev,
      [`emergencyContact${contactNum}`]: {
        ...prev[`emergencyContact${contactNum}`],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
    console.log('Saving profile:', profile);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-600 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Patient Profile</h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {isEditing ? (
              <>
                <Save size={20} />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit2 size={20} />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <User className="text-blue-600" />
              <h2>Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Phone className="text-blue-600" />
              <h2>Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.address}</p>
                )}
              </div>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <AlertCircle className="text-blue-600" />
              <h2>Emergency Contacts</h2>
            </div>
            {[1, 2].map((contactNum) => (
              <div key={contactNum} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[`emergencyContact${contactNum}`].name}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile[`emergencyContact${contactNum}`].name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Relation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[`emergencyContact${contactNum}`].relation}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'relation', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile[`emergencyContact${contactNum}`].relation}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile[`emergencyContact${contactNum}`].phone}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile[`emergencyContact${contactNum}`].phone}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Medical Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Hospital className="text-blue-600" />
              <h2>Medical Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Doctor</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.doctor}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Hospital</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.hospital}
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.hospital}</p>
                )}
              </div>
            </div>
          </section>

          {/* Medications */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Pills className="text-blue-600" />
              <h2>Medications</h2>
            </div>
            {isEditing ? (
              <textarea
                value={profile.medicines.join('\n')}
                onChange={(e) => handleInputChange('medicines', e.target.value.split('\n'))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {profile.medicines.map((medicine, index) => (
                  <li key={index} className="text-gray-900">{medicine}</li>
                ))}
              </ul>
            )}
          </section>

          {/* Description */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <User className="text-blue-600" />
              <h2>Description</h2>
            </div>
            {isEditing ? (
              <textarea
                value={profile.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile.description}</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;