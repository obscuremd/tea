import { Users } from "../assets/Data"
import { SendDiagonal, Xmark } from "iconoir-react"
import { FriendsState } from "../state/atoms/FriendsState"
import { useRecoilState } from "recoil"
import { Shared } from "../assets/Shared"



const FriendsMobile = () => {

    const [friends, setFriends] = useRecoilState(FriendsState)

    return (
        <div className="fixed top-0 right-0 z-20 w-screen bg-[#2020209d] flex justify-end backdrop-filter backdrop-blur-sm">

            <div className="flex flex-col items-center gap-7 bg-[#292b3b] rounded-[25px] p-5 w-[60%] h-screen overflow-scroll ">

                <div className="flex justify-between w-full px-2">
                    <p>Friends</p>

                    <button onClick={() => setFriends(!friends)}>
                        <Xmark />
                    </button>
                </div>

                {/* search */}
                <div className="flex items-center gap-2 md:gap-4 w-full">
                    <input type="text" placeholder="Find The Tea" style={{ fontSize: Shared.Text.small }} className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]" />
                </div>

                <div className="flex flex-col gap-9">
                    {Users.map((item, index) => (
                        <div key={index} className="flex gap-8">
                            <img src={item.profilePicture} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <p className="w-[8em] truncate" style={{ fontSize: Shared.Text.large }}>{item.username}</p>
                            <SendDiagonal className="text-xs" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendsMobile