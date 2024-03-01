import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData
  return (
    <li className="repoItemContainer">
      <img src={avatarUrl} alt={name} className="avatarImage" />
      <h1 className="name">{name}</h1>
      <div className="repoDetailsMainContainer">
        <div className="repoDetailsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="repoImage"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="repoDetailsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
            className="repoImage"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="repoDetailsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repoImage"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
