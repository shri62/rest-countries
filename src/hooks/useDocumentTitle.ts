import { useEffect } from 'react';

// Changes the text on the browser tab
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title; // set the tab text
  }, [title]); // run again when title changes
}
