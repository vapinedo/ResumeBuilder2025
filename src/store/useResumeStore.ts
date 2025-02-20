import { create } from 'zustand';
import { ResumeData } from '@interfaces/ResumeData';
import { datosPersonalesInit } from '@interfaces/DatosPersonales';

export const useResumeStore = create<ResumeData>((set) => ({
  datosPersonales: datosPersonalesInit(),

  updateDatosPersonales: (newState) =>
    set((state) => ({
      datosPersonales: { ...state.datosPersonales, ...newState }
    }))
}));
