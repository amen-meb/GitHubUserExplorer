interface LanguageFilterProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageFilter({
  languages,
  selectedLanguage,
  onLanguageChange,
}: LanguageFilterProps) {
  return (
    <div className="w-full sm:w-[48%]">
      <label
        htmlFor="language"
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        Filter by Language
      </label>

      <div className="relative">
        <select
          id="language"
          value={selectedLanguage}
          onChange={(event) =>
            onLanguageChange(event.target.value)
          }
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Languages</option>

          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          ▾
        </span>
      </div>
    </div>
  );
}