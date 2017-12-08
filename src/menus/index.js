import React from 'react'
import { Link, Route } from 'react-static'
import axios from 'axios'
import Home from '../containers/Home'
import About from '../containers/About'
import Blog from '../containers/Blog'

import config from './menu.config.json'

const components = { Home, About, Blog }

export default {
  components,
  navigation: config.menus.map(menu => <Link key={menu.name} to={menu.link}>{menu.name}</Link>),
  content: config.menus.map(menu => (
    <Route
      key={menu.name}
      exact={menu.link === menu.route}
      path={menu.route}
      component={components[menu.componentName]}
    />
  )),
  routes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
      },
      {
        path: '/about',
      },
      {
        path: '/blog',
        getProps: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          getProps: () => ({
            post,
          }),
        })),
      },
    ]
  },
}