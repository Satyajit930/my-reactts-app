import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface FormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  department: string;
  gender: string;
  skills: string[];
  bio: string;
  status: string;
  profileImage: File | null;
}

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    department: '',
    gender: '',
    skills: [],
    bio: '',
    status: 'active',
    profileImage: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'skills') {
        // Handle multiple checkboxes for skills
        setFormData(prev => ({
          ...prev,
          skills: target.checked 
            ? [...prev.skills, value]
            : prev.skills.filter(skill => skill !== value)
        }));
      } else {
        // Handle single checkboxes
        setFormData(prev => ({
          ...prev,
          [name]: target.checked
        }));
      }
    } else if (type === 'file') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.files ? target.files[0] : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // if (!formData.bio.trim()) {
    //   newErrors.bio = 'Bio is required';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      alert('User added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        department: '',
        gender: '',
        skills: [],
        bio: '',
        status: 'active',
        profileImage: null,
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      department: '',
      gender: '',
      skills: [],
      bio: '',
      status: 'active',
      profileImage: null,
    });
    setErrors({});
  };

  return (
    <AdminLayout 
      pageTitle="Add User Form" 
      breadcrumb={["Home", "Forms", "Add User"]}
    >
      <div className="card card-primary card-outline mb-4">
        {/* Header */}
        <div className="card-header">
          <div className="card-title">Add User Form</div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Row 1: Name + Email */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              
              <div className="mb-3 col-md-6">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            {/* Row 2: Phone + Date of Birth */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input 
                  type="tel" 
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              
              <div className="mb-3 col-md-6">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input 
                  type="date" 
                  className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
                {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
              </div>
            </div>

            {/* Row 4: Department + Status */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="department" className="form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select 
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="it">IT</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="operations">Operations</option>
                </select>
                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
              </div>
              
              <div className="mb-3 col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <select 
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Row 5: Gender (Radio Buttons) */}
            <div className="row">
              <div className="mb-3 col-md-12">
                <label className="form-label">
                  Gender <span className="text-danger">*</span>
                </label>
                <div className="mt-2">
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="male"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="female"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="other"
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="other">Other</label>
                  </div>
                </div>
                {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
              </div>
            </div>

            {/* Row 6: Skills (Checkboxes) */}
            <div className="row">
              <div className="mb-3 col-md-12">
                <label className="form-label">
                  Skills
                </label>
                <div className="mt-2">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="javascript"
                          value="javascript"
                          checked={formData.skills.includes('javascript')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="javascript">JavaScript</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="react"
                          value="react"
                          checked={formData.skills.includes('react')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="react">React</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="nodejs"
                          value="nodejs"
                          checked={formData.skills.includes('nodejs')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="nodejs">Node.js</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="python"
                          value="python"
                          checked={formData.skills.includes('python')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="python">Python</label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="java"
                          value="java"
                          checked={formData.skills.includes('java')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="java">Java</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="sql"
                          value="sql"
                          checked={formData.skills.includes('sql')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="sql">SQL</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="aws"
                          value="aws"
                          checked={formData.skills.includes('aws')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="aws">AWS</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          name="skills" 
                          id="docker"
                          value="docker"
                          checked={formData.skills.includes('docker')}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="docker">Docker</label>
                      </div>
                    </div>
                  </div>
                </div>
                {errors.skills && <div className="text-danger small mt-1">{errors.skills}</div>}
              </div>
            </div>

            {/* Row 7: Bio (Textarea) */}
            <div className="row">
              <div className="mb-3 col-md-12">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea 
                  className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                />
                {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                <div className="form-text">Maximum 500 characters</div>
              </div>
            </div>

            {/* Row 8: Profile Image (File Upload) */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="profileImage" className="form-label">
                  Profile Image
                </label>
                <input 
                  type="file" 
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <div className="form-text">Accepted formats: JPG, PNG, GIF (Max 5MB)</div>
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <div className="card-footer">
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <i className="fas fa-save me-1"></i>
                Add User
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleReset}
              >
                <i className="fas fa-undo me-1"></i>
                Reset
              </button>
              
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => window.history.back()}
              >
                <i className="fas fa-arrow-left me-1"></i>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddForm;