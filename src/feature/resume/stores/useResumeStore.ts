import { create } from 'zustand';
import { ResumeData } from 'feature/resume/interfaces/ResumeData';
import { datosPersonalesInit } from '@modules/resume/interfaces/DatosPersonales';

export const useResumeStore = create<ResumeData>((set) => ({
  datosPersonales: datosPersonalesInit(),

  updateDatosPersonales: (newState) =>
    set((state) => ({
      datosPersonales: { ...state.datosPersonales, ...newState },
    })),
}));
