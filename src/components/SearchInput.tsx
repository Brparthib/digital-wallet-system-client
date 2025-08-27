import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch?: (field: string, value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = async () => {
    if (onSearch) {
      onSearch(category, search);
      return;
    }
  };

  return (
    <div className="flex gap-2">
      {/* Category Select */}
      <Select onValueChange={setCategory}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="books">Books</SelectItem>
          <SelectItem value="frameworks">Frameworks</SelectItem>
          <SelectItem value="movies">Movies</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Search Button */}
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
