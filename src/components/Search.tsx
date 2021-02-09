import { useState } from 'react';

const Search: React.FC<{ search: (searchValue: string) => void }> = ({
  search,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void = (e) => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
