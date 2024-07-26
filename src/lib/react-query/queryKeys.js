export const QUERY_KEYS = {
  // AUTH KEYS
  CREATE_USER_ACCOUNT: "createUserAccount",
  SIGN_IN_ACCOUNT: "signInAccount",
  SIGN_OUT_ACCOUNT: "signOutAccount",
  GET_CURRENT_USER: "getCurrentUser",

  // USER KEYS
  GET_USERS: "getUsers", // Essa função ainda não foi definida. Podemos removê-la se não for necessária.
  GET_USER_BY_ID: "getUserById", // Essa função ainda não foi definida. Podemos removê-la se não for necessária.
  UPDATE_USER: "updateUser",
  SAVE_USER_TO_DB: "saveUserToDB", // Adiciona esta chave se necessário

  // MESSAGE KEYS
  GET_MESSAGES: "getMessages",
  SEND_MESSAGE: "sendMessage",
  DELETE_MESSAGE: "deleteMessage", // Essa função ainda não foi definida. Podemos removê-la se não for necessária.

  // CHAT KEYS
  GET_USER_CHATS: "getUserChats",

  // GROUP KEYS
  CREATE_GROUP: "createGroup",

  // ATTACHMENT KEYS
  UPLOAD_FILE: "uploadFile",
  GET_FILE_PREVIEW: "getFilePreview",
  DELETE_FILE: "deleteFile",
};
