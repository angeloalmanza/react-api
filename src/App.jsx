import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const initialDataForm = {
    title: "",
    content: "",
    image: ""
  };

  const apiUrl = "http://localhost:3000";

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialDataForm);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get(`${apiUrl}/posts`).then((resp) => {
      console.log(resp);
      setPosts(resp.data.posts);
    })
  };

  /**
   *funzione che aggiunge un nuovo post alla lista
   * @param {*} event
   */
  const handlePostForm = (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/posts`, formData)
    .then((resp) => {
      const newArray = [...posts, resp.data];
      setPosts(newArray);
      setFormData(initialDataForm)
    })
  };

  /**
   * funzione che cancella un post
   * @param {*} idDaCancellare
   */
  const cancella = (idDaCancellare) => {
    axios.delete(`${apiUrl}/posts/${idDaCancellare}`).then((resp) => {
      const newArray = posts.filter(curPost => curPost.id !== idDaCancellare)
      setPosts(newArray)
    })
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    let newValue;

    if(event.target.type === "checkbox"){
      newValue = event.target.checked;
    }else{
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    }

    setFormData(newData);
  };

  return (
    <>
      <div className="container">
        <section>
          <h1>I miei Post</h1>

          {/* Card per i post */}
          {posts && posts.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((curPost) => (
                <div className="col" key={curPost.id}>
                  <div className="card mb-3">
                    <img src={`${apiUrl}/${curPost.image}`} className="card-img-top h-50"/>
                    <div className="card-body">
                      <h4>{curPost.title}</h4>
                      <p>{curPost.content}</p>
                      <button onClick={() => {cancella(curPost.id)}} className="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <p>Nessun Post inserito</p>
          )}
        </section>
        
        {/* Sezione del form */}
        <section>
          <h3>Inserisci un nuovo post</h3>
          <form onSubmit={handlePostForm}>
            <div className="mb-3">
              <label htmlFor="postTitle">Titolo del Post</label>
              <input 
              type="text"
              className="form-control"
              id="postTitle"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postContent">Contenuto del Post</label>
              <textarea
              type="text"
              className="form-control"
              id="postContent"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postImage"> URL Immagine del Post</label>
              <input
              type="text"
              className="form-control"
              id="postImage"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Aggiungi</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default App
