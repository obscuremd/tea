import axios from "axios";
import { Url } from "../../assets/Shared";

interface Conversation {
    _id: string;
    members: Array<string>;
    createdAt: string;
    updatedAt: string;
}

type ConversationArray = Conversation[]
type SetFriends= React.Dispatch<React.SetStateAction<User[]>>;
type SetLoading= React.Dispatch<React.SetStateAction<boolean>>;

export const getFriends = async(conversations:ConversationArray, username:string, setFriends:SetFriends, setLoading:SetLoading)=> {
    setLoading(true);
    const friendsArray: Array<User> = [];
    for (let i = 0; i < conversations.length; i++) {
        const { members } = conversations[i];

        // Loop through each conversation's members and add to friends array if it's not the current user
        for (let j = 0; j < members.length; j++) {
            if (members[j] !== username) {
            const friendsDetails = await axios.get(`${Url}/api/user/username/${members[j]}`).then(response => response.data)
            friendsArray.push(friendsDetails);
            }
        }
    }
    setFriends(friendsArray);
    setLoading(false)
};