import React, { useState } from 'react';
import { User, Phone, MapPin, AlertCircle, Calendar, Guitar as Hospital, Stethoscope, Pill as Pills, Save, Edit2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const CreateProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    age: '',
    address: '',
    phone: '',
    emergencyContact1: {
      name: '',
      relation: '',
      phone: ''
    },
    emergencyContact2: {
      name: '',
      relation: '',
      phone: ''
    },
    description: '',
    doctor: '',
    hospital: '',
    medicines: ['']
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (contactNum, field, value) => {
    setFormData(prev => ({
      ...prev,
      [`emergencyContact${contactNum}`]: {
        ...prev[`emergencyContact${contactNum}`],
        [field]: value
      }
    }));
  };

  const handleMedicineChange = (index, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index] = value;
    setFormData(prev => ({
      ...prev,
      medicines: newMedicines.filter(medicine => medicine !== '')
    }));
  };

  const addMedicine = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, '']
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dateOfBirth: '',
      age: '',
      address: '',
      phone: '',
      emergencyContact1: {
        name: '',
        relation: '',
        phone: ''
      },
      emergencyContact2: {
        name: '',
        relation: '',
        phone: ''
      },
      description: '',
      doctor: '',
      hospital: '',
      medicines: ['']
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      // Clean up medicines array by removing empty strings
      const cleanedFormData = {
        ...formData,
        medicines: formData.medicines.filter(medicine => medicine.trim() !== ''),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: currentUser.uid
      };

      // Save to Firebase
      const docRef = await addDoc(collection(db, "profiles"), cleanedFormData);
      console.log("Profile saved with ID: ", docRef.id);
      alert("Profile saved successfully!");
      resetForm();
    } catch (error) {
      console.error("Error saving profile: ", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
            <p className="mt-2 text-gray-600">Please fill in your information to create your profile</p>
          </div>
          {!isEditing && (
            <button
              onClick={toggleEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit2 size={20} />
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
                <User className="text-blue-600" />
                <h2>Basic Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name*</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Smith"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date of Birth*</label>
                  <input
                    required
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Age*</label>
                  <input
                    required
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="65"
                    min="0"
                    max="150"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
                <Phone className="text-blue-600" />
                <h2>Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone Number*</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address*</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123 Main St, City, State, ZIP"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </section>

            {/* Emergency Contacts */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
                <AlertCircle className="text-blue-600" />
                <h2>Emergency Contacts</h2>
              </div>
              {[1, 2].map((contactNum) => (
                <div key={contactNum} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name*</label>
                    <input
                      required
                      type="text"
                      value={formData[`emergencyContact${contactNum}`].name}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Contact Name"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Relation*</label>
                    <input
                      required
                      type="text"
                      value={formData[`emergencyContact${contactNum}`].relation}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'relation', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Relation"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone*</label>
                    <input
                      required
                      type="tel"
                      value={formData[`emergencyContact${contactNum}`].phone}
                      onChange={(e) => handleEmergencyContactChange(contactNum, 'phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))}
            </section>

            {/* Medical Information */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
                <Stethoscope className="text-blue-600" />
                <h2>Medical Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Doctor's Name</label>
                  <input
                    type="text"
                    value={formData.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Dr. Smith"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Hospital</label>
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="City Hospital"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Any additional medical information..."
                  disabled={!isEditing}
                />
              </div>
            </section>

            {/* Medicines */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
                <Pills className="text-blue-600" />
                <h2>Medicines</h2>
              </div>
              <div className="space-y-2">
                {formData.medicines.map((medicine, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={medicine}
                      onChange={(e) => handleMedicineChange(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Medicine name and dosage"
                      disabled={!isEditing}
                    />
                  </div>
                ))}
                {isEditing && (
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Another Medicine
                  </button>
                )}
              </div>
            </section>
          </div>

          {isEditing && (
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Save size={20} />
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;