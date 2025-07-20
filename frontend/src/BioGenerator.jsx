import React, { useEffect, useState } from "react";
import Loder from "./components/Loder";
import Cards from "./components/Cards";
import Github from "./components/GithubButtons";

function BioGenerator() {
  const options = [
    { label: "one", value: "Professional" },
    { label: "two", value: "Funny" },
    { label: "three", value: "Inspirational" },
    { label: "four", value: "Creative" },
    { label: "five", value: "Casual" },
  ];
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState(options[0].value);
  const [generatedBio, setGeneratedBio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateBio = async () => {
    if (!bio) {
      setError("Please enter something about yourself.");
      return;
    }
    setError(null);
    setGeneratedBio("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_prompt: bio,
            vibe: vibe,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const bioArray = data.bio
        .substring(data.bio.indexOf("1") + 4)
        .split(/\n?\d+\.\s+/) 
        .filter((b) => b.trim() !== "");
      setGeneratedBio(bioArray);
    } catch {
      setError("Failed to generate bio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateBio();
  }, []);

  return (
    <div
      class="relative flex size-full min-h-screen flex-col bg-[#fcfbf8] group/design-root overflow-x-hidden"
      style={{
        "--select-button-svg":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239e8747' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
      }}
    >
      <div class="layout-container flex h-full grow flex-col">
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f0e6] px-10 py-3">
          <div class="flex items-center gap-4 text-[#1c180d]">
            <div class="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 class="text-[#1c180d] text-lg font-bold leading-tight tracking-[-0.015em]">
              BioCraft
            </h2>
          </div>
          <div class="flex flex-1 justify-end gap-8">
            <div class="flex items-center gap-9">
              <a
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#fac638] text-[#1c180d] text-sm font-bold leading-normal tracking-[0.015em]"
                href="https://github.com/fms12/twitter-bio-generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <p>Star on GitHub</p>
              </a>
            </div>
          </div>
        </header>
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 class="text-[#1c180d] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Craft Your Perfect Twitter Bio
            </h2>
            <p class="text-[#1c180d] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Let our AI generate a bio that captures your essence and attracts
              followers.
            </p>
            <div class="w-full flex justify-center px-4 py-3">
              <label class="flex flex-col w-full max-w-[480px]">
                <p class="text-[#1c180d] text-base font-medium leading-normal pb-2">
                  1. Drop in your job
                  <span class="text-slate-500"> (or your favorite hobby).</span>
                </p>
                <textarea
                  placeholder="e.g. 'Software Engineer, AI Enthusiast'"
                  class="form-input w-full resize-none overflow-hidden rounded-xl text-[#1c180d] focus:outline-0 focus:ring-0 border border-[#e9e2ce] bg-[#fcfbf8] focus:border-[#e9e2ce] min-h-36 placeholder:text-[#9e8747] p-[15px] text-base font-normal leading-normal"
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div class="w-full flex justify-center px-4 py-3">
              <label class="flex flex-col w-full max-w-[480px]">
                <p class="text-[#1c180d] text-base font-medium leading-normal pb-2">
                  2. Select your vibe.
                </p>
                <select
                  onChange={(e) => setVibe(e.target.value)}
                  class="form-input w-full resize-none overflow-hidden rounded-xl text-[#1c180d] focus:outline-0 focus:ring-0 border border-[#e9e2ce] bg-[#fcfbf8] focus:border-[#e9e2ce] h-14 bg-[image:--select-button-svg] placeholder:text-[#9e8747] p-[15px] text-base font-normal leading-normal"
                >
                  {options.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div class="flex px-4 py-3 justify-center">
              <button
                onClick={generateBio}
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#fac638] text-[#1c180d] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span class="truncate">Generate Bio</span>
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {loading && (
              <div className="flex justify-center items-center mt-4">
                <Loder />
              </div>
            )}

            {Array.isArray(generatedBio) && generatedBio.length > 0 && (
              <div className="flex flex-col items-center mt-6">
                <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                  Your generated bios
                </h2>
              </div>
            )}
            {Array.isArray(generatedBio) && generatedBio.length > 0 && (
              <div className="w-full flex flex-col justify-center px-4 py-3">
                {generatedBio.map((bio, index) => (
                  <Cards key={index} bio={bio.trim()} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BioGenerator;
