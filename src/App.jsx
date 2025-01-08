import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import AppCard from "./components/AppCard";

function App() {
  const initialDataForm = {
    title: "",
    content: "",
    image: "",
    tags: []
  };

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialDataForm);
  const [tags, setTags] = useState([]);
  const [filterTags , setFilterTags] = useState("all");

  useEffect(() => {
    getPosts();
  }, [filterTags]);

  useEffect(() => {
    getTags();
  },[]);

  const getPosts = () => {
    let url = `${apiUrl}/posts`;
    if(filterTags !== "all"){
      url+= `?tags=${filterTags}`;
    }
    axios.get(url).then((resp) => {
      console.log(resp.data);
      setPosts(resp.data);
    })
  };

  const getTags = () =>{
    axios.get(`${apiUrl}/tags`).then((resp) =>{
      setTags(resp.data.tags);
    })
  }

  /**
   *funzione che aggiunge un nuovo post alla lista
   * @param {*} event
   */
  const handlePostForm = (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/posts`, formData)
    .then((resp) => {
      const newArray = [...posts ?? [], resp.data];
      setPosts(newArray);
      setFormData(initialDataForm);
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
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedTags = checked
          ? [...prevData.tags, value] // Aggiungo il tag se il checkbox è selezionato
          : prevData.tags.filter((tag) => tag !== value); // Rimuovo il tag se il checkbox non è selezionato

        return {
          ...prevData,
          tags: updatedTags, // Aggiorna la lista dei tag selezionati
        };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="container">
        <section>
          <select name="tags" id="" value={filterTags} onChange={(event) => setFilterTags(event.target.value)}>
            <option value="all">Tutti i post</option>
            {tags.map((curTag,index) => <option key={index} value={curTag}> {curTag}</option>)}
          </select>
        </section>

        <section>
          <h1>I miei Post</h1>

          {/* Card per i post */}
          {(posts && posts.length > 0) ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((curPost) => (
                <div className="col" key={curPost.id}>
                  <AppCard 
                  post={curPost}
                  onCancel={() => (cancella(curPost.id))}
                  />
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
            <div className="mb-3">
            <label>Seleziona i tags per il post:</label>
              <div>
                {tags.map((curTag, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`tag-${curTag}`}
                      name="tags"
                      value={curTag}
                      checked={formData.tags.includes(curTag)}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`tag-${curTag}`}>{curTag}</label>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Aggiungi</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default App
