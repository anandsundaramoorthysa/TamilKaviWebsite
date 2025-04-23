import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, File, FileJson, Github, GitPullRequest, Send, Code } from 'lucide-react';

const ContributePage = () => {
  useEffect(() => {
    document.title = 'Contribute | TamilKavi';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-12">How to Contribute</h1>

        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-lg mb-6">
              We welcome contributions from everyone who wants to help preserve and promote Tamil literature.
              There are two main ways to contribute poems to our collection:
            </p>
          </div>

          {/* Feature Contribution */}
          <div className="mb-12 border-2 border-tamil-green/20 rounded-lg p-8 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <div className="bg-tamil-green/10 p-4 rounded-full">
                  <Code className="h-16 w-16 text-tamil-green-dark" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-4">Contributing New Features</h2>
                <p className="mb-4">
                  We are always looking for ways to improve our platform and welcome contributions of new features.
                  If you have an idea for a new feature or improvement, we'd love to hear about it!
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">Guidelines for Feature Contributions:</h3>
                <ol className="list-decimal list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-medium">Discuss your idea</span>
                    <p className="text-gray-600 mt-1 pl-6">
                      Before you start coding, please open an <a href="https://github.com/anandsundaramoorthysa/TamilKavi/issues" target="_blank" rel="noopener noreferrer" className="text-tamil-blue-dark hover:underline">issue</a> on our GitHub repository to discuss your proposed feature. This helps ensure it aligns with the project's goals and avoids duplicate work.
                    </p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Understand the codebase</span>
                    <p className="text-gray-600 mt-1 pl-6">
                      Take some time to familiarize yourself with the existing codebase, its structure, and coding conventions.
                    </p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Follow coding standards</span>
                    <p className="text-gray-600 mt-1 pl-6">
                      Please adhere to the coding style and best practices used throughout the project, including the <a href="https://peps.python.org/pep-0008/" target="_blank" rel="noopener noreferrer" className="text-tamil-blue-dark hover:underline">PEP-8 format</a> for Python code. This includes proper formatting, naming conventions, and commenting.
                    </p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Write tests</span>
                    <p className="text-gray-600 mt-1 pl-6">
                      Ensure your feature contribution includes appropriate unit and integration tests to verify its functionality and prevent regressions.
                    </p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Submit a pull request</span>
                    <p className="text-gray-600 mt-1 pl-6">
                      Once you've developed your feature and written tests, submit a pull request with a clear title and description of your changes. Reference the issue you discussed earlier in the PR description.
                    </p>
                  </li>
                </ol>

                <p className="mt-6">
                  Our team will review your pull request and provide feedback. We appreciate your effort in helping us improve this project!
                </p>

                <div className="mt-6 flex">
                  <a
                    href="https://github.com/anandsundaramoorthysa/TamilKavi/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center"
                  >
                    <GitPullRequest className="mr-2 h-5 w-5" />
                    View Open Issues
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Contribution */}
          <div className="mb-12 border-2 border-tamil-blue/20 rounded-lg p-6 sm:p-8 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-6">

              {/* Icon */}
              <div className="flex justify-center md:justify-start md:w-1/4">
                <div className="bg-tamil-blue/10 p-4 rounded-full w-fit">
                  <Github className="h-14 w-14 text-tamil-blue" />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/4 space-y-5">
                <h2 className="text-xl sm:text-2xl font-bold">Contributing via GitHub</h2>
                <p className="text-gray-700">
                  If you're familiar with GitHub, this is our preferred method as it maintains proper versioning
                  and attribution of contributions. You will be directly adding data to the project's source files.
                </p>

                {/* Steps */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step-by-Step Process:</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-800">
                    <li>
                      <span className="font-medium">Fork the repository</span>
                      <p className="text-gray-600 ml-5">Start by forking our <a href="https://github.com/anandsundaramoorthysa/TamilKavi" target="_blank" rel="noopener noreferrer" className="text-tamil-blue-dark hover:underline">GitHub repository</a> to your own account.</p>
                    </li>
                    <li>
                      <span className="font-medium">Navigate to the data directory</span>
                      <p className="text-gray-600 ml-5">
                        In your forked repository, navigate to the `tamilkavi/kavisrc/` directory.
                      </p>
                    </li>
                     <li>
                      <span className="font-medium">Find or create the author's file</span>
                      <p className="text-gray-600 ml-5">
                        Look for a JSON file named after the author (e.g., `jothi.json`). If the author doesn't exist, create a new JSON file using their name in lowercase.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Add/Update the JSON data</span>
                      <p className="text-gray-600 ml-5">
                         Add or update the poem data within the author's JSON file, following the specified structure for `author`, `contact`, and the `books` array. Ensure the structure for each `book` and `context` entry is correct.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Commit your changes</span>
                      <p className="text-gray-600 ml-5">Commit the changes to your forked repository with a clear and concise commit message.</p>
                    </li>
                    <li>
                      <span className="font-medium">Submit a pull request (PR)</span>
                      <p className="text-gray-600 ml-5">Create a pull request from your forked repository's branch to the main `TamilKavi` repository's `main` branch. Provide a clear title and description of the poems you've added or updated.</p>
                    </li>
                  </ol>
                </div>

                {/* Sample JSON */}
                <div className="bg-gray-50 p-4 rounded-md mt-6">
                  <h4 className="font-semibold mb-2 flex items-center text-gray-800">
                    <FileJson className="mr-2 h-5 w-5" />
                    Sample JSON Structure
                  </h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
                    {`{
  "author": "jothi",
  "contact": "sanand03072005@gamil.com",
  "books":[
      {
          "booktitle": "இன்பமில்லா-இதயத்திலிருந்து",
          "booktitle_tanglish": "inbamilla-ithayathilirundhu",
          "description": "சாதிக்க தூதிக்கும் ஒரு சாதாரண மாணவன்",
          "category": "Feelings",
          "context":[
              {
                  "title": "God-Murugan-Song",
                  "line": "பிறப்பிலும் முருகனை, இறப்பிலும் இறைவனை, அனைத்திலும் அவனை கொண்டு இனிதே தொடங்குவோம்!.",
                  "meaning": "எனது பிறப்பிலும் முருகனை, எனது இறப்பிலும் அவனை, எனது வாழ்வின் ஒவ்வொரு கட்டத்திலும் அவனை நினைத்து இனிதே தொடங்குவோம்!."
              }
              // Add more poem contexts here
          ]
      }
      // Add more books here
  ]
}`}
                  </pre>
                   <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md text-sm">
                    <strong>⚠️ Important:</strong> Please ensure the JSON structure is valid and follows the format precisely. Invalid JSON will cause errors.
                  </div>
                </div>


                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href="https://github.com/anandsundaramoorthysa/TamilKavi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    <GitPullRequest className="mr-2 h-5 w-5" />
                    Visit our GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>


          {/* Form Submission */}
          <div className="mb-12 border-2 border-tamil-gold/20 rounded-lg p-8 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <div className="bg-tamil-gold/10 p-4 rounded-full">
                  <File className="h-16 w-16 text-tamil-gold-dark" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-4">Contributing via Submission Form</h2>
                <p className="mb-4">
                  Not comfortable with GitHub? No problem! You can use our submission form to contribute poems.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">What You'll Need:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>✍️ Author Original Name</li>
                  <li>📘 Author Book Name</li>
                  <li>📧 Contact Email</li>
                  <li>📑 Book Title (Tamil)</li>
                  <li>📑 Book Title (Tanglish)</li>
                  <li>📝 Book Description</li>
                  <li>🏷️ Poem Category</li>
                  <li>
                    📂 Upload your poetry document{' '}
                    <span className="text-sm text-gray-600">(under 100 MB, plain text or .docx preferred)</span>
                  </li>
                </ul>

                {/* Sample JSON */}
                <div className="bg-gray-50 p-4 rounded-md mt-6">
                  <h4 className="font-semibold mb-2 flex items-center text-gray-800">
                    <FileJson className="mr-2 h-5 w-5" />
                    Sample Document Format
                  </h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                    {`Title: God-Murugan-Song
Kavithai: பிறப்பிலும் முருகனை, இறப்பிலும் இறைவனை, அனைத்திலும் அவனை கொண்டு இனிதே தொடங்குவோம்!.
Meaning: எனது பிறப்பிலும் முருகனை, எனது இறப்பிலும் அவனை, எனது வாழ்வின் ஒவ்வொரு கட்டத்திலும் அவனை நினைத்து இனிதே தொடங்குவோம்!.

Title: Mother-Love
Kavithai: தாலாட்டில் வளர்ந்தவன், தனிமையில் வளரும் கொடுமைகளை, வார்த்தையில் சொல்ல இயலாது.
Meaning: தாயின் மடியில் நன்காக, அன்பாக வளர்க்கப்பட்ட ஒரு குழந்தை, பிறகு தனிமையில் வளர நேரிடும் போது எதிர்கொள்ளும் வேதனைகள் மற்றும் துன்பங்களை வார்த்தைகளால் விவரிக்க முடியாது. அந்த அனுபவம் மிகுந்த மன வேதனையைக் கொடுக்கும்.`}
                  </pre>

                  <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md text-sm">
                    <strong>⚠️ Important:</strong> Please <span className="font-semibold">do not submit kavithaigal written by other authors</span> unless you have explicit permission. We will not accept or include plagiarized content.
                  </div>

                  <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-md text-sm">
                    📦 Once we review and approve your submission, it will be added to our <span className="font-semibold">Python Package</span>, listed on the <span className="font-semibold">Website – Preview Poems Page</span>, and published in our <span className="font-semibold">Hugging Face Dataset</span>.
                  </div>
                </div>



                <p className="mt-6">
                  Our team will review submissions and add them to the repository, with full attribution to the contributor.
                </p>

                <div className="mt-6 flex">
                  <Link to="/submit" className="btn-secondary flex items-center">
                    <Send className="mr-2 h-5 w-5" />
                    Go to Submission Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;