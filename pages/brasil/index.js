import Layout from "../../components/Layout"
import style from "../../styles/SectionBrazil.module.css"
import Link from "next/link"
import client from "../../components/ApolloClient"
import graphql from "graphql-tag"

const news = graphql`
query MyQuery {
    posts(where: {categoryName: "Brasil"}) {
      edges {
        node {
          databaseId
          id
          title
          date
          content
          uri
          slug
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
    const { brazilNews } = props
    return(
        <Layout>
            <section id={style.sectionBrazil}>
                <div className="container">
                <h1 className={style.title}>Notícias relacionadas ao Brasil</h1>
                    <div className="row">
                        {brazilNews ? (
                            brazilNews.map(news => (
                                <div className="col-6 col-sm-4 col-md-4">
                                    <div className="card mb-2" key={news.node.id}>
                                        <img src={news.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" className={style.technology}></img>
                                        <div className="card-body">
                                            <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                            {/* <Link href={`/brasil/[uri]`} as={`/brasil${news.node.uri}`}>
                                                <a>
                                                    <button className="btn btn-link btn-block" id={style.readMore}>Leia mais</button>
                                                </a>
                                            </Link> */}
                                            <Link href={`/brasil${news.node.uri}`}>
                                                <a>
                                                    <button className="btn btn-link btn-block" id={style.readMore}>Leia mais</button>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ""}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

Index.getInitialProps = async function({query: {uri}}) {
    const brazilNews = await client.query({query: news})
    return {
        brazilNews: brazilNews.data.posts.edges,
        uri
    }
}