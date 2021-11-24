import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import Header from '../../components/Header/header.js';
import Footer from '../../components/Footer/footer.js';

const games = () => {
    const [games, setGames] = useState([]);

    const myLoader=({src})=>{
        return src;
    }

    const findGames = (e) => {
        e.preventDefault();
        console.log(e.target.title.value);

        fetch(`https://www.cheapshark.com/api/1.0/games?title=${e.target.title.value}&limit=25`)
        .then(response => response.text())
        .then((result) => {
            const searchResult = JSON.parse(result);
            if (searchResult.length == 0) {
              setGames("None");
            }
            else {
              setGames(searchResult);
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
    }

    return (
      <div className="container">
        <Head>
          <title>Deal Dolphin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Header />
            <p className="description">See if the game you want has a deal!</p>

            <form onSubmit={findGames}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" autoComplete="title" required />
                <button type="submit">Search</button>
            </form>

            <div className="grid">
                {games == "None" ? <h4>No Deals found for that game!</h4> : games.map((deal) => {
                    return (
                          <a href={`https://www.cheapshark.com/redirect?dealID=${deal.cheapestDealID}`} target="_blank" className="card">
                              <h3>{deal.external}</h3>
                              <h4>Available on Steam: {deal.steamAppID == null ? "No" : "Yes"}</h4>
                              <h4>{deal.cheapest}</h4>
                              <p>View &rarr;</p>
                          </a>
                    )
                })}
            </div>
  
            <div className="grid">
                <Link href="/">
                    <a className="card">
                        <h3>Home &larr;</h3>
                    </a>
                </Link>
            </div>

            <Footer />
        </main>
  
        

        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
  
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }

export default games;