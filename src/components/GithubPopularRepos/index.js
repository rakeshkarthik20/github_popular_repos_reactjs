import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    view: 'SUCCESS',
    language: 'ALL',
    repoData: [],
    loader: true,
    selectId: 'ALL',
  }

  componentDidMount() {
    this.getAllRepos()
  }

  changeRepos = id => {
    this.setState({language: id, loader: true, selectId: id}, this.getAllRepos)
  }

  getAllRepos = async () => {
    const {language} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${language}`,
    )
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({repoData: updatedData, loader: false})
    }
    if (response.status === 401) {
      this.setState({view: 'FAILURE', loader: false})
    }
  }

  displayRepoContainer = () => {
    const {repoData, view} = this.state
    switch (view) {
      case 'SUCCESS':
        return (
          <div>
            <ul className="repoItemMainContainer">
              {repoData.map(each => (
                <RepositoryItem key={each.id} repoData={each} />
              ))}
            </ul>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="repoItemMainContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
          </div>
        )
      default:
        return null
    }
  }

  displayLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {loader, selectId} = this.state
    return (
      <div className="repoMainContainer">
        <h1 className="repoMainHeading">Popular</h1>
        <div>
          <ul className="languageFilterContainer">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                key={each.id}
                data={each}
                changeRepos={this.changeRepos}
                selectId={selectId}
              />
            ))}
          </ul>
        </div>
        {loader ? this.displayLoader() : this.displayRepoContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos
