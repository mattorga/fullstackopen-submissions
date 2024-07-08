const SearchBar = ({ search, onChange }) => {
    return (
        <>
            Find Countries<br/>
            <input value={search} onChange={onChange}/>
        </>
    )
}

export default SearchBar