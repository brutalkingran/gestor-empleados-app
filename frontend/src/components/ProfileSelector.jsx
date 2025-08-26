import { useNavigate } from "react-router";
import { useProfileContext } from "../context/ProfileContext"
import ProfileCard from "./ProfileCard";

const ProfileSelector = () => {
  const { profiles } = useProfileContext;
  const navigate = useNavigate();
  return (
    <div>
      {
        profiles.map((profile) => {
          <ProfileCard key={ profile.id } name={ profile.name } avatar={ profile.avatar } onClick={ () => navigate(`/profiles/${profile.id}`) } />
        })
      }
    </div>
  )
}

export default ProfileSelector