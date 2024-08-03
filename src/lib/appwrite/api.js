
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username
        );

        const avatarUrl = avatars.getInitials(user.username);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            password: user.password,
            username: user.username,
            profilephoto: avatarUrl,
            profilewallpaper: avatarUrl || "",
            bio: user.bio || "",
            status: user.status || "",
            friends: [],
            chats: [],
        });

        return newUser;
    } catch (error) {
        console.error("Error creating user account:", error);
        throw error;
    }
}

export async function saveUserToDB(user) {
    try {
        console.log("Appwrite Config:", appwriteConfig);
        console.log("Saving user to DB with:", {
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.usersCollectionId,
            documentId: ID.unique(),
            data: user
        });

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.error("Error saving user to DB:", error);
        throw error;
    }
}

export async function signInAccount(user) {
    try {
        const currentSession = await account.getSession("current").catch((error) => {
            if (error.code === 401) return null;
            throw error;
        });

        if (currentSession) {
            console.log("User is already logged in:", currentSession);
            return currentSession;
        }

        const session = await account.createEmailPasswordSession(
            user.email,
            user.password
        );
        return session;
    } catch (error) {
        console.error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser.documents.length) throw new Error("User not found in database.");

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
        throw error; // Propaga o erro para ser tratado no React Query
    }
}
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.error(error);
    }
}
export async function sendMessage(chatId, senderId, content, attachments = []) {
    try {
        const message = {
            chatId,
            senderId,
            content,
            attachments,
            timestamp: new Date().toISOString(),
        };

        const newMessage = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId,
            ID.unique(),
            message
        );

        return newMessage;
    } catch (error) {
        console.error(error);
    }
}

export async function getMessages(chatId) {
    try {
        const messages = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId,
            [Query.equal("chatId", chatId)]
        );

        return messages.documents;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserChats(userId) {
    if (!userId) {
      throw new Error("User ID is missing.");
    }
  
    try {
      const chats = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatsCollectionId,
        [Query.search("members", userId)]
      );
  
      if (!chats.documents.length) {
        return [];
      }
  
      const chatDetailsPromises = chats.documents.map(async (chat) => {
        const membersDetails = await Promise.all(
          chat.members.map(async (memberId) => {
            const user = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.usersCollectionId,
              memberId
            );
            return user;
          })
        );
  
        const lastMessage = await getMessages(chat.$id).then(messages =>
          messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
        );
  
        return {
          ...chat,
          membersDetails,
          lastMessage
        };
      });
  
      const chatDetails = await Promise.all(chatDetailsPromises);
      return chatDetails;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
}

export async function searchUsers(term, user) {
    if (!term || !user) {
        throw new Error("Search term or user ID is missing.");
    }

    try {
        // Fetch all users matching the search term
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.search("username", term),
            Query.notEqual('$id', user.id) // Excluindo o usuário logado
            ]

        );

        // Extract all friend IDs from the current user's friends list
        const friendIds = new Set(user.friends || []);

        // Filter out users who are already friends with the current user
        const filteredUsers = response.documents.filter(user => !friendIds.has(user.$id));

        return filteredUsers;
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
}


export async function createGroup(groupData) {
    try {
        const newGroup = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupsCollectionId,
            ID.unique(),
            groupData
        );

        return newGroup;
    } catch (error) {
        console.error(error);
    }
}

export async function getFilePreview(fileId) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );
        console.log("File preview URL:", fileUrl);
        return fileUrl.href;
    } catch (error) {
        console.error("Error getting file preview:", error);
        throw error;
    }
}

export async function deleteFile(fileId) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: "ok" };
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(userId, updatedData) {
    try {
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            updatedData
        );
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function uploadFile(file) {
    try {
        console.log("Uploading file:", file);
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        console.log("Uploaded file:", uploadedFile);
        return uploadedFile.$id;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

// export const searchUsers = async (term) => {
//     try {
//         const response = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.usersCollectionId,
//             [Query.search("username", term)]
//         );
//         return response.documents;
//     } catch (error) {
//         console.error("Error searching users:", error);
//         throw error;
//     }
// };

export async function createChat(chatData) {
    try {
        const chatId = ID.unique();

        const newChat = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.chatsCollectionId,
            chatId,
            {
                chatId,
                type: chatData.type,
                members: chatData.members,
            }
        );

        await Promise.all(
            chatData.members.map(async (memberId) => {
                const userDoc = await databases.getDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    memberId
                );

                const updatedChats = userDoc.chats || [];
                if (!updatedChats.includes(chatId)) {
                    updatedChats.push(chatId);
                }

                await databases.updateDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    memberId,
                    { chats: updatedChats }
                );
            })
        );

        return newChat;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
}

export async function addFriend({ userId, friendId }) {
    try {
        // Atualiza o documento do usuário logado para incluir o friendId
        const userDoc = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId
        );

        const updatedFriendsUser = userDoc.friends || [];
        if (!updatedFriendsUser.includes(friendId)) {
            updatedFriendsUser.push(friendId);
        }

        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            { friends: updatedFriendsUser }
        );

        // Atualiza o documento do amigo para incluir o userId
        const friendDoc = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            friendId
        );

        const updatedFriendsFriend = friendDoc.friends || [];
        if (!updatedFriendsFriend.includes(userId)) {
            updatedFriendsFriend.push(userId);
        }

        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            friendId,
            { friends: updatedFriendsFriend }
        );

        return { status: 'success' };
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}
