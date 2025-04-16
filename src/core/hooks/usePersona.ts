import { Persona } from '@feature/persona/models/Persona';
import PersonaService from '@core/services/PersonaService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useListaPersonas = () => {
  return useQuery({
    queryKey: ['personas'],
    queryFn: PersonaService.getAllDocuments,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCrearPersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { persona: Persona; imagenes?: FileList | null }) =>
      PersonaService.createDocument(data.persona, data.imagenes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personas'] }),
  });
};

export const useActualizarPersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { persona: Persona; imagenes?: FileList | null }) =>
      PersonaService.updateDocument(data.persona, data.imagenes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personas'] }),
  });
};

export const useBorrarPersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => PersonaService.deleteDocument(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personas'] }),
  });
};
