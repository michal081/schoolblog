import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Fire base/Firebase-config';
import './Home.css';

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'Allform');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchPosts();
  }, []);

  // Delete post
  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, 'Allform', id);
      await deleteDoc(postDoc); // Delete from Firestore
      setPostList(postLists.filter((post) => post.id !== id)); // Update UI
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // Edit post
  const editPost = async (id, currentPost) => {
    const newOwnerName = prompt('Enter new Owner Name:', currentPost.ownerName);
    const newFatherName = prompt("Enter new Father's Name:", currentPost.fatherName);
    const newMothersName = prompt("Enter new Mother's Name:", currentPost.mothersName);
    const newDateOfBirth = prompt('Enter new Date of Birth:', currentPost.dateOfBirth);
    const newAddress = prompt('Enter new Address:', currentPost.address);
    const newPhoneNumber = prompt('Enter new Phone Number:', currentPost.phoneNumber);
    const newCity = prompt('Enter new City:', currentPost.city);
    const newSubject = prompt('Enter new Subject:', currentPost.subject);
    const newLocalGovernment = prompt(
      'Enter new Local Government:',
      currentPost.localGoverment
    );
    const newGender = prompt('Enter new Gender:', currentPost.gender);

    const updatedPost = {
      ownerName: newOwnerName,
      fatherName: newFatherName,
      mothersName: newMothersName,
      dateOfBirth: newDateOfBirth,
      address: newAddress,
      phoneNumber: newPhoneNumber,
      city: newCity,
      subject: newSubject,
      localGoverment: newLocalGovernment,
      gender: newGender,
    };

    try {
      const postDoc = doc(db, 'Allform', id);
      await updateDoc(postDoc, updatedPost); // Update in Firestore
      setPostList(
        postLists.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)) // Update UI
      );
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Submitted Forms</h1>
      <div className="post-list">
        {postLists.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <button
                className="edit-btn"
                onClick={() => editPost(post.id, post)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
            <h2>{post.ownerName}</h2>
            <p><strong>Father's Name:</strong> {post.fatherName}</p>
            <p><strong>Mother's Name:</strong> {post.mothersName}</p>
            <p><strong>Date of Birth:</strong> {post.dateOfBirth}</p>
            <p><strong>Address:</strong> {post.address}</p>
            <p><strong>Phone:</strong> {post.phoneNumber}</p>
            <p><strong>City:</strong> {post.city}</p>
            <p><strong>Subject:</strong> {post.subject}</p>
            <p><strong>Local Government:</strong> {post.localGoverment}</p>
            <p><strong>Gender:</strong> {post.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
