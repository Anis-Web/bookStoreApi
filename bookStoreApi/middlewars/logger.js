const logger = (req,res,next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  //without next() the next middleware will not start
  next()
}

module.exports = logger