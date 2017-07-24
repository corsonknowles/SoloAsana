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

class PhotoUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      modalIsOpen: false,
      photo: this.props.currentUser.photo,
      uploadedFileCloudinaryUrl: ''

    }

    this.currentUser = this.props.currentUser;

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  // componentWillUnmount() { this.props.clearErrors()};

  // handleChange(event) {
  //   const target = event.target;
  //   const name = target.name;
  //   this.setState({
  //     [name]: event.target.value
  //   });
  //
  // }

  handleSubmit(){

    return () => {
      let user = this.currentUser;
      user.photo = this.state.photo;

      this.props.updateUser(user);
      this.closeModal()
    };
  }

  renderErrors(){
    return(

      <ul className="errors">
        {this.props.errors.map( (error, i) => (
          <li className="eachError" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onImageDrop(files) {

    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);

    this.closeModal();
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.setState({
          photo: this.state.uploadedFileCloudinaryUrl
        })
        this.handleSubmit()();
      }
    });
  }



  render() {

    return (
    <div className="photo-container">


      <button className="photo-button" onClick={this.openModal} >
        <div className="profile-photo">
          <img className="profile-photo" src={this.state.photo}></img>
        </div>
        </button>
      <div className="profile-photo-update"><button className="photo-button" onClick={this.openModal}> Update profile photo</button></div>

      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Profile Photo"
        >
        <div className="FileUpload">
          <Dropzone
           multiple={false}
           accept="image/*"
           onDrop={this.onImageDrop.bind(this)}>
           <p>Drop an image or click to select a file to upload.</p>
         </Dropzone>
        </div>
        <button className="inner-modal" onClick={this.closeModal}>X</button>
      </Modal>


      </div>

    </div>
  )}
}

export default PhotoUpload;
