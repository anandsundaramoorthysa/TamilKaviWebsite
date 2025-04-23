import React, { useState, useEffect, useMemo } from 'react';
import { poemsData } from '../data/poems'; // Assuming poemsData has the structure: Author[] where Author has books: Book[], Book has context: Poem[]

// Optional: Keep interface imports if needed for clarity, but not strictly necessary for the logic itself
// import { Author, Book, Poem } from '../data/poems';

const PreviewPage = () => {
  useEffect(() => {
    document.title = 'Preview | TamilKavi';
    window.scrollTo(0, 0);
  }, []);

  // State for filters
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterBook, setFilterBook] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTitle, setFilterTitle] = useState(''); // State for title filter (will now hold a selected title)

  // --- Derived state/variables for dropdown options and filtering ---
  // Use useMemo to memoize these calculations for performance

  // Get unique author names for the Author dropdown
  const authorOptions = useMemo(() => {
    const authors = Array.from(new Set(poemsData.map(author => author.author)));
    // Capitalize for display in dropdown, but keep original case in state for filtering
    return ['', ...authors.map(name => name.charAt(0).toUpperCase() + name.slice(1))]; // Add empty string for "All Authors" option
  }, [poemsData]); // Recalculate only if poemsData changes (unlikely in this case)

  // Get books for the selected author (used by subsequent filters and display)
  const booksForSelectedAuthor = useMemo(() => {
    if (!filterAuthor) return [];
    const lowerCaseAuthor = filterAuthor.toLowerCase(); // Compare lowercase state with lowercase data
    const authorData = poemsData.find(author => author.author.toLowerCase() === lowerCaseAuthor);
    return authorData?.books || [];
  }, [filterAuthor, poemsData]); // Recalculate when filterAuthor changes or data changes

  // Get unique book titles for the Book dropdown based on selected author or all authors
  const bookOptions = useMemo(() => {
    let booksToProcess = [];
    if (filterAuthor === '') {
      // If no specific author is selected, get books from ALL authors
      booksToProcess = poemsData.flatMap(author => author.books);
    } else {
      // If a specific author is selected, use the memoized result for that author
      booksToProcess = booksForSelectedAuthor;
    }
    const titles = Array.from(new Set(booksToProcess.map(book => book.booktitle)));
    return ['', ...titles]; // Add empty string for "All Books" option
  }, [filterAuthor, poemsData, booksForSelectedAuthor]); // Dependencies needed for both branches

  // Get books matching the selected author AND selected book title (used by subsequent filters and display)
  const booksForSelectedBook = useMemo(() => {
     if (!filterAuthor || !filterBook) {
         // This memo is specifically for when BOTH author and book are selected
         return [];
     }
      // Filter books based on selected book title within the selected author's books
    return booksForSelectedAuthor.filter(book => book.booktitle === filterBook);
  }, [booksForSelectedAuthor, filterBook, filterAuthor]); // Recalculate when booksForSelectedAuthor, filterBook, or filterAuthor changes


  // Get unique categories for the Category dropdown based on selected book(s)
  const categoryOptions = useMemo(() => {
    let booksToProcess = [];
    if (filterAuthor === '') {
      // All authors
      booksToProcess = poemsData.flatMap(author => author.books);
    } else {
      // Specific author
      booksToProcess = booksForSelectedAuthor;
    }

    if (filterBook !== '') {
      // If a specific book is selected within the current scope (all or author's), filter further
      booksToProcess = booksToProcess.filter(book => book.booktitle === filterBook);
    }

    const categories = Array.from(new Set(booksToProcess
      .map(book => book.category)
      .filter(category => category) // Filter out empty/undefined categories
    ));
    return ['', ...categories]; // Add empty string for "All Categories" option
  }, [filterAuthor, filterBook, poemsData, booksForSelectedAuthor]); // Dependencies

    // Get poems matching the selected author, book, AND category (used by subsequent filters and display)
    const poemsForSelectedCategory = useMemo(() => {
        // This memo is for when Author, Book, AND Category are selected
        if (!filterAuthor || !filterBook || !filterCategory || booksForSelectedBook.length === 0) return [];
        // Find books matching the selected book title AND category
        const matchingBooks = booksForSelectedBook.filter(book => book.category === filterCategory);
        return matchingBooks.flatMap(book => book.context); // Flatten all poems from matching books/categories
    }, [booksForSelectedBook, filterCategory, filterBook, filterAuthor]); // Recalculate when booksForSelectedBook, filterCategory, filterBook, or filterAuthor changes


    // Get unique poem titles for the Title dropdown based on selected category(ies)
    const titleOptions = useMemo(() => {
        let poemsToProcess = [];
        let booksToProcess = [];

        if (filterAuthor === '') {
            // All authors
            booksToProcess = poemsData.flatMap(author => author.books);
        } else {
            // Specific author
            booksToProcess = booksForSelectedAuthor;
        }

        if (filterBook !== '') {
            // If a specific book is selected within the current scope, filter books further
            booksToProcess = booksToProcess.filter(book => book.booktitle === filterBook);
        }

        if (filterCategory !== '') {
            // If a specific category is selected within the current book scope, filter books further
            // Then flatten poems from these filtered books
            poemsToProcess = booksToProcess.filter(book => book.category === filterCategory).flatMap(book => book.context);
        } else {
             // If no specific category is selected, just flatten poems from the current book scope
             poemsToProcess = booksToProcess.flatMap(book => book.context);
        }

        const titles = Array.from(new Set(poemsToProcess.map(poem => poem.title)));
        return ['', ...titles]; // Add empty string for "All Titles" option
    }, [filterAuthor, filterBook, filterCategory, poemsData, booksForSelectedAuthor]); // Dependencies. booksForSelectedBook is indirectly used via filterBook check. poemsForSelectedCategory is indirectly used via filterCategory check.

  // --- Filtering logic for display ---

  // Filter poems data based on selected filters for display
  const filteredAuthorsForDisplay = useMemo(() => {
    return poemsData
      .filter(author =>
        // Filter by Author (always apply, even if empty)
        filterAuthor === '' || author.author.toLowerCase() === filterAuthor.toLowerCase()
      )
      .map(author => {
        // For each matching author, filter their books
        const filteredBooks = author.books
          .filter(book =>
            // Filter by Book Title and Category within the selected author's books
            (filterBook === '' || book.booktitle === filterBook) &&
            (filterCategory === '' || book.category === filterCategory)
          )
          .map(book => {
            // For each matching book, filter its poems by the selected Title
            const filteredPoems = book.context.filter(poem => {
              // Filter by selected title (exact match for dropdown)
              const titleMatch = filterTitle === '' || poem.title === filterTitle;
              return titleMatch;
            });
            return {
              ...book,
              context: filteredPoems
            };
          })
          .filter(book => book.context.length > 0); // Exclude books that have no poems after poem filter

        return {
          ...author,
          books: filteredBooks
        };
      })
      .filter(author => author.books.length > 0); // Exclude authors who have no books left after all filtering
  }, [filterAuthor, filterBook, filterCategory, filterTitle, poemsData]); // Recalculate when any filter changes or data changes

  // Uncomment this useEffect to log filter values and dropdown options
  /*
    useEffect(() => {
      console.log("--- Filter State Updated ---");
      console.log("Current Filters:", { filterAuthor, filterBook, filterCategory, filterTitle });
      console.log("Author Options:", authorOptions);
      console.log("Book Options for dropdown:", bookOptions);
      console.log("Category Options for dropdown:", categoryOptions);
      console.log("Title Options for dropdown:", titleOptions);
      console.log("Filtered Authors for Display:", filteredAuthorsForDisplay); // Log filtered data
      console.log("--------------------------");
    }, [filterAuthor, filterBook, filterCategory, filterTitle, authorOptions, bookOptions, categoryOptions, titleOptions, filteredAuthorsForDisplay]);
  */


  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-6">Preview Kavithaigal</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Explore our collection of Tamil poems from various authors and time periods.
          Use the filters below to narrow down the collection.
        </p>

        {/* Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Adjusted grid for 4 filters */}
            {/* Author Filter */}
            <div>
              <label htmlFor="author-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Author
              </label>
              <select
                id="author-filter"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tamil-blue focus:border-tamil-blue"
                value={filterAuthor}
                onChange={(e) => {
                  setFilterAuthor(e.target.value);
                  setFilterBook(''); // Reset book filter when author changes
                  setFilterCategory(''); // Reset category filter when author changes
                  setFilterTitle(''); // Reset title filter when author changes
                }}
              >
                {authorOptions.map(author => (
                  <option key={author} value={author}>{author === '' ? 'All Authors' : author}</option>
                ))}
              </select>
            </div>

            {/* Book Filter */}
            <div>
               <label htmlFor="book-filter" className="block text-sm font-medium text-gray-700 mb-1">
               Filter by Book
              </label>
              <select
                id="book-filter"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tamil-blue focus:border-tamil-blue"
                value={filterBook}
                onChange={(e) => {
                  setFilterBook(e.target.value);
                   setFilterCategory(''); // Reset category filter when book changes
                   setFilterTitle(''); // Reset title filter when book changes
                }}
              >
                 {bookOptions.map(bookTitle => (
                   <option key={bookTitle} value={bookTitle}>{bookTitle === '' ? 'All Books' : bookTitle}</option>
                  ))}
              </select>
            </div>

            {/* Category Filter */}
             <div>
               <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
               Filter by Category
               </label>
               <select
                 id="category-filter"
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tamil-blue focus:border-tamil-blue"
                 value={filterCategory}
                 onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setFilterTitle(''); // Reset title filter when category changes
                 }}
               >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category === '' ? 'All Categories' : category}</option>
                    ))}
               </select>
             </div>

            {/* Title Filter - Changed to Select */}
            <div>
              <label htmlFor="title-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Title
              </label>
              <select
                id="title-filter"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tamil-blue focus:border-tamil-blue"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              >
                {titleOptions.map(title => (
                  <option key={title} value={title}>{title === '' ? 'All Titles' : title}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Poems Display */}
        <div className="max-w-4xl mx-auto">
          {filteredAuthorsForDisplay.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No poems found matching your filter criteria.</p>
            </div>
          ) : (
            filteredAuthorsForDisplay.map((author) => (
              <div key={author.author} className="mb-12">
                {/* Display Author name only if showing multiple authors or a specific author is filtered */}
                  {(filterAuthor !== '' || filteredAuthorsForDisplay.length > 1) && (
                    <h2 className="text-2xl font-bold mb-6 text-tamil-blue-dark">
                           {author.author.charAt(0).toUpperCase() + author.author.slice(1)} {/* Display capitalized author name */}
                    </h2>
                  )}

                {author.books.map((book) => (
                  <div key={book.booktitle} className="mb-8 p-4 border border-gray-200 rounded-md shadow-sm bg-white"> {/* Added styling to book container */}
                    <h3 className="text-xl font-semibold mb-4 pl-4 border-l-4 border-tamil-gold">
                      {book.booktitle}
                      {book.category && <span className="text-sm text-gray-500 ml-2">({book.category})</span>}
                    </h3>

                    {book.description && (
                      <p className="text-gray-600 mb-4 pl-4">{book.description}</p>
                    )}

                    {book.context.map((poem, index) => ( // Added index for key as poem title might not be unique within a book
                      <div key={`${book.booktitle}-${poem.title}-${index}`} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 poem-container"> {/* Added styling to poem container */}
                        <h4 className="text-lg font-semibold mb-2 tamil-text">{poem.title}</h4>
                        <div className="poem-line whitespace-pre-line text-gray-800"> {/* Styled poem line */}
                          {poem.line}
                        </div>

                        {poem.meaning && (
                          <div className="mt-3 pt-3 border-t border-gray-100"> {/* Styled meaning section */}
                            <h5 className="text-sm font-semibold text-gray-500 mb-1">Meaning:</h5> {/* Simplified Meaning label */}
                            <p className="text-gray-700 italic">{poem.meaning}</p> {/* Styled meaning */}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Export JSON Button - Keep if still needed */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(poemsData, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
              const exportFileDefaultName = 'tamil-kavithaigal.json';

              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
            className="btn-secondary"
          >
            Export Full Data as JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;