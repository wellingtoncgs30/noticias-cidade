import Link from "next/link"
import graphql from "graphql-tag"
import client from "../../components/ApolloClient"
import Layout from "../../components/Layout"
import style from "../../styles/Brazil.module.css"

const currentNew = graphql`
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

const otherNews = graphql`
query MyQuery {
    posts(where: {categoryName: "Brasil"}, first: 4) {
      edges {
        node {
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
    }
  }
`

export default function Uri(props) {
    const { currentNew } = props
    const { otherNews } = props
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
                        {otherNews ? (
                            otherNews.map(otherNew => (
                                <div key={otherNew.node.id} className="card mb-2">
                                    <h2 className={style.secondaryTitle}>{otherNew.node.title}</h2>
                                    <img src={otherNew.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" id={style.imageNews}></img>
                                    <div className="card-body">
                                        <p className={`text-justify ${style.cardParagraph}`}>{otherNew.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                        <Link href={`/brasil${otherNew.node.uri}`}>
                                            <a>
                                                <button className="btn btn-link btn-block" id={style.readMore}>Leia mais</button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : ""}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Uri.getInitialProps = async function() {
    const currentNews = await client.query({query: currentNew})
    const otherNew = await client.query({query: otherNews})
    return {
        currentNew: currentNews.data.post,
        otherNews: otherNew.data.posts.edges
    }
}