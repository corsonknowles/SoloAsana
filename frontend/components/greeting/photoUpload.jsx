import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'i8cgxpgn';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/cloudfunded/upload';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
		width									: '50%',
		maxWidth							: '575px',
    minWidth              : '500px',
		maxHeight							: '585px',
		height								: '80%',
		display								: 'flex',
		justifyContent				: 'center',
		alignItems						: 'center',
		color									: '#49505b',
		fontWeight						:	'bold',
		pointerEvents	        : 'auto',
		borderRadius					: '10px'

  }
};

<div>
  <Modal
    isOpen={this.state.modalIsOpen}
    onAfterOpen={this.afterOpenModal}
    onRequestClose={this.closeModal}
    style={customStyles}
    contentLabel="User Profile"
  >
  <div className="FileUpload">
    <Dropzone
     multiple={false}
     accept="image/*"
     onDrop={this.onImageDrop.bind(this)}>
     <p>Drop an image or click to select a file to upload.</p>
   </Dropzone>
  </div>
</Modal>

  <div>
    {this.state.uploadedFileCloudinaryUrl === '' ? null :
    <div>
      <p>{this.state.uploadedFile.name}</p>
      <img src={this.state.uploadedFileCloudinaryUrl} />
    </div>}
  </div>
</div>

<div className="profile-photo"></div>
<div className="profile-photo-update">Update profile photo</div>
