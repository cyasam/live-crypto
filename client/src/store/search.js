import create from 'zustand';

export const useSearch = create((set) => ({
  search: '',
  open: false,
  toggleSearch: (status) => set(() => ({ open: status })),
  setSearch: (search) => set(() => ({ search })),
}));
