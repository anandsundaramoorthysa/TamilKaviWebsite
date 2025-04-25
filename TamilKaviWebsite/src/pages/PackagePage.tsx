import React, { useEffect } from 'react';
import { Clipboard, Code, CopyCheck, Database, Download, Package, Terminal } from 'lucide-react'; 
import { useState } from 'react';

const PackagePage = () => {
  useEffect(() => {
    document.title = 'Package | TamilKavi';
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = useState<Record<string, boolean>>({
    install: false,
    help: false,
    example1: false,
    example2: false,
    example3: false
  });

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => {
      setCopied({ ...copied, [key]: false });
    } , 3000); 
  };

  const cliExamples = [
    { key: 'getHelp', command: 'tamilkavi -h', description: 'Get detailed help' },
    { key: 'listAuthors', command: 'tamilkavi -a', description: 'List all authors' },
    { key: 'listBooks', command: 'tamilkavi -b', description: 'List all books from all authors' },
    { key: 'listTitles', command: 'tamilkavi -t', description: 'List all unique poem titles from all books' },
    { key: 'showAuthorBooks', command: 'tamilkavi -a "Author Name"', description: 'Show books by a specific author' },
    { key: 'showBookPoems', command: 'tamilkavi -b "Book Title"', description: 'Show poems from a specific book (by any author, if -a not used)' },
    { key: 'showTitlePoems', command: 'tamilkavi -t "Poem Title"', description: 'Show poems with a specific title (from any book/author, if -a/-b not used)' },
    { key: 'filterAuthorBook', command: 'tamilkavi -a "Author Name" -b "Book Title"', description: 'Show poems from a specific book by a specific author' },
    { key: 'filterAuthorTitle', command: 'tamilkavi -a "Author Name" -t "Poem Title"', description: 'Show poems with a specific title by a specific author' },
    { key: 'filterBookTitle', command: 'tamilkavi -b "Book Title" -t "Poem Title"', description: 'Show poems with a specific title from a specific book' },
    { key: 'filterAuthorBookTitle', command: 'tamilkavi -a "Author Name" -b "Book Title" -t "Poem Title"', description: 'Show poems with a specific title from a specific book by a specific author' },
  ];

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-6">Package Information</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          TamilKavi is available as an open-source Python package, providing a command-line interface
          to explore a collection of Tamil poems.
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Package Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-tamil-blue/10 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-tamil-blue" />
              </div>
              <h2 className="text-2xl font-bold">tamilkavi</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Version</p>
                <p className="font-semibold">0.4.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">License</p>
                <p className="font-semibold">MIT</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Release Date</p>
                <p className="font-semibold">April 25, 2025</p> 
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Python Version</p>
                <p className="font-semibold">3.7+</p> 
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Download className="mr-2 h-6 w-6" />
              Installation
            </h2>
            <p className="mb-4">
              Install the package using pip:
            </p>

            <div className="relative">
              <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
                pip install tamilkavi
              </pre>
              <button
                onClick={() => copyToClipboard('pip install tamilkavi', 'install')}
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
                aria-label="Copy to clipboard"
              >
                {copied.install ? <CopyCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Terminal className="mr-2 h-6 w-6" /> 
              CLI Usage
            </h2>
             <p className="mb-4">
              TamilKavi is designed to be used directly from your terminal. After installation, the command <code className="bg-gray-200 px-1 rounded">tamilkavi</code> will be available.
            </p>

             <p className="mb-4">
              To see the available options and commands:
            </p>
             <div className="relative mb-6">
                <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
                  {cliExamples[0].command} {/* Display the help command */}
                </pre>
                <button
                  onClick={() => copyToClipboard(cliExamples[0].command, cliExamples[0].key)}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
                  aria-label="Copy to clipboard"
                >
                  {copied[cliExamples[0].key] ? <CopyCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </button>
              </div>

             <p className="mb-4">
              Here are some examples of how to use the <code className="bg-gray-200 px-1 rounded">tamilkavi</code> command:
            </p>

            <div className="space-y-4">
              {cliExamples.slice(1).map((example) => (
                <div key={example.key}>
                  <h3 className="text-lg font-semibold mb-2">{example.description}</h3>
                  <div className="relative">
                    <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
                      {example.command}
                    </pre>
                     <button
                        onClick={() => copyToClipboard(example.command, example.key)}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
                        aria-label="Copy to clipboard"
                      >
                        {copied[example.key] ? <CopyCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="mr-2 h-6 w-6" />
              Data Structure
            </h2>
            <p className="mb-4">
              The poetry data included in the package follows this hierarchical JSON structure:
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs md:text-sm">
{`{
  "author": "Author Name",
  "contact": "author@gmail.com",
  "books": [
    {
      "booktitle": "Book Title",
      "booktitle_tanglish": "Book Title in Tanglish",
      "description": "Book description",
      "category": "Book category",
      "context": [
        {
          "title": "Poem Title",
          "line": "Poem content...",
          "meaning": "Poem Meaning"
        },
        // More poems...
      ]
    },
    // More books...
  ]
}`}
              </pre>
            </div>
          </div>

          <div className="bg-tamil-earth-light p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Want to contribute to the project?</h3> 
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/anandsundaramoorthysa/tamilkavi" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
              >
                Visit on GitHub
              </a>
              <a
                href="https://pypi.org/project/tamilkavi/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary" 
              >
                View on PyPI
              </a>
            </div>
             <a
                href="https://tamilkavi.jigg.win/contribute"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tertiary" 
              >
                Go to Submission Form
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;