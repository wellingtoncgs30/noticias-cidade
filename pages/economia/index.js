import Layout from "../../components/Layout"
import client from "../../components/ApolloClient"
import style from "../../styles/SectionEconomy.module.css"
import graphql from "graphql-tag"
import Link from "next/link"

const news = graphql`
query MyQuery {
    posts(where: {categoryName: "Economia", orderby: {field: DATE, order: DESC}}) {
      edges {
        node {
          databaseId
          id
          title
          date
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
//http://localhost:3000/economia/bolsa-de-valores-dos-estados-unidos-apresenta-alta-de-5
export default function Economy(props) {
    const { economyNews } = props
    return(
        <Layout>
            <section id={style.sectionEconomy}>
                <div className="container">
                    <h1 className={style.title}>Notícias relacionadas a Economia</h1>
                    <div className="row">
                        {economyNews ? (
                            economyNews.map(news => (
                                <div className="col-6 col-sm-4 col-md-4">
                                    <div className="card mb-2" key={news.node.id}>
                                        <img src={news.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" id={style.imageNews}></img>
                                        <div className="card-body">
                                            <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                            <Link href={`/economia${news.node.uri}`}>
                                                <a>
                                                    <button className="btn btn-block btn-link" id={style.readMore}>Leia mais</button>
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

Economy.getInitialProps = async function() {
    const economyNews = await client.query({query: news})
    return {
        economyNews: economyNews.data.posts.edges
    }
}