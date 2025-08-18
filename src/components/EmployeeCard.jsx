const EmployeeCard = ({ EmployeeName, avatar, positionName, rank, department, isActive, notes, onClickDetails, onClickEdit, onClickDelete }) => {
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
        <button onClick={onClickDetails}>Detalles</button>
      </div>

      <div>
        <button onClick={onClickEdit}>Editar</button>
      </div>

      <div>
        <button onClick={onClickDelete}>Borrar</button>
      </div>
    </div>
  )
}

export default EmployeeCard;