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
    <div>
      <label
        htmlFor="language"
        className="mb-2 block text-sm font-semibold"
      >
        Filter by Language
      </label>

      <select
        id="language"
        value={selectedLanguage}
        onChange={(event) =>
          onLanguageChange(event.target.value)
        }
        className="rounded-lg border border-gray-300 bg-white px-4 py-2"
      >
        <option value="">All Languages</option>

        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}