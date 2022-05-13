module.exports = (sequelize, Sequelize) => {
  const Sign = sequelize.define('sign', {
    pdf: {
      type: Sequelize.STRING,
    },
    signAddr: {
      type: Sequelize.STRING,
    },
  })

  return Sign
}
