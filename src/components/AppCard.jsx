const apiUrl = import.meta.env.VITE_API_URL;

const AppCard = ({post, onCancel}) => {
    const imagePath = post.image.replace("img/", "");
    
    return (
        <div className="card mb-3">
            <img src={`${apiUrl}/${imagePath}`} className="card-img-top h-50"/>
            <div className="card-body">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
              <button onClick={onCancel} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    )
}

export default AppCard;