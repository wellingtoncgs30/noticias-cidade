import Link from "next/link"
import graphql from "graphql-tag"
import client from "../../components/ApolloClient"
import Layout from "../../components/Layout"
import style from "../../styles/Economy.module.css"

const currentNew = graphql`
query MyQuery {
    post(id: "cG9zdDoxOQ==") {
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
    post(id: "cG9zdDoyMQ==") {
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
  post(id: "cG9zdDoxNw==") {
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

const fourthNew = graphql`
query MyQuery {
  post(id: "cG9zdDoxNQ==") {
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

const fifthNew = graphql`
query MyQuery {
  post(id: "cG9zdDo2") {
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
    const { lastNew } = props
    const { nextNew } = props
    const { fourthNew } = props
    const { fifthNew } = props
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
                        <h1 className={`text-center ${style.mainTitle}`}>Outras notícias sobre Economia</h1>
                        {lastNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{lastNew.title}</h2>
                                <img src={lastNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{lastNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/economia${lastNew.uri}`}>
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
                                    <Link href={`/economia${nextNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {fourthNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{fourthNew.title}</h2>
                                <img src={fourthNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{fourthNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/economia${fourthNew.uri}`}>
                                        <a>
                                            <button className={`btn btn-link btn-block ${style.readMore}`}>Leia mais</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        {fifthNew ? (
                            <div className="card mb-2">
                                <h2 className={style.secondaryTitle}>{fifthNew.title}</h2>
                                <img src={fifthNew.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.imageNews}></img>
                                <div className="card-body">
                                    <p className={`text-justify ${style.cardParagraph}`}>{fifthNew.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                    <Link href={`/economia${fifthNew.uri}`}>
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
    const lastNews = await client.query({query: lastNew})
    const nextNews = await client.query({query: nextNew})
    const fourthNews = await client.query({query: fourthNew})
    const fifthNews = await client.query({query: fifthNew})
    return {
        currentNew: currentNews.data.post,
        lastNew: lastNews.data.post,
        nextNew: nextNews.data.post,
        fourthNew: fourthNews.data.post,
        fifthNew: fifthNews.data.post
    }
}