import React from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';

const cloudName     = (window.CLOUDINARY_OPTIONS && window.CLOUDINARY_OPTIONS.cloud_name)     || 'cloudfunded';
const uploadPreset  = (window.CLOUDINARY_OPTIONS && window.CLOUDINARY_OPTIONS.upload_preset)  || 'i8cgxpgn';
const CLOUDINARY_UPLOAD_PRESET = uploadPreset;
const CLOUDINARY_UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%',
    maxWidth              : '575px',
    minWidth              : '500px',
    maxHeight             : '585px',
    height                : '80%',
    display               : 'flex',
    justifyContent        : 'center',
    alignItems            : 'center',
    color                 : '#49505b',
    fontWeight            :  'bold',
    pointerEvents         : 'auto',
    borderRadius          : '10px'
  }
};

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      photo: this.props.currentUser.photo,
      uploadedFileCloudinaryUrl: '',
      pending: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      pending: true
    });

    this.handleImageUpload(files[0]);

    this.closeModal();
  }

  handleImageUpload(file) {
    const formData = new FormData();
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('file', file);

    fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData })
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        const newUrl = data && data.secure_url;
        if (!newUrl) return;
        this.setState({
          uploadedFileCloudinaryUrl: newUrl,
          photo: newUrl,
          pending: false
        });
        // Pass newUrl directly — reading this.state.photo here would return
        // the pre-upload value because React 18 batches setState asynchronously.
        this.props.updateUser({ ...this.props.currentUser, photo: newUrl });
      })
      .catch(err => {
        console.error(err);
        this.setState({ pending: false });
      });
  }

  render() {
    return (
      <div className="photo-container">
        <button className="photo-button" onClick={this.openModal} >
          <figure className="profile-photo">
            <img className="profile-photo" src={this.state.photo}></img>
          </figure>
        </button>

        <figcaption className="profile-photo-update">
          <button className="photo-button photo-caption" onClick={this.openModal}>
            {this.state.pending ? "Upload in progress" : "Update profile photo" }
          </button>
        </figcaption>

        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Profile Photo"
          >
            <div className="file-upload">
              <Dropzone
                onDrop={(acceptedFiles) => this.onImageDrop(acceptedFiles)}
                accept={{ 'image/*': [] }}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'dropzone', id: 'profile-dropzone' })}>
                    <input {...getInputProps()} />
                    <div className="instructions">Drop an image</div>
                    <div className="instructions">Or, click to select a file to upload</div>
                  </div>
                )}
              </Dropzone>
            </div>
            <button className="inner-modal" onClick={this.closeModal}>X</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PhotoUpload;
