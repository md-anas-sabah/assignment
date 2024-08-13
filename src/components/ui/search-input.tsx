import { useState, ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch?: (query: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center min-w-96 bg-white h-8 p-3 justify-between border">
      <input
        type="text"
        placeholder="Search for products..."
        className="min-w-96 border-none focus:border-none outline-none text-sm"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Search
        className={`transition-colors ${
          isFocused ? "text-blue-500" : "text-gray-500"
        }`}
      />
    </div>
  );
}

export default SearchInput;
