import React, { Component } from 'react'
import { load } from 'jinrishici'
import { Icon } from 'evergreen-ui'
import Storager from '../utils/storager'

export default class LoadedVerses extends Component {
  constructor (props) {
    super()
    this.state = { verses: { content: '', origin: {} } }
  }

  componentDidMount () {
    // fetch a verse from localstorage
    // eslint-disable-next-line no-undef
    Storager.get(['verses'], res => {
      if (!res.verses) {
        this.setState({
          verses: {
            content: '红豆生南国，春来发几枝。',
            origin: {
              author: '王维',
              title: '相思'
            }
          }
        })
      } else {
        this.setState({ verses: res.verses }, () => {})
      }
    })

    // fetch verse from jinrishici
    load(result => {
      // eslint-disable-next-line no-undef
      Storager.set({ verses: result.data }, () => {})
    })
  }

  render () {
    return (
      <div className={`${this.props.className} verses`}>
        <div id='verses-content'>
          {this.state.verses.content}
        </div>
        <div id='verses-origin'>
          <a href={`https://www.google.com/search?q=${this.state.verses.origin.author} ${this.state.verses.origin.title}`} target='_blank'>
            {this.state.verses.origin.author} 《{this.state.verses.origin.title}》
            <span className='origin-search'>
              <Icon icon='search-text' color='white' style={{opacity: 0.8, display: 'none'}} />
            </span>
          </a>
        </div>
      </div>
    )
  }
}
