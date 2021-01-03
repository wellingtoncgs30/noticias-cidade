import graphql from "graphql-tag"
import client from "../../components/ApolloClient"
import Layout from "../../components/Layout"
import Link from "next/link"
import style from "../../styles/Brazil.module.css"

const featuredNew = graphql`
query MyQuery {
  post(id: "cG9zdDozMQ==") {
    title
    content
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
  posts(where: {categoryName: "Brasil"}, last: 4) {
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
    const { featuredNew } = props
    const { otherNews } = props
    return(
        <Layout>
            <div className="container">
                <div className="row">
                    {featuredNew ? (
                      <div className="col-8 col-sm-8 col-md-8">
                          <h1 className={`text-center ${style.mainTitle}`}>{featuredNew.title}</h1>
                          <img src={featuredNew.featuredImage.node.sourceUrl} alt="Imagem da notícia principal" id={style.mainNew}></img>
                          <p className={`text-justify ${style.content}`}>{featuredNew.content.replace(/(<([^>]+)>)/ig, "")}</p>
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
    const news = await client.query({query: featuredNew})
    const other = await client.query({query: otherNews})
    return {
        featuredNew: news.data.post,
        otherNews: other.data.posts.edges
    }
}