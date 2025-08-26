import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function SearchInput() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = async () => {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (search) params.append("query", search)

    const url = `/api/search?${params.toString()}`
    console.log("Final API URL:", url)

    const res = await fetch(url)
    const data = await res.json()
    console.log("Search Results:", data)
  }

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
  )
}
