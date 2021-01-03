import Link from "next/link"
import graphql from "graphql-tag"
import client from "../../components/ApolloClient"
import Layout from "../../components/Layout"
import style from "../../styles/Health.module.css"

const currentNew = graphql`
query MyQuery {
    post(id: "cG9zdDo2Mw==") {
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

const previewNew = graphql`
query MyQuery {
    post(id: "cG9zdDo2NQ==") {
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

const firstNew = graphql`
query MyQuery {
    post(id: "cG9zdDo2Nw==") {
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

const nextNew = graphql`
query MyQuery {
    post(id: "cG9zdDo1OQ==") {
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
    post(id: "cG9zdDo1Nw==") {
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

export default function Uri(props) {
    const { currentNew } = props
    const { previewNew } = props
    const { firstNew } = props
    const { nextNew } = props
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
                        <h1 className={`text-center ${style.mainTitle}`}>Outras notícias sobre a Saúde</h1>
                        {previewNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{previewNew.title}</h2>
                                <img src={previewNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{previewNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/saude${previewNew.uri}`}>
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
                                    <Link href={`/saude${firstNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {nextNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{nextNew.title}</h2>
                                <img src={nextNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{nextNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/saude${nextNew.uri}`}>
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
                                    <Link href={`/saude${lastNew.uri}`}>
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
    const firstNews = await client.query({query: firstNew})
    const nextNews = await client.query({query: nextNew})
    const lastNews = await client.query({query: lastNew})
    return {
        currentNew: currentNews.data.post,
        previewNew: previewNews.data.post,
        firstNew: firstNews.data.post,
        nextNew: nextNews.data.post,
        lastNew: lastNews.data.post
    }
}