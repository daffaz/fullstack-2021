/**
 *
 * @param {array} blogs
 * @returns
 */
const dummy = (blogs) => {
  return 1
}

/**
 *
 * @param {array} blogs
 */
const totalLikes = (blogs) => {
  let likesTotal = 0
  blogs.forEach((blog) => {
    likesTotal += blog.likes
  })

  return likesTotal
}

/**
 *
 * @param {array} blogs
 */
const favoriteBlog = (blogs) => {
  let favorit = blogs[0]

  blogs.forEach((blog) => {
    if (blog.likes > favorit.likes) {
      favorit = blog
    }
  })

  return favorit
}

/**
 *
 * @param {array} blogs
 */
const most_blogs = (blogs) => {
  let output = {}

  blogs.forEach((blog) => {
    if (output[blog.author] === undefined) {
      output[blog.author] = 1
    } else {
      output[blog.author] += 1
    }
  })

  const mostAuthor = Object.keys(output).reduce((a, b) =>
    output[a] > output[b] ? a : b
  )
  return {
    author: mostAuthor,
    blogs: output[mostAuthor],
  }
}

const mostLikes = (blogs) => {
  let likes = {}

  blogs.forEach((blog) => {
    if (likes[blog.author] === undefined) {
      likes[blog.author] = blog.likes
    } else {
      likes[blog.author] += blog.likes
    }
  })

  const mostLikesAuthor = Object.keys(likes).reduce((a, b) =>
    likes[a] > likes[b] ? a : b
  )

  return {
    author: mostLikesAuthor,
    likes: likes[mostLikesAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  most_blogs,
  mostLikes,
}
