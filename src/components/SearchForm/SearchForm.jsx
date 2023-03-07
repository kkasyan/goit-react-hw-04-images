import css from './searchForm.module.css';
import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';

export const SearchForm = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = ({ target }) => {
    setImageName(target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName === '') {
      toast.error('Please insert what you are looking for!');
      return;
    }
    onSubmit(imageName);
    setImageName({
      imageName: '',
    });
    e.target.reset();
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <Button type="submit" text="Search" aria-label="Search" />
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="imageName"
        onChange={handleNameChange}
      />
    </form>
  );
};

SearchForm.propTypes = {
  handleNameChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  imageName: PropTypes.object,
};