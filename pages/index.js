import { useState } from "react"
import Layout from "../components/Layout"
import style from "../styles/SectionIndex.module.css"
import Link from "next/link"
import client from "../components/ApolloClient"
import axios from "axios"
import graphql from "graphql-tag"

const author = graphql`
query MyQuery {
  users(first: 1) {
    edges {
      node {
        id
        firstName
        lastName
      }
    }
  }
}
`

const feature = graphql`
query MyQuery {
  post(id: "cG9zdDo3NQ==") {
    databaseId
    id
    title
    content
    uri
    featuredImage {
      node {
        sourceUrl
      }
    }
  }
}
`

const worldNews = graphql`
query MyQuery {
  posts(where: {categoryName: "Mundo", orderby: {order: DESC, field: DATE}}) {
    edges {
      node {
        id
        title
        content
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`

const latestNews = graphql`
query MyQuery {
  posts(where: {orderby: {order: DESC, field: DATE}}, first: 4) {
    edges {
      node {
        id
        title
        content
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`

export default function Index(props) {
  const [news, setNews] = useState({
    email: ""
  })
  function handleInputChange(event) {
    const {name, value} = event.target
    setNews(values => ({...values, [name]: value}))
  }
  async function submitForm(event) {
    const url = "http://localhost:3000/news"
    event.preventDefault()
    const {email} = news
    await axios.post(url, {
      email
    }).then((response) => {
      setNews(response.data)
      setNews({
        email: ""
      })
    }).catch((error) => {
      console.log(`Erro: ${error}`)
    })
  }
  const { authors } = props
  const { features } = props
  const { worldNews } = props
  const { latestNews } = props
  return(
    <Layout>
      <section id={style.sectionIndex}>
        <div className="container">
          <div className="row">
            <div className="col-3 col-sm-4 col-md-2">
              <h1 className={style.title}>Entrevistas</h1>
              <div className={style.interviews}>
                {authors ? (
                  authors.map((author) => (
                    <ul key={author.node.id} className="list-unstyled">
                      <li>
                        <Link href="/entrevista-com-wellington-cesar">
                          <a className={style.link}>{author.node.firstName} {author.node.lastName}</a>
                        </Link>
                      </li>
                    </ul>
                  ))
                ) : ""}
              </div>
            </div>
            <div className="col-4 col-sm-4 col-md-5">
              <div className={style.interviews}>
                <h1 className={style.title}>Última entrevista</h1>
                <h2 className={style.mainTitle}>Entrevista com Felipe Silva</h2>
                <img src="images/doutor.jpg" alt="Imagem de um doutor" id={style.doctor}></img>
                <div className={style.content}>
                  <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Link href="/entrevista-com-felipe-silva">
                    <a>
                      <button type="button" className="btn btn-link" id={style.readMore}>Leia mais!</button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-5 col-sm-4 col-md-5">
              <div className={style.feature}>
                <h1 className={style.title}>Destaque</h1>
                <div className={style.content}>
                  {features ? (
                    <>
                      <h2 className={style.mainTitle}>{features.post.title}</h2>
                      <img src={features.post.featuredImage.node.sourceUrl} alt="Imagem" id={style.taxi}></img>
                      <p className={style.paragraph}>{features.post.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                      <Link href={`/mundo${features.post.uri}`}>
                        <a>
                          <button type="button" className="btn btn-link" id={style.readMoreFeature}>Leia mais!</button>
                        </a>
                      </Link>
                    </>
                  ) : ""}
                </div>
              </div>
            </div>
            <div className="col-3 col-sm-4 col-md-2">
              <div className={style.news}>
                <h1 className={style.title}>News</h1>
                <div className={style.content}>
                  <form onSubmit={submitForm}>
                    <div className="form-group">
                      <label htmlFor="email" id={style.email}>E-mail:</label>
                      <input type="text" className="form-control" name="email" value={news.email} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                      <button className="btn" type="submit" id={style.submit}>Enviar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-4 col-sm-4 col-md-5">
              <h1 className={style.title}>Mundo</h1>
              {worldNews ? (
                worldNews.map(news => (
                  <div className="card mb-2" key={news.id}>
                    <img src={news.node.featuredImage.node.sourceUrl} className={style.technology} alt="imagem de tecnologia"></img>
                    <Link href={`/mundo${news.node.uri}`}>
                      <a>
                        <div className="card-body">
                          <h3 className={style.cardTitle}>{news.node.title}</h3>
                          <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))
              ) : ""}
            </div>
            <div className="col-5 col-sm-4 col-md-5">
              <h1 className={style.title}>Notícias recentes</h1>
                {latestNews ? (
                  latestNews.map(latest => (
                    <div className="card mb-2">
                      <img src={latest.node.featuredImage.node.sourceUrl} className={style.images} alt="Imagem"></img>
                      <Link href={`/mundo${latest.node.uri}`}>
                        <a>
                          <div className="card-body">
                            <h3 className={style.cardTitle}>{latest.node.title}</h3>
                            <p className={style.cardParagraph}>{latest.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                ) : ""}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

Index.getInitialProps = async () => {
  const authors = await client.query({query: author})
  const features = await client.query({query: feature})
  const news = await client.query({query: worldNews})
  const latest = await client.query({query: latestNews})
  return {
    authors: authors.data.users.edges,
    features: features.data,
    worldNews: news.data.posts.edges,
    latestNews: latest.data.posts.edges
  }
}