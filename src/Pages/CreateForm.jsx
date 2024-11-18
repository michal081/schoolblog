import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../Fire base/Firebase-config';
import './CreateForm.css';

const CreateForm = ({ isAuth }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    fatherName: '',
    mothersName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    city: '',
    subject: '',
    localGoverment: '',
    gender: '',
  });



  const navigate = useNavigate();
  const postCollectionRef = collection(db, 'Allform');

  const PostFunc = async ()=>{
    try {
        await addDoc(postCollectionRef, {
            title,
            postText,
            author: {name: auth.currentUser.displayName, id: auth.currentUser.uid }
        })
        navigate('/')
    } catch (error) {
        console.log(error.message);
    }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postCollectionRef, {
        ...formData,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="create-form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="ownerName"
            placeholder="Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mothersName"
            placeholder="Mother's Name"
            value={formData.mothersName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="localGoverment"
            placeholder="Local Government"
            value={formData.localGoverment}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit"  onClick={PostFunc} className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
