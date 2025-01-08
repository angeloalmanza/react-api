const apiUrl = import.meta.env.VITE_API_URL;

const AppCard = ({post, onCancel}) => {
    return (
        <div className="card mb-3">
            <img src={`${apiUrl}/${post.image}`} className="card-img-top h-50"/>
            <div className="card-body">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <button onClick={onCancel} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    )
}

export default AppCard;