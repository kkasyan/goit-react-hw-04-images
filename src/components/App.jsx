import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { useState } from 'react';

import { ToastContainer } from 'react-toastify';

import css from './app.module.css';
import PropTypes from 'prop-types';

export const App = () => {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = newImageName => {
    setImageName(newImageName);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
      <ToastContainer />
    </div>
  );
};

App.propTypes = {
  handleFormSubmit: PropTypes.func,
  imageName: PropTypes.string,
};

// export class App extends Component {
//   state = {
//     imageName: '',
//   };

//   static propTypes = {
//     handleFormSubmit: PropTypes.func,
//     imageName: PropTypes.string,
//   };

//   handleFormSubmit = imageName => {
//     this.setState({ imageName });
//   };

//   render() {
//     const { imageName } = this.state;
//     const { handleFormSubmit } = this;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={handleFormSubmit} />
//         <ImageGallery imageName={imageName} />
//         <ToastContainer />
//       </div>
//     );
//   }
// }
