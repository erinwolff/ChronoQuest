import { Link } from 'react-router-dom'

export default function GameCard({ game }) {
  return (
    <>
      <ul className="game-card">
        <section>
          <li className="game">
            <p className="game-text">
              {game.title}
              <br />
              <br />
              <img className="game-image" alt="image of game provided by user" src={game.imageUrl} />
              <br />
              {game.time}
              <br />
              <Link to={`/details/${game.id}`}> Review </Link>
            </p>
          </li>
        </section>
      </ul>
    </>
  )
}
