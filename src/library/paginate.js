function paginate(data, options){
  let paginated = data
  const total = paginated.length
  const pages = Math.ceil(total / options.limit)

  for (let i = 0; i < options.page; i++){
    paginated = data.slice(0 + options.limit * i, options.limit + options.limit * i)
  }

  return({
    docs: paginated,
    total: total,
    limit: options.limit,
    page: options.page,
    pages: pages
  })
}

export default paginate
