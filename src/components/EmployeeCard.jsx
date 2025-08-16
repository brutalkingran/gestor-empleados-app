const EmployeeCard = ({ EmployeeName, avatar, positionName, rank, department, isActive, notes, onClick }) => {
  return (
    <div className={`${ isActive ? "bg-color-white" : "bg-color-red-400"}`}>
      <div>
        <img src={avatar} alt="avatar" />
      </div>

      <div>
        <h2>{EmployeeName}</h2>
        <p>{positionName}</p>
        <p>{rank}</p>
        <p>{department}</p>
      </div>

      <div>
        <p>{notes}</p>
      </div>
      
      <div>
        <button onClick={onClick}>Detalles</button>
      </div>
    </div>
  )
}

export default EmployeeCard;