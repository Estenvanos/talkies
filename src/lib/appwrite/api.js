
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
            profilewallpaper: user.profilewallpaper || "",
            bio: user.bio || "",
            status: user.status || ""
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
    try {
        const chats = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.chatsCollectionId,
            [Query.search("members", userId)]
        );

        return chats.documents;
    } catch (error) {
        console.error(error);
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
export async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.error(error);
        throw error;
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
        return fileUrl;
    } catch (error) {
        console.error(error);
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

