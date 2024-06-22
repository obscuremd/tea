import { Users } from "../assets/Data"
import { Shared } from "../assets/Shared"


const Friends = () => {

  return (
    <div className="sticky top-20 flex flex-col items-center gap-9 bg-[#292B3B] rounded-[25px] p-5 h-[85vh] overflow-y-scroll">

      <div>Friends</div>

      {/* search */}
      <div className="flex items-center gap-2 md:gap-4">
        <input type="text" placeholder="Find The Tea" style={{ fontSize: Shared.Text.small }} className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]" />
      </div>

      <div className="flex flex-col gap-9">
        {Users.map((item, index) => (
          <div key={index} className="flex gap-8">
            <img src={item.profilePicture} alt="" className="w-7 h-7 rounded-full object-cover" />
            <p className="w-[8em] truncate">{item.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Friends