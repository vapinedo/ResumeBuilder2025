import type { WithFieldValue, DocumentData } from 'firebase/firestore';
import { DEFAULT_STALE_TIME } from '@shared/constants/reactQuery.config';
import FirestoreGenericService from '@core/services/FirestoreGenericService';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

export function useFirestoreCrud<T extends WithFieldValue<DocumentData>>(collectionName: string) {
  const queryClient = useQueryClient();
  const service = FirestoreGenericService<T>(collectionName);

  const useList = () =>
    useQuery({
      queryKey: [collectionName],
      queryFn: service.getAllDocuments,
      staleTime: DEFAULT_STALE_TIME,
    });

  const useCreate = (options?: UseMutationOptions<void, unknown, { entity: T; images?: FileList | null }>) =>
    useMutation({
      mutationFn: (data) => service.createDocument(data.entity, data.images),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useUpdate = (
    options?: UseMutationOptions<void, unknown, { entity: T & { id: string }; images?: FileList | null }>
  ) =>
    useMutation({
      mutationFn: (data) => service.updateDocument(data.entity, data.images),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useDelete = (options?: UseMutationOptions<void, unknown, string>) =>
    useMutation({
      mutationFn: (id) => service.deleteDocument(id),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useGetById = (id?: string) =>
    useQuery({
      queryKey: [collectionName, id],
      queryFn: () => service.getDocumentById(id!),
      enabled: !!id,
    });

  return {
    useList,
    useCreate,
    useUpdate,
    useDelete,
    useGetById,
  };
}
