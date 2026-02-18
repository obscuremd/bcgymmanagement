import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface DurationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DURATION_SUGGESTIONS = [
  // Standard durations
  "1 MONTH",
  "2 MONTHS",
  "3 MONTHS",
  "5 MONTHS",
  "8 MONTHS",
  "1 YEAR",
  "2 YEARS",
  // Session-based plans
  "10 ENTRIES A MONTH",
  "15 ENTRIES A MONTH",
  "18 ENTRIES A MONTH",
  "20 ENTRIES A MONTH",
  "40 ENTRIES IN 2 MONTHS",
  "50 ENTRIES IN 2 MONTHS",
  "60 ENTRIES IN 2 MONTHS",
];

export function DurationInput({
  value,
  onChange,
  placeholder = "Enter duration...",
  className = "",
}: DurationInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = DURATION_SUGGESTIONS.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && value !== filtered[0]);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value && setShowSuggestions(filteredSuggestions.length > 0)}
        placeholder={placeholder}
        className={className}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-zinc-800 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
