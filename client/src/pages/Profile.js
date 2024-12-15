import React, { useState, useEffect } from 'react';
import avatar from '../assets/profile.png';  // Default avatar image
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();  // Fetch user data
  const navigate = useNavigate();

  // Debugging: Log API Data to verify profile image is being returned
  useEffect(() => {
    console.log('API Data:', apiData);  // Log apiData to verify profile data
  }, [apiData]);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,  // Reinitialize when apiData changes
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '' });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Updated Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
    }
  });

  /** formik doesn't support file upload, so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // Logout handler
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  // Ensure we don't try to render the profile image until apiData is available
  const profileImageSrc = apiData?.profile || file || avatar;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: '45%', paddingTop: '3em' }}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-white">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-white">
              You can update your details here.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                {/* Check if profile image exists, fallback to avatar */}
                <img
                  src={profileImageSrc}  // Conditionally render the profile image
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="First Name" />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Last Name" />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Mobile No." />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Email*" />
              </div>

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Address" />
              <button className={styles.btn} type="submit">Update</button>
            </div>

            <div className="text-center py-4">
              <span className="text-white">Come back later? <button onClick={userLogout} className="text-red-500">Logout</button></span>
            </div>

          </form>

        </div>
        </motion.div>
      </div>
    </div>
  );
}
