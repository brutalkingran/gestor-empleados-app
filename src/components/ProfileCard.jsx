const ProfileCard = ({ name, avatar, onClick }) => {
  return (
    <div onClick={onclick}>
      <h2>{name}</h2>
      <img src={avatar} alt="avatar" />
    </div>
  )
}

export default ProfileCard;