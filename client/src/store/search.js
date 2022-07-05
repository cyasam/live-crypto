import create from 'zustand';

export const useSearch = create((set) => ({
  query: '',
  open: false,
  toggleSearch: (status) => set(() => ({ open: status })),
  setQuery: (query) => set(() => ({ query })),
}));
