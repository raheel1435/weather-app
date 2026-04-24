import { useState} from 'react';

function SearchBar({ onSearch}) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;