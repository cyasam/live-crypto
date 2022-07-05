import create from 'zustand';

export const useSearch = create((set) => ({
  search: '',
  query: '',
  open: false,
  toggleSearch: (status) => set(() => ({ open: status })),
  setQuery: (query) => set(() => ({ query })),
  setSearch: (search) => set(() => ({ search })),
}));
