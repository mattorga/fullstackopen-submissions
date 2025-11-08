const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  const total = blogs.reduce(reducer, 0)

  return blogs.length === 0 
    ? 0
    : total
}

module.exports = {
  dummy,
  totalLikes
}