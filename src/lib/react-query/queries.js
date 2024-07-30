import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  getCurrentUser,
  saveUserToDB,
  updateUser,
  sendMessage,
  getMessages,
  getUserChats,
  createGroup,
  uploadFile,
  getFilePreview,
  deleteFile,
} from "@/lib/appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

// Auth hooks
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: createUserAccount,
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: signInAccount,
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

// User hooks
export const useUpdateUser = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedData) => updateUser(userId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};


// Message hooks
export const useGetMessages = (chatId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, chatId],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES],
      });
    },
  });
};

// Chat hooks
export const useGetUserChats = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_CHATS, userId],
    queryFn: () => getUserChats(userId),
    enabled: !!userId,
  });
};

// Group hooks
export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_CHATS],
      });
    },
  });
};

// Attachment hooks
export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};

export const useGetFilePreview = (fileId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FILE_PREVIEW, fileId],
    queryFn: () => getFilePreview(fileId),
    enabled: !!fileId,
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: deleteFile,
  });
};

export const useSaveUserToDB = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => saveUserToDB(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};