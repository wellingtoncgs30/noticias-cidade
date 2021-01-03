import Link from "next/link"
import graphql from "graphql-tag"
import Layout from "../../components/Layout"
import client from "../../components/ApolloClient"
import style from "../../styles/Brazil.module.css"

const currentNew = graphql`
query MyQuery {
    post(id: "cG9zdDoyNQ==") {
      id
      databaseId
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

const previewNew = graphql`
query MyQuery {
    post(id: "cG9zdDoyNw==") {
      id
      databaseId
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

const secondNew = graphql`
query MyQuery {
    post(id: "cG9zdDoyOQ==") {
      id
      databaseId
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

const firstNew = graphql`
query MyQuery {
    post(id: "cG9zdDozMQ==") {
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

const lastNew = graphql`
query MyQuery {
    post(id: "cG9zdDoyMw==") {
      id
      databaseId
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

export default function Uri(props) {
    const { currentNew } = props
    const { previewNew } = props
    const { secondNew } = props
    const { firstNew } = props
    const { lastNew } = props
    return(
        <Layout>
            <div className="container">
                <div className="row">
                    {currentNew ? (
                        <div className="col-8 col-sm-8 col-md-8">
                            <h1 className={`text-center ${style.mainTitle}`}>{currentNew.title}</h1>
                            <img src={currentNew.featuredImage.node.sourceUrl} alt="Imagem da notícia principal" id={style.mainNew}></img>
                            <p className={`text-justify ${style.content}`}>{currentNew.content.replace(/(<([^>]+)>)/ig, "")}</p>
                        </div>
                    ) : ""}
                    <div className="col-4 col-sm-4 col-md-4">
                        <h1 className={`text-center ${style.mainTitle}`}>Outras notícias sobre o Brasil</h1>
                        {previewNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{previewNew.title}</h2>
                                <img src={previewNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{previewNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/brasil${previewNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {secondNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{secondNew.title}</h2>
                                <img src={secondNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{secondNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/brasil${secondNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {firstNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{firstNew.title}</h2>
                                <img src={firstNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{firstNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/brasil${firstNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {lastNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{lastNew.title}</h2>
                                <img src={lastNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{lastNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/brasil${lastNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Uri.getInitialProps = async function() {
    const currentNews = await client.query({query: currentNew})
    const previewNews = await client.query({query: previewNew})
    const secondNews = await client.query({query: secondNew})
    const firstNews = await client.query({query: firstNew})
    const lastNews = await client.query({query: lastNew})
    return {
        currentNew: currentNews.data.post,
        previewNew: previewNews.data.post,
        secondNew: secondNews.data.post,
        firstNew: firstNews.data.post,
        lastNew: lastNews.data.post
    }
}